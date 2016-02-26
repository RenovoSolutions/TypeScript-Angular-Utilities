'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IConverter } from '../baseDataServiceBehavior';

export var moduleName: string = 'rl.utilities.services.baseDataService';
export var factoryName: string = 'baseDataService';

export interface IBaseDomainObject {
    id?: number;
}

export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;

    useMock: boolean;
    logRequests: boolean;
}

// deprecated - use IDataService
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {}

export class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
    private behavior: IBaseDataServiceBehavior<TDataType>;

    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , protected array: IArrayUtility
            , public endpoint: string
            , protected mockData: TDataType[]
            , transform: IConverter<TDataType> | { [index: string]: IConverter<any> }
            , public useMock: boolean
            , public logRequests: boolean) {
		this.behavior = new BaseDataServiceBehavior($http, $q, transform);
    }

    private getItemEndpoint(id: number): string {
        return this.endpoint + '/' + id.toString();
    }

    getList(params: TSearchParams): angular.IPromise<TDataType[]> {
        return this.behavior.getList({
            params: params,
            endpoint: this.endpoint,
            getMockData: (): TDataType[] => { return this.mockData },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    getDetail(id: number): angular.IPromise<TDataType> {
        return this.behavior.getItem({
            endpoint: this.getItemEndpoint(id),
            getMockData: (): TDataType => {
                return _.find(this.mockData, (item: TDataType): boolean => {
                    return item.id === id;
                });
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    create(domainObject: TDataType): angular.IPromise<TDataType> {
        return this.behavior.create({
            domainObject: domainObject,
            endpoint: this.endpoint,
            addMockData: (data: TDataType): void => {
                let nextId: number = _.maxBy(this.mockData, 'id').id + 1;
                domainObject.id = nextId;
                this.mockData.push(domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    update(domainObject: TDataType): angular.IPromise<TDataType> {
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            updateMockData: (data: TDataType): void => {
                let oldObject: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
                    return item.id === data.id;
                });
                oldObject = <TDataType>_.assign(oldObject, data);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }

    delete(domainObject: TDataType): angular.IPromise<void> {
        return this.behavior.delete({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            removeMockData: (data: TDataType): void => {
                this.array.remove(this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    }
}

export interface IDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[]
        , transform?: IConverter<TDataType> | { [index: string]: IConverter<TDataType> }, useMock?: boolean): IDataService<TDataType, TSearchParams>;
}

// deprecated - use IDataServiceFactory
export interface IBaseDataServiceFactory extends IDataServiceFactory { }

dataServiceFactory.$inject = ['$http', '$q', arrayServiceName];
export function dataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IDataServiceFactory {
    return {
        getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[]
            , transform?: IConverter<TDataType> | { [index: string]: IConverter<TDataType> }, useMock?: boolean, logRequests?: boolean): IDataService<TDataType, TSearchParams> {
            return new DataService<TDataType, TSearchParams>($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}

angular.module(moduleName, [arrayModuleName])
    .factory(factoryName, dataServiceFactory);
