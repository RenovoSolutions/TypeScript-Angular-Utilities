'use strict';
var _ = require('lodash');
var moment = require('moment');
require('moment-timezone');
var moment_module_1 = require('../moment/moment.module');
var timezone_service_1 = require('../timezone/timezone.service');
var dateTimeFormatStrings_1 = require('./dateTimeFormatStrings');
var compareResult_1 = require('../../types/compareResult');
exports.serviceName = 'dateUtility';
var DateUtility = (function () {
    function DateUtility(moment) {
        this.moment = moment;
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
        var momentDate = this.moment(isoDateTime, dateTimeFormatStrings_1.defaultFormats.isoFormat);
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
        return this.moment(date, this.getFormat(dateFormat)).isValid();
    };
    DateUtility.prototype.getNow = function () {
        if (timezone_service_1.timezoneService.currentTimezone != null) {
            return moment().tz(timezone_service_1.timezoneService.currentTimezone.momentName);
        }
        return moment();
    };
    DateUtility.prototype.formatDate = function (date, dateFormat) {
        return this.moment(this.parseDate(date, dateFormat)).format(this.getFormat(dateFormat));
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
            return this.moment(date);
        }
        return this.moment(date, this.getFormat(dateFormat));
    };
    DateUtility.prototype.getFormat = function (customFormat) {
        return customFormat != null ? customFormat : this.baseFormat;
    };
    DateUtility.$inject = [moment_module_1.serviceName];
    return DateUtility;
}());
exports.DateUtility = DateUtility;
exports.dateUtility = new DateUtility(moment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUdiLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQ2pDLFFBQU8saUJBQWlCLENBQUMsQ0FBQTtBQUV6Qiw4QkFHTyx5QkFBeUIsQ0FBQyxDQUFBO0FBRWpDLGlDQUFnQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRS9ELHNDQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXpELDhCQUFnRCwyQkFBMkIsQ0FBQyxDQUFBO0FBRWpFLG1CQUFXLEdBQVcsYUFBYSxDQUFDO0FBNkIvQztJQUVDLHFCQUFvQixNQUEyQjtRQUEzQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUV2QyxlQUFVLEdBQVcsc0NBQWMsQ0FBQyxTQUFTLENBQUM7SUFGSixDQUFDO0lBSW5ELG1DQUFhLEdBQWIsVUFBYyxLQUFhO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsS0FBb0MsRUFBRSxHQUFrQyxFQUFFLFVBQW1CO1FBQzFHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFD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