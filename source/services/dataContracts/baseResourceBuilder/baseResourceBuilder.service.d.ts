import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { ILibraryServices } from './contractLibrary';
import { IConverter } from '../baseDataServiceBehavior';
import { IDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IDataServiceView, IParentDataServiceView } from '../baseDataService/baseDataServiceView';
import { IParentDataService } from '../baseParentDataService/baseParentData.service';
import { ISingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';
export declare var moduleName: string;
export declare var serviceName: string;
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
     * Mapping to specify how properties should be transformed to and from the server
     */
    transform?: IConverter<TDataType> | {
        [index: string]: IConverter<TDataType>;
    };
}
export interface IBaseResourceParams<TDataType extends IBaseDomainObject> extends IBaseOptions<TDataType> {
    /**
     * Example data set to be used for testing and prototyping instead of hitting the endpoint
     */
    mockData?: TDataType[];
    /**
     * Specifies that the data service needs to use a POST request to send search params to the server
     */
    useDeepSearch?: boolean;
}
export interface IParentResourceParams<TDataType extends IBaseDomainObject, TResourceDictionaryType> extends IBaseResourceParams<TDataType> {
    /**
     * Function that builds a dictionary of child resources available through childContracts(id)
     */
    resourceDictionaryBuilder?: {
        (): TResourceDictionaryType;
    };
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
    resourceDictionaryBuilder?: {
        (): TResourceDictionaryType;
    };
}
export interface IBaseResourceBuilder {
    /**
     * A helper to pass into the constructor when building a new contracts library
     */
    getLibraryServices(): ILibraryServices;
    /**
     * Create a standard resource with getList, getDetail, create, update, delete
     */
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
    /**
     * Create a standard resource with getList, getDetail, create, update, delete
     */
    createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, void>;
    /**
     * Create a view of a parent resource that can be used as a base resource or
     * as a singleton if a parent is selected
     */
    createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams>;
    /**
     * Create a view of a parent resource that can be used as a base resource or
     * as a singleton if a parent is selected
     */
    createResourceView<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, void>;
    /**
     * Create a parent resource that extends the standard with child resources available through childContracts(id)
     */
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    /**
     * Create a parent resource that extends the standard with child resources available through childContracts(id)
     */
    createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, void, TResourceDictionaryType>;
    /**
     * Create a view of a parent resource with sub-resources that can be used as a base resource or
     * as a singleton if a parent is selected
     */
    createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>;
    /**
     * Create a view of a parent resource with sub-resources that can be used as a base resource or
     * as a singleton if a parent is selected
     */
    createParentResourceView<TDataType extends IBaseDomainObject, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, void, TResourceDictionaryType>;
    /**
     * Deprecated - Create a singleton resource with get and update
     */
    createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
    /**
     * Deprecated - Create a parent singleton resource that extends the singleton with child resources available through childContracts(id)
     */
    createParentSingletonResource<TDataType, TResourceDictionaryType>(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}
export declare class BaseResourceBuilder implements IBaseResourceBuilder {
    private $http;
    private $q;
    private $rootScope;
    private array;
    static $inject: string[];
    constructor($http: angular.IHttpService, $q: angular.IQService, $rootScope: angular.IRootScopeService, array: IArrayUtility);
    getLibraryServices(): ILibraryServices;
    createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
    createResourceView<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataServiceView<TDataType, TSearchParams>;
    createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
    createParentResourceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType>;
    createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
    createParentSingletonResource<TDataType, TResourceDictionaryType>(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
    private useMockIfNoEndpoint<TDataType>(options);
}
