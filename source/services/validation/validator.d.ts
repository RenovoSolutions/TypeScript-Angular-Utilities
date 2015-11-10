import { IValidationHandler } from './validation.service';
export interface IUnregisterFunction {
    (): void;
}
export interface IValidator {
    validate(): boolean;
    getErrorCount(): number;
    registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
}
export interface IErrorHandler {
    (error: string): void;
}
export declare class Validator implements IValidator {
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
