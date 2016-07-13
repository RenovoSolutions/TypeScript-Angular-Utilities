﻿import { Injectable, ExceptionHandler } from '@angular/core';

import { INotificationService, NotificationService } from '../notification/notification.service';
import { IRedirectService, RedirectService } from '../redirect/redirect.service';

export enum HttpStatusCode {
	cancelledRequest = -1,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	invalidUrl = 404,
	timeout = 408,
	internalServerError = 500,
	gone = 410,
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
	goneError: string;
}

export interface ILoginUrlSettings {
	loginUrl: string;
	returnUrlParam: string;
}

export class DefaultErrors implements IErrorMessages {
	badRequestError: string =  'Your request failed one or more validation checks.';
	forbiddenError: string =  'You have insufficient permissions to perform this action';
	invalidUrlError: string =  'Resource not found. This issue has been logged';
	timeoutError: string =  'Request timed out. Check your network connection or contact your administrator for issues';
	internalServerError: string =  'The system has encountered an error. This issue has been logged.' +
	' Please contact support if you are unable to complete critical tasks';
	defaultError: string =  'Http status code not handled';
	goneError: string =  'The requested resource is no longer available.';
}

export class DefaultLoginUrlSettings implements ILoginUrlSettings {
	loginUrl: string = '/login';
	returnUrlParam: string = 'returnUrl';
}

@Injectable()
export class ErrorHandlerService implements IErrorHandlerService {
	private redirect: IRedirectService;
	private exceptionHandler: ExceptionHandler;
	private notification: INotificationService;
	private loginSettings: ILoginUrlSettings;
	private errorMessages: IErrorMessages;

	constructor(redirect: RedirectService
			, exceptionHandler: ExceptionHandler
			, notification: NotificationService
			, errorMessages: DefaultErrors
			, loginSettings: DefaultLoginUrlSettings) {
		this.redirect = redirect;
		this.exceptionHandler = exceptionHandler;
		this.notification = notification;
		this.errorMessages = errorMessages;
		this.loginSettings = loginSettings;
	}

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
			case HttpStatusCode.gone:
				this.goneError();
				break;
			case HttpStatusCode.cancelledRequest:
				// cancelled request
				break;
			default:
				this.exceptionHandler.call(new Error(this.errorMessages.defaultError));
				this.exceptionHandler.call(new Error('Status: ' + rejection.status));
				this.exceptionHandler.call(new Error('Response: ' + rejection));
				break;
		}
	}

	private badRequestError(rejection: IRejection): void {
		if (rejection.data) {
			this.notification.error(rejection.data);
		} else {
			this.notification.error(this.errorMessages.badRequestError);
		}
	}

	private loggedOutError(): void {
		const returnUrl: string = this.redirect.getCurrentLocationAsParam();
		const target: string = this.loginSettings.loginUrl + '?' + this.loginSettings.returnUrlParam + '=' + returnUrl;
		this.redirect.to(target);
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
	private goneError(): void {
		this.notification.error(this.errorMessages.goneError);
	}
}
