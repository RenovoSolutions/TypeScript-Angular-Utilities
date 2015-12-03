'use strict';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from './baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService, BaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IBaseDataService<TDataType, TSearchParams> {
	AsSingleton(parentId: number): IBaseSingletonDataService<TDataType>;
}

}

export class BaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams>
	extends BaseDataService<TDataType, TSearchParams>
	implements IBaseDataServiceView<TDataType, TSearchParams> {
    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , array: IArrayUtility
            , _endpoint: string
            , mockData: TDataType[]
            , transform: ITransformFunction<TDataType>
            , useMock: boolean
            , logRequests: boolean) {
		super($http, $q, array, _endpoint, mockData, transform, useMock, logRequests);
	}

	AsSingleton(parentId: number): IBaseSingletonDataService<TDataType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		return new BaseSingletonDataService<TDataType>(this.$http, this.$q, this.endpoint, mockData, this.transform, this.useMock, this.logRequests);
	}
}

export class BaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends BaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>
	implements IBaseParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
    constructor($http: angular.IHttpService
            , $q: angular.IQService
            , array: IArrayUtility
            , _endpoint: string
            , mockData: TDataType[]
			, resourceDictionaryBuilder: {(): TResourceDictionaryType}
            , transform: ITransformFunction<TDataType>
            , useMock: boolean
            , logRequests: boolean) {
		super($http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests);
	}

	AsSingleton(parentId: number): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		return new BaseParentSingletonDataService<TDataType, TResourceDictionaryType>(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.useMock, this.logRequests);
	}