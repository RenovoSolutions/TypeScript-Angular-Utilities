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
    TimeUtility.prototype.millisecondsToSeconds = function (milliseconds) {
        return Math.floor(milliseconds / 1000);
    };
    TimeUtility.prototype.millisecondsToMinutes = function (milliseconds) {
        return Math.floor(this.millisecondsToSeconds(milliseconds) / 60);
    };
    TimeUtility.prototype.millisecondsToHours = function (milliseconds) {
        return Math.floor(this.millisecondsToMinutes(milliseconds) / 60);
    };
    TimeUtility.prototype.millisecondsToDays = function (milliseconds) {
        return Math.floor(this.millisecondsToHours(milliseconds) / 24);
    };
    return TimeUtility;
}());
exports.TimeUtility = TimeUtility;
exports.timeUtility = new TimeUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, TimeUtility);
//# sourceMappingURL=time.service.js.map