'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

export var moduleName: string = 'rl21.services.errorHandler';
export var serviceName: string = 'errorHandler';

export enum HttpStatusCode {
	unauthorized = 401,
	forbidden = 403,
	invalidUrl = 404,
	timeout = 408,
	internalServerError = 500,
}

export interface IRejection {
	status: HttpStatusCode;
}

export interface IErrorHandlerService {
	httpResponseError(rejection: IRejection): void;
}

export class ErrorHandlerService implements IErrorHandlerService {
	static $inject: string[] = ['$window', __notification.serviceName];
	constructor(private $window: ng.IWindowService, private notification: __notification.INotificationService) { }

	private loginUrl: Location = <any>'/login.aspx';

	httpResponseError(rejection: IRejection): void {
		switch (rejection.status) {
			case HttpStatusCode.unauthorized:
				this.loggedOutError();
				break;
			case HttpStatusCode.forbidden:
				this.insufficientPermissionsError();
				break;
			case HttpStatusCode.invalidUrl:
				this.invalidUrlError();
				break;
			case HttpStatusCode.timeout:
				this.timeoutError();
				break;
			case HttpStatusCode.internalServerError:
				this.systemError();
				break;
			default:
				console.log('Http status' + rejection.status + ' not handled');
				console.log('Response: ' + rejection);
				break;
		}
	}

	private loggedOutError(): void {
		this.$window.location = this.loginUrl;
	}

	private insufficientPermissionsError(): void {
		this.notification.error('You have insufficient permissions to perform this action');
	}

	private invalidUrlError(): void {
		this.notification.error('Resource not found. This issue has been logged');
	}

	private timeoutError(): void {
		this.notification.error('Request timed out. Check your network connection or contact your administrator for issues');
		// retry
	}

	private systemError(): void {
		this.notification.error('The system has encountered an error. This issue has been logged.' +
								' Please contact support if you are unable to complete critical tasks');
	}
}

angular.module(moduleName, [__notification.moduleName])
	.service(serviceName, ErrorHandlerService);
