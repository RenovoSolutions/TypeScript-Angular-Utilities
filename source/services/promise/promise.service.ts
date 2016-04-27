import { OpaqueToken, Provider } from 'angular2/core';
import * as _ from 'lodash';

export interface IPromiseUtility {
	isPromise(promise: any): boolean;
	isPromise(promise: angular.IPromise<any>): boolean;
	// resolvePromises(resolves: any): angular.IPromise<any>;
}

export class PromiseUtility implements IPromiseUtility {
	// private injector: Injector;

	// constructor(injector: Injector) {
	// 	this.injector = injector;
	// }

	isPromise(promise: any): boolean {
		return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	}

	// investigate using angular 2 injection for dialogs
	//
	// resolvePromises(resolves: any): angular.IPromise<any> {
	// 	let promises: any = {};
	// 	_.each(resolves, (value: any, key: any): void => {
	// 		if (_.isFunction(value) || _.isArray(value)) {
	// 			promises[key] = (this.$q.when(this.$injector.invoke(value)));
	// 		} else if (_.isString(value)) {
	// 			promises[key] = (this.$q.when(this.$injector.get(value)));
	// 		} else {
	// 			promises[key] = (this.$q.when(value));
	// 		}
	// 	});

	// 	return this.$q.all(promises);
	// }
}

export const promiseToken: OpaqueToken = new OpaqueToken('A service for working with promises');

export const PROMISE_PROVIDER: Provider = new Provider(promiseToken, {
	useClass: PromiseUtility,
});
