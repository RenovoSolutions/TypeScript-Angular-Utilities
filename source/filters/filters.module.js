"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var isEmpty = require('./isEmpty/isEmpty');
exports.isEmpty = isEmpty;
var truncate = require('./truncate/truncate');
exports.truncate = truncate;
__export(require('./filter'));
exports.name = 'rl.utilities.filters';
angular.module(exports.name, [
    isEmpty.moduleName,
    truncate.moduleName,
]);
//# sourceMappingURL=filters.module.js.map