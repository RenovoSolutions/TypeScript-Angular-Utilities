import { IDataService, IBaseDomainObject } from '../dataService/data.service';
import { IParentDataService } from '../dataService/parent/parentData.service';
import { ISingletonDataService } from '../singletonDataService/singletonData.service';
import { IMockedRequest } from '../../test/mockAsync';

export interface IDataTransform {
	(data: any): any;
}

export interface IDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
	mockGetList(data: any[]): IMockedRequest<any>;
	mockGetDetail(data: any): IMockedRequest<any>;
	mockUpdate(dataTransform?: IDataTransform): IMockedRequest<any>;
	mockCreate(dataTransform?: IDataTransform): IMockedRequest<any>;
	mockDelete(): IMockedRequest<any>;
}

export interface IParentDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
	mockGetList(data: any[]): IMockedRequest<any>;
	mockGetDetail(data: any): IMockedRequest<any>;
	mockChild(mockCallback: { (children: any): void }): void;
	mockUpdate(dataTransform?: IDataTransform): IMockedRequest<any>;
	mockCreate(dataTransform?: IDataTransform): IMockedRequest<any>;
	mockDelete(): IMockedRequest<any>;
}

export interface ISingletonDataServiceMock<TDataType> extends ISingletonDataService<TDataType> {
	mockGet(data: any): IMockedRequest<any>;
	mockUpdate(dataTransform?: IDataTransform): IMockedRequest<any>;
}
