'use strict';

import * as ng from 'angular';

import {
    INotificationService,
    serviceName as notificationServiceName,
    moduleName as notificationModuleName,
} from '../notification/notification.service';

export var moduleName: string = 'rl21.services.errorHandler';
export var serviceName: string = 'errorHandler';

export enum HttpStatusCode {
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	invalidUrl = 404,
	timeout = 408,
	internalServerError = 500,
}

export interface IRejection {
	status: HttpStatusCode;
	data?: any;
}

export interface IErrorHandlerService {
	httpResponseError(rejection: IRejection): void;
}

export interface IErrorMessages {
	badRequestError: string;
    forbiddenError: string;
    invalidUrlError: string;
    timeoutError: string;
    internalServerError: string;
    defaultError: string;
}

export class ErrorHandlerService implements IErrorHandlerService {
	constructor(private $window: ng.IWindowService
            , private notification: INotificationService
            , private loginUrl: string
            , private errorMessages: IErrorMessages) { }

	httpResponseError(rejection: IRejection): void {
		switch (rejection.status) {
			case HttpStatusCode.badRequest:
				this.badRequestError(rejection);
				break;
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
				console.error(this.errorMessages.defaultError);
				console.error('Status: ' + rejection.status);
				console.error('Response: ' + rejection);
				break;
		}
	}
	
	private badRequestError (rejection: IRejection) {
		if (rejection.data) {
			return this.notification.warning(rejection.data);
		}
		return this.notification.error(this.errorMessages.badRequestError);
	}
	
	private loggedOutError(): void {
		this.$window.location = <any>this.loginUrl;
	}

	private insufficientPermissionsError(): void {
		this.notification.error(this.errorMessages.forbiddenError);
	}

	private invalidUrlError(): void {
		this.notification.error(this.errorMessages.invalidUrlError);
	}

	private timeoutError(): void {
		this.notification.error(this.errorMessages.timeoutError);
		// retry
	}

	private systemError(): void {
		this.notification.error(this.errorMessages.internalServerError);
	}
}

export interface IErrorHandlerServiceProvider extends angular.IServiceProvider {
    loginUrl: string;
    errorMessages: IErrorMessages;
    $get($window: ng.IWindowService
        , notification: INotificationService): IErrorHandlerService;
}

class ErrorHandlerServiceProvider implements IErrorHandlerServiceProvider {
    loginUrl: string;
    errorMessages: IErrorMessages;

    constructor() {
        this.loginUrl = '/login';
        this.errorMessages = {
			badRequestError: 'Your reqest failed one or more validation checks.',
            forbiddenError: 'You have insufficient permissions to perform this action',
            invalidUrlError: 'Resource not found. This issue has been logged',
            timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
            internalServerError: 'The system has encountered an error. This issue has been logged.' +
            ' Please contact support if you are unable to complete critical tasks',
            defaultError: 'Http status code not handled',
        };
        this.$get.$inject = ['$window', notificationServiceName];
    }

    $get: any = ($window: ng.IWindowService
            , notification: INotificationService): IErrorHandlerService => {
        return new ErrorHandlerService($window, notification, this.loginUrl, this.errorMessages);
    }
}

angular.module(moduleName, [notificationModuleName])
	.provider(serviceName, new ErrorHandlerServiceProvider());
