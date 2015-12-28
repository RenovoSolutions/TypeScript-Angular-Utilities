'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as notificationModuleName,
	serviceName as notificationServiceName,
	INotificationService,
} from '../notification/notification.service';

import { IValidator, ISimpleValidator, IErrorHandler, ICompositeValidator } from './validationTypes';
import { Validator } from './validator';
import { CompositeValidator } from './compositeValidator';

export * from './validationTypes';

export var moduleName: string = 'rl.utilities.services.validation';
export var serviceName: string = 'validationFactory';

export interface IValidationService {
	/**
	* Build a validator that uses warning notifications to show errors
	*/
	buildNotificationWarningValidator(): ISimpleValidator;

	/**
	* Build a validator that uses error notifications to show errors
	*/
	buildNotificationErrorValidator(): ISimpleValidator;

	/**
	* Build a validator that uses a custom handler to show errors
	*
	* @param showError A custom handler for validation errors
	*/
	buildCustomValidator(showError: IErrorHandler): ISimpleValidator;

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

	buildNotificationWarningValidator(): ISimpleValidator {
		return new Validator((error: string): void => {
			this.notification.warning(error);
		});
	}

	buildNotificationErrorValidator(): ISimpleValidator {
		return new Validator((error: string): void => {
			this.notification.error(error);
		});
	}

	buildCustomValidator(showError: IErrorHandler): ISimpleValidator {
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
