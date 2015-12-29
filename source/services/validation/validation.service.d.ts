import { INotificationService } from '../notification/notification.service';
import { ISimpleValidator, IErrorHandler, ICompositeValidator } from './validationTypes';
export * from './validationTypes';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IValidationService {
    /**
    * Build a validator that uses warning notifications to show errors
    */
    buildNotificationWarningValidator(): ISimpleValidator;
    /**
    * Build a validator that uses error notifications to show errors
    */
    buildNotificationErrorValidator(): ISimpleValidator;
    /**
    * Build a validator that uses a custom handler to show errors
    *
    * @param showError A custom handler for validation errors
    */
    buildCustomValidator(showError: IErrorHandler): ISimpleValidator;
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
    buildNotificationWarningValidator(): ISimpleValidator;
    buildNotificationErrorValidator(): ISimpleValidator;
    buildCustomValidator(showError: IErrorHandler): ISimpleValidator;
    buildCompositeNotificationWarningValidator(): ICompositeValidator;
    buildCompositeNotificationErrorValidator(): ICompositeValidator;
    buildCompositeCustomValidator(showError: IErrorHandler): ICompositeValidator;
}
