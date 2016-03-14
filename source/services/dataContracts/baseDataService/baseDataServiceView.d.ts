import { IArrayUtility } from '../../array/array.service';
import { IDataService, DataService, IBaseDomainObject } from './baseData.service';
import { IParentDataService, ParentDataService } from '../baseParentDataService/baseParentData.service';
import { ISingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';
import { IBaseResourceParams, IParentResourceParams } from '../baseResourceBuilder/baseResourceBuilder.service';
export interface IDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
    AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}
export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataServiceView<TDataType, TSearchParams> {
}
export interface IParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
export interface IBaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
}
export declare class DataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends DataService<TDataType, TSearchParams> implements IDataServiceView<TDataType, TSearchParams> {
    private $http;
    private $q;
    private transform;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, options: IBaseResourceParams<TDataType>);
    AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}
export declare class ParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends ParentDataService<TDataType, TSearchParams, TResourceDictionaryType> implements IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
    private $http;
    private $q;
    private transform;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, options: IParentResourceParams<TDataType, TResourceDictionaryType>);
    AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
