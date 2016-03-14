'use strict';
var angular = require('angular');
var stopEventPropogation = require('./stopEventPropagation/stopEventPropagation');
exports.stopEventPropogation = stopEventPropogation;
exports.name = 'rl.utilities.behaviors';
angular.module(exports.name, [
    stopEventPropogation.moduleName,
]);
//# sourceMappingURL=behaviors.module.js.map