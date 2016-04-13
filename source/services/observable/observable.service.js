'use strict';
var ng = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.observable';
exports.factoryName = 'observableFactory';
var ObservableService = (function () {
    function ObservableService($exceptionHandler) {
        this.$exceptionHandler = $exceptionHandler;
        this.watchers = [];
        this.nextKey = 0;
    }
    ObservableService.prototype.register = function (action, event) {
        var _this = this;
        if (!_.isFunction(action)) {
            this.$exceptionHandler(new Error('Watcher must be a function'));
            return null;
        }
        if (this.allowableEvents != null && !_.find(this.allowableEvents, function (e) { return e === event; })) {
            this.$exceptionHandler(new Error('This event is not allowed. Events: ' + this.allowableEvents.join(', ')));
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
observableServiceFactory.$inject = ['$exceptionHandler'];
function observableServiceFactory($exceptionHandler) {
    'use strict';
    return {
        getInstance: function () {
            return new ObservableService($exceptionHandler);
        }
    };
}
exports.observableServiceFactory = observableServiceFactory;
ng.module(exports.moduleName, [])
    .factory(exports.factoryName, observableServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksRUFBRSxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQzlCLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpCLGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQsbUJBQVcsR0FBVyxtQkFBbUIsQ0FBQztBQXVCckQ7SUFLQywyQkFBb0IsaUJBQW1EO1FBQW5ELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0M7UUFKL0QsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFDL0IsWUFBTyxHQUFXLENBQUMsQ0FBQztJQUc4QyxDQUFDO0lBRTNFLG9DQUFRLEdBQVIsVUFBc0IsTUFBNEIsRUFBRSxLQUFjO1FBQWxFLGlCQXFCQztRQXBCQSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFDLENBQVMsSUFBZ0IsTUFBTSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksS0FBSyxDQUFDLHFDQUFxQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRztZQUMzQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxLQUFLO1NBQ1osQ0FBQztRQUVGLE1BQU0sQ0FBQztZQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBa0IsS0FBYztRQUFoQyxpQkFPQztRQVBpQyxnQkFBZ0I7YUFBaEIsV0FBZ0IsQ0FBaEIsc0JBQWdCLENBQWhCLElBQWdCO1lBQWhCLCtCQUFnQjs7UUFDakQsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBOEI7WUFDN0QsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7UUFDbkQsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUMsT0FBOEI7WUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTyxzQ0FBVSxHQUFsQixVQUFtQixHQUFXO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1kseUJBQWlCLG9CQTBDN0IsQ0FBQTtBQU1ELHdCQUF3QixDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDekQsa0NBQXlDLGlCQUFtRDtJQUMzRixZQUFZLENBQUM7SUFFYixNQUFNLENBQUM7UUFDTixXQUFXO1lBQ1YsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFSZSxnQ0FBd0IsMkJBUXZDLENBQUE7QUFHRCxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQ3ZCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLHdCQUF3QixDQUFDLENBQUMifQ==