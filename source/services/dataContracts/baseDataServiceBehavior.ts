'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export interface ITransform<TDataType> {
    fromServer(rawData: any): TDataType;
    toServer(data: TDataType): any,
}

export interface IRequestOptions {
    endpoint: string;
    useMock: boolean;
    logRequests: boolean;
}

export interface IGetListOptions<TDataType> extends IRequestOptions {
    params: any;
    getMockData(): TDataType[];
}

export interface IGetItemOptions<TDataType> extends IRequestOptions {
    getMockData(): TDataType;
}

export interface ICreateOptions<TDataType> extends IRequestOptions {
    domainObject: TDataType;
    addMockData(data: TDataType): void;
}

export interface IUpdateOptions<TDataType> extends IRequestOptions {
    domainObject: TDataType;
    updateMockData(data: TDataType): void;
}

export interface IDeleteOptions<TDataType> extends IRequestOptions {
    domainObject: TDataType;
    removeMockData(data: TDataType): void;
}

export interface IBaseDataServiceBehavior<TDataType> {
	getList(options: IGetListOptions<TDataType>): angular.IPromise<TDataType[]>;
    getItem(options: IGetItemOptions<TDataType>): angular.IPromise<TDataType>;
    create(options: ICreateOptions<TDataType>): angular.IPromise<TDataType>;
    update(options: IUpdateOptions<TDataType>): angular.IPromise<TDataType>;
    delete(options: IDeleteOptions<TDataType>): angular.IPromise<void>;
}

export class BaseDataServiceBehavior<TDataType> implements IBaseDataServiceBehavior<TDataType> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , private transform: ITransform<TDataType>) { }

    getList(options: IGetListOptions<TDataType>): angular.IPromise<TDataType[]> {
        let promise: angular.IPromise<TDataType[]>;
        if (options.useMock) {
            promise = this.$q.when(options.getMockData());
        } else {
            promise = this.$http.get(options.endpoint, { params: options.params })
                .then((response: angular.IHttpPromiseCallbackArg<TDataType[]>): TDataType[] => {
                return response.data;
            });
        }
        return promise.then((data: TDataType[]): TDataType[] => {
            if (this.transform != null) {
                data = _.map(data, this.transform.fromServer);
            }
            if (options.logRequests) {
                this.log('getList', data, options.endpoint, options.useMock);
            }
            return data;
        })
    }

    getItem(options: IGetItemOptions<TDataType>): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        if (options.useMock) {
            promise = this.$q.when(options.getMockData());
        } else {
            promise = this.$http.get(options.endpoint)
                .then((response: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return response.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            data = this.transformFromServer(data);
            if (options.logRequests) {
                this.log('get', data, options.endpoint, options.useMock);
            }
            return data;
        });
    }

    create(options: ICreateOptions<TDataType>): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        options.domainObject = this.transformToServer(options.domainObject);
        if (options.useMock) {
            options.addMockData(options.domainObject);
            promise = this.$q.when(options.domainObject);
        } else {
            promise = this.$http.post(options.endpoint, JSON.stringify(options.domainObject))
                .then((result: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return result.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            data = this.transformFromServer(data);
            if (options.logRequests) {
                this.log('create', data, options.endpoint, options.useMock);
            }
            return data;
        });
    }

    update(options: IUpdateOptions<TDataType>): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        options.domainObject = this.transformToServer(options.domainObject);
        if (options.useMock) {
            options.updateMockData(options.domainObject)
            promise = this.$q.when(options.domainObject);
        } else {
            promise = this.$http.put(options.endpoint, options.domainObject);
        }
        return promise.then((data: TDataType): TDataType => {
            data = this.transformFromServer(data);
            if (options.logRequests) {
                this.log('update', options.domainObject, options.endpoint, options.useMock);
            }
            return data;
        });
    }

    delete(options: IDeleteOptions<TDataType>): angular.IPromise<void> {
        let promise: angular.IPromise<void>;
        if (options.useMock) {
            options.removeMockData(options.domainObject);
            promise = this.$q.when();
        } else {
            promise = this.$http.delete<void>(options.endpoint).then((): void => { return null; });
        }
        return promise.then((): void => {
            if (options.logRequests) {
                this.log('delete', options.domainObject, options.endpoint, options.useMock);
            }
        });
    }

    private log(requestName: string, data: any, endpoint: string, useMock: boolean): void {
        let mockString = useMock ? 'Mocked ' : '';
        let endpointString = endpoint == null ? 'unspecified' : endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        console.log(data);
    }

    private transformFromServer(rawData: any): TDataType {
        return this.transform != null
            ? this.transform.fromServer(rawData)
            : rawData;
    }

    private transformToServer(data: TDataType): any {
        return this.transform != null
            ? this.transform.toServer(data)
            : data;
    }
}
