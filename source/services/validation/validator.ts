import * as _ from 'lodash';

import { ISimpleValidator, IErrorHandler, IUnregisterFunction, IValidationHandler } from './validationTypes';

export class Validator implements ISimpleValidator {
	private validationHandlers: { [index: string]: IValidationHandler } = {};
	private nextKey: number = 0;

	constructor(private showError: IErrorHandler) {}

	validate(): boolean {
		let isValid: boolean = true;

		_.each(this.validationHandlers, (handler: IValidationHandler): boolean => {
			var isActive: boolean = this.isActive(handler);

			if (isActive && !handler.validate()) {
				isValid = false;

				let error: string = this.errorMessage(handler);
				this.showError(error, handler.name);

				return false;
			}
		});

		return isValid;
	}

	getErrorCount(): number {
		return _.reduce(<any>this.validationHandlers, (count: number, handler: IValidationHandler): number => {
			var isActive: boolean = this.isActive(handler);

			if (isActive && !handler.validate()) {
				count++;
			}

			return count;
		}, 0);
	}

	registerValidationHandler(handler: IValidationHandler): IUnregisterFunction {
		var currentKey: number = this.nextKey;
		this.nextKey++;
		this.validationHandlers[currentKey] = handler;

		return (): void => {
			this.unregister(currentKey);
		};
	}

	private unregister(key: number): void {
		delete this.validationHandlers[key];
	}

	private isActive(handler: IValidationHandler): boolean {
		return (_.isFunction(handler.isActive) && (<{(): boolean}>handler.isActive)())
			|| handler.isActive == null
			|| handler.isActive === true;
	}

	private errorMessage(handler: IValidationHandler): string {
		return _.isFunction(handler.errorMessage)
			? (<{ (): string }>handler.errorMessage)()
			: <string>handler.errorMessage;
	}
}