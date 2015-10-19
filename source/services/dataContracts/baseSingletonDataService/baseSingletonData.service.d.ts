import * as angular from 'angular';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}
export declare class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    private $http;
    private $q;
    private endpoint;
    private mockData;
    useMock: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, endpoint: string, mockData: TDataType, useMock: boolean);
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<void>;
}
export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
export declare function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory;
