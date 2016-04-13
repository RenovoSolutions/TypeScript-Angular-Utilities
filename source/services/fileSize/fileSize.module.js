'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var number_service_1 = require('../number/number.service');
var fileSize_service_1 = require('./fileSize.service');
var fileSizeFilter_1 = require('./fileSizeFilter');
__export(require('./fileSize.service'));
__export(require('./fileSizeFilter'));
exports.moduleName = 'rl.utilities.services.fileSize';
angular.module(exports.moduleName, [number_service_1.moduleName])
    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVNpemUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZVNpemUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLCtCQUErQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzFFLGlDQUE2QyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ2xFLCtCQUFpRCxrQkFBa0IsQ0FBQyxDQUFBO0FBRXBFLGlCQUFjLG9CQUFvQixDQUFDLEVBQUE7QUFDbkMsaUJBQWMsa0JBQWtCLENBQUMsRUFBQTtBQUV0QixrQkFBVSxHQUFXLGdDQUFnQyxDQUFDO0FBRWpFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDJCQUFnQixDQUFDLENBQUM7S0FDNUMsT0FBTyxDQUFDLDhCQUFXLEVBQUUsa0NBQWUsQ0FBQztLQUNyQyxNQUFNLENBQUMsaUNBQWdCLEVBQUUsK0JBQWMsQ0FBQyxDQUFDIn0=