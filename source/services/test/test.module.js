"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
require('./chaiMoment');
var angularBluebirdName = require('angular-bluebird-promises');
__export(require('./mockPromise'));
__export(require('./angularFixture'));
exports.moduleName = 'rl.utilities.services.test';
angular.module(exports.moduleName, [angularBluebirdName])
    .run(['Bluebird', function (Bluebird) {
        Bluebird.setScheduler(function (cb) { return cb(); });
    }]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsUUFBTyxjQUFjLENBQUMsQ0FBQTtBQUV0QixJQUFZLG1CQUFtQixXQUFNLDJCQUEyQixDQUFDLENBQUE7QUFFakUsaUJBQWMsZUFBZSxDQUFDLEVBQUE7QUFDOUIsaUJBQWMsa0JBQWtCLENBQUMsRUFBQTtBQUV0QixrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FFL0MsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQUMsUUFBYTtRQUMvQixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQUMsRUFBWSxJQUFLLE9BQUEsRUFBRSxFQUFFLEVBQUosQ0FBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9