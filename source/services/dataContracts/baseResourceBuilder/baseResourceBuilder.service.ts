import { IBaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService } from '../baseParentDataService/baseParentData.service';

export interface IBaseResourceBuilder {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData: any): IBaseDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>(endpoint: string, mockData: any): IBaseDataService<TDataType, void>;
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(endpoint: string, mockData: any, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(endpoint: string, mockData: any, resourceDictionaryBuilder: { (): TResourceDictionaryType }): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;
}