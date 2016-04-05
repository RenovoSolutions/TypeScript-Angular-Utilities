'use strict';
var _ = require('lodash');
var Timezones = (function () {
    function Timezones() {
        this.AST = new Timezone({
            offset: '-04:00',
            display: 'AST',
            momentName: 'Canada/Atlantic',
            offsetMinutes: -240,
        });
        this.EST = new Timezone({
            offset: '-05:00',
            display: 'EST',
            momentName: 'US/Eastern',
            offsetMinutes: -300,
        });
        this.CST = new Timezone({
            offset: '-06:00',
            display: 'CST',
            momentName: 'US/Central',
            offsetMinutes: -360,
        });
        this.MST = new Timezone({
            offset: '-07:00',
            display: 'MST',
            momentName: 'US/Mountain',
            offsetMinutes: -420,
        });
        this.PST = new Timezone({
            offset: '-08:00',
            display: 'PST',
            momentName: 'US/Pacific',
            offsetMinutes: -480,
        });
        this.AKST = new Timezone({
            offset: '-09:00',
            display: 'AKST',
            momentName: 'US/Alaska',
            offsetMinutes: -540,
        });
        this.HAST = new Timezone({
            offset: '-10:00',
            display: 'HAST',
            momentName: 'US/Hawaii',
            offsetMinutes: -600,
        });
        this.items = [
            this.AST,
            this.EST,
            this.CST,
            this.MST,
            this.PST,
            this.AKST,
            this.HAST,
        ];
    }
    Timezones.prototype.get = function (offsetOrMomentName) {
        return _.find(this.items, function (item) {
            return (item.offset === offsetOrMomentName || item.momentName === offsetOrMomentName);
        });
    };
    Timezones.prototype.all = function () {
        return this.items;
    };
    return Timezones;
}());
var Timezone = (function () {
    function Timezone(data) {
        this.offset = data.offset;
        this.display = data.display;
        this.momentName = data.momentName;
        this.offsetMinutes = data.offsetMinutes;
    }
    return Timezone;
}());
exports.timezones = new Timezones();
//# sourceMappingURL=timezone.enum.js.map