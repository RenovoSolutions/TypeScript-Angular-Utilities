"use strict";
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
}());
exports.CompositeValidator = CompositeValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zaXRlVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9zaXRlVmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUc1QiwwQkFBMEIsYUFBYSxDQUFDLENBQUE7QUFNeEM7SUFJQyw0QkFBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUhwQyxvQkFBZSxHQUEwQyxFQUFFLENBQUM7UUFDNUQsWUFBTyxHQUFXLENBQUMsQ0FBQztJQUVtQixDQUFDO0lBRWhELHFDQUFRLEdBQVI7UUFDQyxJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUM7UUFFNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQUMsT0FBeUI7WUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQsMENBQWEsR0FBYjtRQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxLQUFhLEVBQUUsT0FBeUI7WUFDbkYsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFtQixHQUFuQjtRQUFBLGlCQVdDO1FBVkEsSUFBSSxTQUFTLEdBQXFCLElBQUkscUJBQVMsQ0FBQyxVQUFDLEtBQWE7WUFDN0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDdEIsU0FBVSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFFbkQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixTQUEyQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQXdCLFNBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLDBCQUFrQixxQkF5QzlCLENBQUEifQ==