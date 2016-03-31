import * as ng from 'angular';
import { ISingletonDataService, SingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentSingletonResourceParams } from '../../resourceBuilder/resourceBuilder.service';
export interface IParentSingletonDataService<TDataType, TResourceDictionaryType> extends ISingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export interface IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType> extends IParentSingletonResourceParams<TDataType, TResourceDictionaryType> {
    parentId?: number;
}
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IParentSingletonDataService<TDataType, TResourceDictionaryType> {
}
export declare class ParentSingletonDataService<TDataType, TResourceDictionaryType> extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    private parentId;
    constructor($http: ng.IHttpService, $q: ng.IQService, options: IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType>);
    childContracts(): TResourceDictionaryType;
}
