'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export interface IConverter<TDataType> {
	fromServer(raw: any): TDataType;
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
            , private transform: IConverter<TDataType> | {[index: string]: IConverter<any>}) { }

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
			data = _.map(data, (item: any): TDataType => { return this.applyTransform(data, this.transform, false); });
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
            data = this.applyTransform(data, this.transform, false);
            if (options.logRequests) {
                this.log('get', data, options.endpoint, options.useMock);
            }
            return data;
        });
    }

    create(options: ICreateOptions<TDataType>): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        options.domainObject = this.applyTransform(options.domainObject, this.transform, true);
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
            data = this.applyTransform(data, this.transform, false);
            if (options.logRequests) {
                this.log('create', data, options.endpoint, options.useMock);
            }
            return data;
        });
    }

    update(options: IUpdateOptions<TDataType>): angular.IPromise<TDataType> {
        let promise: angular.IPromise<TDataType>;
        options.domainObject = this.applyTransform(options.domainObject, this.transform, true);
        if (options.useMock) {
            options.updateMockData(options.domainObject)
            promise = this.$q.when(options.domainObject);
        } else {
            promise = this.$http.put(options.endpoint, options.domainObject)
                .then((result: angular.IHttpPromiseCallbackArg<TDataType>): TDataType => {
                return result.data;
            });
        }
        return promise.then((data: TDataType): TDataType => {
            data = this.applyTransform(data, this.transform, false);
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

    private applyTransform(data: any, transform: IConverter<any> | {[index: string]: IConverter<any>}, toServer: boolean): TDataType {
		if (this.isConverter(this.transform)) {
			let transformFunc: { (data: any): any } = toServer
				? (<IConverter<any>>this.transform).toServer
				: (<IConverter<any>>this.transform).fromServer;
			return transformFunc(data);
		} else if (this.transform != null) {
			return <any>_.mapValues(data, (prop: any, key: string): any => {
				if (_.has(this.transform, key)) {
					return this.transform[key].fromServer(prop);
				}
				return prop;
			});
		}

		return data;
    }

	private isConverter(object: any): boolean {
		return _.isFunction(object.fromServer)
			&& _.isFunction(object.toServer);
	}
}
