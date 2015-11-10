import { INotificationService } from '../notification/notification.service';
import { IValidator, IErrorHandler } from './validator';
import { ICompositeValidator } from './compositeValidator';
export { IUnregisterFunction, IValidator, IErrorHandler } from './validator';
export { ICompositeValidator } from './compositeValidator';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IValidationHandler {
    isActive?: {
        (): boolean;
    } | boolean;
    validate(): boolean;
    errorMessage: string | {
        (): string;
    };
}
export interface IValidationService {
    /**
    * Build a validator that uses warning notifications to show errors
    */
    buildNotificationWarningValidator(): IValidator;
    /**
    * Build a validator that uses error notifications to show errors
    */
    buildNotificationErrorValidator(): IValidator;
    /**
    * Build a validator that uses a custom handler to show errors
    *
    * @param showError A custom handler for validation errors
    */
    buildCustomValidator(showError: IErrorHandler): IValidator;
    /**
    * Build a validator that groups child validators
    * and uses warning notifications to show errors
    */
    buildCompositeNotificationWarningValidator(): ICompositeValidator;
    /**
    * Build a validator that groups child validators
    * and uses error notifications to show errors
    */
    buildCompositeNotificationErrorValidator(): ICompositeValidator;
    /**
    * Build a validator that groups child validators
    * and uses a custom handler to show errors
    *
    * @param showError A custom handler for validation errors
    */
    buildCompositeCustomValidator(showError: IErrorHandler): ICompositeValidator;
}
export declare class ValidationService implements IValidationService {
    private notification;
    static $inject: string[];
    constructor(notification: INotificationService);
    buildNotificationWarningValidator(): IValidator;
    buildNotificationErrorValidator(): IValidator;
    buildCustomValidator(showError: IErrorHandler): IValidator;
    buildCompositeNotificationWarningValidator(): ICompositeValidator;
    buildCompositeNotificationErrorValidator(): ICompositeValidator;
    buildCompositeCustomValidator(showError: IErrorHandler): ICompositeValidator;
}
