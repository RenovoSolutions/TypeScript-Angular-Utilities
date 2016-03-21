'use strict';
var angular = require('angular');
var uuid = require('uuid');
exports.moduleName = 'rl.utilities.services.guid';
exports.serviceName = 'guidService';
var GuidService = (function () {
    function GuidService() {
    }
    GuidService.prototype.time = function () {
        return uuid.v1();
    };
    GuidService.prototype.random = function () {
        return uuid.v4();
    };
    return GuidService;
}());
exports.guid = new GuidService();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, GuidService);
//# sourceMappingURL=guid.service.js.map