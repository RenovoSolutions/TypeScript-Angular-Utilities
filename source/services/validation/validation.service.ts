'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as notificationModuleName,
	serviceName as notificationServiceName,
	INotificationService,
} from '../notification/notification.service';

import { IValidator, Validator, IErrorHandler } from './validator';

export { IUnregisterFunction, IValidator, IErrorHandler } from './validator';

export var moduleName: string = 'rl.utilities.services.validation';
export var serviceName: string = 'validationFactory';

export interface IValidationHandler {
	isActive?: {(): boolean} | boolean;
	validate(): boolean;
	errorMessage: string | {(): string};
}

export interface IValidationService {
	buildNotificationWarningValidator(): IValidator;
	buildNotificationErrorValidator(): IValidator;
	buildCustomValidator(showError: IErrorHandler): IValidator;
}

export class ValidationService implements IValidationService {
	static $inject: string[] = [notificationServiceName];
	constructor(private notification: INotificationService) { }

	buildNotificationWarningValidator(): IValidator {
		return new Validator((error: string): void => {
			this.notification.warning(error);
		});
	}

	buildNotificationErrorValidator(): IValidator {
		return new Validator((error: string): void => {
			this.notification.error(error);
		});
	}

	buildCustomValidator(showError: IErrorHandler): IValidator {
		return new Validator(showError);
	}
}

angular.module(moduleName, [notificationModuleName])
	.service(serviceName, ValidationService);
