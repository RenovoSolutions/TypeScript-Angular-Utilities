import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseDomainObject {
    id: number;
}
export interface ITransformFunction<TDataType> {
    (rawData: any): TDataType;
}
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> {
    getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
    delete(domainObject: TDataType): angular.IPromise<void>;
}
export declare class BaseDataService<TDataType extends IBaseDomainObject, TSearchParams> implements IBaseDataService<TDataType, TSearchParams> {
    private $http;
    private $q;
    private array;
    private endpoint;
    private mockData;
    private transform;
    useMock: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], transform: ITransformFunction<TDataType>, useMock: boolean);
    private getEndpoint();
    private getItemEndpoint(id);
    getList(params: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
    delete(domainObject: TDataType): angular.IPromise<void>;
}
export interface IBaseDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[], transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
}
export declare function baseDataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IBaseDataServiceFactory;
