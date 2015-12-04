// /// <reference path='../../../../typings/sinon/sinon.d.ts' />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { IBaseResourceBuilder, BaseResourceBuilder } from './baseResourceBuilder.service';
import { IBaseDataServiceMock, IBaseParentDataServiceMock, IBaseSingletonDataServiceMock } from './dataServiceMocks';

export interface IContractLibrary {
	// extend with custom interface specifying child resources

	flush(): void;

	mockChild(parent: any, mockCallback: { (children: any): void }): void;
	createMock(resource?: any): IBaseDataServiceMock<any, any>;
	createMockParent(resource?: any): IBaseParentDataServiceMock<any, any, any>;
	createMockSingleton(resource?: any): IBaseSingletonDataServiceMock<any>;
}

export interface ILibraryServices {
	$q: ng.IQService;
	$rootScope: ng.IRootScopeService;
}

export class ContractLibrary implements IContractLibrary {
	private $q: ng.IQService;
	private $rootScope: ng.IRootScopeService;

	constructor(private builder: IBaseResourceBuilder) {
		let services: ILibraryServices = (<BaseResourceBuilder>builder).getLibraryServices();
		this.$q = services.$q;
		this.$rootScope = services.$rootScope;
	}

	flush(): void {
		this.$rootScope.$digest();
	}

	mockChild(parent: any, mockCallback: { (children: any): void }): void {
		let getChildren: {(id: number): any} = parent.childContracts.bind(parent);
		parent.childContracts = (id: number): any => {
			let children: any = getChildren(id);
			mockCallback(children);
			return children;
		}
	}

	createMock(resource?: any): IBaseDataServiceMock<any, any> {
		let dataService: IBaseDataServiceMock<any, any> = <any>this.builder.createResource<any, any>({});
		dataService.mockGetList = (data: any[]): Sinon.SinonSpy => { return this.baseMockGet(dataService, 'getList', data); };
		dataService.mockGetDetail = (data: any): Sinon.SinonSpy => { return this.baseMockGet(dataService, 'get', data); };
		this.updateResource(dataService, resource);
		return dataService;
	}

	createMockParent(resource?: any): IBaseParentDataServiceMock<any, any, any> {
		let getChildren: any = resource != null ? resource.resourceDictionaryBuilder : (): any => { return {}; };
		let dataService: IBaseParentDataServiceMock<any, any, any> = <any>this.builder.createParentResource<any, any, any>({
			resourceDictionaryBuilder: getChildren,
		});
		dataService.mockGetList = (data: any[]): Sinon.SinonSpy => { return this.baseMockGet(dataService, 'getList', data); };
		dataService.mockGetDetail = (data: any): Sinon.SinonSpy => { return this.baseMockGet(dataService, 'get', data); };
		dataService.mockChild = (mockCallback: { (children: any): void }): void => { return this.mockChild(dataService, mockCallback); };
		this.updateResource(dataService, resource);
		return dataService;
	}

	createMockSingleton(resource?: any): IBaseSingletonDataServiceMock<any> {
		let dataService: IBaseSingletonDataServiceMock<any> = <any>this.builder.createSingletonResource({});
		dataService.mockGet = (data: any): Sinon.SinonSpy => { return this.baseMockGet(dataService, 'get', data); };
		this.updateResource(dataService, resource);
		return dataService;
	}

	private updateResource(dataService: any, resource?: any): void {
		if (resource != null) {
			_.extend(resource, dataService);
		}
	}

	private baseMockGet(resource: any, actionName: string, data: any): Sinon.SinonSpy {
		let func: Sinon.SinonSpy = this.sinon.spy((): any => {
			return this.$q.when(data);
		});
		resource[actionName] = func;
		return func;
	}

	private get sinon(): Sinon.SinonStatic {
		return sinon || <any>{ spy: (func: any): any => { return func; } };
	}
}
