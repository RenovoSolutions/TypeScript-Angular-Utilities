'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.synchronizedRequests';
export var factoryName: string = 'synchronizedRequests';

export interface ISynchronizedRequestsService {
	getDataSet: IRequestGetter;
	callback: IRequestCallback;

	getData(...params: any[]): void;
}

export class SynchronizedRequestsService {
	constructor(public getDataSet: IRequestGetter, public callback: IRequestCallback) { }

	getData(...params: any[]): void {
		// implementation
	}
}

export interface IRequestGetter {
	(...params: any[]): angular.IPromise<any>;
}

export interface IRequestCallback {
	(...data: any[]): void;
}

export interface ISynchronizedRequestsFactory {
	getInstance(getDataSet: IRequestGetter, callback: IRequestCallback): ISynchronizedRequestsService;
}

export function synchronizedRequestsFactory(): ISynchronizedRequestsFactory {
	return {
		getInstance(getDataSet: IRequestGetter, callback: IRequestCallback): ISynchronizedRequestsService {
			return new SynchronizedRequestsService(getDataSet, callback);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, synchronizedRequestsFactory);
