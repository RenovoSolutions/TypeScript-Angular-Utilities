import * as angular from 'angular';
export declare var moduleName: string;
export declare var factoryName: string;
export interface ISynchronizedRequestsService {
    dataProvider: IRequestGetter;
    handleRequest: IRequestCallback;
    getData(...params: any[]): void;
}
export declare class SynchronizedRequestsService {
    dataProvider: IRequestGetter;
    handleRequest: IRequestCallback;
    private $q;
    private requestId;
    constructor(dataProvider: IRequestGetter, handleRequest: IRequestCallback, $q: angular.IQService);
    getData(...params: any[]): void;
}
export interface IRequestGetter {
    (...params: any[]): angular.IPromise<any>;
}
export interface IRequestCallback {
    (...data: any[]): void;
}
export interface ISynchronizedRequestsFactory {
    getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService;
}
export declare function synchronizedRequestsFactory($q: angular.IQService): ISynchronizedRequestsFactory;
