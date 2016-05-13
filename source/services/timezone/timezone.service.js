"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var moment = require('moment');
var _ = require('lodash');
var timezone_enum_1 = require('./timezone.enum');
__export(require('./timezone.enum'));
var TimezoneService = (function () {
    function TimezoneService() {
    }
    Object.defineProperty(TimezoneService.prototype, "currentTimezone", {
        get: function () {
            return this._currentTimezone;
        },
        enumerable: true,
        configurable: true
    });
    TimezoneService.prototype.setCurrentTimezone = function (offset) {
        var timezone = timezone_enum_1.timezones.get(offset);
        this._currentTimezone = timezone;
    };
    TimezoneService.prototype.getTimezone = function (isoString) {
        if (isoString == null) {
            return null;
        }
        var offsetText = '-' + _.last(isoString.split('-'));
        return timezone_enum_1.timezones.get(offsetText);
    };
    TimezoneService.prototype.getMomentTimezone = function (isoString) {
        var timezone = this.getTimezone(isoString);
        return timezone != null
            ? timezone.momentName
            : null;
    };
    TimezoneService.prototype.buildMomentWithTimezone = function (dateValue, timezone, format) {
        var previousTimezone;
        var previousOffset;
        if (_.isString(dateValue)) {
            previousTimezone = this.getTimezone(dateValue);
        }
        if (previousTimezone != null) {
            previousOffset = previousTimezone.offsetMinutes;
        }
        else {
            previousOffset = moment(dateValue, format).utcOffset();
        }
        var dateWithNewTimezone = moment(dateValue, format).tz(timezone.momentName);
        var offsetDifferenceBetweenOriginalAndNewTimezones = previousOffset - dateWithNewTimezone.utcOffset();
        dateWithNewTimezone.add(offsetDifferenceBetweenOriginalAndNewTimezones, 'minutes');
        return dateWithNewTimezone;
    };
    return TimezoneService;
}());
exports.TimezoneService = TimezoneService;
exports.timezoneService = new TimezoneService();
exports.timezoneToken = new core_1.OpaqueToken('A service for working with timezones');
exports.TIMEZONE_PROVIDER = new core_1.Provider(exports.timezoneToken, {
    useClass: TimezoneService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWV6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFCQUFzQyxlQUFlLENBQUMsQ0FBQTtBQUV0RCxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw4QkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUV2RCxpQkFBYyxpQkFBaUIsQ0FBQyxFQUFBO0FBVWhDO0lBQUE7SUFpREEsQ0FBQztJQTlDQSxzQkFBSSw0Q0FBZTthQUFuQjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsTUFBYztRQUNoQyxJQUFJLFFBQVEsR0FBYyx5QkFBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksU0FBaUI7UUFDNUIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLFVBQVUsR0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLHlCQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwyQ0FBaUIsR0FBakIsVUFBa0IsU0FBaUI7UUFDbEMsSUFBSSxRQUFRLEdBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUk7Y0FDcEIsUUFBUSxDQUFDLFVBQVU7Y0FDbkIsSUFBSSxDQUFDO0lBQ1QsQ0FBQztJQUVELGlEQUF1QixHQUF2QixVQUF3QixTQUFpQyxFQUFFLFFBQW1CLEVBQUUsTUFBZTtRQUM5RixJQUFJLGdCQUEyQixDQUFDO1FBQ2hDLElBQUksY0FBc0IsQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDakQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsY0FBYyxHQUFHLE1BQU0sQ0FBUyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEUsQ0FBQztRQUVELElBQUksbUJBQW1CLEdBQWtCLE1BQU0sQ0FBUyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuRyxJQUFJLDhDQUE4QyxHQUFXLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUU5RyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkYsTUFBTSxDQUFDLG1CQUFtQixDQUFDO0lBQzVCLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksdUJBQWUsa0JBaUQzQixDQUFBO0FBRVUsdUJBQWUsR0FBcUIsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUV4RCxxQkFBYSxHQUFnQixJQUFJLGtCQUFXLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUVyRix5QkFBaUIsR0FBYSxJQUFJLGVBQVEsQ0FBQyxxQkFBYSxFQUFFO0lBQ3RFLFFBQVEsRUFBRSxlQUFlO0NBQ3pCLENBQUMsQ0FBQyJ9