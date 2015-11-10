'use strict';
var _ = require('lodash');
var Validator = (function () {
    function Validator(showError) {
        this.showError = showError;
        this.validationHandlers = {};
        this.nextKey = 0;
    }
    Validator.prototype.validate = function () {
        var _this = this;
        var isValid = true;
        _.each(this.validationHandlers, function (handler) {
            var isActive = _this.isActive(handler);
            if (isActive && !handler.validate()) {
                isValid = false;
                var error = _this.errorMessage(handler);
                _this.showError(error);
                return false;
            }
        });
        return isValid;
    };
    Validator.prototype.getErrorCount = function () {
        var _this = this;
        return _.reduce(this.validationHandlers, function (count, handler) {
            var isActive = _this.isActive(handler);
            if (isActive && !handler.validate()) {
                count++;
            }
            return count;
        }, 0);
    };
    Validator.prototype.registerValidationHandler = function (handler) {
        var _this = this;
        var currentKey = this.nextKey;
        this.nextKey++;
        this.validationHandlers[currentKey] = handler;
        return function () {
            _this.unregister(currentKey);
        };
    };
    Validator.prototype.unregister = function (key) {
        delete this.validationHandlers[key];
    };
    Validator.prototype.isActive = function (handler) {
        return (_.isFunction(handler.isActive) && handler.isActive())
            || handler.isActive == null
            || handler.isActive === true;
    };
    Validator.prototype.errorMessage = function (handler) {
        return _.isFunction(handler.errorMessage)
            ? handler.errorMessage()
            : handler.errorMessage;
    };
    return Validator;
})();
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map