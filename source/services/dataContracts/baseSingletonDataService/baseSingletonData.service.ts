'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.utilities.services.baseSingletonDataService';
export var factoryName: string = 'baseSingletonDataService';

export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}

export class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , private endpoint: string
            , private mockData: TDataType
            , public useMock: boolean) { }

    get(): angular.IPromise<TDataType> {
        if (this.useMock) {
            return this.$q.when(this.mockData);
        } else {
            return this.$http.get(this.endpoint)
                .then((response: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return response.data;
            });
        }
    }

    update(domainObject: TDataType): angular.IPromise<void> {
        if (this.useMock) {
            this.mockData = <TDataType>_.assign(this.mockData, domainObject);
            return this.$q.when();
        } else {
            return this.$http.put<void>(this.endpoint, domainObject).then((): void => { return null; });
        }
    }
}

export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}

baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
export function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory {
    return {
        getInstance<TDataType>(endpoint: string, mockData?: TDataType, useMock?: boolean): IBaseSingletonDataService<TDataType> {
            return new BaseSingletonDataService<TDataType>($http, $q, endpoint, mockData, useMock);
        },
    };
}

angular.module(moduleName, [])
    .factory(factoryName, baseSingletonDataServiceFactory);
