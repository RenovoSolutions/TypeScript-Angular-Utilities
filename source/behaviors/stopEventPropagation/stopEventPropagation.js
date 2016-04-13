"use strict";
var angular = require('angular');
exports.moduleName = 'rl.utilities.behaviors.stopEventPropogation';
exports.directiveName = 'rlStopEventPropagation';
function stopEventPropagation() {
    'use strict';
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on(attrs.rlStopEventPropagation, function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, stopEventPropagation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9wRXZlbnRQcm9wYWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyw2Q0FBNkMsQ0FBQztBQUNuRSxxQkFBYSxHQUFXLHdCQUF3QixDQUFDO0FBTTVEO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLEdBQUc7UUFDYixJQUFJLFlBQUMsS0FBcUIsRUFDdkIsT0FBaUMsRUFDakMsS0FBaUM7WUFDbkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsVUFBQyxLQUFVO2dCQUNuRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9