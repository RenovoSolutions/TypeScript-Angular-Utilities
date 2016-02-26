'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IConverter } from '../baseDataServiceBehavior';

export var moduleName: string = 'rl.utilities.services.baseSingletonDataService';
export var factoryName: string = 'baseSingletonDataService';

export interface ISingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;

    useMock: boolean;
    logRequests: boolean;
}

// deprecated - use ISingletonDataService
export interface IBaseSingletonDataService<TDataType> extends ISingletonDataService<TDataType> { }

export class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
    private behavior: IBaseDataServiceBehavior<TDataType>;

    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , public endpoint: string
            , private mockData: TDataType
            , transform: IConverter<TDataType> | { [index: string]: IConverter<any> }
            , public useMock: boolean
            , public logRequests: boolean) {
		this.behavior = new BaseDataServiceBehavior($http, $q, transform);
    }

    get(): angular.IPromise<TDataType> {
        return this.behavior.getItem({
            endpoint: this.endpoint,
            getMockData: (): TDataType => { return this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    update(domainObject: TDataType): angular.IPromise<TDataType> {
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.endpoint,
            updateMockData: (data: TDataType): void => {
                this.mockData = <TDataType>_.assign(this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }
}

export interface ISingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: IConverter<TDataType> | { [index: string]: IConverter<TDataType> }, useMock?: boolean): ISingletonDataService<TDataType>;
}

// deprecated - use ISingletonDataServiceFactory
export interface IBaseSingletonDataServiceFactory extends ISingletonDataServiceFactory { }

singletonDataServiceFactory.$inject = ['$http', '$q'];
export function singletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): ISingletonDataServiceFactory {
    return {
        getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: IConverter<TDataType> | { [index: string]: IConverter<TDataType> }, useMock?: boolean, logRequests?: boolean): ISingletonDataService<TDataType> {
            return new SingletonDataService<TDataType>($http, $q, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, singletonDataServiceFactory);
