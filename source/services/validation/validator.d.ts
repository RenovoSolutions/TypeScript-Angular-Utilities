import { ISimpleValidator, IErrorHandler, IUnregisterFunction, IValidationHandler } from './validationTypes';
export declare class Validator implements ISimpleValidator {
    private showError;
    private validationHandlers;
    private nextKey;
    constructor(showError: IErrorHandler);
    validate(): boolean;
    getErrorCount(): number;
    registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
    private unregister(key);
    private isActive(handler);
    private errorMessage(handler);
}
