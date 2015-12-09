'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IBaseDataServiceBehavior, BaseDataServiceBehavior, ITransform } from '../baseDataServiceBehavior';

export var moduleName: string = 'rl.utilities.services.baseSingletonDataService';
export var factoryName: string = 'baseSingletonDataService';

export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;

    useMock: boolean;
    logRequests: boolean;
}

export class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    private behavior: IBaseDataServiceBehavior<TDataType>;

    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , public endpoint: string
            , private mockData: TDataType
            , transform: ITransform<TDataType>
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

export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransform<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}

baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
export function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory {
    return {
        getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransform<TDataType>, useMock?: boolean, logRequests?: boolean): IBaseSingletonDataService<TDataType> {
            return new BaseSingletonDataService<TDataType>($http, $q, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, baseSingletonDataServiceFactory);
