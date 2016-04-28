"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var notification_service_1 = require('../notification/notification.service');
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
        __param(1, core_1.Inject(core_1.ExceptionHandler)),
        __param(2, core_1.Inject(notification_service_1.notificationServiceToken)),
        __param(3, core_1.Inject(exports.defaultErrorsToken)),
        __param(4, core_1.Inject(exports.defaultLoginUrlSettingsToken)), 
        __metadata('design:paramtypes', [Object, core_1.ExceptionHandler, Object, Object, Object])
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
exports.errorHandlerToken = new core_1.OpaqueToken('A service for handling http errors');
exports.ERROR_HANDLER_PROVIDER = new core_1.Provider(exports.errorHandlerToken, {
    useClass: ErrorHandlerService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTRFLGVBQWUsQ0FBQyxDQUFBO0FBRTVGLHFDQUErRCxzQ0FBc0MsQ0FBQyxDQUFBO0FBRXRHLGlDQUFnRCw4QkFBOEIsQ0FBQyxDQUFBO0FBRS9FLFdBQVksY0FBYztJQUN6Qiw0RUFBcUIsQ0FBQTtJQUNyQixpRUFBZ0IsQ0FBQTtJQUNoQixxRUFBa0IsQ0FBQTtJQUNsQiwrREFBZSxDQUFBO0lBQ2YsaUVBQWdCLENBQUE7SUFDaEIsMkRBQWEsQ0FBQTtJQUNiLG1GQUF5QixDQUFBO0lBQ3pCLHFEQUFVLENBQUE7QUFDWCxDQUFDLEVBVFcsc0JBQWMsS0FBZCxzQkFBYyxRQVN6QjtBQVRELElBQVksY0FBYyxHQUFkLHNCQVNYLENBQUE7QUEyQlksMEJBQWtCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0FBRWxHLCtCQUF1QixHQUFhLElBQUksZUFBUSxDQUFDLDBCQUFrQixFQUFFO0lBQ2pGLFFBQVEsRUFBRTtRQUNULGVBQWUsRUFBRSxvREFBb0Q7UUFDckUsY0FBYyxFQUFFLDBEQUEwRDtRQUMxRSxlQUFlLEVBQUUsZ0RBQWdEO1FBQ2pFLFlBQVksRUFBRSwyRkFBMkY7UUFDekcsbUJBQW1CLEVBQUUsa0VBQWtFO1lBQ3ZGLHNFQUFzRTtRQUN0RSxZQUFZLEVBQUUsOEJBQThCO1FBQzVDLFNBQVMsRUFBRSxnREFBZ0Q7S0FDM0Q7Q0FDRCxDQUFDLENBQUM7QUFFVSxvQ0FBNEIsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFFN0YsbUNBQTJCLEdBQWEsSUFBSSxlQUFRLENBQUMsb0NBQTRCLEVBQUU7SUFDL0YsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsY0FBYyxF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