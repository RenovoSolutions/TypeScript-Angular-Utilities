"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var redirect_service_1 = require('../redirect/redirect.service');
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["cancelledRequest"] = -1] = "cancelledRequest";
    HttpStatusCode[HttpStatusCode["badRequest"] = 400] = "badRequest";
    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
    HttpStatusCode[HttpStatusCode["invalidUrl"] = 404] = "invalidUrl";
    HttpStatusCode[HttpStatusCode["timeout"] = 408] = "timeout";
    HttpStatusCode[HttpStatusCode["internalServerError"] = 500] = "internalServerError";
    HttpStatusCode[HttpStatusCode["gone"] = 410] = "gone";
})(exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var HttpStatusCode = exports.HttpStatusCode;
exports.defaultErrorsToken = new core_1.OpaqueToken('List of default errors for the error handler');
exports.DEFAULT_ERROR_PROVIDERS = new core_1.Provider(exports.defaultErrorsToken, {
    useValue: {
        badRequestError: 'Your request failed one or more validation checks.',
        forbiddenError: 'You have insufficient permissions to perform this action',
        invalidUrlError: 'Resource not found. This issue has been logged',
        timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
        internalServerError: 'The system has encountered an error. This issue has been logged.' +
            ' Please contact support if you are unable to complete critical tasks',
        defaultError: 'Http status code not handled',
        goneError: 'The requested resource is no longer available.',
    },
});
exports.defaultLoginUrlSettingsToken = new core_1.OpaqueToken('Default login url information');
exports.DEFAULT_LOGIN_URL_PROVIDERS = new core_1.Provider(exports.defaultLoginUrlSettingsToken, {
    useValue: {
        loginUrl: '/login',
        returnUrlParam: 'returnUrl',
    },
});
var ErrorHandlerService = (function () {
    function ErrorHandlerService(redirect, exceptionHandler, notification, errorMessages, loginSettings) {
        this.redirect = redirect;
        this.exceptionHandler = exceptionHandler;
        this.notification = notification;
        this.errorMessages = errorMessages;
        this.loginSettings = loginSettings;
    }
    ErrorHandlerService.prototype.httpResponseError = function (rejection) {
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
    };
    ErrorHandlerService.prototype.badRequestError = function (rejection) {
        if (rejection.data) {
            this.notification.error(rejection.data);
        }
        else {
            this.notification.error(this.errorMessages.badRequestError);
        }
    };
    ErrorHandlerService.prototype.loggedOutError = function () {
        var returnUrl = this.redirect.getCurrentLocationAsParam();
        var target = this.loginSettings.loginUrl + '?' + this.loginSettings.returnUrlParam + '=' + returnUrl;
        this.redirect.to(target);
    };
    ErrorHandlerService.prototype.insufficientPermissionsError = function () {
        this.notification.error(this.errorMessages.forbiddenError);
    };
    ErrorHandlerService.prototype.invalidUrlError = function () {
        this.notification.error(this.errorMessages.invalidUrlError);
    };
    ErrorHandlerService.prototype.timeoutError = function () {
        this.notification.error(this.errorMessages.timeoutError);
        // retry
    };
    ErrorHandlerService.prototype.systemError = function () {
        this.notification.error(this.errorMessages.internalServerError);
    };
    ErrorHandlerService.prototype.goneError = function () {
        this.notification.error(this.errorMessages.goneError);
    };
    ErrorHandlerService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(redirect_service_1.redirectToken)),
        __param(3, core_1.Inject(exports.defaultErrorsToken)),
        __param(4, core_1.Inject(exports.defaultLoginUrlSettingsToken))
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRFLGVBQWUsQ0FBQyxDQUFBO0FBSTVGLGlDQUFnRCw4QkFBOEIsQ0FBQyxDQUFBO0FBRS9FLFdBQVksY0FBYztJQUN6Qiw0RUFBcUIsQ0FBQTtJQUNyQixpRUFBZ0IsQ0FBQTtJQUNoQixxRUFBa0IsQ0FBQTtJQUNsQiwrREFBZSxDQUFBO0lBQ2YsaUVBQWdCLENBQUE7SUFDaEIsMkRBQWEsQ0FBQTtJQUNiLG1GQUF5QixDQUFBO0lBQ3pCLHFEQUFVLENBQUE7QUFDWCxDQUFDLEVBVFcsc0JBQWMsS0FBZCxzQkFBYyxRQVN6QjtBQVRELElBQVksY0FBYyxHQUFkLHNCQVNYLENBQUE7QUEyQlksMEJBQWtCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0FBRWxHLCtCQUF1QixHQUFhLElBQUksZUFBUSxDQUFDLDBCQUFrQixFQUFFO0lBQ2pGLFFBQVEsRUFBRTtRQUNULGVBQWUsRUFBRSxvREFBb0Q7UUFDckUsY0FBYyxFQUFFLDBEQUEwRDtRQUMxRSxlQUFlLEVBQUUsZ0RBQWdEO1FBQ2pFLFlBQVksRUFBRSwyRkFBMkY7UUFDekcsbUJBQW1CLEVBQUUsa0VBQWtFO1lBQ3ZGLHNFQUFzRTtRQUN0RSxZQUFZLEVBQUUsOEJBQThCO1FBQzVDLFNBQVMsRUFBRSxnREFBZ0Q7S0FDM0Q7Q0FDRCxDQUFDLENBQUM7QUFFVSxvQ0FBNEIsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFFN0YsbUNBQTJCLEdBQWEsSUFBSSxlQUFRLENBQUMsb0NBQTRCLEVBQUU7SUFDL0YsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsY0FBYyxFQUFFLFdBQVc7S0FDM0I7Q0FDRCxDQUFDLENBQUM7QUFH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