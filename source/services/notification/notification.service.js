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
var window_provider_1 = require('../window/window.provider');
var logger_service_1 = require('../logger/logger.service');
var NotificationService = (function () {
    function NotificationService(window, logger) {
        this.window = window;
        this.logger = logger;
    }
    NotificationService.prototype.info = function (message) {
        this.notify(message);
    };
    NotificationService.prototype.warning = function (message) {
        this.notify(message);
    };
    NotificationService.prototype.error = function (message) {
        this.notify(message);
    };
    NotificationService.prototype.success = function (message) {
        this.notify(message);
    };
    NotificationService.prototype.notify = function (message) {
        this.window.alert(message);
        this.logger.log(message);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(window_provider_1.windowToken)),
        __param(1, core_1.Inject(logger_service_1.loggerToken))
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
exports.notificationServiceToken = new core_1.OpaqueToken('Notification Service');
exports.NOTIFICATION_SERVICE_PROVIDER = new core_1.Provider(exports.notificationServiceToken, {
    useClass: NotificationService
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBQzFFLGdDQUE0QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3hELCtCQUFxQywwQkFBMEIsQ0FBQyxDQUFBO0FBVWhFO0lBSUMsNkJBQWtDLE1BQWMsRUFDdkIsTUFBZTtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLE9BQWU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLE9BQWU7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsbUNBQUssR0FBTCxVQUFNLE9BQWU7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLE9BQWU7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU8sb0NBQU0sR0FBZCxVQUFlLE9BQWU7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTlCRjtRQUFDLGlCQUFVLEVBQUU7bUJBS0UsYUFBTSxDQUFDLDZCQUFXLENBQUM7bUJBQzVCLGFBQU0sQ0FBQyw0QkFBVyxDQUFDOzJCQU5aO0lBK0JiLDBCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQTlCWSwyQkFBbUIsc0JBOEIvQixDQUFBO0FBRVksZ0NBQXdCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhGLHFDQUE2QixHQUFhLElBQUksZUFBUSxDQUFDLGdDQUF3QixFQUFFO0lBQzdGLFFBQVEsRUFBRSxtQkFBbUI7Q0FDN0IsQ0FBQyxDQUFDIn0=