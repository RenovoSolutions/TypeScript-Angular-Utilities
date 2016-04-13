'use strict';
var angular = require('angular');
var notification_service_1 = require('../notification/notification.service');
var validator_1 = require('./validator');
var compositeValidator_1 = require('./compositeValidator');
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
}());
exports.ValidationService = ValidationService;
angular.module(exports.moduleName, [notification_service_1.moduleName])
    .service(exports.serviceName, ValidationService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBR25DLHFDQUlPLHNDQUFzQyxDQUFDLENBQUE7QUFHOUMsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLG1DQUFtQyxzQkFBc0IsQ0FBQyxDQUFBO0FBSS9DLGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQsbUJBQVcsR0FBVyxtQkFBbUIsQ0FBQztBQXlDckQ7SUFFQywyQkFBb0IsWUFBa0M7UUFBbEMsaUJBQVksR0FBWixZQUFZLENBQXNCO0lBQUksQ0FBQztJQUUzRCw2REFBaUMsR0FBakM7UUFBQSxpQkFJQztRQUhBLE1BQU0sQ0FBQyxJQUFJLHFCQUFTLENBQUMsVUFBQyxLQUFhO1lBQ2xDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDJEQUErQixHQUEvQjtRQUFBLGlCQUlDO1FBSEEsTUFBTSxDQUFDLElBQUkscUJBQVMsQ0FBQyxVQUFDLEtBQWE7WUFDbEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCLFVBQXFCLFNBQXdCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLHFCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELHNFQUEwQyxHQUExQztRQUFBLGlCQUlDO1FBSEEsTUFBTSxDQUFDLElBQUksdUNBQWtCLENBQUMsVUFBQyxLQUFhO1lBQzNDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9FQUF3QyxHQUF4QztRQUFBLGlCQUlDO1FBSEEsTUFBTSxDQUFDLElBQUksdUNBQWtCLENBQUMsVUFBQyxLQUFhO1lBQzNDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHlEQUE2QixHQUE3QixVQUE4QixTQUF3QjtRQUNyRCxNQUFNLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBakNNLHlCQUFPLEdBQWEsQ0FBQyxrQ0FBdUIsQ0FBQyxDQUFDO0lBa0N0RCx3QkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1kseUJBQWlCLG9CQW1DN0IsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLGlDQUFzQixDQUFDLENBQUM7S0FDbEQsT0FBTyxDQUFDLG1CQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyJ9