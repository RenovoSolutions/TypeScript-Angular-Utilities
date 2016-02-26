import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { IConverter } from '../baseDataServiceBehavior';
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
    useMock: boolean;
    logRequests: boolean;
}
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
}
export declare class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
    protected array: IArrayUtility;
    endpoint: string;
    protected mockData: TDataType[];
    useMock: boolean;
    logRequests: boolean;
    private behavior;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], transform: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    }, useMock: boolean, logRequests: boolean);
    private getItemEndpoint(id);
    getList(params: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
}
export interface IDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[], transform?: IConverter<TDataType> | {
        [index: string]: IConverter<TDataType>;
    }, useMock?: boolean): IDataService<TDataType, TSearchParams>;
}
export interface IBaseDataServiceFactory extends IDataServiceFactory {
}
export declare function dataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IDataServiceFactory;
