import * as ng from 'angular';
import { IBaseResourceBuilder } from './baseResourceBuilder.service';
export interface IContractLibrary {
    flush(): void;
    mockGet(resource: any, data: any): Sinon.SinonSpy;
    mockGetList(resource: any, data: any): Sinon.SinonSpy;
    mockGetDetail(resource: any, data: any): Sinon.SinonSpy;
}
export interface ILibraryServices {
    $q: ng.IQService;
    $rootScope: ng.IRootScopeService;
}
export declare class ContractLibrary implements IContractLibrary {
    private $q;
    private $rootScope;
    constructor(builder: IBaseResourceBuilder);
    flush(): void;
    mockGet(resource: any, data: any): Sinon.SinonSpy;
    mockGetList(resource: any, data: any): Sinon.SinonSpy;
    mockGetDetail(resource: any, data: any): Sinon.SinonSpy;
    private baseMockGet(resource, actionName, data);
}
