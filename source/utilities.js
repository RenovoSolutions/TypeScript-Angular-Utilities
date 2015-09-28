'use strict';
var angular = require('angular');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var filters = require('./filters/filters.module');
exports.filters = filters;
var services = require('./services/services.module');
exports.services = services;
var types = require('./types/types.module');
exports.types = types;
exports.name = 'rl.utilities';
angular.module(exports.name, [
    behaviors.name,
    filters.name,
    services.name,
]);
//# sourceMappingURL=utilities.js.map