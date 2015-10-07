'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.parentChildBehavior';
export var serviceName: string = 'parentChildBehavior';

export interface IViewData<TBehavior> {
	behavior: TBehavior;
}

export interface IChild<TBehavior> {
	viewData?: IViewData<TBehavior>;
}

export interface IParentChildBehaviorService {
	getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
	triggerChildBehavior<TBehavior, TReturnType>(child: IChild<any>
		, action: { (behavior: TBehavior): TReturnType }): TReturnType;
	triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[]
		, action: { (behavior: TBehavior): TReturnType }): TReturnType[];
	getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
	registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
}

export class ParentChildBehaviorService {
	getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior {
		return child && child.viewData != null
			? child.viewData.behavior
			: null;
	}

	triggerChildBehavior<TBehavior, TReturnType>(child: IChild<TBehavior>
		, action: { (behavior: TBehavior): TReturnType }): TReturnType {
		var behavior: TBehavior = this.getChildBehavior(child);

		if (behavior == null) {
			return null;
		} else {
			return action(behavior);
		}
	}

	triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[]
		, action: { (behavior: TBehavior): TReturnType }): TReturnType[] {
		var behaviors: TBehavior[] = this.getAllChildBehaviors(childList);

		return _.map(behaviors, (behavior: TBehavior): TReturnType => {
			return action(behavior);
		});
	}

	getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[] {
		return _(childList).map((child: IChild<TBehavior>): TBehavior => { return this.getChildBehavior<TBehavior>(child); })
							.filter((behavior: TBehavior): boolean => { return behavior != null; })
							.value();
	}

	registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void {
		if (child == null) {
			return;
		}

		if (child.viewData == null) {
			child.viewData = { behavior: null };
		}

		var currentBehavior: TBehavior = child.viewData.behavior;

		if (currentBehavior == null) {
			child.viewData.behavior = behavior;
		} else {
			child.viewData.behavior = <TBehavior>_.extend(currentBehavior, behavior);
		}
	}
}

angular.module(moduleName, [])
	.service(serviceName, ParentChildBehaviorService);
