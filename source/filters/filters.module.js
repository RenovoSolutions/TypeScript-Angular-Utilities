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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBWSxPQUFPLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUdwQyxlQUFPO0FBRmhCLElBQVksUUFBUSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFOUIsZ0JBQVE7QUFDMUIsaUJBQWMsVUFBVSxDQUFDLEVBQUE7QUFFZCxZQUFJLEdBQVcsc0JBQXNCLENBQUM7QUFFakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFJLEVBQUU7SUFDcEIsT0FBTyxDQUFDLFVBQVU7SUFDbEIsUUFBUSxDQUFDLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDIn0=