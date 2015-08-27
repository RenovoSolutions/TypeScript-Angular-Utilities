// uses typings/angularjs
// uses typings/lodash

/// <reference path='../notification/notification.service.ts' />

module rl.utilities.services.validation {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.validation';
	export var factoryName: string = 'validationFactory';

	export interface IValidationHandler {
		isActive?: {(): boolean} | boolean;
		validate(): boolean;
		errorMessage: string | {(): string};
	}

	export interface IUnregisterFunction {
		(): void;
	}

	export interface IValidationService {
		validate(): boolean;
		registerValidationHandler(handler: IValidationHandler): IUnregisterFunction;
		notifyAsError: boolean;
	}

	export class ValidationService implements IValidationService {
		private validationHandlers: { [index: number]: IValidationHandler } = {};
		private nextKey: number = 0;
		notifyAsError: boolean = false;

		constructor(private notification: services.notification.INotificationService) {}

		validate(): boolean {
			var isValid: boolean = true;

			_.each(this.validationHandlers, (handler: IValidationHandler): boolean => {
				var isActive: boolean = (_.isFunction(handler.isActive) && (<{(): boolean}>handler.isActive)())
										|| handler.isActive == null
										|| handler.isActive === true;

				if (isActive && !handler.validate()) {
					isValid = false;

					var error: string = _.isFunction(handler.errorMessage)
										? (<{(): string}>handler.errorMessage)()
										: <string>handler.errorMessage;

					if (this.notifyAsError) {
						this.notification.error(error);
					} else {
						this.notification.warning(error);
					}

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

	validationServiceFactory.$inject = [services.notification.serviceName];
	export function validationServiceFactory(notification: services.notification.INotificationService): IValidationServiceFactory {
		'use strict';

		return {
			getInstance(): IValidationService {
				return new ValidationService(notification);
			}
		};
	}

	angular.module(moduleName, [services.notification.moduleName])
		.factory(factoryName, validationServiceFactory);
}
