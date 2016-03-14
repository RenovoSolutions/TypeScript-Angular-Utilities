export interface IValidator {
    validate(): boolean;
    getErrorCount(): number;
}
export interface ISimpleValidator extends IValidator {
    registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
}
export interface ICompositeValidator extends IValidator {
    buildChildValidator(): ISimpleValidator;
    unregisterChild(validator: ISimpleValidator): void;
}
export interface IValidationHandler {
    isActive?: {
        (): boolean;
    } | boolean;
    validate(): boolean;
    errorMessage: string | {
        (): string;
    };
}
export interface IErrorHandler {
    (error: string): void;
}
export interface IUnregisterFunction {
    (): void;
}
