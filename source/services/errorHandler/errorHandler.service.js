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
    function ErrorHandlerService($window, notification, loginUrl, errorMessages, returnUrlParam) {
        this.$window = $window;
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
                console.error(this.errorMessages.defaultError);
                console.error('Status: ' + rejection.status);
                console.error('Response: ' + rejection);
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
        this.$get = function ($window, notification) {
            return new ErrorHandlerService($window, notification, _this.loginUrl, _this.errorMessages, _this.returnUrlParam);
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
        this.$get.$inject = ['$window', notification_service_1.serviceName];
    }
    return ErrorHandlerServiceProvider;
}());
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .provider(exports.serviceName, new ErrorHandlerServiceProvider());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFJYixxQ0FJTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRW5DLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsbUJBQVcsR0FBVyxjQUFjLENBQUM7QUFFaEQsV0FBWSxjQUFjO0lBQ3pCLGlFQUFnQixDQUFBO0lBQ2hCLHFFQUFrQixDQUFBO0lBQ2xCLCtEQUFlLENBQUE7SUFDZixpRUFBZ0IsQ0FBQTtJQUNoQiwyREFBYSxDQUFBO0lBQ2IsbUZBQXlCLENBQUE7QUFDMUIsQ0FBQyxFQVBXLHNCQUFjLEtBQWQsc0JBQWMsUUFPekI7QUFQRCxJQUFZLGNBQWMsR0FBZCxzQkFPWCxDQUFBO0FBb0JEO0lBQ0MsNkJBQW9CLE9BQTBCLEVBQ3pCLFlBQWtDLEVBQ2xDLFFBQWdCLEVBQ2hCLGFBQTZCLEVBQ3RDLGNBQXNCO1FBSmQsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFRO0lBQUksQ0FBQztJQUV2QywrQ0FBaUIsR0FBakIsVUFBa0IsU0FBcUI7UUFDdEMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxjQUFjLENBQUMsVUFBVTtnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxjQUFjLENBQUMsWUFBWTtnQkFDL0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixLQUFLLENBQUM7WUFDUCxLQUFLLGNBQWMsQ0FBQyxTQUFTO2dCQUM1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