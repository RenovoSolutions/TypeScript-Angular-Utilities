import { IHttpUtility } from '../../../http/http.service';
import { ISingletonDataService, SingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentSingletonResourceParams } from '../../resourceBuilder/resourceBuilder.service';
export interface IParentSingletonDataService<TDataType, TResourceDictionaryType> extends ISingletonDataService<TDataType> {
    childContracts(): TResourceDictionaryType;
}
export interface IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType> extends IParentSingletonResourceParams<TDataType, TResourceDictionaryType> {
    parentId?: number;
}
export declare class ParentSingletonDataService<TDataType, TResourceDictionaryType> extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {
    private resourceDictionaryBuilder;
    private parentId;
    constructor(http: IHttpUtility, options: IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType>);
    childContracts(): TResourceDictionaryType;
}
