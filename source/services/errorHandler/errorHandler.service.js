'use strict';
var notification_service_1 = require('../notification/notification.service');
exports.moduleName = 'rl21.services.errorHandler';
exports.serviceName = 'errorHandler';
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
            case HttpStatusCode.gone:
                this.goneError();
                break;
            case HttpStatusCode.cancelledRequest:
                // cancelled request
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
    ErrorHandlerService.prototype.goneError = function () {
        this.notification.error(this.errorMessages.goneError);
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
            badRequestError: 'Your request failed one or more validation checks.',
            forbiddenError: 'You have insufficient permissions to perform this action',
            invalidUrlError: 'Resource not found. This issue has been logged',
            timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
            internalServerError: 'The system has encountered an error. This issue has been logged.' +
                ' Please contact support if you are unable to complete critical tasks',
            defaultError: 'Http status code not handled',
            goneError: 'The requested resource is no longer available.'
        };
        this.returnUrlParam = 'returnUrl';
        this.$get.$inject = ['$window', '$exceptionHandler', notification_service_1.serviceName];
    }
    return ErrorHandlerServiceProvider;
}());
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .provider(exports.serviceName, new ErrorHandlerServiceProvider());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFJYixxQ0FJTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRW5DLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsbUJBQVcsR0FBVyxjQUFjLENBQUM7QUFFaEQsV0FBWSxjQUFjO0lBQ3pCLDRFQUFxQixDQUFBO0lBQ3JCLGlFQUFnQixDQUFBO0lBQ2hCLHFFQUFrQixDQUFBO0lBQ2xCLCtEQUFlLENBQUE7SUFDZixpRUFBZ0IsQ0FBQTtJQUNoQiwyREFBYSxDQUFBO0lBQ2IsbUZBQXlCLENBQUE7SUFDekIscURBQVUsQ0FBQTtBQUNYLENBQUMsRUFUVyxzQkFBYyxLQUFkLHNCQUFjLFFBU3pCO0FBVEQsSUFBWSxjQUFjLEdBQWQsc0JBU1gsQ0FBQTtBQXFCRDtJQUNDLDZCQUFvQixPQUEwQixFQUNuQyxpQkFBOEMsRUFDOUMsWUFBa0MsRUFDbEMsUUFBZ0IsRUFDaEIsYUFBNkIsRUFDN0IsY0FBc0I7UUFMYixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtJQUFJLENBQUM7SUFFdEMsK0NBQWlCLEdBQWpCLFVBQWtCLFNBQXFCO1FBQ3RDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssY0FBYyxDQUFDLFVBQVU7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQztZQUNQLEtBQUssY0FBYyxDQUFDLFlBQVk7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