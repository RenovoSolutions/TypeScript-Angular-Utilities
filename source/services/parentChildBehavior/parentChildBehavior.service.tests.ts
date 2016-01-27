import { IParentChildBehaviorService, IChild, moduleName, serviceName } from './parentChildBehavior.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestBehavior {
	action: Function;
}

describe('parentChildBehavior', () => {
	var parentChildBehavior: IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(serviceName);
		parentChildBehavior = services[serviceName];
	});

	describe('register', (): void => {
		it('should register a child behavior by putting it on the view data of the child', (): void => {
			var child: IChild<ITestBehavior> = { viewData: null };
			var behavior: ITestBehavior = { action: (): number => { return 3; } };

			parentChildBehavior.registerChildBehavior(child, behavior);

			expect(child.viewData.behavior).to.equal(behavior);
		});

		it('should use the existing viewData object if one exists', (): void => {
			var childWithViewData: IChild<ITestBehavior> = <any>{ viewData: { randomValue: 5 } };
			var behavior: ITestBehavior = { action: (): number => { return 5; } };

			parentChildBehavior.registerChildBehavior(childWithViewData, behavior);

			expect(childWithViewData.viewData.behavior).to.equal(behavior);
			expect((<any>childWithViewData.viewData).randomValue).to.equal(5);
		});

		it('should not register child behavior if child object is null', (): void => {
			var behavior: ITestBehavior = { action: (): number => { return 3; } };
			var child: IChild<ITestBehavior> = null;
			parentChildBehavior.registerChildBehavior(child, behavior);
			expect(parentChildBehavior.getChildBehavior(child)).to.be.null;
		});
	});

	describe('getChildBehavior', (): void => {
		it('should get the behavior of an individual child', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 3; } };
			var child: IChild<ITestBehavior> = { viewData: { behavior: behavior1 } };

			expect(parentChildBehavior.getChildBehavior(child)).to.equal(behavior1);
		});

		it('should get existing behaviors for a list of children', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 3; } };
			var behavior2: ITestBehavior = { action: (): number => { return 7; } };
			var childList: IChild<ITestBehavior>[] = [
				{ viewData: { behavior: behavior1 } },
				{ viewData: { behavior: null } },
				{ viewData: { behavior: behavior2 } },
			];

			var behaviors: ITestBehavior[] = parentChildBehavior.getAllChildBehaviors(childList);

			expect(behaviors.length).to.equal(2);
			expect(behaviors[0]).to.equal(behavior1);
			expect(behaviors[1]).to.equal(behavior2);
		});
	});

	describe('triggerChildBehavior', (): void => {
		it('should trigger the specified child action and return the result', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 3; } };
			var child: IChild<ITestBehavior> = { viewData: { behavior: behavior1 } };

			var behaviorResult: number = parentChildBehavior.triggerChildBehavior(child,
				(behavior: ITestBehavior): number => {
				return behavior.action();
			});

			expect(behaviorResult).to.equal(3);
		});

		it('should return null if the behavior does not exist', (): void => {
			var child: IChild<ITestBehavior> = { };

			var behaviorResult: number = parentChildBehavior.triggerChildBehavior(child,
				(behavior: ITestBehavior): number => {
				return behavior.action();
			});

			expect(behaviorResult).to.be.null;
		});
	});

	describe('triggerAllChildBehaviors', (): void => {
		it('should trigger the specified child actions and return the results', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 1; } };
			var child1: IChild<ITestBehavior> = { viewData: { behavior: behavior1 } };
			var behavior2: ITestBehavior = { action: (): number => { return 2; } };
			var child2: IChild<ITestBehavior> = { viewData: { behavior: behavior2 } };
			var behavior3: ITestBehavior = { action: (): number => { return 3; } };
			var child3: IChild<ITestBehavior> = { viewData: { behavior: behavior3 } };
			var childWithoutBehavior: IChild<ITestBehavior> = { };

			var behaviorResult: number[] = parentChildBehavior.triggerAllChildBehaviors([child1, child2, child3, childWithoutBehavior],
				(behavior: ITestBehavior): number => {
				return behavior.action();
			});

			expect(behaviorResult).to.have.length(3);
			expect(behaviorResult[0]).to.equal(1);
			expect(behaviorResult[1]).to.equal(2);
			expect(behaviorResult[2]).to.equal(3);
		});
	});
});
