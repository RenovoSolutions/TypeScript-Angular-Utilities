import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IBaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IBaseResourceBuilder {
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[], useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
    createResource<TDataType extends IBaseDomainObject>(endpoint: string, mockData: TDataType[], useMock?: boolean): IBaseDataService<TDataType, void>;
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (id: number): TResourceDictionaryType;
    }, useMock?: boolean): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (id: number): TResourceDictionaryType;
    }, useMock?: boolean): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
    createSingletonResource<TDataType>(endpoint: string, mockData: TDataType, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
export declare class BaseResourceBuilder implements IBaseResourceBuilder {
    private $http;
    private $q;
    private array;
    static $inject: string[];
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility);
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: TDataType[], useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, useMock?: boolean): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    createSingletonResource<TDataType>(endpoint: string, mockData: TDataType, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
