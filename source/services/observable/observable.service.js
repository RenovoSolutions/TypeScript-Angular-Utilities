"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var _ = require('lodash');
var ObservableService = (function () {
    function ObservableService(exceptionHandler) {
        this.watchers = [];
        this.nextKey = 0;
        this.exceptionHandler = exceptionHandler;
    }
    ObservableService.prototype.register = function (action, event) {
        var _this = this;
        if (!_.isFunction(action)) {
            this.exceptionHandler.call(new Error('Watcher must be a function'));
            return null;
        }
        if (this.allowableEvents != null && !_.find(this.allowableEvents, function (e) { return e === event; })) {
            this.exceptionHandler.call(new Error('This event is not allowed. Events: ' + this.allowableEvents.join(', ')));
            return null;
        }
        var currentKey = this.nextKey;
        this.nextKey++;
        this.watchers[currentKey] = {
            action: action,
            event: event,
        };
        return function () {
            _this.unregister(currentKey);
        };
    };
    ObservableService.prototype.fire = function (event) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _(this.watchers).filter(function (watcher) {
            return watcher != null && watcher.event === event;
        })
            .map(function (watcher) {
            return watcher.action.apply(_this, params);
        }).value();
    };
    ObservableService.prototype.unregister = function (key) {
        this.watchers[key] = null;
    };
    ObservableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ExceptionHandler])
    ], ObservableService);
    return ObservableService;
}());
exports.ObservableService = ObservableService;
exports.observableToken = new core_1.OpaqueToken('Deprecated - a service for observables');
exports.OBSERVABLE_PROVIDER = new core_1.Provider(exports.observableToken, {
    useClass: ObservableService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0UsZUFBZSxDQUFDLENBQUE7QUFDcEYsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUEwQjVCO0lBTUMsMkJBQVksZ0JBQWtDO1FBSnRDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBQy9CLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFJM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzFDLENBQUM7SUFFRCxvQ0FBUSxHQUFSLFVBQXNCLE1BQTRCLEVBQUUsS0FBYztRQUFsRSxpQkFxQkM7UUFwQkEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQUMsQ0FBUyxJQUFnQixNQUFNLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLHFDQUFxQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRztZQUMzQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxLQUFLO1NBQ1osQ0FBQztRQUVGLE1BQU0sQ0FBQztZQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBa0IsS0FBYztRQUFoQyxpQkFPQztRQVBpQyxnQkFBZ0I7YUFBaEIsV0FBZ0IsQ0FBaEIsc0JBQWdCLENBQWhCLElBQWdCO1lBQWhCLCtCQUFnQjs7UUFDakQsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBOEI7WUFDN0QsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7UUFDbkQsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUMsT0FBOEI7WUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTyxzQ0FBVSxHQUFsQixVQUFtQixHQUFXO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUE3Q0Y7UUFBQyxpQkFBVSxFQUFFOzt5QkFBQTtJQThDYix3QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1kseUJBQWlCLG9CQTZDN0IsQ0FBQTtBQUVZLHVCQUFlLEdBQWdCLElBQUksa0JBQVcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRXpGLDJCQUFtQixHQUFhLElBQUksZUFBUSxDQUFDLHVCQUFlLEVBQUU7SUFDMUUsUUFBUSxFQUFFLGlCQUFpQjtDQUMzQixDQUFDLENBQUMifQ==