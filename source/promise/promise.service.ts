// uses typings/angularjs
// uses typings/lodash

module rl.utilities.promise {
	'use strict';

	export var moduleName: string = 'rl.utilities.promise';
	export var serviceName: string = 'promiseUtility';

	export interface IPromiseUtility {
		isPromise(promise: any): boolean;
		isPromise(promise: ng.IPromise<any>): boolean;
	}

	class PromiseUtility implements IPromiseUtility {
		isPromise(promise: any): boolean {
			return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
		}
	}

	angular.module(moduleName, [])
		.service(serviceName, PromiseUtility);
}
