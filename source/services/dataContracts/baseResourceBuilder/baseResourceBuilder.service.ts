'use strict';

import * as angular from 'angular';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>(endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, void>;
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	static $inject: string[] = ['$http', '$q', arrayServiceName];
	constructor(private $http: angular.IHttpService
			, private $q: angular.IQService
			, private array: IArrayUtility) { }

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, TSearchParams> {
		return new BaseDataService(this.$http, this.$q, this.array, endpoint, mockData, useMock);
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		return new BaseParentDataService(this.$http, this.$q, this.array, endpoint, mockData, useMock, resourceDictionaryBuilder);
	}
}

angular.module(moduleName, [arrayModuleName])
	.service(serviceName, BaseResourceBuilder);
