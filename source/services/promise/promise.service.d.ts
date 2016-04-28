import { OpaqueToken, Provider } from 'angular2/core';
export interface IPromiseUtility {
    isPromise(promise: any): boolean;
    isPromise(promise: angular.IPromise<any>): boolean;
}
export declare class PromiseUtility implements IPromiseUtility {
    isPromise(promise: any): boolean;
}
export declare const promiseToken: OpaqueToken;
export declare const PROMISE_PROVIDER: Provider;
