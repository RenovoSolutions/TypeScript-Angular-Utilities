"use strict";
var moment = require('moment');
var dateTimeFormatStrings_1 = require('../date/dateTimeFormatStrings');
var chai = window.chai;
if (chai) {
    chai.Assertion.addMethod('sameMoment', equalMoment);
    chai.Assertion.addMethod('equalMoment', equalMoment);
    chai.Assertion.addMethod('beforeMoment', function (expected, granularity) {
        var obj = this._obj;
        var objMoment = moment(obj);
        var expectedMoment = moment(expected);
        this.assert(objMoment.isBefore(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be before ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be before ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
    });
    chai.Assertion.addMethod('afterMoment', function (expected, granularity) {
        var obj = this._obj;
        var objMoment = moment(obj);
        var expectedMoment = moment(expected);
        this.assert(objMoment.isAfter(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be after ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be after ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
    });
}
function equalMoment(expected, granularity) {
    'use strict';
    var obj = this._obj;
    var objMoment = moment(obj);
    var expectedMoment = moment(expected);
    this.assert(objMoment.isSame(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be the same as ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be the same as ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
}
//# sourceMappingURL=chaiMoment.js.map