'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IConverter, IGetListOptions } from '../baseDataServiceBehavior';
import { IBaseResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export var moduleName: string = 'rl.utilities.services.dataContracts.dataService';
export var factoryName: string = 'dataService';

export interface IBaseDomainObject {
    id?: number;
}

export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
	version(versionNumber: number): DataService<TDataType, TSearchParams>;

    useMock: boolean;
    logRequests: boolean;
}

export interface ISearchDataService<TDataType extends IBaseDomainObject, TSearchParams, TResultType> {
	getList(params?: TSearchParams): angular.IPromise<TResultType>;
}

// deprecated - use IDataService
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {}

export class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
    private behavior: IBaseDataServiceBehavior<TDataType>;
	private useDeepSearch: boolean;
	protected mockData: TDataType[];
	endpoint: string;
	url: string;
	useMock: boolean;
	logRequests: boolean;

    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , protected array: IArrayUtility
			, options: IBaseResourceParams<TDataType>) {
		this.behavior = new BaseDataServiceBehavior($http, $q, options.transform);
		this.useDeepSearch = options.useDeepSearch;
		this.mockData = options.mockData;
		this.endpoint = options.endpoint;
		this.url = this.endpoint;
		this.useMock = options.useMock;
		this.logRequests = options.logRequests;
    }

    private getItemEndpoint(id: number): string {
        return this.url + '/' + id.toString();
    }

	getList(params: TSearchParams): angular.IPromise<TDataType[]> {
		let requestParams: IGetListOptions<TDataType> = {
			params: params,
			endpoint: this.url,
			getMockData: (): TDataType[] => { return this.mockData },
			useMock: this.useMock,
			logRequests: this.logRequests,
		};

		if (this.useDeepSearch) {
			return this.behavior.search(requestParams);
		} else {
			return this.behavior.getList(requestParams);
		}
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
            endpoint: this.url,
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

	version(versionNumber: number): DataService<TDataType, TSearchParams> {
		let dataService: DataService<TDataType, TSearchParams> = _.clone(this);
		dataService.url = helper.versionEndpoint(dataService.url, versionNumber);
		return dataService;
	}
}

export interface IDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
}

// deprecated - use IDataServiceFactory
export interface IBaseDataServiceFactory extends IDataServiceFactory { }

dataServiceFactory.$inject = ['$http', '$q', arrayServiceName];
export function dataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IDataServiceFactory {
    return {
        getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams> {
            return new DataService<TDataType, TSearchParams>($http, $q, array, options);
        },
    };
}

angular.module(moduleName, [arrayModuleName])
    .factory(factoryName, dataServiceFactory);
