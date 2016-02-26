import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IConverter } from '../baseDataServiceBehavior';
import { IDataService, DataService, IBaseDomainObject } from '../baseDataService/baseData.service';
export interface IParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
}
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
}
export declare class ParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends DataService<TDataType, TSearchParams> implements IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    };
    constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, transform?: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    }, useMock?: boolean, logRequests?: boolean);
    childContracts(id?: number): TResourceDictionaryType;
}
