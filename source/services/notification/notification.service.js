'use strict';
var angular = require('angular');
var baseNotifier_1 = require('./baseNotifier');
exports.moduleName = 'rl.utilities.services.notification';
exports.serviceName = 'notification';
var NotificationService = (function () {
    function NotificationService(notifier) {
        this.notifier = notifier;
    }
    NotificationService.prototype.info = function (message) {
        this.notifier.info(message);
    };
    NotificationService.prototype.warning = function (message) {
        this.notifier.warning(message);
    };
    NotificationService.prototype.error = function (message) {
        this.notifier.error(message);
    };
    NotificationService.prototype.success = function (message) {
        this.notifier.success(message);
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
function notificationServiceProvider() {
    'use strict';
    var _this = this;
    var provider = {
        notifier: new baseNotifier_1.BaseNotifier(),
        setNotifier: function (notifier) {
            _this.notifier = notifier;
        },
        $get: function () {
            return new NotificationService(_this.notifier);
        },
    };
    return provider;
}
exports.notificationServiceProvider = notificationServiceProvider;
angular.module(exports.moduleName, [])
    .provider(exports.serviceName, notificationServiceProvider);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUduQyw2QkFBNkIsZ0JBQWdCLENBQUMsQ0FBQTtBQUluQyxrQkFBVSxHQUFXLG9DQUFvQyxDQUFDO0FBQzFELG1CQUFXLEdBQVcsY0FBYyxDQUFDO0FBU2hEO0lBQ0MsNkJBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBRTNDLGtDQUFJLEdBQUosVUFBSyxPQUFlO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsT0FBZTtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQUssR0FBTCxVQUFNLE9BQWU7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxPQUFlO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksMkJBQW1CLHNCQWtCL0IsQ0FBQTtBQVdEO0lBQ0MsWUFBWSxDQUFDO0lBRGQsaUJBY0M7SUFYQSxJQUFJLFFBQVEsR0FBeUM7UUFDcEQsUUFBUSxFQUFFLElBQUksMkJBQVksRUFBRTtRQUM1QixXQUFXLEVBQUUsVUFBQyxRQUFtQjtZQUNoQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0wsTUFBTSxDQUFDLElBQUksbUJBQW1CLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FDRCxDQUFDO0lBRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNqQixDQUFDO0FBZGUsbUNBQTJCLDhCQWMxQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixRQUFRLENBQUMsbUJBQVcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDIn0=