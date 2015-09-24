import * as angular from 'angular';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IAutosaveService {
    autosave(...data: any[]): boolean;
    contentForm: angular.IFormController;
}
export interface IAutosaveServiceFactory {
    getInstance(save: {
        (): angular.IPromise<void>;
    }, contentForm?: angular.IFormController, validate?: {
        (): boolean;
    }): IAutosaveService;
}
