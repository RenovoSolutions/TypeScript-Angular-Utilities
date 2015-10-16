'use strict';

import * as angular from 'angular';

import { IBaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService } from '../baseParentDataService/baseParentData.service';

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>($http: angular.IHttpService, endpoint: string, mockData: any): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>($http: angular.IHttpService, endpoint: string, mockData: any): IBaseDataService<TDataType, void>;
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		($http: angular.IHttpService, endpoint: string, mockData: any, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		($http: angular.IHttpService, endpoint: string, mockData: any, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
}