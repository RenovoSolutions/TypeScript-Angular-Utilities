'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as notificationModuleName,
	serviceName as notificationServiceName,
	INotificationService,
} from '../notification/notification.service';

import { IValidator, Validator, IErrorHandler } from './validator';
import { IAggregateValidator, AggregateValidator } from './aggregateValidator';

export { IUnregisterFunction, IValidator, IErrorHandler } from './validator';
export { IAggregateValidator } from './aggregateValidator';

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
	* Build a validator that aggregates child validators
	* and uses warning notifications to show errors
	*/
	buildAggregateNotificationWarningValidator(): IAggregateValidator;

	/**
	* Build a validator that aggregates child validators
	* and uses error notifications to show errors
	*/
	buildAggregateNotificationErrorValidator(): IAggregateValidator;

	/**
	* Build a validator that aggregates child validators
	* and uses a custom handler to show errors
	*
	* @param showError A custom handler for validation errors
	*/
	buildAggregateCustomValidator(showError: IErrorHandler): IAggregateValidator;
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

	buildAggregateNotificationWarningValidator(): IAggregateValidator {
		return new AggregateValidator((error: string): void => {
			this.notification.warning(error);
		});
	}

	buildAggregateNotificationErrorValidator(): IAggregateValidator {
		return new AggregateValidator((error: string): void => {
			this.notification.error(error);
		});
	}

	buildAggregateCustomValidator(showError: IErrorHandler): IAggregateValidator {
		return new AggregateValidator(showError);
	}
}

angular.module(moduleName, [notificationModuleName])
	.service(serviceName, ValidationService);
