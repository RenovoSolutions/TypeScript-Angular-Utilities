import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IDataService, DataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IParentResourceParams } from '../baseResourceBuilder/baseResourceBuilder.service';
export interface IParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
}
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
}
export declare class ParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends DataService<TDataType, TSearchParams> implements IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    };
    constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, options: IParentResourceParams<TDataType, TResourceDictionaryType>);
    childContracts(id?: number): TResourceDictionaryType;
}
