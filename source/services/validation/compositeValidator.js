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
}());
exports.CompositeValidator = CompositeValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zaXRlVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9zaXRlVmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRzVCLDBCQUEwQixhQUFhLENBQUMsQ0FBQTtBQU14QztJQUlDLDRCQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBSHBDLG9CQUFlLEdBQTBDLEVBQUUsQ0FBQztRQUM1RCxZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBRW1CLENBQUM7SUFFaEQscUNBQVEsR0FBUjtRQUNDLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQztRQUU1QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxPQUF5QjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBYSxHQUFiO1FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFDLEtBQWEsRUFBRSxPQUF5QjtZQUNuRixNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0RBQW1CLEdBQW5CO1FBQUEsaUJBV0M7UUFWQSxJQUFJLFNBQVMsR0FBcUIsSUFBSSxxQkFBUyxDQUFDLFVBQUMsS0FBYTtZQUM3RCxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUN0QixTQUFVLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUVuRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFRCw0Q0FBZSxHQUFmLFVBQWdCLFNBQTJCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBd0IsU0FBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksMEJBQWtCLHFCQXlDOUIsQ0FBQSJ9