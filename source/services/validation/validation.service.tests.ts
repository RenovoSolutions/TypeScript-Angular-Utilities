/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IUnregisterFunction, IValidationService, moduleName, serviceName, IValidator } from './validation.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

interface IMockValidationHandler {
	validate: Sinon.SinonSpy;
	errorMessage?: string | Sinon.SinonSpy;
	isActive?: Sinon.SinonSpy | boolean;
}

interface IMockNotification {
	error: Sinon.SinonSpy;
	warning: Sinon.SinonSpy;
}

describe('validation', () => {
	let validationService: IValidationService;
	let validator: IValidator;
	let notification: IMockNotification;
	let showErrorSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		showErrorSpy = sinon.spy();

		notification = {
			error: sinon.spy(),
			warning: sinon.spy(),
		};

		angularFixture.mock({
			notification: notification,
		});

		let services: any = angularFixture.inject(serviceName);
		validationService = services[serviceName];
		validator = validationService.buildCustomValidator(showErrorSpy);
	});

	describe('validate', (): void => {
		it('should register a validation handler and use it to validate', (): void => {
			let handler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
			};

			validator.registerValidationHandler(<any>handler);

			let isValid: boolean = validator.validate();

			sinon.assert.calledOnce(handler.validate);
			expect(isValid).to.be.true;
		});

		it('should show the handler\'s error message if validation fails', (): void => {
			let handler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: 'error',
			};

			validator.registerValidationHandler(<any>handler);

			let isValid: boolean = validator.validate();

			sinon.assert.calledOnce(handler.validate);
			expect(isValid).to.be.false;
			sinon.assert.calledOnce(showErrorSpy);
			sinon.assert.calledWith(showErrorSpy, 'error');
		});

		it('should allow the handler to specify a function for returning the error message', (): void => {
			let handler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: sinon.spy((): string => { return 'error'; }),
			};

			validator.registerValidationHandler(<any>handler);

			validator.validate();

			sinon.assert.calledOnce(<Sinon.SinonSpy>handler.errorMessage);

			sinon.assert.calledOnce(showErrorSpy);
			sinon.assert.calledWith(showErrorSpy, 'error');
		});

		it('should handle multiple validators and only show the error of the first one to fail', (): void => {
			let firstValidHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
			};
			let secondValidHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
			};
			let firstFailingHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: 'error1',
			};
			let thirdValidHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
			};
			let secondFailingHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: 'error2',
			};

			validator.registerValidationHandler(<any>firstValidHandler);
			validator.registerValidationHandler(<any>secondValidHandler);
			validator.registerValidationHandler(<any>firstFailingHandler);
			validator.registerValidationHandler(<any>thirdValidHandler);
			validator.registerValidationHandler(<any>secondFailingHandler);

			let isValid: boolean = validator.validate();

			sinon.assert.calledOnce(firstFailingHandler.validate);
			sinon.assert.calledOnce(secondValidHandler.validate);
			sinon.assert.calledOnce(firstFailingHandler.validate);
			// halt execution after the first failed validation check
			sinon.assert.notCalled(thirdValidHandler.validate);
			sinon.assert.notCalled(secondFailingHandler.validate);
			expect(isValid).to.be.false;

			sinon.assert.calledOnce(showErrorSpy);
			sinon.assert.calledWith(showErrorSpy, 'error1');
		});
	});

	describe('isActive', (): void => {
		it('should disable a validator if isActive is set to false', (): void => {
			let inactiveHandler: IMockValidationHandler = {
				validate: sinon.spy(),
				isActive: false,
			};

			validator.registerValidationHandler(<any>inactiveHandler);

			let isValid: boolean = validator.validate();

			sinon.assert.notCalled(inactiveHandler.validate);
			// defaults to true if no active validators
			expect(isValid).to.be.true;
		});

		it('should call isActive and disable the validator if the result is false', (): void => {
			let inactiveHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				isActive: sinon.spy((): boolean => { return false; }),
			};
			let activeHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
				isActive: sinon.spy((): boolean => { return true; }),
			};

			validator.registerValidationHandler(<any>inactiveHandler);
			validator.registerValidationHandler(<any>activeHandler);

			let isValid: boolean = validator.validate();

			sinon.assert.calledOnce(<Sinon.SinonSpy>inactiveHandler.isActive);
			sinon.assert.notCalled(inactiveHandler.validate);
			sinon.assert.calledOnce(<Sinon.SinonSpy>activeHandler.isActive);
			sinon.assert.calledOnce(activeHandler.validate);
			expect(isValid).to.be.true;
		});
	});

	describe('unregister', (): void => {
		it('should return a function to unregister the validation handler', (): void => {
			let handlerToUnregister: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
			};
			let activeHandler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return true; }),
			};

			let unregister: IUnregisterFunction = validator.registerValidationHandler(<any>handlerToUnregister);
			validator.registerValidationHandler(<any>activeHandler);

			let isValid: boolean = validator.validate();

			expect(isValid).to.be.false;
			sinon.assert.calledOnce(handlerToUnregister.validate);
			sinon.assert.notCalled(activeHandler.validate);

			handlerToUnregister.validate.reset();
			activeHandler.validate.reset();

			unregister();

			isValid = validator.validate();

			expect(isValid).to.be.true;
			sinon.assert.notCalled(handlerToUnregister.validate);
			sinon.assert.calledOnce(activeHandler.validate);
		});
	});

	describe('notification', (): void => {
		it('should show errors as error notifications', (): void => {
			validator = validationService.buildNotificationErrorValidator();

			let handler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: 'error',
			};

			validator.registerValidationHandler(<any>handler);

			validator.validate();

			sinon.assert.calledOnce(notification.error);
			sinon.assert.calledWith(notification.error, 'error');
		});

		it('should show errors as warning notifications', (): void => {
			validator = validationService.buildNotificationWarningValidator();

			let handler: IMockValidationHandler = {
				validate: sinon.spy((): boolean => { return false; }),
				errorMessage: 'error',
			};

			validator.registerValidationHandler(<any>handler);

			validator.validate();

			sinon.assert.calledOnce(notification.warning);
			sinon.assert.calledWith(notification.warning, 'error');
		});
	});
});
