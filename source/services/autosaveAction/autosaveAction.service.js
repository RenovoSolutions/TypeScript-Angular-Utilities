'use strict';
var ng = require('angular');
exports.moduleName = 'rl.utilities.services.autosaveAction';
exports.serviceName = 'autosaveAction';
var AutosaveActionService = (function () {
    function AutosaveActionService($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.completeMessageDuration = 1000;
        this.autosaveSuccessful = function (data) {
            return _this.resolveAutosave(data, true);
        };
        this.autosaveFailed = function (data) {
            return _this.resolveAutosave(data, false);
        };
        this.resolveAutosave = function (data, success) {
            _this._saving = false;
            _this._complete = true;
            _this._successful = success;
            _this.$timeout(function () {
                _this._complete = false;
            }, _this.completeMessageDuration);
            return data;
        };
    }
    Object.defineProperty(AutosaveActionService.prototype, "saving", {
        get: function () {
            return this._saving;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "complete", {
        get: function () {
            return this._complete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "successful", {
        get: function () {
            return this._successful;
        },
        enumerable: true,
        configurable: true
    });
    AutosaveActionService.prototype.trigger = function (promise) {
        this._saving = true;
        return promise.then(this.autosaveSuccessful)
            .catch(this.autosaveFailed);
    };
    AutosaveActionService.$inject = ['$timeout'];
    return AutosaveActionService;
})();
ng.module(exports.moduleName, [])
    .service(exports.serviceName, AutosaveActionService);
//# sourceMappingURL=autosaveAction.service.js.map