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
//# sourceMappingURL=stopEventPropagation.js.map