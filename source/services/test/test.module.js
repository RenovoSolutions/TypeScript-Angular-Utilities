"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var mock = require('./mock');
exports.mock = mock;
__export(require('./angularFixture'));
require('./chaiMoment');
exports.moduleName = 'rl.utilities.services.test';
angular.module(exports.moduleName, [
    mock.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBWSxJQUFJLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDdEIsWUFBSTtBQUViLGlCQUFjLGtCQUFrQixDQUFDLEVBQUE7QUFFakMsUUFBTyxjQUFjLENBQUMsQ0FBQTtBQUVYLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLElBQUksQ0FBQyxVQUFVO0NBQ2YsQ0FBQyxDQUFDIn0=