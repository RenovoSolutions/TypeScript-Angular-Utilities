'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IConverter } from '../baseDataServiceBehavior';
import { ISingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export var moduleName: string = 'rl.utilities.services.dataContracts.singletonDataService';
export var factoryName: string = 'singletonDataService';

export interface ISingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
	version(versionNumber: number): SingletonDataService<TDataType>;

    useMock: boolean;
    logRequests: boolean;
}

// deprecated - use ISingletonDataService
export interface IBaseSingletonDataService<TDataType> extends ISingletonDataService<TDataType> { }

export class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
    private behavior: IBaseDataServiceBehavior<TDataType>;
	private mockData: TDataType;
	endpoint: string;
	url: string;
	useMock: boolean;
	logRequests: boolean;


    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , options: ISingletonResourceParams<TDataType>) {
		this.behavior = new BaseDataServiceBehavior($http, $q, options.transform);
		this.mockData = options.mockData;
		this.endpoint = options.endpoint;
		this.url = this.endpoint;
		this.useMock = options.useMock;
		this.logRequests = options.logRequests;
    }

    get(): angular.IPromise<TDataType> {
        return this.behavior.getItem({
            endpoint: this.url,
            getMockData: (): TDataType => { return this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    update(domainObject: TDataType): angular.IPromise<TDataType> {
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.url,
            updateMockData: (data: TDataType): void => {
                this.mockData = <TDataType>_.assign(this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

	version(versionNumber: number): SingletonDataService<TDataType> {
		let dataService: SingletonDataService<TDataType> = _.clone(this);
		dataService.url = helper.versionEndpoint(dataService.url, versionNumber);
		return dataService;
	}
}

export interface ISingletonDataServiceFactory {
    getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}

// deprecated - use ISingletonDataServiceFactory
export interface IBaseSingletonDataServiceFactory extends ISingletonDataServiceFactory { }

singletonDataServiceFactory.$inject = ['$http', '$q'];
export function singletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): ISingletonDataServiceFactory {
    return {
        getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType> {
            return new SingletonDataService<TDataType>($http, $q, options);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, singletonDataServiceFactory);
