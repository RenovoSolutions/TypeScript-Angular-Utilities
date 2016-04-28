"use strict";
var core_1 = require('angular2/core');
var _ = require('lodash');
var moment = require('moment');
require('moment-timezone');
var timezone_service_1 = require('../timezone/timezone.service');
var dateTimeFormatStrings_1 = require('./dateTimeFormatStrings');
var compareResult_1 = require('../../types/compareResult');
var DateUtility = (function () {
    function DateUtility() {
        this.baseFormat = dateTimeFormatStrings_1.defaultFormats.isoFormat;
    }
    DateUtility.prototype.getFullString = function (month) {
        return moment().month(month).format('MMMM');
    };
    DateUtility.prototype.subtractDates = function (start, end, dateFormat) {
        var duration = this.subtractDatesMoment(start, end, dateFormat);
        if (duration == null) {
            return null;
        }
        var result = {};
        result.days = Math.floor(duration.days());
        result.months = Math.floor(duration.months());
        result.years = Math.floor(duration.years());
        return result;
    };
    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
        var duration = this.subtractDatesMoment(start, end, dateFormat);
        return duration != null
            ? duration.asDays()
            : null;
    };
    DateUtility.prototype.subtractDateInMilliseconds = function (start, end, dateFormat) {
        var duration = this.subtractDatesMoment(start, end, dateFormat);
        return duration != null
            ? duration.asMilliseconds()
            : null;
    };
    DateUtility.prototype.subtractDatesMoment = function (start, end, dateFormat) {
        if (start == null || end == null) {
            return null;
        }
        var startDate = this.parseDate(start, dateFormat);
        var endDate = this.parseDate(end, dateFormat);
        return moment.duration(endDate.diff(startDate));
    };
    DateUtility.prototype.compareDates = function (date1, date2, dateFormat) {
        // subtractDateInDays subtracts the fist from the second, assuming start and end dates
        var difference = this.subtractDateInMilliseconds(date2, date1, dateFormat);
        return compareResult_1.getCompareResult(difference);
    };
    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
        if (date == null || rangeStart == null || rangeEnd == null) {
            return null;
        }
        if (this.compareDates(date, rangeStart) === compareResult_1.CompareResult.less
            || this.compareDates(date, rangeEnd) === compareResult_1.CompareResult.greater) {
            return false;
        }
        else {
            return true;
        }
    };
    DateUtility.prototype.getDateFromISOString = function (isoDateTime) {
        if (isoDateTime == null) {
            return null;
        }
        var momentOffset = timezone_service_1.timezoneService.getMomentTimezone(isoDateTime);
        var momentDate = moment(isoDateTime, dateTimeFormatStrings_1.defaultFormats.isoFormat);
        return momentOffset != null
            ? momentDate.tz(momentOffset)
            : momentDate.tz(timezone_service_1.timezoneService.currentTimezone.momentName);
    };
    DateUtility.prototype.isDate = function (date, dateFormat) {
        if (_.isDate(date)) {
            //lodash will return true if it is a valid date object, but has in invalid value.
            //check the time value of the date object to verify that it's a Valid Date.
            return !isNaN(date.getTime());
        }
        return moment(date, this.getFormat(dateFormat)).isValid();
    };
    DateUtility.prototype.getNow = function () {
        if (timezone_service_1.timezoneService.currentTimezone != null) {
            return moment().tz(timezone_service_1.timezoneService.currentTimezone.momentName);
        }
        return moment();
    };
    DateUtility.prototype.formatDate = function (date, dateFormat) {
        return moment(this.parseDate(date, dateFormat)).format(this.getFormat(dateFormat));
    };
    DateUtility.prototype.sameDate = function (date1, date2, date1Format, date2Format, granularity) {
        if (date1 == null || date2 == null) {
            return null;
        }
        date2Format = date2Format || date1Format;
        granularity = granularity || 'day';
        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
            var moment1 = this.parseDate(date1, date1Format);
            var moment2 = this.parseDate(date2, date2Format);
            return moment1.isSame(moment2, granularity);
        }
        else {
            return false;
        }
    };
    DateUtility.prototype.sameDateTime = function (date1, date2, date1Format, date2Format) {
        return this.sameDate(date1, date2, date1Format, date2Format, 'milliseconds');
    };
    DateUtility.prototype.parseDate = function (date, dateFormat) {
        if (_.isDate(date)) {
            return moment(date);
        }
        return moment(date, this.getFormat(dateFormat));
    };
    DateUtility.prototype.getFormat = function (customFormat) {
        return customFormat != null ? customFormat : this.baseFormat;
    };
    return DateUtility;
}());
exports.DateUtility = DateUtility;
exports.dateUtility = new DateUtility();
exports.dateToken = new core_1.OpaqueToken('A utility for working with dates');
exports.DATE_PROVIDER = new core_1.Provider(exports.dateToken, {
    useClass: DateUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFFdEQsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDakMsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpCLGlDQUFnQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRS9ELHNDQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXpELDhCQUFnRCwyQkFBMkIsQ0FBQyxDQUFBO0FBOEI1RTtJQUNDO1FBRVEsZUFBVSxHQUFXLHNDQUFjLENBQUMsU0FBUyxDQUFDO0lBRnZDLENBQUM7SUFJaEIsbUNBQWEsR0FBYixVQUFjLEtBQWE7UUFDMUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxLQUFvQyxFQUFFLEdBQWtDLEVBQUUsVUFBbUI7UUFDMUcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBb0IsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7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