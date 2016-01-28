'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.time';
exports.serviceName = 'timeUtility';
var TimeUtility = (function () {
    function TimeUtility() {
    }
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
})();
exports.TimeUtility = TimeUtility;
exports.timeUtility = new TimeUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, TimeUtility);
//# sourceMappingURL=time.service.js.map