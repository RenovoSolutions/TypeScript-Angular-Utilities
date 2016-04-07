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
        var momentOffset = timezone_service_1.timezoneService.getMomentTimezone(isoDateTime);
        return this.moment(isoDateTime, dateTimeFormatStrings_1.defaultFormats.isoFormat).tz(momentOffset);
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
//# sourceMappingURL=date.service.js.map