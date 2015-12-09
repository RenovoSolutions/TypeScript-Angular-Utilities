import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { ITransform } from '../baseDataServiceBehavior';
import { IBaseDataService, BaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
}
export declare class BaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends BaseDataService<TDataType, TSearchParams> implements IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    resourceDictionaryBuilder: {
        (baseEndpoint: string): TResourceDictionaryType;
    };
    constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (baseEndpoint: string): TResourceDictionaryType;
    }, transform?: ITransform<TDataType>, useMock?: boolean, logRequests?: boolean);
    childContracts(id?: number): TResourceDictionaryType;
}
