'use strict';
var _ = require('lodash');
var moment = require('moment');
var moment_module_1 = require('../moment/moment.module');
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
        var result = {};
        result.days = Math.floor(duration.days());
        result.months = Math.floor(duration.months());
        result.years = Math.floor(duration.years());
        return result;
    };
    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
        var duration = this.subtractDatesMoment(start, end, dateFormat);
        return duration.asDays();
    };
    DateUtility.prototype.subtractDateInMilliseconds = function (start, end, dateFormat) {
        var duration = this.subtractDatesMoment(start, end, dateFormat);
        return duration.asMilliseconds();
    };
    DateUtility.prototype.subtractDatesMoment = function (start, end, dateFormat) {
        if (start == null || end == null) {
            return null;
        }
        var startDate = this.getDate(start, dateFormat);
        var endDate = this.getDate(end, dateFormat);
        return moment.duration(endDate.diff(startDate));
    };
    DateUtility.prototype.compareDates = function (date1, date2, dateFormat) {
        // subtractDateInDays subtracts the fist from the second, assuming start and end dates
        var difference = this.subtractDateInMilliseconds(date2, date1, dateFormat);
        return compareResult_1.getCompareResult(difference);
    };
    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
        if (this.compareDates(date, rangeStart) === compareResult_1.CompareResult.less) {
            return false;
        }
        else if (this.compareDates(date, rangeEnd) === compareResult_1.CompareResult.greater) {
            return false;
        }
        else {
            return true;
        }
    };
    DateUtility.prototype.getDate = function (date, dateFormat) {
        if (_.isDate(date)) {
            return this.moment(date);
        }
        return this.moment(date, this.getFormat(dateFormat));
    };
    DateUtility.prototype.getDateFromISOString = function (date) {
        return this.moment(date, dateTimeFormatStrings_1.defaultFormats.isoFormat);
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
        return moment();
    };
    DateUtility.prototype.formatDate = function (date, dateFormat) {
        return this.moment(this.getDate(date, dateFormat)).format(this.getFormat(dateFormat));
    };
    DateUtility.prototype.getFormat = function (customFormat) {
        return customFormat != null ? customFormat : this.baseFormat;
    };
    DateUtility.prototype.sameDate = function (date1, date2, date1Format, date2Format, formatAs) {
        date2Format = date2Format || date1Format;
        formatAs = formatAs || dateTimeFormatStrings_1.defaultFormats.dateFormat;
        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
            var moment1 = this.getDate(date1, date1Format);
            var moment2 = this.getDate(date2, date2Format);
            return moment1.format(formatAs) === moment2.format(formatAs);
        }
        else {
            return false;
        }
    };
    DateUtility.prototype.sameDateTime = function (date1, date2, date1Format, date2Format) {
        return this.sameDate(date1, date2, date1Format, date2Format, dateTimeFormatStrings_1.defaultFormats.isoFormat);
    };
    DateUtility.$inject = [moment_module_1.serviceName];
    return DateUtility;
}());
exports.DateUtility = DateUtility;
exports.dateUtility = new DateUtility(moment);
//# sourceMappingURL=date.service.js.map