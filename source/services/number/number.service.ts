'use strict';

import * as angular from 'angular';
import {IReturnStatus} from '../../types/returnStatus';

import {
    INotificationService,
    serviceName as notificationServiceName,
    moduleName as notificationModuleName,
} from '../notification/notification.service';

export var moduleName: string = 'rl.utilities.services.number';
export var serviceName: string = 'numberUtility';

enum Sign {
	positive = 1,
	negative = -1,
}

export var maxServerIntName: string = "maxServerInt";

export interface IErrorMessages {
	valueIsNullError: string;
	valueIsNaNError: string;
	valueIsTooBigError: string;
	valueIsAFloatError: string;
	valueIsNegativeError: string;
}

export interface INumberUtility {
	preciseRound(num: number, decimals: number): number;
	integerDivide(dividend: number, divisor: number): number;
	roundToStep(num: number, step: number): number;
	isValidServerInt(valueToCheck: any): IReturnStatus;
	errorMessages: IErrorMessages;
}

class NumberUtility implements INumberUtility {
	constructor(private maxServerInt: number
				, public errorMessages: IErrorMessages) {}
	
	preciseRound(num: number, decimals: number): number {
		var sign: Sign = num >= 0 ? Sign.positive : Sign.negative;
		return (Math.round((num * Math.pow(10, decimals)) + (<number>sign * 0.001)) / Math.pow(10, decimals));
	}

	integerDivide(dividend: number, divisor: number): number {
		return Math.floor(dividend / divisor);
	}

	roundToStep(num: number, step: number): number {
		if (!step) {
			return num;
		}

		var remainder: number = num % step;

		if (remainder >= step / 2) {
			return num + (step - remainder);
		} else {
			return num - remainder;
		}
	}
	
	isValidServerInt(valueToCheck: any) : IReturnStatus {
		if (valueToCheck === null) {
			return {
				wasSuccessful: false,
				error: this.errorMessages.valueIsNullError,
			}
		}
		valueToCheck = Number(valueToCheck);
		if (isNaN(valueToCheck)) {
			return {
				wasSuccessful: false,
				error: this.errorMessages.valueIsNaNError,
			}
		}
		if (valueToCheck > this.maxServerInt) {
			return {
				wasSuccessful: false,
				error: this.errorMessages.valueIsTooBigError,
			}
		}
		if (valueToCheck % 1 !== 0) {
			return {
				wasSuccessful: false,
				error: this.errorMessages.valueIsAFloatError,
			}
		}
		if (valueToCheck <= 0) {
			return {
				wasSuccessful: false,
				error: this.errorMessages.valueIsNegativeError,
			}
		}
		return {
			wasSuccessful: true
		}
	}
}
	
export interface INumberUtilityProvider extends angular.IServiceProvider {
	errorMessages: IErrorMessages;
	$get(maxServerInt: number): INumberUtility;
}

class NumberUtilityProvider implements INumberUtilityProvider {
	errorMessages: IErrorMessages;
	
	constructor() {
		this.errorMessages = {
			valueIsNullError: "Please enter a value.",
			valueIsNaNError: "The value you entered not a number. Please enter a number.",
			valueIsTooBigError: "The number you entered was too big. Please enter a smaller number.",
			valueIsAFloatError: "The number you entered was a decimal. The number cannot be a decimal. Please use only whole numbers.",
			valueIsNegativeError: "The number you entered was less than or equal to 0. Please only use numbers greater than 0."
		};
		this.$get.$inject = [maxServerIntName];
	}
	
	$get: any = (maxServerInt: number): INumberUtility => {
			return new NumberUtility(maxServerInt, this.errorMessages);
		}
}

angular.module(moduleName, [])
	.provider(serviceName, new NumberUtilityProvider())
	.value(maxServerIntName, 2147483647 /*The largest integer value in C#*/);
