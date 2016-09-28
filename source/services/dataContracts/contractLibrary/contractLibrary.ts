import * as _ from 'lodash';
import { mock, IMockedRequest } from 'rl-async-testing';
import * as Sinon from 'sinon';

import {
	IResourceBuilder,
	ResourceBuilder,
	IBaseResourceParams,
	IParentResourceParams,
	ISingletonResourceParams,
	IParentSingletonResourceParams,
} from '../resourceBuilder/resourceBuilder.service';
import { IDataServiceMock, IParentDataServiceMock, ISingletonDataServiceMock, IDataTransform } from './dataServiceMocks';
import { IDataService, IBaseDomainObject } from '../dataService/data.service';
import { IDataServiceView, IParentDataServiceView } from '../dataService/view/dataServiceView';
import { IParentDataService, ParentDataService } from '../dataService/parent/parentData.service';
import { ISingletonDataService } from '../singletonDataService/singletonData.service';
import { IParentSingletonDataService } from '../singletonDataService/parent/parentSingletonData.service';

export interface IContractLibrary {
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
	createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, void>;

	createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams>;
	createResourceView<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, void>;

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, void, TResourceDictionaryType>;

	createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>;
	createParentResourceView<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, void, TResourceDictionaryType>;

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType>;

	// For testing

	// extend with custom interface specifying child resources

	flush(): void;

	mockGet(resource: any, data: any): Sinon.SinonSpy;
	mockGetList(resource: any, data: any): Sinon.SinonSpy;
	mockGetDetail(resource: any, data: any): Sinon.SinonSpy;

	mockChild(parent: any, mockCallback: { (children: any): void }): void;
	createMock(resource?: any): IDataServiceMock<any, any>;
	createMockParent(resource?: any): IParentDataServiceMock<any, any, any>;
	createMockSingleton(resource?: any): ISingletonDataServiceMock<any>;
}

export class ContractLibrary implements IContractLibrary {
	private builder: IResourceBuilder;
	private pendingRequests: IMockedRequest<any>[] = [];
	baseEndpoint: string;

	constructor(builder: IResourceBuilder, baseEndpoint?: string) {
		this.builder = builder;
		this.baseEndpoint = baseEndpoint;
	}

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams> {
		let resource: any = this.builder.createResource(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams> {
		let resource: any = this.builder.createResourceView(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		let resource: any = this.builder.createParentResource(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
		let resource: any = this.builder.createParentResourceView(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType> {
		let resource: any = this.builder.createSingletonResource(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let resource: any = this.builder.createParentSingletonResource(options);
		resource.url = this.baseEndpoint + resource.endpoint;
		return resource;
	}

	flush(): void {
		_.each(this.pendingRequests, request => request.flush());
		this.pendingRequests = [];
	}

	mockGet(resource: any, data: any): IMockedRequest<any> {
		return this.baseMockGet(resource, 'get', data);
	}

	mockGetList(resource: any, data: any): IMockedRequest<any> {
		return this.baseMockGet(resource, 'getList', data);
	}

	mockGetDetail(resource: any, data: any): IMockedRequest<any> {
		return this.baseMockGet(resource, 'getDetail', data);
	}

	mockChild(parent: any, mockCallback: { (children: any): void }): void {
		let getChildren: {(id: number): any} = parent.childContracts.bind(parent);
		parent.childContracts = (id: number): any => {
			let children: any = getChildren(id);
			mockCallback(children);
			return children;
		}
	}

	createMock(resource?: any): IDataServiceMock<any, any> {
		let dataService: IDataServiceMock<any, any> = <any>this.builder.createResource<any, any>({});
		dataService.mockGetList = (data: any[]): IMockedRequest<any> => { return this.baseMockGet(dataService, 'getList', data); };
		dataService.mockGetDetail = (data: any): IMockedRequest<any> => { return this.baseMockGet(dataService, 'get', data); };
		dataService.mockUpdate = (dataTransform?: IDataTransform): IMockedRequest<any> => { return this.baseMockSave(dataService, 'update', dataTransform); };
		dataService.mockCreate = (dataTransform?: IDataTransform): IMockedRequest<any> => { return this.baseMockSave(dataService, 'create', dataTransform); };
		dataService.mockDelete = (): IMockedRequest<any> => { return this.baseMockSave(dataService, 'delete', () => null); };
		dataService = this.updateResource(dataService, resource);
		return dataService;
	}

	createMockParent(resource?: any): IParentDataServiceMock<any, any, any> {
		let getChildren: any = resource != null ? resource.resourceDictionaryBuilder : (): any => { return {}; };
		let dataService: IParentDataServiceMock<any, any, any> = <any>this.builder.createParentResource<any, any, any>({
			resourceDictionaryBuilder: getChildren,
		});
		dataService.mockGetList = (data: any[]): IMockedRequest<any> => { return this.baseMockGet(dataService, 'getList', data); };
		dataService.mockGetDetail = (data: any): IMockedRequest<any> => { return this.baseMockGet(dataService, 'get', data); };
		dataService.mockChild = (mockCallback: { (children: any): void }): void => { return this.mockChild(dataService, mockCallback); };
		dataService.mockUpdate = (dataTransform?: IDataTransform): IMockedRequest<any> => { return this.baseMockSave(dataService, 'update', dataTransform); };
		dataService.mockCreate = (dataTransform?: IDataTransform): IMockedRequest<any> => { return this.baseMockSave(dataService, 'create', dataTransform); };
		dataService.mockDelete = (): IMockedRequest<any> => { return this.baseMockSave(dataService, 'delete', () => null); };
		dataService = this.updateResource(dataService, resource);
		return dataService;
	}

	createMockSingleton(resource?: any): ISingletonDataServiceMock<any> {
		let dataService: ISingletonDataServiceMock<any> = <any>this.builder.createSingletonResource({});
		dataService.mockGet = (data: any): IMockedRequest<any> => { return this.baseMockGet(dataService, 'get', data); };
		dataService.mockUpdate = (dataTransform?: IDataTransform): IMockedRequest<any> => { return this.baseMockSave(dataService, 'update', dataTransform); };
		dataService = this.updateResource(dataService, resource);
		return dataService;
	}

	private updateResource(dataService: any, resource?: any): any {
		if (resource != null) {
			dataService = _.extend(resource, dataService);
		}

		if (!dataService.url) {
			dataService.url = '/test';
		}

		return dataService;
	}

	private baseMockGet(resource: any, actionName: string, data: any): IMockedRequest<any> {
		let func: IMockedRequest<any> = mock.request(data);
		this.pendingRequests.push(func);
		resource[actionName] = func;
		return func;
	}

	private baseMockSave(resource: any, actionName: string, dataTransform: IDataTransform): IMockedRequest<any> {
		let func: IMockedRequest<any> = mock.request(data => {
			return dataTransform
				? dataTransform(data)
				: data;
		});
		this.pendingRequests.push(func);
		resource[actionName] = func;
		return func;
	}

	private get sinon(): Sinon.SinonStatic {
		return sinon || <any>{ spy: (func: any): any => { return func; } };
	}
}
