'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

export var moduleName: string = 'rl.utilities.services.baseDataService';
export var factoryName: string = 'baseDataService';

export interface IBaseDomainObject {
    id: number;
}

export interface ITransformFunction<TDataType> {
	(rawData: any): TDataType;
}

export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
    delete(domainObject: TDataType): angular.IPromise<void>;

    useMock: boolean;
    logRequests: boolean;
}

export class BaseDataService<TDataType extends IBaseDomainObject, TSearchParams> implements IBaseDataService<TDataType, TSearchParams> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , private array: IArrayUtility
            , private _endpoint: string
            , private mockData: TDataType[]
            , private transform: ITransformFunction<TDataType>
            , public useMock: boolean
            , public logRequests: boolean) { }

    get endpoint(): string {
        return this._endpoint;
    }

    private getItemEndpoint(id: number): string {
        return this.endpoint + '/' + id.toString();
    }

    getList(params: TSearchParams): angular.IPromise<TDataType[]> {
        let promise: angular.IPromise<TDataType[]>;
        if (this.useMock) {
            promise = this.$q.when(this.mockData);
        } else {
            promise = this.$http.get(this.endpoint, { params: params })
                .then((response: angular.IHttpPromiseCallbackArg<TDataType[]>): TDataType[] => {
                return response.data;
            });
        }
        return promise.then((data: TDataType[]): TDataType[] => {
            if (this.transform != null) {
                data = _.map(data, this.transform);
            }
            if (this.logRequests) {
                this.log('getList', data);
            }
            return data;
        })
    }

    getDetail(id: number): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        if (this.useMock) {
            promise = this.$q.when(_.find(this.mockData, (item: TDataType): boolean => {
                return item.id === id;
            }));
        } else {
            promise = this.$http.get(this.getItemEndpoint(id))
                .then((response: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return response.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            if (this.transform != null) {
                data = this.transform(data);
            }
            if (this.logRequests) {
                this.log('getDetail', data);
            }
            return data;
        });
    }

    create(domainObject: TDataType): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        if (this.useMock) {
            let nextId: number = _.max(this.mockData, 'id').id + 1;
            domainObject.id = nextId;
            this.mockData.push(domainObject);
            promise = this.$q.when(domainObject);
        } else {
            promise = this.$http.post(this.endpoint, JSON.stringify(domainObject))
                .then((result: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return result.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            if (this.logRequests) {
                this.log('create', data);
            }
            return data;
        });
    }

    update(domainObject: TDataType): angular.IPromise<void> {
        let promise: angular.IPromise<void>;
        if (this.useMock) {
            let oldObject: TDataType = _.find(this.mockData, _.find(this.mockData, (item: TDataType): boolean => {
                return item.id === domainObject.id;
            }));
            oldObject = <TDataType>_.assign(oldObject, domainObject);
            promise = this.$q.when();
        } else {
            promise = this.$http.put<void>(this.getItemEndpoint(domainObject.id), domainObject).then((): void => { return null; });
        }
        return promise.then((): void => {
            if (this.logRequests) {
                this.log('update', domainObject);
            }
        });
    }

    delete(domainObject: TDataType): angular.IPromise<void> {
        let promise: angular.IPromise<void>;
        if (this.useMock) {
            this.array.remove(this.mockData, domainObject);
            promise = this.$q.when();
        } else {
            promise = this.$http.delete<void>(this.getItemEndpoint(domainObject.id)).then((): void => { return null; });
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

export interface IBaseDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[]
        , transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
}

baseDataServiceFactory.$inject = ['$http', '$q', arrayServiceName];
export function baseDataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IBaseDataServiceFactory {
    return {
        getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[]
            , transform?: ITransformFunction<TDataType>, useMock?: boolean, logRequests?: boolean): IBaseDataService<TDataType, TSearchParams> {
            return new BaseDataService<TDataType, TSearchParams>($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}

angular.module(moduleName, [arrayModuleName])
    .factory(factoryName, baseDataServiceFactory);
