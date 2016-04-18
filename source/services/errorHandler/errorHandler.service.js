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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFJYixxQ0FJTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRW5DLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsbUJBQVcsR0FBVyxjQUFjLENBQUM7QUFFaEQsV0FBWSxjQUFjO0lBQ3pCLDRFQUFxQixDQUFBO0lBQ3JCLGlFQUFnQixDQUFBO0lBQ2hCLHFFQUFrQixDQUFBO0lBQ2xCLCtEQUFlLENBQUE7SUFDZixpRUFBZ0IsQ0FBQTtJQUNoQiwyREFBYSxDQUFBO0lBQ2IsbUZBQXlCLENBQUE7QUFDMUIsQ0FBQyxFQVJXLHNCQUFjLEtBQWQsc0JBQWMsUUFRekI7QUFSRCxJQUFZLGNBQWMsR0FBZCxzQkFRWCxDQUFBO0FBb0JEO0lBQ0MsNkJBQW9CLE9BQTBCLEVBQ2xDLGlCQUE4QyxFQUNyQyxZQUFrQyxFQUNsQyxRQUFnQixFQUNoQixhQUE2QixFQUN0QyxjQUFzQjtRQUxkLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBNkI7UUFDckMsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFRO0lBQUksQ0FBQztJQUV2QywrQ0FBaUIsR0FBakIsVUFBa0IsU0FBcUI7UUFDdEMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxjQUFjLENBQUMsVUFBVTtnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxjQUFjLENBQUMsWUFBWTtnQkFDL0IsSUFBSSxDQUFD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