import { OpaqueToken, Provider } from 'angular2/core';

import * as _ from 'lodash';

export interface IStringUtility {
	toNumber(string: string): number;
	contains(str: string, substring?: string): boolean;
	substitute(formatString: string, ...params: string[]): string;
	replaceAll(str: string, patternToFind: string, replacementString: string): string;
}

export class StringUtility implements IStringUtility {
	toNumber(string: string): number {
		return +string;
	}

	contains(str: string, substring?: string): boolean {
		if (substring) {
			return str.indexOf(substring) !== -1;
		}

		return true;
	}

	substitute(formatString: string, ...params: string[]): string {
		_.each(params, (param: string, index: number): void => {
			formatString = this.replaceAll(formatString, '\\{' + index + '\\}', param);
		});
		return formatString;
	}

	replaceAll(str: string, patternToFind: string, replacementString: string): string {
		return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
	}
}

export let stringUtility: IStringUtility = new StringUtility();

export const stringToken: OpaqueToken = new OpaqueToken('A service for working with strings');

export const STRING_PROVIDER: Provider = new Provider(stringToken, {
	useClass: StringUtility,
});
