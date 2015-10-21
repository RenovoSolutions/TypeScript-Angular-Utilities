'use strict';

import * as angular from 'angular';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService, BaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseResourceParams<TDataType extends IBaseDomainObject> {
	endpoint?: string;
	mockData?: TDataType[];
	useMock?: boolean;
	transform?: ITransformFunction<TDataType>;
}

export interface IParentResourceParams<TDataType extends IBaseDomainObject, TResourceDictionaryType> extends IBaseResourceParams<TDataType> {
	resourceDictionaryBuilder?: { (id: number): TResourceDictionaryType };
}

export interface ISingletonResourceParams<TDataType> {
	endpoint?: string;
	mockData?: TDataType;
	useMock?: boolean;
	transform?: ITransformFunction<TDataType>;
}

export interface IParentSingletonResourceParams<TDataType, TResourceDictionaryType> extends ISingletonResourceParams<TDataType> {
	resourceDictionaryBuilder?: { (id: number): TResourceDictionaryType };
}

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, void>;

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType>;

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	static $inject: string[] = ['$http', '$q', arrayServiceName];
	constructor(private $http: angular.IHttpService
			, private $q: angular.IQService
			, private array: IArrayUtility) { }

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock);
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock);
	}

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock);
	}

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock);
	}
}

angular.module(moduleName, [arrayModuleName])
	.service(serviceName, BaseResourceBuilder);
