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
//# sourceMappingURL=parentChildBehavior.service.js.map