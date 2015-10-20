'use strict';

import * as angular from 'angular';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[]
					, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>(endpoint: string, mockData: TDataType[]
					, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseDataService<TDataType, void>;
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }
			, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }
			, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
	createSingletonResource<TDataType>(endpoint: string, mockData: TDataType
		, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	static $inject: string[] = ['$http', '$q', arrayServiceName];
	constructor(private $http: angular.IHttpService
			, private $q: angular.IQService
			, private array: IArrayUtility) { }

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[]
		, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseDataService<TDataType, TSearchParams> {
		return new BaseDataService(this.$http, this.$q, this.array, endpoint, mockData, transform, useMock);
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: { (): TResourceDictionaryType }
			, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		return new BaseParentDataService(this.$http, this.$q, this.array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock);
	}

	createSingletonResource<TDataType>(endpoint: string, mockData: TDataType, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType> {
		return new BaseSingletonDataService(this.$http, this.$q, endpoint, mockData, transform, useMock);
	}
}

angular.module(moduleName, [arrayModuleName])
	.service(serviceName, BaseResourceBuilder);
