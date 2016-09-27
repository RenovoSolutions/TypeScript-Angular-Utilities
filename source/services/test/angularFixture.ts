import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

export interface IControllerResult<TControllerType> {
	controller: TControllerType;
	scope: angular.IScope;
}

export interface IDirectiveResult<TControllerType> {
	directive: angular.IDirective;
	scope: angular.IScope;
	controller: TControllerType;
}

export interface IAngularFixture {
	inject: (...serviceNames: string[]) => any;
	mock: (mocks: any) => void;
	componentController<TControllerType>(componentName: string, bindings?: any, locals?: any): IControllerResult<TControllerType>;
	controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any)
		: IControllerResult<TControllerType>;
	directive<TControllerType>(directiveName: string, dom: string, scope: angular.IScope): IDirectiveResult<TControllerType>;
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
		angular.mock.module(($provide: angular.auto.IProvideService) => {
			_.each(mocks, (value: any, key: number) => {
				$provide.value(key.toString(), value);
			});
		});
	}

	componentController<TControllerType>(componentName: string, bindings?: any, locals?: any, scope?: any): IControllerResult<TControllerType> {
		const services: any = this.inject('$rootScope', '$componentController');
		const $rootScope: angular.IRootScopeService = services.$rootScope;
		const $componentController: angular.IComponentControllerService = services.$componentController;

		scope = _.extend($rootScope.$new(), scope);

		if (locals == null) {
			locals = {};
		}

		locals.$scope = scope;

		return {
			scope: scope,
			controller: <TControllerType>$componentController(componentName, locals, bindings),
		};
	}

	controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any)
		: IControllerResult<TControllerType> {
		var services: any = this.inject('$rootScope', '$controller');
		var $rootScope: angular.IRootScopeService = services.$rootScope;
		var $controller: angular.IControllerService = services.$controller;

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

	directive<TControllerType>(directiveName: string, dom: string, scope: any): IDirectiveResult<TControllerType> {
		var services: any = this.inject('$rootScope', '$compile');
		scope = _.extend(services.$rootScope.$new(), scope);

		var $compile: angular.ICompileService = services.$compile;

		var component: angular.IAugmentedJQuery = $compile(dom)(scope);
		scope.$digest();

		return <any>{
			directive: component,
			scope: component.isolateScope(),
			controller: component.controller(directiveName),
		};
	}
}

export var angularFixture: IAngularFixture = new AngularFixture();
