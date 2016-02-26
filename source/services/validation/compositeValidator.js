'use strict';
var _ = require('lodash');
var validator_1 = require('./validator');
var CompositeValidator = (function () {
    function CompositeValidator(showError) {
        this.showError = showError;
        this.childValidators = {};
        this.nextKey = 0;
    }
    CompositeValidator.prototype.validate = function () {
        var isValid = true;
        _.each(this.childValidators, function (handler) {
            if (!handler.validate()) {
                isValid = false;
                return false;
            }
        });
        return isValid;
    };
    CompositeValidator.prototype.getErrorCount = function () {
        return _.reduce(this.childValidators, function (count, handler) {
            return count += handler.getErrorCount();
        }, 0);
    };
    CompositeValidator.prototype.buildChildValidator = function () {
        var _this = this;
        var validator = new validator_1.Validator(function (error) {
            _this.showError(error);
        });
        var currentKey = this.nextKey;
        this.nextKey++;
        this.childValidators[currentKey] = validator;
        validator.key = currentKey;
        return validator;
    };
    CompositeValidator.prototype.unregisterChild = function (validator) {
        delete this.childValidators[validator.key];
    };
    return CompositeValidator;
})();
exports.CompositeValidator = CompositeValidator;
//# sourceMappingURL=compositeValidator.js.map