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
    TimezoneService.prototype.buildMomentWithTimezone = function (dateValue, timezone) {
        var previousTimezone;
        var previousOffset;
        if (_.isString(dateValue)) {
            previousTimezone = this.getTimezone(dateValue);
        }
        if (previousTimezone != null) {
            previousOffset = previousTimezone.offsetMinutes;
        }
        else {
            previousOffset = moment(dateValue).utcOffset();
        }
        var dateWithNewTimezone = moment(dateValue).tz(timezone.momentName);
        var offsetDifferenceBetweenOriginalAndNewTimezones = previousOffset - dateWithNewTimezone.utcOffset();
        dateWithNewTimezone.add(offsetDifferenceBetweenOriginalAndNewTimezones, 'minutes');
        return dateWithNewTimezone;
    };
    return TimezoneService;
}());
exports.TimezoneService = TimezoneService;
exports.timezoneService = new TimezoneService();
//# sourceMappingURL=timezone.service.js.map