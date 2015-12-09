import * as angular from 'angular';
import { ITransform } from '../baseDataServiceBehavior';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IBaseSingletonDataService<TDataType> {
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
    useMock: boolean;
    logRequests: boolean;
}
export declare class BaseSingletonDataService<TDataType> implements IBaseSingletonDataService<TDataType> {
    endpoint: string;
    private mockData;
    useMock: boolean;
    logRequests: boolean;
    private behavior;
    constructor($http: angular.IHttpService, $q: angular.IQService, endpoint: string, mockData: TDataType, transform: ITransform<TDataType>, useMock: boolean, logRequests: boolean);
    get(): angular.IPromise<TDataType>;
    update(domainObject: TDataType): angular.IPromise<TDataType>;
}
export interface IBaseSingletonDataServiceFactory {
    getInstance<TDataType>(endpoint: string, mockData?: TDataType, transform?: ITransform<TDataType>, useMock?: boolean): IBaseSingletonDataService<TDataType>;
}
export declare function baseSingletonDataServiceFactory($http: angular.IHttpService, $q: angular.IQService): IBaseSingletonDataServiceFactory;
