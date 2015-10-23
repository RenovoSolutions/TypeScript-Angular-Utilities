import * as angular from 'angular';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IAutosaveService {
    autosave(...data: any[]): boolean;
    contentForm: angular.IFormController;
    setChangeListener?: {
        (callback: {
            (): void;
        }): IClearChangeListener;
    };
}
export interface IAutosaveServiceOptions {
    save: {
        (...data: any[]): angular.IPromise<void>;
    };
    validate?: {
        (): boolean;
    };
    contentForm?: angular.IFormController;
    debounceDuration?: number;
    setChangeListener?: {
        (callback: IChangeListener): IClearChangeListener;
    };
}
export interface IChangeListener {
    (): void;
}
export interface IClearChangeListener {
    (): void;
}
export interface IAutosaveServiceFactory {
    getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}
