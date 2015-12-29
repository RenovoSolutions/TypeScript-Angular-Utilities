import { ICompositeValidator, ISimpleValidator, IErrorHandler } from './validationTypes';
export declare class CompositeValidator implements ICompositeValidator {
    private showError;
    private childValidators;
    private nextKey;
    constructor(showError: IErrorHandler);
    validate(): boolean;
    getErrorCount(): number;
    buildChildValidator(): ISimpleValidator;
    unregisterChild(validator: ISimpleValidator): void;
}
