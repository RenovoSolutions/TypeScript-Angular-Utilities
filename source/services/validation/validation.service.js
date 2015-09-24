'use strict';
var angular = require('angular');
var _ = require('lodash');
var notification_service_1 = require('../notification/notification.service');
exports.moduleName = 'rl.utilities.services.validation';
exports.factoryName = 'validationFactory';
var ValidationService = (function () {
    function ValidationService(notification) {
        this.notification = notification;
        this.validationHandlers = {};
        this.nextKey = 0;
        this.notifyAsError = false;
    }
    ValidationService.prototype.validate = function () {
        var _this = this;
        var isValid = true;
        _.each(this.validationHandlers, function (handler) {
            var isActive = (_.isFunction(handler.isActive) && handler.isActive())
                || handler.isActive == null
                || handler.isActive === true;
            if (isActive && !handler.validate()) {
                isValid = false;
                var error = _.isFunction(handler.errorMessage)
                    ? handler.errorMessage()
                    : handler.errorMessage;
                if (_this.notifyAsError) {
                    _this.notification.error(error);
                }
                else {
                    _this.notification.warning(error);
                }
                return false;
            }
        });
        return isValid;
    };
    ValidationService.prototype.registerValidationHandler = function (handler) {
        var _this = this;
        var currentKey = this.nextKey;
        this.nextKey++;
        this.validationHandlers[currentKey] = handler;
        return function () {
            _this.unregister(currentKey);
        };
    };
    ValidationService.prototype.unregister = function (key) {
        delete this.validationHandlers[key];
    };
    return ValidationService;
})();
exports.ValidationService = ValidationService;
validationServiceFactory.$inject = [notification_service_1.serviceName];
function validationServiceFactory(notification) {
    'use strict';
    return {
        getInstance: function () {
            return new ValidationService(notification);
        }
    };
}
exports.validationServiceFactory = validationServiceFactory;
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .factory(exports.factoryName, validationServiceFactory);
//# sourceMappingURL=validation.service.js.map