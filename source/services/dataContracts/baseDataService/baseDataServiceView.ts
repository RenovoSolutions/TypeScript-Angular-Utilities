'use strict';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IConverter } from '../baseDataServiceBehavior';
import { IDataService, DataService, IBaseDomainObject } from './baseData.service';
import { IParentDataService, ParentDataService } from '../baseParentDataService/baseParentData.service';
import { ISingletonDataService, SingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IParentSingletonDataService, ParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export interface IDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
	AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}

// deprecated - use IDataServiceView
export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataServiceView<TDataType, TSearchParams> { }

export interface IParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>{
	AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}

// deprecated - use IParentDataServiceView
export interface IBaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> { }

export class DataServiceView<TDataType extends IBaseDomainObject, TSearchParams>
	extends DataService<TDataType, TSearchParams>
	implements IDataServiceView<TDataType, TSearchParams> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , array: IArrayUtility
            , _endpoint: string
            , mockData: TDataType[]
            , private transform: IConverter<TDataType> | { [index: string]: IConverter<any> }
            , useMock: boolean
            , logRequests: boolean) {
		super($http, $q, array, _endpoint, mockData, transform, useMock, logRequests);
	}

	AsSingleton(parentId: number): ISingletonDataService<TDataType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		return new SingletonDataService<TDataType>(this.$http, this.$q, this.endpoint, mockData, this.transform, this.useMock, this.logRequests);
	}
}

export class ParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends ParentDataService<TDataType, TSearchParams, TResourceDictionaryType>
	implements IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
    constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , array: IArrayUtility
            , _endpoint: string
            , mockData: TDataType[]
			, resourceDictionaryBuilder: {(): TResourceDictionaryType}
            , private transform: IConverter<TDataType> | { [index: string]: IConverter<any> }
            , useMock: boolean
            , logRequests: boolean) {
		super($http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests);
	}

	AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		return new ParentSingletonDataService<TDataType, TResourceDictionaryType>(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.useMock, this.logRequests, parentId);
	}
}
