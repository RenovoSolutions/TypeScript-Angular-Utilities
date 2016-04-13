'use strict';
var angular = require('angular');
var moment = require('moment');
exports.moduleName = 'rl.utilities.services.momentWrapper';
exports.serviceName = 'momentWrapper';
function momentWrapper() {
    'use strict';
    // Using `any` instead of MomentStatic because
    //  createFromInputFallback doesn't appear to be
    //  defined in MomentStatic... :-(
    var momentWrapper = moment; // moment must already be loaded
    // Set default method for handling non-ISO date conversions.
    // See 4/28 comment in https://github.com/moment/moment/issues/1407
    // This also prevents the deprecation warning message to the console.
    momentWrapper.createFromInputFallback = function (config) {
        config._d = new Date(config._i);
    };
    return momentWrapper;
}
exports.momentWrapper = momentWrapper;
angular.module(exports.moduleName, [])
    .factory(exports.serviceName, momentWrapper);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vbWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyxxQ0FBcUMsQ0FBQztBQUMzRCxtQkFBVyxHQUFXLGVBQWUsQ0FBQztBQUVqRDtJQUNDLFlBQVksQ0FBQztJQUViLDhDQUE4QztJQUM5QyxnREFBZ0Q7SUFDaEQsa0NBQWtDO0lBQ2xDLElBQUksYUFBYSxHQUFRLE1BQU0sQ0FBQyxDQUFDLGdDQUFnQztJQUVqRSw0REFBNEQ7SUFDNUQsbUVBQW1FO0lBQ25FLHFFQUFxRTtJQUNyRSxhQUFhLENBQUMsdUJBQXVCLEdBQUcsVUFBQyxNQUFXO1FBQ25ELE1BQU0sQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDdEIsQ0FBQztBQWhCZSxxQkFBYSxnQkFnQjVCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=