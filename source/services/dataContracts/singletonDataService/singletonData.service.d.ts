import * as angular from 'angular';
import { ISingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface ISingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    version(versionNumber: number): SingletonDataService<TDataType>;
    useMock: boolean;
    logRequests: boolean;
}
export interface IBaseSingletonDataService<TDataType> extends ISingletonDataService<TDataType> {
}
export declare class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
    private behavior;
    private mockData;
    endpoint: string;
    useMock: boolean;
    logRequests: boolean;
    constructor($http: angular.IHttpService, $q: angular.IQService, options: ISingletonResourceParams<TDataType>);
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    version(versionNumber: number): SingletonDataService<TDataType>;
}
export interface ISingletonDataServiceFactory {
    getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}
export interface IBaseSingletonDataServiceFactory extends ISingletonDataServiceFactory {
}
export declare function singletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): ISingletonDataServiceFactory;
