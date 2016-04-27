import { IArrayUtility } from '../../../array/array.service';
import { IHttpUtility } from '../../../http/http.service';
import { IDataService, DataService, IBaseDomainObject } from '../data.service';
import { IParentDataService, ParentDataService } from '../parent/parentData.service';
import { ISingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentSingletonDataService } from '../../singletonDataService/parent/parentSingletonData.service';
import { IBaseResourceParams, IParentResourceParams } from '../../resourceBuilder/resourceBuilder.service';
export interface IDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
    AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}
export interface IParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
export declare class DataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends DataService<TDataType, TSearchParams> implements IDataServiceView<TDataType, TSearchParams> {
    private http;
    private transform;
    constructor(http: IHttpUtility, array: IArrayUtility, options: IBaseResourceParams<TDataType>);
    AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}
export declare class ParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends ParentDataService<TDataType, TSearchParams, TResourceDictionaryType> implements IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
    private http;
    private transform;
    constructor(http: IHttpUtility, array: IArrayUtility, options: IParentResourceParams<TDataType, TResourceDictionaryType>);
    AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
