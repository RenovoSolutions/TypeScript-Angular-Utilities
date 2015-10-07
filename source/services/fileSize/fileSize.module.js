'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var number_service_1 = require('../number/number.service');
var fileSize_service_1 = require('./fileSize.service');
var fileSizeFilter_1 = require('./fileSizeFilter');
__export(require('./fileSize.service'));
__export(require('./fileSizeFilter'));
exports.moduleName = 'rl.utilities.services.fileSize';
angular.module(exports.moduleName, [number_service_1.moduleName])
    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
//# sourceMappingURL=fileSize.module.js.map