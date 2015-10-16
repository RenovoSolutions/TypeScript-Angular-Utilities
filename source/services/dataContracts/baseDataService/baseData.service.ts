'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.baseDataService';
export var factoryName: string = 'baseDataService';

export interface IBaseDomainObject {
    id: number;
}

export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    post(domainObject: TDataType): angular.IPromise<TDataType>;
    put(domainObject: TDataType): angular.IPromise<void>;
    delete(id: number): angular.IPromise<void>;
}

export class BaseDataService<TDataType extends IBaseDomainObject, TSearchParams> implements IBaseDataService<TDataType, TSearchParams> {
    constructor(private $http: angular.IHttpService, private endpoint: string) { }

    // Build request URL
    private getEndpoint(): string {
        return this.endpoint;
    }

    // All
    getList(params: TSearchParams): angular.IPromise<TDataType[]> {
        return this.$http.get(this.getEndpoint(), { params: params })
            .then((response: angular.IHttpPromiseCallbackArg<TDataType[]>): TDataType[] => {
                return response.data;
            });
    }

    // Single
    getDetail(id: Number): angular.IPromise<TDataType> {
        return this.$http.get(this.getEndpoint() + '/' + id.toString())
            .then((response: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return response.data;
            });
    }

    // Update
    post(domainObject: TDataType): angular.IPromise<TDataType> {
        return this.$http.post(this.getEndpoint(), JSON.stringify(domainObject))
            .then((result: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return result.data;
            });
    }

    // Create
    put(domainObject: TDataType): angular.IPromise<void> {
        return this.$http.put<void>(this.getEndpoint(), domainObject).then((): void => { return null; });
    }

    // Delete
    delete(id: number): angular.IPromise<void> {
        return this.$http.delete<void>(this.getEndpoint() + '/' + id.toString()).then((): void => { return null; });
    }
}

export interface IBaseDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string): IBaseDataService<TDataType, TSearchParams>;
}

baseDataServiceFactory.$inject = ['$http'];
export function baseDataServiceFactory($http: angular.IHttpService): IBaseDataServiceFactory {
    return {
        getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string): IBaseDataService<TDataType, TSearchParams> {
            return new BaseDataService<TDataType, TSearchParams>($http, endpoint);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, baseDataServiceFactory);
