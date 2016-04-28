import { OpaqueToken, Provider } from 'angular2/core';
import { IArrayUtility } from '../../array/array.service';
import { IHttpUtility } from '../../http/http.service';
import { IBaseResourceParams } from '../resourceBuilder/resourceBuilder.service';
export interface IBaseDomainObject {
    id?: number;
}
export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
    getList(params?: TSearchParams): Promise<TDataType[]>;
    getDetail(id: number): Promise<TDataType>;
    create(domainObject: TDataType): Promise<TDataType>;
    update(domainObject: TDataType): Promise<TDataType>;
    delete(domainObject: TDataType): Promise<void>;
    version(versionNumber: number): DataService<TDataType, TSearchParams>;
    useMock: boolean;
    logRequests: boolean;
}
export interface ISearchDataService<TDataType extends IBaseDomainObject, TSearchParams, TResultType> {
    getList(params?: TSearchParams): Promise<TResultType>;
}
export declare class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
    private behavior;
    private useDeepSearch;
    protected mockData: TDataType[];
    protected array: IArrayUtility;
    endpoint: string;
    url: string;
    useMock: boolean;
    logRequests: boolean;
    constructor(http: IHttpUtility, array: IArrayUtility, options: IBaseResourceParams<TDataType>);
    private getItemEndpoint(id);
    getList(params: TSearchParams): Promise<TDataType[]>;
    getDetail(id: number): Promise<TDataType>;
    create(domainObject: TDataType): Promise<TDataType>;
    update(domainObject: TDataType): Promise<TDataType>;
    delete(domainObject: TDataType): Promise<void>;
    version(versionNumber: number): DataService<TDataType, TSearchParams>;
}
export interface IDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
}
export declare class DataServiceFactory {
    private http;
    private array;
    constructor(http: IHttpUtility, array: IArrayUtility);
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
}
export declare const dataServiceToken: OpaqueToken;
export declare const DATA_SERVICE_PROVIDER: Provider;
export declare function DataServiceProvider(options: IBaseResourceParams<any>): Provider;
