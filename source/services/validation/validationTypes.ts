import { Observable } from 'rxjs';

export interface IValidator {
	validate(value?: any): boolean;
	getErrorCount(): number;
}

export interface IObservableValidator {
	validate(value$?: Observable<any>): Observable<string>;
}

export interface ISimpleValidator extends IValidator {
	registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
}

export interface ICompositeValidator extends IValidator {
	buildChildValidator(): ISimpleValidator;
	unregisterChild(validator: ISimpleValidator): void;
}

export interface IValidationHandler {
	isActive?: {(): boolean} | boolean;
	validate(value?: any): boolean;
	errorMessage: string | { (): string };
	name?: string;
}

export interface IObservableValidationHandler {
	name?: string;
	isActive?: {(): Observable<boolean>} | boolean;
	validate(value$?: Observable<any>): Observable<string>;
}

export interface IErrorHandler {
	(error: string, name?: string): void;
}

export interface IUnregisterFunction {
	(): void;
}
