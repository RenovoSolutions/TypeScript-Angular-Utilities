import * as ng from 'angular';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IAutosaveActionService {
    trigger(promise: ng.IPromise<any>): void;
    saving: boolean;
    complete: boolean;
    successful: boolean;
}
