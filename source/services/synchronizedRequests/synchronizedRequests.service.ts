'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.synchronizedRequests';
export var factoryName: string = 'synchronizedRequests';

export interface ISynchronizedRequestsService {
	dataProvider: IRequestGetter;
	handleRequest: IRequestCallback;

	getData(...params: any[]): void;
}

export class SynchronizedRequestsService {
	constructor(public dataProvider: IRequestGetter, public handleRequest: IRequestCallback) { }

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
	getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService;
}

export function synchronizedRequestsFactory(): ISynchronizedRequestsFactory {
	return {
		getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService {
			return new SynchronizedRequestsService(dataProvider, handleRequest);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, synchronizedRequestsFactory);
