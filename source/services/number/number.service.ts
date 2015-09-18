// uses typings/angularjs

module rl.utilities.services.number {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.number';
	export var serviceName: string = 'numberUtility';

	enum Sign {
		positive = 1,
		negative = -1,
	}

	export interface INumberUtility {
		preciseRound(num: number, decimals: number): number;
		integerDivide(dividend: number, divisor: number): number;
		roundToStep(num: number, step: number): number;
	}

	class NumberUtility implements INumberUtility {
		preciseRound(num: number, decimals: number): number {
			var sign: Sign = num >= 0 ? Sign.positive : Sign.negative;
			return (Math.round((num * Math.pow(10, decimals)) + (<number>sign * 0.001)) / Math.pow(10, decimals));
		}

		integerDivide(dividend: number, divisor: number): number {
			return Math.floor(dividend / divisor);
		}

		roundToStep(num: number, step: number): number {
			return num;
		}
	}

	angular.module(moduleName, [])
		.service(serviceName, NumberUtility);
}
