// uses typings/angularjs

module removeEventListener.utilities.services.validation {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.validation';
	export var factoryName: string = 'validationFactory';

	export interface IValidationService {

	}

	export class ValidationService implements IValidationService {

	}

	export interface IValidationServiceFactory {
		getInstance(): IValidationService;
	}

	export function validationServiceFactory(): IValidationServiceFactory {
		'use strict';

		return {
			getInstance(): IValidationService {
				return new ValidationService();
			}
		};
	}

	angular.module(moduleName, [])
		.factory(factoryName, validationServiceFactory);
}
