'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.parentChildBehavior';
exports.serviceName = 'parentChildBehavior';
var ParentChildBehaviorService = (function () {
    function ParentChildBehaviorService() {
    }
    ParentChildBehaviorService.prototype.getChildBehavior = function (child) {
        return child && child.viewData != null
            ? child.viewData.behavior
            : null;
    };
    ParentChildBehaviorService.prototype.triggerChildBehavior = function (child, action) {
        var behavior = this.getChildBehavior(child);
        if (behavior == null) {
            return null;
        }
        else {
            return action(behavior);
        }
    };
    ParentChildBehaviorService.prototype.triggerAllChildBehaviors = function (childList, action) {
        var behaviors = this.getAllChildBehaviors(childList);
        return _.map(behaviors, function (behavior) {
            return action(behavior);
        });
    };
    ParentChildBehaviorService.prototype.getAllChildBehaviors = function (childList) {
        var _this = this;
        return _(childList).map(function (child) { return _this.getChildBehavior(child); })
            .filter(function (behavior) { return behavior != null; })
            .value();
    };
    ParentChildBehaviorService.prototype.registerChildBehavior = function (child, behavior) {
        if (child == null) {
            return;
        }
        if (child.viewData == null) {
            child.viewData = { behavior: null };
        }
        var currentBehavior = child.viewData.behavior;
        if (currentBehavior == null) {
            child.viewData.behavior = behavior;
        }
        else {
            child.viewData.behavior = _.extend(currentBehavior, behavior);
        }
    };
    return ParentChildBehaviorService;
}());
exports.ParentChildBehaviorService = ParentChildBehaviorService;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, ParentChildBehaviorService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXhCLGtCQUFVLEdBQVcsMkNBQTJDLENBQUM7QUFDakUsbUJBQVcsR0FBVyxxQkFBcUIsQ0FBQztBQW9CdkQ7SUFBQTtJQWtEQSxDQUFDO0lBakRBLHFEQUFnQixHQUFoQixVQUE0QixLQUF3QjtRQUNuRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSTtjQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVE7Y0FDdkIsSUFBSSxDQUFDO0lBQ1QsQ0FBQztJQUVELHlEQUFvQixHQUFwQixVQUE2QyxLQUF3QixFQUNsRSxNQUE4QztRQUNoRCxJQUFJLFFBQVEsR0FBYyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNGLENBQUM7SUFFRCw2REFBd0IsR0FBeEIsVUFBaUQsU0FBOEIsRUFDNUUsTUFBOEM7UUFDaEQsSUFBSSxTQUFTLEdBQWdCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxRQUFtQjtZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHlEQUFvQixHQUFwQixVQUFnQyxTQUE4QjtRQUE5RCxpQkFJQztRQUhBLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBd0IsSUFBa0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRyxNQUFNLENBQUMsVUFBQyxRQUFtQixJQUFnQixNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RSxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCwwREFBcUIsR0FBckIsVUFBaUMsS0FBd0IsRUFBRSxRQUFtQjtRQUM3RSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUM7UUFDUixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDckMsQ0FBQztRQUVELElBQUksZUFBZSxHQUFjLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBRXpELEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNwQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRSxDQUFDO0lBQ0YsQ0FBQztJQUNGLGlDQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQztBQWxEWSxrQ0FBMEIsNkJBa0R0QyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIn0=