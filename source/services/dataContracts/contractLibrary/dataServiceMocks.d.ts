import { IDataService, IBaseDomainObject } from '../dataService/data.service';
import { IParentDataService } from '../dataService/parent/parentData.service';
import { ISingletonDataService } from '../singletonDataService/singletonData.service';
export interface IDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
    mockGetList(data: any[]): Sinon.SinonSpy;
    mockGetDetail(data: any): Sinon.SinonSpy;
    mockUpdate(): Sinon.SinonSpy;
    mockCreate(): Sinon.SinonSpy;
}
export interface IBaseDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams> extends IDataServiceMock<TDataType, TSearchParams> {
}
export interface IParentDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
    mockGetList(data: any[]): Sinon.SinonSpy;
    mockGetDetail(data: any): Sinon.SinonSpy;
    mockChild(mockCallback: {
        (children: any): void;
    }): void;
    mockUpdate(): Sinon.SinonSpy;
    mockCreate(): Sinon.SinonSpy;
}
export interface IBaseParentDataServiceMock<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataServiceMock<TDataType, TSearchParams, TResourceDictionaryType> {
}
export interface ISingletonDataServiceMock<TDataType> extends ISingletonDataService<TDataType> {
    mockGet(data: any): Sinon.SinonSpy;
    mockUpdate(): Sinon.SinonSpy;
}
export interface IBaseSingletonDataServiceMock<TDataType> extends ISingletonDataServiceMock<TDataType> {
}
