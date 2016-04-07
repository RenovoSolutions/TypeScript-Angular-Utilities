"use strict";
var moment = require('moment');
if (chai) {
    function equalMoment(expected, granularity) {
        var obj = this._obj;
        var objMoment = moment(obj);
        var expectedMoment = moment(expected);
        this.assert(objMoment.isSame(expectedMoment, granularity), "expected " + objMoment.format('L') + " to be the same as " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), "expected " + objMoment.format('L') + " not to be the same as " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), expected, obj, true);
    }
    chai.Assertion.addMethod('sameMoment', equalMoment);
    chai.Assertion.addMethod('equalMoment', equalMoment);
    chai.Assertion.addMethod('beforeMoment', function (expected, granularity) {
        var obj = this._obj;
        var objMoment = moment(obj);
        var expectedMoment = moment(expected);
        this.assert(objMoment.isBefore(expectedMoment, granularity), "expected " + objMoment.format('L') + " to be before " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), "expected " + objMoment.format('L') + " not to be before " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), expected, obj, true);
    });
    chai.Assertion.addMethod('afterMoment', function (expected, granularity) {
        var obj = this._obj;
        var objMoment = moment(obj);
        var expectedMoment = moment(expected);
        this.assert(objMoment.isAfter(expectedMoment, granularity), "expected " + objMoment.format('L') + " to be after " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), "expected " + objMoment.format('L') + " not to be after " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : ""), expected, obj, true);
    });
}
//# sourceMappingURL=chaiMoment.js.map