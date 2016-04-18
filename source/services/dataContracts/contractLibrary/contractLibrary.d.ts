import * as ng from 'angular';
import { IBaseResourceBuilder, IBaseResourceParams, IParentResourceParams, ISingletonResourceParams, IParentSingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { IDataServiceMock, IParentDataServiceMock, ISingletonDataServiceMock } from './dataServiceMocks';
import { IDataService, IBaseDomainObject } from '../dataService/data.service';
import { IDataServiceView, IParentDataServiceView } from '../dataService/view/dataServiceView';
import { IParentDataService } from '../dataService/parent/parentData.service';
import { ISingletonDataService } from '../singletonDataService/singletonData.service';
import { IParentSingletonDataService } from '../singletonDataService/parent/parentSingletonData.service';
export interface IContractLibrary {
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
    createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, void>;
    createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams>;
    createResourceView<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, void>;
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, void, TResourceDictionaryType>;
    createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>;
    createParentResourceView<TDataType extends IBaseDomainObject, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, void, TResourceDictionaryType>;
    createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
    createParentSingletonResource<TDataType, TResourceDictionaryType>(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
    flush(): void;
    mockGet(resource: any, data: any): Sinon.SinonSpy;
    mockGetList(resource: any, data: any): Sinon.SinonSpy;
    mockGetDetail(resource: any, data: any): Sinon.SinonSpy;
    mockChild(parent: any, mockCallback: {
        (children: any): void;
    }): void;
    createMock(resource?: any): IDataServiceMock<any, any>;
    createMockParent(resource?: any): IParentDataServiceMock<any, any, any>;
    createMockSingleton(resource?: any): ISingletonDataServiceMock<any>;
}
export interface ILibraryServices {
    $q: ng.IQService;
    $rootScope: ng.IRootScopeService;
}
export declare class ContractLibrary implements IContractLibrary {
    private builder;
    baseEndpoint: string;
    private $q;
    private $rootScope;
    constructor(builder: IBaseResourceBuilder, baseEndpoint?: string);
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
    createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams>;
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>;
    createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
    createParentSingletonResource<TDataType, TResourceDictionaryType>(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
    flush(): void;
    mockGet(resource: any, data: any): Sinon.SinonSpy;
    mockGetList(resource: any, data: any): Sinon.SinonSpy;
    mockGetDetail(resource: any, data: any): Sinon.SinonSpy;
    mockChild(parent: any, mockCallback: {
        (children: any): void;
    }): void;
    createMock(resource?: any): IDataServiceMock<any, any>;
    createMockParent(resource?: any): IParentDataServiceMock<any, any, any>;
    createMockSingleton(resource?: any): ISingletonDataServiceMock<any>;
    private updateResource(dataService, resource?);
    private baseMockGet(resource, actionName, data);
    private baseMockSave(resource, actionName, dataTransform);
    private sinon;
}
