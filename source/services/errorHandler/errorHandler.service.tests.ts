import { Injector, ReflectiveInjector } from '@angular/core';

import {
	DefaultErrors,
	DefaultLoginUrlSettings,
	ErrorHandlerService,
	IErrorHandlerService,
	IRejection,
	HttpStatusCode,
} from './errorHandler.service';

import { IRedirectService } from '../redirect/redirect.service';

interface INotificationMock {
	error: Sinon.SinonSpy;
}

describe('errorHandler', () => {
	var errorHandler: IErrorHandlerService;
	var redirect: IRedirectService;
	var notification: INotificationMock;
	var returnUrl: string;

	beforeEach(() => {
		redirect = {
			getCurrentLocationAsParam: () => {
				return returnUrl;
			},
			to: sinon.spy(),
		};

		notification = {
			error: sinon.spy(),
		};

		const exceptionHandler: any = {
			call: sinon.spy(),
		};

		const injector: Injector = ReflectiveInjector.resolveAndCreate([DefaultErrors, DefaultLoginUrlSettings]);
		errorHandler = new ErrorHandlerService(
			<any>redirect,
			exceptionHandler,
			<any>notification,
			injector.get(DefaultErrors),
			injector.get(DefaultLoginUrlSettings)
		);
	});

	it('should redirect the user to the login page with a redirect url on an unauthorized error', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.unauthorized
		};
		returnUrl = 'myReturnUrl';

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(<Sinon.SinonSpy>redirect.to);
		sinon.assert.calledWith(<Sinon.SinonSpy>redirect.to, '/login?returnUrl=myReturnUrl');
	});

	it('should show an error for insufficient permissions', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.forbidden
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, 'You have insufficient permissions to perform this action');
	});

	it('should show an error for invalid url', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.invalidUrl
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, 'Resource not found. This issue has been logged');
	});

	it('should show an error for gone resource', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.gone
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, 'The requested resource is no longer available.');
	});

	it('should show an error for timeout', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.timeout
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, 'Request timed out. Check your network connection or contact your administrator for issues');
	});

	it('should show an error for system error', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.internalServerError
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, 'The system has encountered an error. This issue has been logged.' +
												' Please contact support if you are unable to complete critical tasks');
	});

	it('should show a custom error for bad request error', (): void => {
		var errorMessage: string = 'An error occurred';

		var rejection: IRejection = {
			status: HttpStatusCode.badRequest,
			data: errorMessage
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, errorMessage);
	});
});
