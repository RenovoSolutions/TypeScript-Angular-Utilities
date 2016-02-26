import * as ng from 'angular';
import { IConverter } from '../baseDataServiceBehavior';
import { ISingletonDataService, SingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export interface IParentSingletonDataService<TDataType, TResourceDictionaryType> extends ISingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IParentSingletonDataService<TDataType, TResourceDictionaryType> {
}
export declare class ParentSingletonDataService<TDataType, TResourceDictionaryType> extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    private parentId;
    constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType, resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    }, transform?: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    }, useMock?: boolean, logRequests?: boolean, parentId?: number);
    childContracts(): TResourceDictionaryType;
}
