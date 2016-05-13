"use strict";
var core_1 = require('@angular/core');
var moment = require('moment');
var compareResult_1 = require('../../types/compareResult');
var date_module_1 = require('../date/date.module');
var TimeUtility = (function () {
    function TimeUtility() {
    }
    TimeUtility.prototype.compareTimes = function (time1, time2) {
        var format = date_module_1.defaultFormats.timeFormat;
        var start = moment(time1, format);
        var end = moment(time2, format);
        if (start.hours() === end.hours()
            && start.minutes() === end.minutes()) {
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
exports.timeToken = new core_1.OpaqueToken('A utility for working with time');
exports.TIME_PROVIDER = new core_1.Provider(exports.timeToken, {
    useClass: TimeUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFDdEQsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsOEJBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsNEJBQStCLHFCQUFxQixDQUFDLENBQUE7QUFNckQ7SUFBQTtJQWlCQSxDQUFDO0lBaEJBLGtDQUFZLEdBQVosVUFBYSxLQUFhLEVBQUUsS0FBYTtRQUN4QyxJQUFJLE1BQU0sR0FBVyw0QkFBYyxDQUFDLFVBQVUsQ0FBQztRQUUvQyxJQUFJLEtBQUssR0FBa0IsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsR0FBa0IsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRTtlQUM3QixLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsNkJBQWEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtlQUNsQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsNkJBQWEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLDZCQUFhLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUM7SUFDRixDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLG1CQUFXLGNBaUJ2QixDQUFBO0FBRVUsbUJBQVcsR0FBaUIsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUU1QyxpQkFBUyxHQUFnQixJQUFJLGtCQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUU1RSxxQkFBYSxHQUFhLElBQUksZUFBUSxDQUFDLGlCQUFTLEVBQUU7SUFDOUQsUUFBUSxFQUFFLFdBQVc7Q0FDckIsQ0FBQyxDQUFDIn0=