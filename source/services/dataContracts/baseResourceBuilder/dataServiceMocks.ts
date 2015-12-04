/// <reference path='../../../../typings/sinon/sinon.d.ts' />

'use strict';

import { IBaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export interface IBaseDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams> extends IBaseDataService<TDataType, TSearchParams> {
	mockGetList(data: any[]): Sinon.SinonSpy;
	mockGetDetail(data: any): Sinon.SinonSpy;
}

export interface IBaseParentDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
	mockGetList(data: any[]): Sinon.SinonSpy;
	mockGetDetail(data: any): Sinon.SinonSpy;
	mockChild(mockCallback: { (children: any): void }): void;
}

export interface IBaseSingletonDataServiceMock<TDataType> extends IBaseSingletonDataService<TDataType> {
	mockGet(data: any): Sinon.SinonSpy;
}
