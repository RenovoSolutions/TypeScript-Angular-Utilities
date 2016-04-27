import { IArrayUtility } from '../../../array/array.service';
import { IHttpUtility } from '../../../http/http.service';
import { IDataService, DataService, IBaseDomainObject } from '../data.service';
import { IParentResourceParams } from '../../resourceBuilder/resourceBuilder.service';
export interface IParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IDataService<TDataType, TSearchParams> {
    childContracts(id?: number): TResourceDictionaryType;
}
export declare class ParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends DataService<TDataType, TSearchParams> implements IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    resourceDictionaryBuilder: {
        (): TResourceDictionaryType;
    };
    constructor(http: IHttpUtility, array: IArrayUtility, options: IParentResourceParams<TDataType, TResourceDictionaryType>);
    childContracts(id?: number): TResourceDictionaryType;
}
