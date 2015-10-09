'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.synchronizedRequests';
export var factoryName: string = 'synchronizedRequests';

export interface ISynchronizedRequestsService {
	// interface
}

export class SynchronizedRequestsService {
	// implementation
}

export interface IRequestGetter {
	(...params: any[]): angular.IPromise<any>;
}

export interface IRequestCallback {
	(...data: any[]): void;
}

export interface ISynchronizedRequestsFactory {
	getInstance(getData: IRequestGetter, callback: IRequestCallback): ISynchronizedRequestsService;
}

export function synchronizedRequestsFactory(): ISynchronizedRequestsFactory {
	return {
		getInstance(getData: IRequestGetter, callback: IRequestCallback): ISynchronizedRequestsService {
			return new SynchronizedRequestsService();
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, synchronizedRequestsFactory);
