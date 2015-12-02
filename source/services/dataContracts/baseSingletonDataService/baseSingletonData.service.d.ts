import * as angular from 'angular';
import { ITransformFunction } from '../baseDataService/baseData.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
    useMock: boolean;
    logRequests: boolean;
}
export declare class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    private $http;
    private $q;
    private _endpoint;
    private mockData;
    private transform;
    useMock: boolean;
    logRequests: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, _endpoint: string, mockData: TDataType, transform: ITransformFunction<TDataType>, useMock: boolean, logRequests: boolean);
    endpoint: string;
    get(endpoint?: string): angular.IPromise<TDataType>;
    update(domainObject: TDataType, endpoint?: string): angular.IPromise<void>;
    private log(requestName, data);
    private getEndpointOrDefault(endpoint?);
}
export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
export declare function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory;
