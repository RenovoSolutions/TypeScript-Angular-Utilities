import * as ng from 'angular';
import { ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IBaseSingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export declare class BaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends BaseSingletonDataService<TDataType> implements IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType, resourceDictionaryBuilder: {
        (baseEndpoint: string): TResourceDictionaryType;
    }, transform?: ITransformFunction<TDataType>, useMock?: boolean, logRequests?: boolean);
    childContracts(): TResourceDictionaryType;
}
