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
//# sourceMappingURL=observable.service.js.map