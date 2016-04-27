"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUk1QjtJQUlDLG1CQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBSHBDLHVCQUFrQixHQUE0QyxFQUFFLENBQUM7UUFDakUsWUFBTyxHQUFXLENBQUMsQ0FBQztJQUVtQixDQUFDO0lBRWhELDRCQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkEsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDO1FBRTVCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQUMsT0FBMkI7WUFDM0QsSUFBSSxRQUFRLEdBQVksS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVoQixJQUFJLEtBQUssR0FBVyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQUEsaUJBVUM7UUFUQSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFhLEVBQUUsT0FBMkI7WUFDeEYsSUFBSSxRQUFRLEdBQVksS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsQ0FBQztZQUNULENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUF5QixHQUF6QixVQUEwQixPQUEyQjtRQUFyRCxpQkFRQztRQVBBLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUU5QyxNQUFNLENBQUM7WUFDTixLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQztJQUNILENBQUM7SUFFTyw4QkFBVSxHQUFsQixVQUFtQixHQUFXO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyw0QkFBUSxHQUFoQixVQUFpQixPQUEyQjtRQUMzQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBb0IsT0FBTyxDQUFDLFFBQVMsRUFBRSxDQUFDO2VBQzFFLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSTtlQUN4QixPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRU8sZ0NBQVksR0FBcEIsVUFBcUIsT0FBMkI7UUFDL0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztjQUNyQixPQUFPLENBQUMsWUFBYSxFQUFFO2NBQ2hDLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDakMsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSxpQkFBUyxZQThEckIsQ0FBQSJ9