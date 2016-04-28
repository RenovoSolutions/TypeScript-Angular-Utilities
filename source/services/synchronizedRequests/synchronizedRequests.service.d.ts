import { OpaqueToken, Provider } from 'angular2/core';
export interface ISynchronizedRequestsService {
    dataProvider: IRequestGetter;
    handleRequest: IRequestCallback;
    getData(...params: any[]): void;
}
export declare class SynchronizedRequestsService {
    private requestId;
    dataProvider: IRequestGetter;
    handleRequest: IRequestCallback;
    constructor(dataProvider: IRequestGetter, handleRequest: IRequestCallback);
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
export declare class SynchronizedRequestsFactory {
    getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService;
}
export declare const synchronizedRequestsToken: OpaqueToken;
export declare function SynchronizedRequestsProvider(dataProvider: IRequestGetter, handleRequest: IRequestCallback): Provider;
export declare const SYNCHRONIZED_REQUESTS_PROVIDER: Provider;
