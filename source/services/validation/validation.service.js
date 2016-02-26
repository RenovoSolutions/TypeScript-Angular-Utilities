'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var notification_service_1 = require('../notification/notification.service');
var validator_1 = require('./validator');
var compositeValidator_1 = require('./compositeValidator');
__export(require('./validationTypes'));
exports.moduleName = 'rl.utilities.services.validation';
exports.serviceName = 'validationFactory';
var ValidationService = (function () {
    function ValidationService(notification) {
        this.notification = notification;
    }
    ValidationService.prototype.buildNotificationWarningValidator = function () {
        var _this = this;
        return new validator_1.Validator(function (error) {
            _this.notification.warning(error);
        });
    };
    ValidationService.prototype.buildNotificationErrorValidator = function () {
        var _this = this;
        return new validator_1.Validator(function (error) {
            _this.notification.error(error);
        });
    };
    ValidationService.prototype.buildCustomValidator = function (showError) {
        return new validator_1.Validator(showError);
    };
    ValidationService.prototype.buildCompositeNotificationWarningValidator = function () {
        var _this = this;
        return new compositeValidator_1.CompositeValidator(function (error) {
            _this.notification.warning(error);
        });
    };
    ValidationService.prototype.buildCompositeNotificationErrorValidator = function () {
        var _this = this;
        return new compositeValidator_1.CompositeValidator(function (error) {
            _this.notification.error(error);
        });
    };
    ValidationService.prototype.buildCompositeCustomValidator = function (showError) {
        return new compositeValidator_1.CompositeValidator(showError);
    };
    ValidationService.$inject = [notification_service_1.serviceName];
    return ValidationService;
})();
exports.ValidationService = ValidationService;
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .service(exports.serviceName, ValidationService);
//# sourceMappingURL=validation.service.js.map