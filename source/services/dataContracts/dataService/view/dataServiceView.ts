'use strict';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../../array/array.service';

import { IConverter } from '../../baseDataServiceBehavior';
import { IDataService, DataService, IBaseDomainObject } from '../data.service';
import { IParentDataService, ParentDataService } from '../parent/parentData.service';
import { ISingletonDataService, SingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentSingletonDataService, ParentSingletonDataService } from '../../singletonDataService/parent/parentSingletonData.service';
import { IBaseResourceParams, IParentResourceParams } from '../../resourceBuilder/resourceBuilder.service';

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

	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , array: IArrayUtility
			, options: IBaseResourceParams<TDataType>) {
		super($http, $q, array, options);
		this.transform = options.transform;
	}

	AsSingleton(parentId: number): ISingletonDataService<TDataType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		let singleton: SingletonDataService<TDataType> = new SingletonDataService<TDataType>(this.$http, this.$q, {
			endpoint: this.endpoint,
			mockData: mockData,
			transform: this.transform,
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
		singleton.url = this.url;
		return singleton;
	}
}

export class ParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends ParentDataService<TDataType, TSearchParams, TResourceDictionaryType>
	implements IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {

	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(private $http: angular.IHttpService
            , private $q: angular.IQService
            , array: IArrayUtility
			, options: IParentResourceParams<TDataType, TResourceDictionaryType>) {
		super($http, $q, array, options);
	}

	AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		let singleton: ParentSingletonDataService<TDataType, TResourceDictionaryType> = new ParentSingletonDataService<TDataType, TResourceDictionaryType>(this.$http, this.$q, {
			endpoint: this.endpoint,
			mockData: mockData,
			resourceDictionaryBuilder: this.resourceDictionaryBuilder,
			transform: this.transform,
			useMock: this.useMock,
			logRequests: this.logRequests,
			parentId: parentId,
		});
		singleton.url = this.url;
		return singleton;
	}
}
