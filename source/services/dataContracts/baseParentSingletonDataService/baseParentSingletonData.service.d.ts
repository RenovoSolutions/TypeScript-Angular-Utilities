import * as ng from 'angular';
import { IConverter, ITransform } from '../baseDataServiceBehavior';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IBaseSingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export declare class BaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends BaseSingletonDataService<TDataType> implements IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    private parentId;
    constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType, resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, transform?: ITransform<TDataType>, map?: {
        [index: string]: IConverter<TDataType>;
    }, useMock?: boolean, logRequests?: boolean, parentId?: number);
    childContracts(): TResourceDictionaryType;
}
