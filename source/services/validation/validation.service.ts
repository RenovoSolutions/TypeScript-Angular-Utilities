'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as notificationModuleName,
	serviceName as notificationServiceName,
	INotificationService,
} from '../notification/notification.service';

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
	isActive(handler: IValidationHandler): boolean;
	errorMessage(handler: IValidationHandler): string;
	notifyAsError: boolean;
}

export class ValidationService implements IValidationService {
	private validationHandlers: { [index: number]: IValidationHandler } = {};
	private nextKey: number = 0;
	notifyAsError: boolean = false;

	constructor(private notification: INotificationService) {}

	validate(): boolean {
		var isValid: boolean = true;

		_.each(this.validationHandlers, (handler: IValidationHandler): boolean => {
			var isActive: boolean = this.isActive(handler);

			if (isActive && !handler.validate()) {
				isValid = false;

				var error: string = this.errorMessage(handler);

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

	isActive(handler: IValidationHandler): boolean {
		return (_.isFunction(handler.isActive) && (<{(): boolean}>handler.isActive)())
			|| handler.isActive == null
			|| handler.isActive === true;
	}

	errorMessage(handler: IValidationHandler): string {
		return _.isFunction(handler.errorMessage)
			? (<{ (): string }>handler.errorMessage)()
			: <string>handler.errorMessage;
	}

	private unregister(key: number): void {
		delete this.validationHandlers[key];
	}
}

export interface IValidationServiceFactory {
	getInstance(): IValidationService;
}

validationServiceFactory.$inject = [notificationServiceName];
export function validationServiceFactory(notification: INotificationService): IValidationServiceFactory {
	'use strict';

	return {
		getInstance(): IValidationService {
			return new ValidationService(notification);
		}
	};
}

angular.module(moduleName, [notificationModuleName])
	.factory(factoryName, validationServiceFactory);
