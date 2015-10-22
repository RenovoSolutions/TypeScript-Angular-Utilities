import * as ng from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseDataService<TDataType, TSearchParams> {
    childContracts(id: number): TResourceDictionaryType;
}
export declare class BaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends BaseDataService<TDataType, TSearchParams> implements IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], resourceDictionaryBuilder: {
        (baseEndpoint: string): TResourceDictionaryType;
    }, transform?: ITransformFunction<TDataType>, useMock?: boolean);
    childContracts(id: number): TResourceDictionaryType;
}
