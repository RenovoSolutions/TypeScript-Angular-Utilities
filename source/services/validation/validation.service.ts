// uses typings/angularjs
// uses typings/lodash

module rl.utilities.services.validation {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.validation';
	export var factoryName: string = 'validationFactory';

	export interface IValidationHandler {
		isActive?: {(): boolean} | boolean;
		validate(): boolean;
		showErrors(): void;
	}

	export interface IUnregisterFunction {
		(): void;
	}

	export interface IValidationService {
		validate(): boolean;
		registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
	}

	export class ValidationService implements IValidationService {
		private validationHandlers: { [index: number]: IValidationHandler } = {};
		private nextKey: number = 0;

		validate(): boolean {
			var isValid: boolean = true;

			_.each(this.validationHandlers, (handler: IValidationHandler): boolean => {
				var isActive: boolean = (_.isFunction(handler.isActive) && (<{(): boolean}>handler.isActive)())
										|| handler.isActive == null
										|| handler.isActive === true;

				if (isActive && !handler.validate()) {
					isValid = false;
					handler.showErrors();
					return false;
				}
			});

			return isValid;
		}

		registerValidationHandler(handler: IValidationHandler): IUnregisterFunction {
			var currentKey: number = this.nextKey;
			this.nextKey++;
			this.validationHandlers[currentKey] = handler;

			return (): void => {
				this.unregister(currentKey);
			};
		}

		private unregister(key: number): void {
			delete this.validationHandlers[key];
		}
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
