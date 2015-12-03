'use strict';

import * as angular from 'angular';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IContractLibrary, ContractLibrary, ILibraryServices } from './contractLibrary';
import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseDataServiceView, IBaseParentDataServiceView, BaseDataServiceView, BaseParentDataServiceView } from '../baseDataService/baseDataServiceView';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService, BaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseOptions<TDataType> {
	/**
	* Url to hit with getList and create
	* - extended with /id for getDetail, update, and delete
	*/
	endpoint?: string;

	/**
	* Flag for specifying if the data service should use the mock data or hit the actual endpoint
	* defaults to true if endpoint is not defined
	*/
	useMock?: boolean;

	/**
	* Flag for specifying if the data service should log all requests against the contract
	*/
	logRequests?: boolean;

	/**
	* Processes data coming back from the server
	*/
	transform?: ITransformFunction<TDataType>;
}

export interface IBaseResourceParams<TDataType extends IBaseDomainObject> extends IBaseOptions<TDataType> {
	/**
	* Example data set to be used for testing and prototyping instead of hitting the endpoint
	*/
	mockData?: TDataType[];
}

export interface IParentResourceParams<TDataType extends IBaseDomainObject, TResourceDictionaryType> extends IBaseResourceParams<TDataType> {
	/**
	* Function that builds a dictionary of child resources available through childContracts(id)
	*/
	resourceDictionaryBuilder?: { (): TResourceDictionaryType };
}

export interface ISingletonResourceParams<TDataType> extends IBaseOptions<TDataType> {
	/**
	* Example object to be used for testing and prototyping instead of hitting the endpoint
	*/
	mockData?: TDataType;
}

export interface IParentSingletonResourceParams<TDataType, TResourceDictionaryType> extends ISingletonResourceParams<TDataType> {
	/**
	* Function that builds a dictionary of child resources available through childContracts(id)
	*/
	resourceDictionaryBuilder?: { (baseEndpoint: string): TResourceDictionaryType };
}

export interface IBaseResourceBuilder {
	/**
	* A helper to pass into the constructor when building a new contracts library
	*/
	getLibraryServices(): ILibraryServices;

	/**
	* Create a standard resource with getList, getDetail, create, update, delete
	*/
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams>;
	/**
	* Create a standard resource with getList, getDetail, create, update, delete
	*/
	createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, void>;

	/**
	* Create a view of a parent resource that can be used as a base resource or
	* as a singleton if a parent is selected
	*/
	createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataServiceView<TDataType, TSearchParams>;
	/**
	* Create a view of a parent resource that can be used as a base resource or
	* as a singleton if a parent is selected
	*/
	createResourceView<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IBaseDataServiceView<TDataType, void>;

	/**
	* Create a parent resource that extends the standard with child resources available through childContracts(id)
	*/
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	/**
	* Create a parent resource that extends the standard with child resources available through childContracts(id)
	*/
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;

	/**
	* Create a view of a parent resource with sub-resources that can be used as a base resource or
	* as a singleton if a parent is selected
	*/
	createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	/**
	* Create a view of a parent resource with sub-resources that can be used as a base resource or
	* as a singleton if a parent is selected
	*/
	createParentResourceView<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;

	/**
	* Deprecated - Create a singleton resource with get and update
	*/
	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType>;

	/**
	* Deprecated - Create a parent singleton resource that extends the singleton with child resources available through childContracts(id)
	*/
	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	static $inject: string[] = ['$http', '$q', '$rootScope', arrayServiceName];
	constructor(private $http: angular.IHttpService
			, private $q: angular.IQService
			, private $rootScope: angular.IRootScopeService
			, private array: IArrayUtility) { }

	getLibraryServices(): ILibraryServices {
		return {
			$q: this.$q,
			$rootScope: this.$rootScope,
		};
	}

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams> {
		options = this.useMockIfNoEndpoint(options);
		let dataService: IBaseDataService<TDataType, TSearchParams> = new BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
		(<any>dataService).clone = (endpoint: string): IBaseDataService<TDataType, TSearchParams> => { return this.cloneResource(dataService, endpoint); };
		return dataService;
	}

	createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataServiceView<TDataType, TSearchParams> {
		options = this.useMockIfNoEndpoint(options);
		let dataServiceView: IBaseDataServiceView<TDataType, TSearchParams> = new BaseDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
		(<any>dataServiceView).clone = (endpoint: string): IBaseDataServiceView<TDataType, TSearchParams> => { return <any>this.cloneResource(dataServiceView, endpoint); };
		return dataServiceView;
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		options = this.useMockIfNoEndpoint(options);
		let parentDataService: IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>
			= new BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
		(<any>parentDataService).clone = (endpoint: string): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> => { return this.cloneParentResource(parentDataService, endpoint); };
		return parentDataService;
	}

	createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {
		options = this.useMockIfNoEndpoint(options);
		let dataServiceView: IBaseParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>
			= new BaseParentDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
		(<any>dataServiceView).clone = (endpoint: string): IBaseParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> => { return <any>this.cloneParentResource(dataServiceView, endpoint); };
		return dataServiceView;
	}

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType> {
		options = this.useMockIfNoEndpoint(options);
		let dataService: IBaseSingletonDataService<TDataType> = new BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
		(<any>dataService).clone = (endpoint: string): IBaseSingletonDataService<TDataType> => { return this.cloneSingletonResource(dataService, endpoint); };
		return dataService;
	}

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
		options = this.useMockIfNoEndpoint(options);
		let parentDataService: IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>
			= new BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
		(<any>parentDataService).clone = (endpoint: string): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> => { return this.cloneParentSingletonResource(parentDataService, endpoint); };
		return parentDataService;
	}

	private cloneResource<TDataType extends IBaseDomainObject, TSearchParams>(resource: IBaseDataService<TDataType, TSearchParams>, endpoint: string): IBaseDataService<TDataType, TSearchParams> {
		let castedResource: BaseDataService<TDataType, TSearchParams> = <BaseDataService<TDataType, TSearchParams>>resource;
		return {
			getList(params?: TSearchParams): angular.IPromise<TDataType[]> { return castedResource.getList(params, endpoint); },
			getDetail(id: number): angular.IPromise<TDataType> { return castedResource.getDetail(id, endpoint); },
			create(domainObject: TDataType): angular.IPromise<TDataType> { return castedResource.create(domainObject, endpoint); },
			update(domainObject: TDataType): angular.IPromise<void> { return castedResource.update(domainObject, endpoint); },
			delete(domainObject: TDataType): angular.IPromise<void> { return castedResource.delete(domainObject, endpoint); },
			useMock: castedResource.useMock,
			logRequests: castedResource.logRequests,
		};
	}

	private cloneParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(resource: IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>, endpoint: string): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		let clone: IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> = <any>this.cloneResource(resource, endpoint);
		clone.childContracts = (id: number): TResourceDictionaryType => { return resource.childContracts(id); };
		return clone;
	}

	private cloneSingletonResource<TDataType>(resource: IBaseSingletonDataService<TDataType>, endpoint: string): IBaseSingletonDataService<TDataType> {
		let castedResource: BaseSingletonDataService<TDataType> = <BaseSingletonDataService<TDataType>>resource;
		return {
			get(): angular.IPromise<TDataType> { return castedResource.get(endpoint); },
			update(domainObject: TDataType): angular.IPromise<void> { return castedResource.update(domainObject, endpoint); },
			useMock: castedResource.useMock,
			logRequests: castedResource.logRequests,
		};
	}

	private cloneParentSingletonResource<TDataType, TResourceDictionaryType>(resource: IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>, endpoint: string): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let clone: IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> = <any>this.cloneSingletonResource(resource, endpoint);
		clone.childContracts = (): TResourceDictionaryType => { return resource.childContracts(); };
		return clone;
	}

	private useMockIfNoEndpoint<TDataType>(options: IBaseOptions<TDataType>): IBaseOptions<TDataType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return options;
	}
}

angular.module(moduleName, [arrayModuleName])
	.service(serviceName, BaseResourceBuilder);
