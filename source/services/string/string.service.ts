module rl.utilities.services.string {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.string';
	export var serviceName: string = 'stringUtilityService';

	export interface IStringUtilityService {
		toNumber(string: string): number;
		contains(str: string, substring?: string): boolean;
		substitute(formatString: string, ...params: string[]): string;
		replaceAll(str: string, patternToFind: string, replacementString: string): string;
	}

	export class StringUtilityService implements IStringUtilityService {
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


	angular.module(moduleName, [])
		.service(serviceName, StringUtilityService);
}
