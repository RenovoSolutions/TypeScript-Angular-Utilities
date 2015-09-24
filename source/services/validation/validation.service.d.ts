import { INotificationService } from '../notification/notification.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IValidationHandler {
    isActive?: {
        (): boolean;
    } | boolean;
    validate(): boolean;
    errorMessage: string | {
        (): string;
    };
}
export interface IUnregisterFunction {
    (): void;
}
export interface IValidationService {
    validate(): boolean;
    registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
    notifyAsError: boolean;
}
export declare class ValidationService implements IValidationService {
    private notification;
    private validationHandlers;
    private nextKey;
    notifyAsError: boolean;
    constructor(notification: INotificationService);
    validate(): boolean;
    registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
    private unregister(key);
}
export interface IValidationServiceFactory {
    getInstance(): IValidationService;
}
export declare function validationServiceFactory(notification: INotificationService): IValidationServiceFactory;
