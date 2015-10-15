'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.baseDataService';
export var factoryName: string = 'baseDataService';

export interface IBaseDomainObject {
    id: Number;
}

export interface IBaseDataService<T extends IBaseDomainObject> {
    getList(): angular.IPromise<T[]>;
    getDetail(id: Number): angular.IPromise<T>;
    post(domainObject: T): angular.IPromise<T>;
    put(domainObject: T): angular.IPromise<void>;
    delete(id: Number): angular.IPromise<void>;
}

export class BaseDataService<T extends IBaseDomainObject> implements IBaseDataService<T> {
    constructor(private $http: angular.IHttpService, private endpoint: string) { }

    // Build request URL
    private getEndpoint(): string {
        return this.endpoint;
    }

    // All
    getList(): angular.IPromise<T[]> {
        return this.$http.get(this.getEndpoint())
            .then((response: angular.IHttpPromiseCallbackArg<T[]>): T[]=> {
                return response.data;
            });
    }

    // Single
    getDetail(id: Number): angular.IPromise<T> {
        return this.$http.get(this.getEndpoint() + '/' + id.toString())
            .then((response: angular.IHttpPromiseCallbackArg<T>): T=> {
                return response.data;
            });
    }

    // Update
    post(domainObject: T): angular.IPromise<T> {
        return this.$http.post(this.getEndpoint(), JSON.stringify(domainObject))
            .then((result: angular.IHttpPromiseCallbackArg<T>): T => {
                return result.data;
            });
    }

    // Create
    put(domainObject: T): angular.IPromise<void> {
        return this.$http.put<void>(this.getEndpoint(), domainObject).then((): void => { return null; });
    }

    // Delete
    delete(id: number): angular.IPromise<void> {
        return this.$http.delete<void>(this.getEndpoint() + '/' + id.toString()).then((): void => { return null; });
    }
}

export interface IBaseDataServiceFactory {
    getInstance<T extends IBaseDomainObject>(endpoint: string): IBaseDataService<T>;
}

baseDataServiceFactory.$inject = ['$http'];
export function baseDataServiceFactory($http: angular.IHttpService): IBaseDataServiceFactory {
    return {
        getInstance<T extends IBaseDomainObject>(endpoint: string): IBaseDataService<T> {
            return new BaseDataService<T>($http, endpoint);
        },
    };
}

angular.module(moduleName, [])
	.factory(factoryName, baseDataServiceFactory);
