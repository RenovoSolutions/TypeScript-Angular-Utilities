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
                _this.showError(error, handler.name);
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
}());
exports.Validator = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBSTVCO0lBSUMsbUJBQW9CLFNBQXdCO1FBQXhCLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFIcEMsdUJBQWtCLEdBQTRDLEVBQUUsQ0FBQztRQUNqRSxZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBRW1CLENBQUM7SUFFaEQsNEJBQVEsR0FBUjtRQUFBLGlCQWlCQztRQWhCQSxJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUM7UUFFNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxPQUEyQjtZQUMzRCxJQUFJLFFBQVEsR0FBWSxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBRWhCLElBQUksS0FBSyxHQUFXLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFcEMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNkLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFBQSxpQkFVQztRQVRBLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEtBQWEsRUFBRSxPQUEyQjtZQUN4RixJQUFJLFFBQVEsR0FBWSxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxDQUFDO1lBQ1QsQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkNBQXlCLEdBQXpCLFVBQTBCLE9BQTJCO1FBQXJELGlCQVFDO1FBUEEsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRTlDLE1BQU0sQ0FBQztZQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVPLDhCQUFVLEdBQWxCLFVBQW1CLEdBQVc7UUFDN0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLDRCQUFRLEdBQWhCLFVBQWlCLE9BQTJCO1FBQzNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFvQixPQUFPLENBQUMsUUFBUyxFQUFFLENBQUM7ZUFDMUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJO2VBQ3hCLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFTyxnQ0FBWSxHQUFwQixVQUFxQixPQUEyQjtRQUMvQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2NBQ3JCLE9BQU8sQ0FBQyxZQUFhLEVBQUU7Y0FDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBOURELElBOERDO0FBOURZLGlCQUFTLFlBOERyQixDQUFBIn0=