'use strict';
var ng = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.observable';
exports.factoryName = 'observableFactory';
var ObservableService = (function () {
    function ObservableService() {
        this.watchers = [];
        this.nextKey = 0;
    }
    ObservableService.prototype.register = function (action, event) {
        var _this = this;
        if (!_.isFunction(action)) {
            console.error('Error: watcher must be a function');
            return null;
        }
        if (this.allowableEvents != null && !_.find(this.allowableEvents, function (e) { return e === event; })) {
            console.error('Error: This event is not allowed.');
            console.error('Events: ' + this.allowableEvents.join(', '));
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
    return ObservableService;
}());
exports.ObservableService = ObservableService;
function observableServiceFactory() {
    'use strict';
    return {
        getInstance: function () {
            return new ObservableService();
        }
    };
}
exports.observableServiceFactory = observableServiceFactory;
ng.module(exports.moduleName, [])
    .factory(exports.factoryName, observableServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksRUFBRSxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQzlCLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpCLGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQsbUJBQVcsR0FBVyxtQkFBbUIsQ0FBQztBQXVCckQ7SUFBQTtRQUNTLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBQy9CLFlBQU8sR0FBVyxDQUFDLENBQUM7SUF1QzdCLENBQUM7SUFwQ0Esb0NBQVEsR0FBUixVQUFzQixNQUE0QixFQUFFLEtBQWM7UUFBbEUsaUJBc0JDO1FBckJBLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxDQUFTLElBQWdCLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BILE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQzNCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7U0FDWixDQUFDO1FBRUYsTUFBTSxDQUFDO1lBQ04sS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFrQixLQUFjO1FBQWhDLGlCQU9DO1FBUGlDLGdCQUFnQjthQUFoQixXQUFnQixDQUFoQixzQkFBZ0IsQ0FBaEIsSUFBZ0I7WUFBaEIsK0JBQWdCOztRQUNqRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUE4QjtZQUM3RCxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNuRCxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQyxPQUE4QjtZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLHNDQUFVLEdBQWxCLFVBQW1CLEdBQVc7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSx5QkFBaUIsb0JBeUM3QixDQUFBO0FBTUQ7SUFDQyxZQUFZLENBQUM7SUFFYixNQUFNLENBQUM7UUFDTixXQUFXO1lBQ1YsTUFBTSxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFSZSxnQ0FBd0IsMkJBUXZDLENBQUE7QUFHRCxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQ3ZCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLHdCQUF3QixDQUFDLENBQUMifQ==