'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.utilities.services.promise';
export var serviceName: string = 'promiseUtility';

export interface IPromiseUtility {
	isPromise(promise: any): boolean;
	isPromise(promise: angular.IPromise<any>): boolean;
}

class PromiseUtility implements IPromiseUtility {
	isPromise(promise: any): boolean {
		return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	}
}

angular.module(moduleName, [])
	.service(serviceName, PromiseUtility);
