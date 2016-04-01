'use strict';
var angular = require('angular');
var moment = require('moment');
var compareResult_1 = require('../../types/compareResult');
var date_module_1 = require('../date/date.module');
exports.moduleName = 'rl.utilities.services.time';
exports.serviceName = 'timeUtility';
var TimeUtility = (function () {
    function TimeUtility() {
    }
    TimeUtility.prototype.compareTimes = function (time1, time2) {
        var format = date_module_1.defaultFormats.timeFormat;
        var start = moment(time1, format);
        var end = moment(time2, format);
        if (start.hours() == end.hours()
            && start.minutes() == end.minutes()) {
            return compareResult_1.CompareResult.equal;
        }
        else if (start.hours() >= end.hours()
            && start.minutes() >= end.minutes()) {
            return compareResult_1.CompareResult.greater;
        }
        else {
            return compareResult_1.CompareResult.less;
        }
    };
    return TimeUtility;
}());
exports.TimeUtility = TimeUtility;
exports.timeUtility = new TimeUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, TimeUtility);
//# sourceMappingURL=time.service.js.map