'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var moment_module_1 = require('../moment/moment.module');
var time_service_1 = require('../time/time.service');
var date_service_1 = require('./date.service');
var dateTimeFormatStrings_1 = require('./dateTimeFormatStrings');
__export(require('./date.service'));
__export(require('./dateTimeFormatStrings'));
exports.moduleName = 'rl.utilities.services.date';
angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
    .service(date_service_1.serviceName, date_service_1.DateUtility)
    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);
//# sourceMappingURL=date.module.js.map