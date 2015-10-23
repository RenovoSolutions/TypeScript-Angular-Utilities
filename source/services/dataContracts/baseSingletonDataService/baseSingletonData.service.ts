'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { ITransformFunction } from '../baseDataService/baseData.service';

export var moduleName: string = 'rl.utilities.services.baseSingletonDataService';
export var factoryName: string = 'baseSingletonDataService';

export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}

export class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , private _endpoint: string
            , private mockData: TDataType
            , private transform: ITransformFunction<TDataType>
            , public useMock: boolean
            , public logRequests: boolean) { }

    get endpoint(): string {
        return this._endpoint;
    }

    get(): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        if (this.useMock) {
            promise = this.$q.when(this.mockData);
        } else {
            promise = this.$http.get(this.endpoint)
                .then((response: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return response.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            if (this.transform != null) {
                data = this.transform(data);
            }
            if (this.logRequests) {
                this.log('get', data);
            }
            return data;
        });
    }

    update(domainObject: TDataType): angular.IPromise<void> {
        let promise: angular.IPromise<void>;
        if (this.useMock) {
            this.mockData = <TDataType>_.assign(this.mockData, domainObject);
            promise = this.$q.when();
        } else {
            promise = this.$http.put<void>(this.endpoint, domainObject).then((): void => { return null; });
        }
        return promise.then((): void => {
            if (this.logRequests) {
                this.log('update', domainObject);
            }
        });
    }

    private log(requestName: string, data: any): void {
        let mockString = this.useMock ? 'Mocked ' : '';
        let endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        console.log(data);
    }
}

export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}

baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
export function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory {
    return {
        getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransformFunction<TDataType>, useMock?: boolean, logRequests?: boolean): IBaseSingletonDataService<TDataType> {
            return new BaseSingletonDataService<TDataType>($http, $q, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, baseSingletonDataServiceFactory);
