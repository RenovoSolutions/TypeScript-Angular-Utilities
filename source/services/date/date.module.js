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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw4QkFBK0MseUJBQXlCLENBQUMsQ0FBQTtBQUN6RSw2QkFBNkMsc0JBQXNCLENBQUMsQ0FBQTtBQUVwRSw2QkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRCxzQ0FBMEQseUJBQXlCLENBQUMsQ0FBQTtBQUVwRixpQkFBYyxnQkFBZ0IsQ0FBQyxFQUFBO0FBQy9CLGlCQUFjLHlCQUF5QixDQUFDLEVBQUE7QUFFN0Isa0JBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUU3RCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQywwQkFBZ0IsRUFBRSx5QkFBYyxDQUFDLENBQUM7S0FDNUQsT0FBTyxDQUFDLDBCQUFXLEVBQUUsMEJBQVcsQ0FBQztLQUNqQyxLQUFLLENBQUMsaURBQXlCLEVBQUUsc0NBQWMsQ0FBQyxDQUFDIn0=