import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
    baseChildContracts: TResourceDictionaryType;
}
export declare class BaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends BaseDataService<TDataType, TSearchParams> implements IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    private _childContracts;
    constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, transform?: ITransformFunction<TDataType>, useMock?: boolean, logRequests?: boolean);
    childContracts(id?: number): TResourceDictionaryType;
    baseChildContracts: TResourceDictionaryType;
}
