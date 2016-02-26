import * as angular from 'angular';
import { IConverter } from '../baseDataServiceBehavior';
export declare var moduleName: string;
export declare var factoryName: string;
export interface ISingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    useMock: boolean;
    logRequests: boolean;
}
export interface IBaseSingletonDataService<TDataType> extends ISingletonDataService<TDataType> {
}
export declare class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
    endpoint: string;
    private mockData;
    useMock: boolean;
    logRequests: boolean;
    private behavior;
    constructor($http: angular.IHttpService, $q: angular.IQService, endpoint: string, mockData: TDataType, transform: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    }, useMock: boolean, logRequests: boolean);
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
}
export interface ISingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: IConverter<TDataType> | {
        [index: string]: IConverter<TDataType>;
    }, useMock?: boolean): ISingletonDataService<TDataType>;
}
export interface IBaseSingletonDataServiceFactory extends ISingletonDataServiceFactory {
}
export declare function singletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): ISingletonDataServiceFactory;
