import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IBaseResourceParams } from '../baseResourceBuilder/baseResourceBuilder.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseDomainObject {
    id?: number;
}
export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
    getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
    version(versionNumber: number): DataService<TDataType, TSearchParams>;
    useMock: boolean;
    logRequests: boolean;
}
export interface ISearchDataService<TDataType extends IBaseDomainObject, TSearchParams, TResultType> {
    getList(params?: TSearchParams): angular.IPromise<TResultType>;
}
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
}
export declare class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
    protected array: IArrayUtility;
    private behavior;
    private useDeepSearch;
    protected mockData: TDataType[];
    endpoint: string;
    useMock: boolean;
    logRequests: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, options: IBaseResourceParams<TDataType>);
    private getItemEndpoint(id);
    getList(params: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
    version(versionNumber: number): DataService<TDataType, TSearchParams>;
}
export interface IDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
}
export interface IBaseDataServiceFactory extends IDataServiceFactory {
}
export declare function dataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IDataServiceFactory;
