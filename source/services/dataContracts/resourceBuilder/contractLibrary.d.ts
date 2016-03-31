import * as ng from 'angular';
import { IBaseResourceBuilder } from './resourceBuilder.service';
import { IDataServiceMock, IParentDataServiceMock, ISingletonDataServiceMock } from './dataServiceMocks';
export interface IContractLibrary {
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
    private $q;
    private $rootScope;
    constructor(builder: IBaseResourceBuilder);
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
    private baseMockSave(resource, actionName);
    private sinon;
}
