import { IPromiseUtility, moduleName, serviceName } from './promise.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

describe('promiseUtility', () => {
	let promiseUtility: IPromiseUtility;
	let mockedValue: any;
	let $rootScope: angular.IRootScopeService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		mockedValue = 5;

		angularFixture.mock({
			value: mockedValue,
		});

		let services: any = angularFixture.inject(serviceName, '$rootScope');
		promiseUtility = services[serviceName];
		$rootScope = services.$rootScope;
	});

	describe('isPromise', (): void => {
		it('should return true if the object is a promise', (): void => {
			let promise: Object = {
				then: sinon.spy(),
				catch: sinon.spy(),
			};

			expect(promiseUtility.isPromise(promise)).to.be.true;
		});

		it('should return false if the object is not a promise', (): void => {
			let str: string = 'promise';
			let obj: Object = {};

			expect(promiseUtility.isPromise(str)).to.be.false;
			expect(promiseUtility.isPromise(obj)).to.be.false;
		});
	});

	describe('resolvePromises', (): void => {
		it('should return the value directly if type is object or primitive', (done: MochaDone): void => {
			let object: Object = { prop: 5 };
			promiseUtility.resolvePromises({ object: object, num: 5 }).then((resolveData: any): void => {
				expect(resolveData.object).to.equal(object);
				expect(resolveData.num).to.equal(5);
				done();
			});

			$rootScope.$digest();
		});

		it('should inject the specified value if the type is string', (done: MochaDone): void => {
			promiseUtility.resolvePromises({ data: 'value' }).then((resolveData: any): void => {
				expect(resolveData.data).to.equal(mockedValue);
				done();
			});

			$rootScope.$digest();
		});

		it('should invoke the value with dependencies if type is function or an array with a function as the last param', (done: MochaDone): void => {
			let func: Sinon.SinonSpy = sinon.spy((value: number): number => { return value - 1; });
			func.$inject = ['value'];
			let array: any[] = ['value', sinon.spy((value: number): number => { return value * 2; })];

			promiseUtility.resolvePromises({ func: func, array: array }).then((resolveData: any): void => {
				expect(resolveData.func).to.equal(mockedValue - 1);
				expect(resolveData.array).to.equal(mockedValue * 2);
				sinon.assert.calledOnce(func);
				sinon.assert.calledWith(func, mockedValue);
				sinon.assert.calledOnce(array[1]);
				sinon.assert.calledWith(array[1], mockedValue);
				done();
			});

			$rootScope.$digest();
		});
	});
});
