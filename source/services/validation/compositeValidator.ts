import * as _ from 'lodash';

import { ICompositeValidator, ISimpleValidator, IErrorHandler } from './validationTypes';
import { Validator } from './validator';

interface IRegisteredValidator extends ISimpleValidator {
	key: number;
}

export class CompositeValidator implements ICompositeValidator {
	private childValidators: { [index: string]: ISimpleValidator } = {};
	private nextKey: number = 0;

	constructor(private showError: IErrorHandler) {}

	validate(): boolean {
		let isValid: boolean = true;

		_.each(this.childValidators, (handler: ISimpleValidator): boolean => {
			if (!handler.validate()) {
				isValid = false;
				return false;
			}
		});

		return isValid;
	}

	getErrorCount(): number {
		return _.reduce(<any>this.childValidators, (count: number, handler: ISimpleValidator): number => {
			return count += handler.getErrorCount();
		}, 0);
	}

	buildChildValidator(): ISimpleValidator {
		let validator: ISimpleValidator = new Validator((error: string): void => {
			this.showError(error);
		});

		var currentKey: number = this.nextKey;
		this.nextKey++;
		this.childValidators[currentKey] = validator;
		(<IRegisteredValidator>validator).key = currentKey;

		return validator;
	}

	unregisterChild(validator: ISimpleValidator): void {
		delete this.childValidators[(<IRegisteredValidator>validator).key];
	}
}