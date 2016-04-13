'use strict';
var moment = require('moment');
var date_module_1 = require('../../../date/date.module');
exports.defaultFormats = date_module_1.defaultFormats;
var timezone_service_1 = require('../../../timezone/timezone.service');
exports.timeConverter = {
    fromServer: function (raw) {
        return timezone_service_1.timezoneService.buildMomentWithTimezone(raw, timezone_service_1.timezoneService.currentTimezone, date_module_1.defaultFormats.timeFormat);
    },
    toServer: function (data) {
        return data != null
            ? moment(data).format(date_module_1.defaultFormats.timeFormat)
            : null;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFHakMsNEJBQStCLDJCQUEyQixDQUFDLENBQUE7QUFHbEQsc0JBQWM7QUFGdkIsaUNBQWdDLG9DQUFvQyxDQUFDLENBQUE7QUFJMUQscUJBQWEsR0FBOEI7SUFDckQsVUFBVSxZQUFDLEdBQVc7UUFDckIsTUFBTSxDQUFDLGtDQUFlLENBQUMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLGtDQUFlLENBQUMsZUFBZSxFQUFFLDRCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUNELFFBQVEsWUFBQyxJQUFtQjtRQUMzQixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUk7Y0FDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyw0QkFBYyxDQUFDLFVBQVUsQ0FBQztjQUM5QyxJQUFJLENBQUM7SUFDVCxDQUFDO0NBQ0QsQ0FBQyJ9