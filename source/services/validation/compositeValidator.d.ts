import { IValidator, IErrorHandler } from './validator';
export interface ICompositeValidator {
    validate(): boolean;
    getErrorCount(): number;
    buildChildValidator(): IValidator;
    unregisterChild(validator: IValidator): void;
}
export declare class CompositeValidator implements ICompositeValidator {
    private showError;
    private childValidators;
    private nextKey;
    constructor(showError: IErrorHandler);
    validate(): boolean;
    getErrorCount(): number;
    buildChildValidator(): IValidator;
    unregisterChild(validator: IValidator): void;
}
