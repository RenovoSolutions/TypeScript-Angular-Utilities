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
var NotificationService = (function () {
    function NotificationService(window) {
        this.window = window;
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
        console.log(message);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(window_provider_1.windowToken))
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
exports.notificationServiceToken = new core_1.OpaqueToken('Notification Service');
exports.NOTIFICATION_SERVICE_PROVIDER = new core_1.Provider(exports.notificationServiceToken, {
    useClass: NotificationService
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBQzFFLGdDQUEwQiwyQkFBMkIsQ0FBQyxDQUFBO0FBVXREO0lBR0MsNkJBQWtDLE1BQWM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxPQUFlO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxPQUFlO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELG1DQUFLLEdBQUwsVUFBTSxPQUFlO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxPQUFlO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVPLG9DQUFNLEdBQWQsVUFBZSxPQUFlO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQTNCRjtRQUFDLGlCQUFVLEVBQUU7bUJBSUUsYUFBTSxDQUFDLDZCQUFXLENBQUM7MkJBSnJCO0lBNEJiLDBCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSwyQkFBbUIsc0JBMkIvQixDQUFBO0FBRVksZ0NBQXdCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhGLHFDQUE2QixHQUFhLElBQUksZUFBUSxDQUFDLGdDQUF3QixFQUFFO0lBQzdGLFFBQVEsRUFBRSxtQkFBbUI7Q0FDN0IsQ0FBQyxDQUFDIn0=