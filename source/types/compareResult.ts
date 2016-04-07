'use strict';

export enum CompareResult {
	greater = 1,
	equal = 0,
	less = -1,
	invalid = null,
}

export function getCompareResult(num: number): CompareResult {
	'use strict';
	if (num == null) {
		return CompareResult.invalid;
	}

	if (num === 0) {
		return CompareResult.equal;
	} else if (num > 0) {
		return CompareResult.greater;
	} else {
		return CompareResult.less;
	}
}
