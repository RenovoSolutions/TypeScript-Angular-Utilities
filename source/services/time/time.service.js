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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDhCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELDRCQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBRTFDLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsbUJBQVcsR0FBVyxhQUFhLENBQUM7QUFNL0M7SUFBQTtJQWlCQSxDQUFDO0lBaEJBLGtDQUFZLEdBQVosVUFBYSxLQUFhLEVBQUUsS0FBYTtRQUN4QyxJQUFJLE1BQU0sR0FBVyw0QkFBYyxDQUFDLFVBQVUsQ0FBQztRQUUvQyxJQUFJLEtBQUssR0FBa0IsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsR0FBa0IsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtlQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsNkJBQWEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtlQUNsQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsNkJBQWEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLDZCQUFhLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUM7SUFDRixDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLG1CQUFXLGNBaUJ2QixDQUFBO0FBRVUsbUJBQVcsR0FBaUIsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUV6RCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=