import { IArrayUtility } from '../../array/array.service';
import { ITransform } from '../baseDataServiceBehavior';
import { IBaseDataService, BaseDataService, IBaseDomainObject } from './baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';
export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IBaseDataService<TDataType, TSearchParams> {
    AsSingleton(parentId: number): IBaseSingletonDataService<TDataType>;
}
export interface IBaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    AsSingleton(parentId: number): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
export declare class BaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends BaseDataService<TDataType, TSearchParams> implements IBaseDataServiceView<TDataType, TSearchParams> {
    private $http;
    private $q;
    private transform;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, _endpoint: string, mockData: TDataType[], transform: ITransform<TDataType>, useMock: boolean, logRequests: boolean);
    AsSingleton(parentId: number): IBaseSingletonDataService<TDataType>;
}
export declare class BaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends BaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> implements IBaseParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
    private $http;
    private $q;
    private transform;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, _endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, transform: ITransform<TDataType>, useMock: boolean, logRequests: boolean);
    AsSingleton(parentId: number): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
