import * as ng from 'angular';
import { ITransform } from '../baseDataServiceBehavior';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IBaseSingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export declare class BaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends BaseSingletonDataService<TDataType> implements IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType, resourceDictionaryBuilder: {
        (baseEndpoint: string): TResourceDictionaryType;
    }, transform?: ITransform<TDataType>, useMock?: boolean, logRequests?: boolean);
    childContracts(): TResourceDictionaryType;
}
