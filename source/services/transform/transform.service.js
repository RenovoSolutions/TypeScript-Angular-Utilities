'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.transform';
exports.serviceName = 'transformService';
var TransformService = (function () {
    function TransformService() {
    }
    TransformService.prototype.getValue = function (item, transform) {
        if (item == null) {
            return null;
        }
        if (transform == null) {
            return item;
        }
        return _.isFunction(transform)
            ? transform(item)
            : item[transform];
    };
    return TransformService;
}());
exports.TransformService = TransformService;
exports.transform = new TransformService();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, TransformService);
//# sourceMappingURL=transform.service.js.map