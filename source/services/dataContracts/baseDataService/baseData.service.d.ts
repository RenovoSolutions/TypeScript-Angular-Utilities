import * as angular from 'angular';
import { IArrayUtility } from '../../array/array.service';
import { ITransform } from '../baseDataServiceBehavior';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseDomainObject {
    id?: number;
}
export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> {
    getList(params?: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
    useMock: boolean;
    logRequests: boolean;
}
export declare class BaseDataService<TDataType extends IBaseDomainObject, TSearchParams> implements IBaseDataService<TDataType, TSearchParams> {
    protected array: IArrayUtility;
    endpoint: string;
    protected mockData: TDataType[];
    useMock: boolean;
    logRequests: boolean;
    private behavior;
    constructor($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[], transform: ITransform<TDataType>, useMock: boolean, logRequests: boolean);
    private getItemEndpoint(id);
    getList(params: TSearchParams): angular.IPromise<TDataType[]>;
    getDetail(id: number): angular.IPromise<TDataType>;
    create(domainObject: TDataType): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    delete(domainObject: TDataType): angular.IPromise<void>;
}
export interface IBaseDataServiceFactory {
    getInstance<TDataType extends IBaseDomainObject, TSearchParams>(endpoint: string, mockData?: TDataType[], transform?: ITransform<TDataType>, useMock?: boolean): IBaseDataService<TDataType, TSearchParams>;
}
export declare function baseDataServiceFactory($http: angular.IHttpService, $q: angular.IQService, array: IArrayUtility): IBaseDataServiceFactory;
