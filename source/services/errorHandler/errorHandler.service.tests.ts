import * as angular from 'angular';
import 'angular-mocks';

import { angularFixture } from '../test/angularFixture';

import {
	moduleName,
	serviceName,
	IErrorHandlerService,
	IRejection,
	HttpStatusCode,
} from './errorHandler.service';

interface IWindowMock {
	location: any;
}

interface INotificationMock {
	error: Sinon.SinonSpy;
}

describe('errorHandler', () => {
	var errorHandler: IErrorHandlerService;
	var $window: IWindowMock;
	var notification: INotificationMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		$window = {
			location: {
				pathname: '/path',
				search: '?x=123',
			},
		};

		notification = {
			error: sinon.spy(),
		};

		angularFixture.mock({
			$window: $window,
			notification: notification,
		});

		var services: any = angularFixture.inject(serviceName);
		errorHandler = services[serviceName];
	});

	it('should redirect the user to the login page with a redirect url on an unauthorized error', (): void => {
		var rejection: IRejection = {
			status: HttpStatusCode.unauthorized
		};

		errorHandler.httpResponseError(rejection);

		expect($window.location).to.equal('/login?returnUrl=%2Fpath%3Fx%3D123');
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
		var errorMessage = "An error occurred"
		
		var rejection: IRejection = {
			status: HttpStatusCode.badRequest,
			data: errorMessage
		};

		errorHandler.httpResponseError(rejection);

		sinon.assert.calledOnce(notification.error);
		sinon.assert.calledWith(notification.error, errorMessage);
	});
});
