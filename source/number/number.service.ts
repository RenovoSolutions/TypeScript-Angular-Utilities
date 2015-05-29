'use strict';

export var name: string = 'numberUtility';

enum Sign {
	positive = 1,
	negative = -1,
}

export interface INumberUtility {
	preciseRound(num: number, decimals: number): number;
}

export class NumberUtility implements INumberUtility {
	preciseRound(num: number, decimals: number): number {
		var sign: Sign = num >= 0 ? Sign.positive : Sign.negative;
		return (Math.round((num * Math.pow(10, decimals)) + (<number>sign * 0.001)) / Math.pow(10, decimals));
	}
}
