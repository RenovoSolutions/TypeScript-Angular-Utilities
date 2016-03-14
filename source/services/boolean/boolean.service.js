'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.boolean';
exports.serviceName = 'booleanUtility';
var BooleanUtility = (function () {
    function BooleanUtility() {
    }
    BooleanUtility.prototype.toBool = function (object) {
        return !!object;
    };
    return BooleanUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, BooleanUtility);
//# sourceMappingURL=boolean.service.js.map