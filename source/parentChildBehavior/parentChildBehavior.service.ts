// uses typings/angularjs

module rl.utilities.parentChildBehavior {
	'use strict';

	export var moduleName: string = 'rl21.services.parentChildBehavior';
	export var serviceName: string = 'parentChildBehavior';

	export interface IViewData<TBehavior> {
		behavior: TBehavior;
	}

	export interface IChild<TBehavior> {
		viewData: IViewData<TBehavior>;
	}

	export interface IParentChildBehaviorService {
		getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
		getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
		registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
	}

	export class ParentChildBehaviorService {
		getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior {
			return child && child.viewData != null
				? child.viewData.behavior
				: null;
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
}
