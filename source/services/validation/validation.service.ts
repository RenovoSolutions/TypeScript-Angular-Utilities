'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as notificationModuleName,
	serviceName as notificationServiceName,
	INotificationService,
} from '../notification/notification.service';

import { IValidator, Validator, IErrorHandler } from './validator';
import { ICompositeValidator, CompositeValidator } from './compositeValidator';

export { IUnregisterFunction, IValidator, IErrorHandler } from './validator';
export { ICompositeValidator } from './compositeValidator';

export var moduleName: string = 'rl.utilities.services.validation';
export var serviceName: string = 'validationFactory';

export interface IValidationHandler {
	isActive?: {(): boolean} | boolean;
	validate(): boolean;
	errorMessage: string | {(): string};
}

export interface IValidationService {
	/**
	* Build a validator that uses warning notifications to show errors
	*/
	buildNotificationWarningValidator(): IValidator;

	/**
	* Build a validator that uses error notifications to show errors
	*/
	buildNotificationErrorValidator(): IValidator;

	/**
	* Build a validator that uses a custom handler to show errors
	*
	* @param showError A custom handler for validation errors
	*/
	buildCustomValidator(showError: IErrorHandler): IValidator;

	/**
	* Build a validator that groups child validators
	* and uses warning notifications to show errors
	*/
	buildCompositeNotificationWarningValidator(): ICompositeValidator;

	/**
	* Build a validator that groups child validators
	* and uses error notifications to show errors
	*/
	buildCompositeNotificationErrorValidator(): ICompositeValidator;

	/**
	* Build a validator that groups child validators
	* and uses a custom handler to show errors
	*
	* @param showError A custom handler for validation errors
	*/
	buildCompositeCustomValidator(showError: IErrorHandler): ICompositeValidator;
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

	buildCompositeNotificationWarningValidator(): ICompositeValidator {
		return new CompositeValidator((error: string): void => {
			this.notification.warning(error);
		});
	}

	buildCompositeNotificationErrorValidator(): ICompositeValidator {
		return new CompositeValidator((error: string): void => {
			this.notification.error(error);
		});
	}

	buildCompositeCustomValidator(showError: IErrorHandler): ICompositeValidator {
		return new CompositeValidator(showError);
	}
}

angular.module(moduleName, [notificationModuleName])
	.service(serviceName, ValidationService);
