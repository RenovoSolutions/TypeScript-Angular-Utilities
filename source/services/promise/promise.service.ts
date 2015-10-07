'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.utilities.services.promise';
export var serviceName: string = 'promiseUtility';

export interface IPromiseUtility {
	isPromise(promise: any): boolean;
	isPromise(promise: angular.IPromise<any>): boolean;
	resolvePromises(resolves: any): angular.IPromise<any>;
}

class PromiseUtility implements IPromiseUtility {
	static $inject: string[] = ['$q', '$injector'];
	constructor(private $q: angular.IQService, private $injector: angular.auto.IInjectorService) {}

	isPromise(promise: any): boolean {
		return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	}

	resolvePromises(resolves: any): angular.IPromise<any> {
		let promises: any = {};
		_.each(resolves, (value: any, key: any): void => {
			if (_.isFunction(value) || _.isArray(value)) {
				promises[key] = (this.$q.when(this.$injector.invoke(value)));
			} else if (_.isString(value)) {
				promises[key] = (this.$q.when(this.$injector.get(value)));
			} else {
				promises[key] = (this.$q.when(value));
			}
		});

		return this.$q.all(promises);
	}
}

angular.module(moduleName, [])
	.service(serviceName, PromiseUtility);
