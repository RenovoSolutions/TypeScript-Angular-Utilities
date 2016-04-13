'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWV6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7O0FBR2IsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDakMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsOEJBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFHdkQsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQVVoQztJQUFBO0lBaURBLENBQUM7SUE5Q0Esc0JBQUksNENBQWU7YUFBbkI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLE1BQWM7UUFDaEMsSUFBSSxRQUFRLEdBQWMseUJBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLFNBQWlCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxVQUFVLEdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyx5QkFBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMkNBQWlCLEdBQWpCLFVBQWtCLFNBQWlCO1FBQ2xDLElBQUksUUFBUSxHQUFjLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJO2NBQ3BCLFFBQVEsQ0FBQyxVQUFVO2NBQ25CLElBQUksQ0FBQztJQUNULENBQUM7SUFFRCxpREFBdUIsR0FBdkIsVUFBd0IsU0FBaUMsRUFBRSxRQUFtQixFQUFFLE1BQWU7UUFDOUYsSUFBSSxnQkFBMkIsQ0FBQztRQUNoQyxJQUFJLGNBQXNCLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QixjQUFjLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLGNBQWMsR0FBRyxNQUFNLENBQVMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hFLENBQUM7UUFFRCxJQUFJLG1CQUFtQixHQUFrQixNQUFNLENBQVMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkcsSUFBSSw4Q0FBOEMsR0FBVyxjQUFjLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFOUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUM1QixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLHVCQUFlLGtCQWlEM0IsQ0FBQTtBQUVVLHVCQUFlLEdBQXFCLElBQUksZUFBZSxFQUFFLENBQUMifQ==