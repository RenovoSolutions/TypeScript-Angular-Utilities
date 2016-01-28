import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IConverter } from '../baseDataServiceBehavior';
import { IBaseDataService, BaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
}
export declare class BaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends BaseDataService<TDataType, TSearchParams> implements IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
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
