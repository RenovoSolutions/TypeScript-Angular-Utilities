"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var notification_service_1 = require('../notification/notification.service');
var validator_1 = require('./validator');
var compositeValidator_1 = require('./compositeValidator');
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
    ValidationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(notification_service_1.notificationServiceToken))
    ], ValidationService);
    return ValidationService;
}());
exports.ValidationService = ValidationService;
exports.validationToken = new core_1.OpaqueToken('Service for building validation rules');
exports.VALIDATION_PROVIDER = new core_1.Provider(exports.validationToken, {
    useClass: ValidationService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEQsZUFBZSxDQUFDLENBQUE7QUFJMUUscUNBQStELHNDQUFzQyxDQUFDLENBQUE7QUFHdEcsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLG1DQUFtQyxzQkFBc0IsQ0FBQyxDQUFBO0FBNEMxRDtJQUdDLDJCQUE4QyxZQUFrQztRQUMvRSxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBRUYsNkRBQWlDLEdBQWpDO1FBQUEsaUJBSUM7UUFIQSxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLFVBQUMsS0FBYTtZQUNsQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwyREFBK0IsR0FBL0I7UUFBQSxpQkFJQztRQUhBLE1BQU0sQ0FBQyxJQUFJLHFCQUFTLENBQUMsVUFBQyxLQUFhO1lBQ2xDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGdEQUFvQixHQUFwQixVQUFxQixTQUF3QjtRQUM1QyxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzRUFBMEMsR0FBMUM7UUFBQSxpQkFJQztRQUhBLE1BQU0sQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFVBQUMsS0FBYTtZQUMzQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvRUFBd0MsR0FBeEM7UUFBQSxpQkFJQztRQUhBLE1BQU0sQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFVBQUMsS0FBYTtZQUMzQyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx5REFBNkIsR0FBN0IsVUFBOEIsU0FBd0I7UUFDckQsTUFBTSxDQUFDLElBQUksdUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQXRDRjtRQUFDLGlCQUFVLEVBQUU7bUJBSUMsYUFBTSxDQUFDLCtDQUF3QixDQUFDO3lCQUpqQztJQXVDYix3QkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7QUF0Q1kseUJBQWlCLG9CQXNDN0IsQ0FBQTtBQUVZLHVCQUFlLEdBQWdCLElBQUksa0JBQVcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRXhGLDJCQUFtQixHQUFhLElBQUksZUFBUSxDQUFDLHVCQUFlLEVBQUU7SUFDMUUsUUFBUSxFQUFFLGlCQUFpQjtDQUMzQixDQUFDLENBQUMifQ==