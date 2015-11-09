'use strict';

import * as _ from 'lodash';

import { IValidationService, IValidationHandler } from './validation.service';
import { IValidator, Validator, IErrorHandler, IUnregisterFunction } from './validator';

interface IRegisteredValidator extends IValidator {
	key: number;
}

export interface IAggregateValidator {
	validate(): boolean;
	getErrorCount(): number;
	buildChildValidator(): IValidator;
	unregisterChild(validator: IValidator): void;
}

export class AggregateValidator implements IAggregateValidator {
	private childValidators: { [index: number]: IValidator } = {};
	private nextKey: number = 0;

	constructor(private showError: IErrorHandler) {}

	validate(): boolean {
		let isValid: boolean = true;

		_.each(this.childValidators, (handler: IValidator): boolean => {
			if (!handler.validate()) {
				isValid = false;
				return false;
			}
		});

		return isValid;
	}

	getErrorCount(): number {
		return _.reduce(<any>this.childValidators, (count: number, handler: IValidator): number => {
			return count += handler.getErrorCount();
		}, 0);
	}

	buildChildValidator(): IValidator {
		let validator: IValidator = new Validator((error: string): void => {
			this.showError(error);
		});

		var currentKey: number = this.nextKey;
		this.nextKey++;
		this.childValidators[currentKey] = validator;
		(<IRegisteredValidator>validator).key = currentKey;

		return validator;
	}

	unregisterChild(validator: IValidator): void {
		delete this.childValidators[(<IRegisteredValidator>validator).key];
	}
}