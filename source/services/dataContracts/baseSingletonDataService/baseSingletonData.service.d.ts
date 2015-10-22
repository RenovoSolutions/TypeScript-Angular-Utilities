import * as angular from 'angular';
import { ITransformFunction } from '../baseDataService/baseData.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}
export declare class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    private $http;
    private $q;
    private _endpoint;
    private mockData;
    private transform;
    useMock: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, _endpoint: string, mockData: TDataType, transform: ITransformFunction<TDataType>, useMock: boolean);
    endpoint: string;
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}
export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransformFunction<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
export declare function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory;
