import * as angular from 'angular';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IPromiseUtility {
    isPromise(promise: any): boolean;
    isPromise(promise: angular.IPromise<any>): boolean;
    resolvePromises(resolves: any): angular.IPromise<any>;
}
