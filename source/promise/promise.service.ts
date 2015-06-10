// uses typings/angularjs
// uses typings/lodash

'use strict';

export var name: string = 'promiseUtility';

export interface IPromiseUtility {
	isPromise(promise: any): boolean;
	isPromise(promise: ng.IPromise<any>): boolean;
}

export class PromiseUtility implements IPromiseUtility {
	isPromise(promise: any): boolean {
		return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	}
}
