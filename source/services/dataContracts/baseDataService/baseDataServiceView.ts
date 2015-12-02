'use strict';

import { IBaseDataService, IBaseDomainObject } from './baseData.service';
import { IBaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IBaseDataService<TDataType, TSearchParams> {
	AsSingleton(parentId: number): IBaseSingletonDataService<TDataType>;
}

export interface IBaseParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>{
	AsSingleton(parentId: number): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
