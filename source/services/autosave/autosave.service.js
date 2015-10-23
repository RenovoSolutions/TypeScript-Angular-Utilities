'use strict';
var angular = require('angular');
var _ = require('lodash');
var autosaveAction_service_1 = require('../autosaveAction/autosaveAction.service');
exports.moduleName = 'rl.utilities.services.autosave';
exports.factoryName = 'autosaveFactory';
var AutosaveService = (function () {
    function AutosaveService($rootScope, $timeout, autosaveService, options) {
        var _this = this;
        this.$timeout = $timeout;
        this.autosaveService = autosaveService;
        this.debounceDuration = 1000;
        this.autosave = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            if (_this.contentForm.$pristine) {
                return true;
            }
            var valid = true;
            if (_this.hasValidator) {
                valid = _this.validate();
                if (valid === undefined) {
                    valid = true;
                }
            }
            if (valid) {
                var promise = _this.save.apply(_this, data);
                if (!_.isUndefined(promise)) {
                    _this.autosaveService.trigger(promise.then(function () {
                        if (_this.contentForm != null) {
                            _this.contentForm.$setPristine();
                        }
                    }));
                }
                return true;
            }
            else {
                return false;
            }
        };
        this.hasValidator = options.validate != null;
        this.contentForm = options.contentForm || this.nullForm();
        this.save = options.save;
        this.validate = options.validate;
        this.initChangeListeners(options);
        $rootScope.$watch(function () { return _this.contentForm.$dirty; }, function (value) {
            if (value) {
                _this.setTimer();
                _this.clearChangeListener = _this.setChangeListener(function () {
                    $timeout.cancel(_this.timer);
                    _this.setTimer();
                });
            }
        });
    }
    AutosaveService.prototype.setTimer = function () {
        var _this = this;
        this.timer = this.$timeout(function () {
            _this.clearChangeListener();
            _this.autosave();
        }, this.debounceDuration);
    };
    AutosaveService.prototype.nullForm = function () {
        return {
            $pristine: false,
            $dirty: true,
            $setPristine: function () {
                return;
            },
        };
    };
    AutosaveService.prototype.initChangeListeners = function (options) {
        this.setChangeListener = options.setChangeListener || this.nullSetListener;
        this.clearChangeListener = this.nullClearListener;
    };
    AutosaveService.prototype.nullSetListener = function () {
        console.log('No change listener available');
        return this.nullClearListener;
    };
    AutosaveService.prototype.nullClearListener = function () {
        console.log('No change listener register');
    };
    return AutosaveService;
})();
autosaveServiceFactory.$inject = ['$rootScope', '$timeout', autosaveAction_service_1.serviceName];
function autosaveServiceFactory($rootScope, $timeout, autosaveService) {
    'use strict';
    return {
        getInstance: function (options) {
            return new AutosaveService($rootScope, $timeout, autosaveService, options);
        }
    };
}
angular.module(exports.moduleName, [autosaveAction_service_1.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=autosave.service.js.map