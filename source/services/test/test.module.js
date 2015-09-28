function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var mock = require('./mock');
exports.mock = mock;
var karma = require('./karma/karma');
exports.karma = karma;
__export(require('./angularFixture'));
exports.moduleName = 'rl.utilities.services.test';
angular.module(exports.moduleName, [
    mock.moduleName,
]);
//# sourceMappingURL=test.module.js.map