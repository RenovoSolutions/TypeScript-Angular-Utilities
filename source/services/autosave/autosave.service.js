'use strict';
var angular = require('angular');
var _ = require('lodash');
var autosaveAction_service_1 = require('../autosaveAction/autosaveAction.service');
exports.moduleName = 'rl.utilities.services.autosave';
exports.factoryName = 'autosaveFactory';
var AutosaveService = (function () {
    function AutosaveService(autosaveService, save, contentForm, validate) {
        var _this = this;
        this.autosaveService = autosaveService;
        this.save = save;
        this.contentForm = contentForm;
        this.validate = validate;
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
        this.hasValidator = validate != null;
        if (this.contentForm == null) {
            this.contentForm = this.nullForm();
        }
    }
    AutosaveService.prototype.nullForm = function () {
        return {
            $pristine: false,
            $setPristine: function () {
                return;
            },
        };
    };
    return AutosaveService;
})();
autosaveServiceFactory.$inject = [autosaveAction_service_1.serviceName];
function autosaveServiceFactory(autosaveService) {
    'use strict';
    return {
        getInstance: function (save, contentForm, validate) {
            return new AutosaveService(autosaveService, save, contentForm, validate);
        }
    };
}
angular.module(exports.moduleName, [autosaveAction_service_1.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=autosave.service.js.map