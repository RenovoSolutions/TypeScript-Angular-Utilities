'use strict';
var _ = require('lodash');
var moment = require('moment');
var time_service_1 = require('../time/time.service');
var moment_module_1 = require('../moment/moment.module');
var compareResult_1 = require('../../types/compareResult');
exports.serviceName = 'dateUtility';
var DateUtility = (function () {
    function DateUtility(moment, time) {
        var _this = this;
        this.moment = moment;
        this.time = time;
        this.baseFormat = 'MM-DD-YYYY';
        this.month = [
            { name: 'January', days: function () { return 31; } },
            { name: 'February', days: function (year) { return _this.isLeapYear(year) ? 29 : 28; } },
            { name: 'March', days: function () { return 31; } },
            { name: 'April', days: function () { return 30; } },
            { name: 'May', days: function () { return 31; } },
            { name: 'June', days: function () { return 30; } },
            { name: 'July', days: function () { return 31; } },
            { name: 'August', days: function () { return 31; } },
            { name: 'September', days: function () { return 30; } },
            { name: 'October', days: function () { return 31; } },
            { name: 'November', days: function () { return 30; } },
            { name: 'December', days: function () { return 31; } },
        ];
    }
    DateUtility.prototype.isLeapYear = function (year) {
        return new Date(year, 1, 29).getMonth() === 1;
    };
    DateUtility.prototype.getFullString = function (month) {
        return this.month[month].name;
    };
    DateUtility.prototype.getDays = function (month, year) {
        return this.month[month].days(year);
    };
    DateUtility.prototype.subtractDates = function (start, end, dateFormat) {
        if (start == null || end == null) {
            return null;
        }
        var startDate = this.getDate(start, dateFormat);
        var endDate = this.getDate(end, dateFormat);
        var result = {};
        result.days = endDate.getDate() - startDate.getDate();
        result.years = endDate.getFullYear() - startDate.getFullYear();
        result.months = endDate.getMonth() - startDate.getMonth();
        if (result.days < 0) {
            result.months -= 1;
            result.days += this.getDays(startDate.getMonth(), startDate.getFullYear());
        }
        if (result.months < 0) {
            result.years -= 1;
            result.months += 12;
        }
        return result;
    };
    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
        var milliseconds = this.subtractDateInMilliseconds(start, end, dateFormat);
        return this.time.millisecondsToDays(milliseconds);
    };
    DateUtility.prototype.subtractDateInMilliseconds = function (start, end, dateFormat) {
        if (start == null || end == null) {
            return null;
        }
        var startDate = this.getDate(start, dateFormat);
        var endDate = this.getDate(end, dateFormat);
        return endDate.getTime() - startDate.getTime();
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
            return date;
        }
        else {
            return this.moment(date, this.getFormat(dateFormat)).toDate();
        }
    };
    DateUtility.prototype.getDateFromISOString = function (date) {
        return this.moment(date).toDate();
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
        return new Date();
    };
    DateUtility.prototype.formatDate = function (date, dateFormat) {
        return this.moment(this.getDate(date, dateFormat)).format(this.getFormat(dateFormat));
    };
    DateUtility.prototype.getFormat = function (customFormat) {
        return customFormat != null ? customFormat : this.baseFormat;
    };
    DateUtility.prototype.sameDate = function (date1, date2, date1Format, date2Format) {
        if (date1Format != undefined && date2Format === undefined) {
            date2Format = date1Format;
        }
        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
            return moment(date1, date1Format).format("MM/DD/YYYY") === moment(date2, date2Format).format("MM/DD/YYYY");
        }
        else {
            return false;
        }
    };
    DateUtility.prototype.sameDateTime = function (date1, date2, date1Format, date2Format) {
        if (date1Format != undefined && date2Format === undefined) {
            date2Format = date1Format;
        }
        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
            return moment(date1, date1Format).format("MM/DD/YYYY +-HHmm") === moment(date2, date2Format).format("MM/DD/YYYY +-HHmm");
        }
        else {
            return false;
        }
    };
    DateUtility.$inject = [moment_module_1.serviceName, time_service_1.serviceName];
    return DateUtility;
}());
exports.DateUtility = DateUtility;
exports.dateUtility = new DateUtility(moment, time_service_1.timeUtility);
//# sourceMappingURL=date.service.js.map