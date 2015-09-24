'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var baseNotifier_1 = require('./baseNotifier');
__export(require('./notificationTypes'));
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
})();
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
//# sourceMappingURL=notification.service.js.map