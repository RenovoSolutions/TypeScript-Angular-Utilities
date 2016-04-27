import { Provider, ExceptionHandler, OpaqueToken } from 'angular2/core';
import { INotificationService } from '../notification/notification.service';
import { IRedirectService } from '../redirect/redirect.service';
export declare enum HttpStatusCode {
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
export declare const defaultErrorsToken: OpaqueToken;
export declare const DEFAULT_ERROR_PROVIDERS: Provider;
export declare const defaultLoginUrlSettingsToken: OpaqueToken;
export declare const DEFAULT_LOGIN_URL_PROVIDERS: Provider;
export declare class ErrorHandlerService implements IErrorHandlerService {
    private redirect;
    private exceptionHandler;
    private notification;
    private loginSettings;
    private errorMessages;
    constructor(redirect: IRedirectService, exceptionHandler: ExceptionHandler, notification: INotificationService, errorMessages: IErrorMessages, loginSettings: ILoginUrlSettings);
    httpResponseError(rejection: IRejection): void;
    private badRequestError(rejection);
    private loggedOutError();
    private insufficientPermissionsError();
    private invalidUrlError();
    private timeoutError();
    private systemError();
    private goneError();
}
