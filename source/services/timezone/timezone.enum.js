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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUuZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWV6b25lLmVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUF3QjVCO0lBOENDO1FBN0NBLFFBQUcsR0FBYyxJQUFJLFFBQVEsQ0FBRTtZQUM5QixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsYUFBYSxFQUFFLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFDSCxRQUFHLEdBQWMsSUFBSSxRQUFRLENBQUU7WUFDOUIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxVQUFVLEVBQUUsWUFBWTtZQUN4QixhQUFhLEVBQUUsQ0FBQyxHQUFHO1NBQ25CLENBQUMsQ0FBQztRQUNILFFBQUcsR0FBYyxJQUFJLFFBQVEsQ0FBRTtZQUM5QixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLEdBQUc7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsUUFBRyxHQUFjLElBQUksUUFBUSxDQUFFO1lBQzlCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsVUFBVSxFQUFFLGFBQWE7WUFDekIsYUFBYSxFQUFFLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFDSCxRQUFHLEdBQWMsSUFBSSxRQUFRLENBQUU7WUFDOUIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxVQUFVLEVBQUUsWUFBWTtZQUN4QixhQUFhLEVBQUUsQ0FBQyxHQUFHO1NBQ25CLENBQUMsQ0FBQztRQUNILFNBQUksR0FBYyxJQUFJLFFBQVEsQ0FBRTtZQUMvQixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLGFBQWEsRUFBRSxDQUFDLEdBQUc7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsU0FBSSxHQUFjLElBQUksUUFBUSxDQUFFO1lBQy9CLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsVUFBVSxFQUFFLFdBQVc7WUFDdkIsYUFBYSxFQUFFLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFLRixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1osSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxJQUFJO1lBQ1QsSUFBSSxDQUFDLElBQUk7U0FDVCxDQUFDO0lBQ0gsQ0FBQztJQUVELHVCQUFHLEdBQUgsVUFBSSxrQkFBMEI7UUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQWU7WUFDekMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLGtCQUFrQixDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsdUJBQUcsR0FBSDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFFRDtJQU1DLGtCQUFZLElBQWU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFFVSxpQkFBUyxHQUFlLElBQUksU0FBUyxFQUFFLENBQUMifQ==