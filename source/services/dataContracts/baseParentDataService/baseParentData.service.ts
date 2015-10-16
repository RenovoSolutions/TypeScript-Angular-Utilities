import * as ng from 'angular';

import { IBaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';

export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IBaseDataService<TDataType, TSearchParams>{
	childContracts(id: number): TResourceDictionaryType;
}