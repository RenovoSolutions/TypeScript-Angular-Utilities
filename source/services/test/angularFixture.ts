// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../typings/angularMocks.d.ts' />

module rl.utilities.services.test {
	export interface IControllerResult<TControllerType> {
		controller: TControllerType;
		scope: ng.IScope;
	}

	export interface IDirectiveResult {
		directive: ng.IDirective;
		scope: ng.IScope;
	}

	export interface IAngularFixture {
		inject: (...serviceNames: string[]) => any;
		mock: (mocks: any) => void;
		controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any)
			: IControllerResult<TControllerType>;
		directive: (dom: string) => IDirectiveResult;
	}

	class AngularFixture implements IAngularFixture {
		inject(...serviceNames: string[]): Object {
			// object that will contain all of the services requested
			var services: Object = {};

			// clone the array and add a function that iterates over the original array
			// this avoids iterating over the function itself
			var injectParameters: any[] = _.clone(serviceNames);
			injectParameters.push((...injectedServices: any[]) => {
				// should get called with the services injected by angular
				// we'll add these to services using the serviceName as the key
				_.each(serviceNames, (service: string, index: number) => {
					services[service] = injectedServices[index];
				});
			});

			angular.mock.inject(injectParameters);

			return services;
		}

		mock(mocks: any): void {
			angular.mock.module(($provide: ng.auto.IProvideService) => {
				_.each(mocks, (value: any, key: number) => {
					$provide.value(key.toString(), value);
				});
			});
		}

		controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any)
			: IControllerResult<TControllerType> {
			var services: any = this.inject('$rootScope', '$controller');
			var $rootScope: ng.IRootScopeService = services.$rootScope;
			var $controller: ng.IControllerService = services.$controller;

			scope = _.extend($rootScope.$new(), scope);

			if (locals == null) {
				locals = {};
			}

			locals.$scope = scope;

			return {
				scope: scope,
				controller: <TControllerType>$controller(controllerName, locals, bindings),
			};
		}

		directive(dom: string): IDirectiveResult {
			var services: any = this.inject('$rootScope', '$compile');
			var $rootScope: ng.IScope = services.$rootScope;
			var $compile: any = services.$compile;

			angular.mock.module('renovoTemplates');

			var component: any = $compile(dom)($rootScope);
			$rootScope.$digest();
			return {
				directive: component,
				scope: component.isolateScope(),
			};
		}
	}

	export var angularFixture: IAngularFixture = new AngularFixture();
}
