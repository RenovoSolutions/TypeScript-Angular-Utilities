'use strict';
var notification_service_1 = require('../notification/notification.service');
exports.moduleName = 'rl21.services.errorHandler';
exports.serviceName = 'errorHandler';
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["badRequest"] = 400] = "badRequest";
    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
    HttpStatusCode[HttpStatusCode["invalidUrl"] = 404] = "invalidUrl";
    HttpStatusCode[HttpStatusCode["timeout"] = 408] = "timeout";
    HttpStatusCode[HttpStatusCode["internalServerError"] = 500] = "internalServerError";
})(exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var HttpStatusCode = exports.HttpStatusCode;
var ErrorHandlerService = (function () {
    function ErrorHandlerService($window, $exceptionHandler, notification, loginUrl, errorMessages, returnUrlParam) {
        this.$window = $window;
        this.$exceptionHandler = $exceptionHandler;
        this.notification = notification;
        this.loginUrl = loginUrl;
        this.errorMessages = errorMessages;
        this.returnUrlParam = returnUrlParam;
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
            default:
                this.$exceptionHandler(new Error(this.errorMessages.defaultError));
                this.$exceptionHandler(new Error('Status: ' + rejection.status));
                this.$exceptionHandler(new Error('Response: ' + rejection));
                break;
        }
    };
    ErrorHandlerService.prototype.badRequestError = function (rejection) {
        if (rejection.data) {
            return this.notification.error(rejection.data);
        }
        return this.notification.error(this.errorMessages.badRequestError);
    };
    ErrorHandlerService.prototype.loggedOutError = function () {
        var baseUrl = this.$window.location.pathname;
        var queryString = this.$window.location.search || '';
        var returnUrl = encodeURIComponent(baseUrl + queryString);
        this.$window.location = (this.loginUrl + '?' + this.returnUrlParam + '=' + returnUrl);
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
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
var ErrorHandlerServiceProvider = (function () {
    function ErrorHandlerServiceProvider() {
        var _this = this;
        this.$get = function ($window, $exceptionHandler, notification) {
            return new ErrorHandlerService($window, $exceptionHandler, notification, _this.loginUrl, _this.errorMessages, _this.returnUrlParam);
        };
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
        this.returnUrlParam = 'returnUrl';
        this.$get.$inject = ['$window', '$exceptionHandler', notification_service_1.serviceName];
    }
    return ErrorHandlerServiceProvider;
}());
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .provider(exports.serviceName, new ErrorHandlerServiceProvider());
//# sourceMappingURL=errorHandler.service.js.map