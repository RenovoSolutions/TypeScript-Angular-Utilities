import { Provider, OpaqueToken } from '@angular/core';

enum Sign {
	positive = 1,
	negative = -1,
}

export interface INumberUtility {
	preciseRound(num: number, decimals: number): number;
	integerDivide(dividend: number, divisor: number): number;
	roundToStep(num: number, step: number): number;
}

export class NumberUtility implements INumberUtility {
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
}

export const numberUtility: INumberUtility = new NumberUtility();

export const numberUtilityToken: OpaqueToken = new OpaqueToken('number utility service');

export const NUMBER_PROVIDER: Provider = new Provider(numberUtilityToken, {
	useClass: NumberUtility
});
