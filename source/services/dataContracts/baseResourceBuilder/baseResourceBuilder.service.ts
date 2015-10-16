'use strict';

import * as angular from 'angular';

import { IBaseDataService, BaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, void>;
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (id: number): TResourceDictionaryType }): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean): IBaseDataService<TDataType, TSearchParams> {
		return new BaseDataService($http, endpoint, mockData, useMock);
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		($http: angular.IHttpService, endpoint: string, mockData: TDataType[], useMock: boolean, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		return new BaseParentDataService($http, endpoint, mockData, useMock, resourceDictionaryBuilder);
	}
}

angular.module(moduleName, [])
	.service(serviceName, BaseResourceBuilder);
