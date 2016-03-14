'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.string';
exports.serviceName = 'stringUtilityService';
var StringUtilityService = (function () {
    function StringUtilityService() {
    }
    StringUtilityService.prototype.toNumber = function (string) {
        return +string;
    };
    StringUtilityService.prototype.contains = function (str, substring) {
        if (substring) {
            return str.indexOf(substring) !== -1;
        }
        return true;
    };
    StringUtilityService.prototype.substitute = function (formatString) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        _.each(params, function (param, index) {
            formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
        });
        return formatString;
    };
    StringUtilityService.prototype.replaceAll = function (str, patternToFind, replacementString) {
        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
    };
    return StringUtilityService;
}());
exports.StringUtilityService = StringUtilityService;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, StringUtilityService);
//# sourceMappingURL=string.service.js.map