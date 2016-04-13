'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var resourceBuilder_service_1 = require('./resourceBuilder/resourceBuilder.service');
var data_service_1 = require('./dataService/data.service');
var singletonData_service_1 = require('./singletonDataService/singletonData.service');
var converters = require('./converters/converters');
exports.converters = converters;
var mocks = require('./contractLibrary/dataServiceMocks');
exports.mocks = mocks;
exports.moduleName = 'rl.utilities.services.dataContracts';
__export(require('./contractLibrary/contractLibrary'));
var data_service_2 = require('./dataService/data.service');
exports.DataService = data_service_2.DataService;
exports.baseDataServiceFactoryName = data_service_2.factoryName;
__export(require('./dataService/parent/parentData.service'));
var singletonData_service_2 = require('./singletonDataService/singletonData.service');
exports.SingletonDataService = singletonData_service_2.SingletonDataService;
exports.baseSingletonDataServiceFactoryName = singletonData_service_2.factoryName;
__export(require('./singletonDataService/parent/parentSingletonData.service'));
var resourceBuilder_service_2 = require('./resourceBuilder/resourceBuilder.service');
exports.builderServiceName = resourceBuilder_service_2.serviceName;
angular.module(exports.moduleName, [
    data_service_1.moduleName,
    singletonData_service_1.moduleName,
    resourceBuilder_service_1.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YUNvbnRyYWN0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhQ29udHJhY3RzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyx3Q0FBd0QsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRyw2QkFBd0QsNEJBQTRCLENBQUMsQ0FBQTtBQUNyRixzQ0FBaUUsOENBQThDLENBQUMsQ0FBQTtBQUVoSCxJQUFZLFVBQVUsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBWTdDLGtCQUFVO0FBWG5CLElBQVksS0FBSyxXQUFNLG9DQUFvQyxDQUFDLENBQUE7QUFXdkMsYUFBSztBQVRmLGtCQUFVLEdBQVcscUNBQXFDLENBQUM7QUFFdEUsaUJBQWMsbUNBQW1DLENBQUMsRUFBQTtBQUNsRCw2QkFBNkgsNEJBQTRCLENBQUM7QUFBM0YsaURBQVc7QUFBRSxnRUFBOEU7QUFFMUosaUJBQWMseUNBQXlDLENBQUMsRUFBQTtBQUN4RCxzQ0FBOEksOENBQThDLENBQUM7QUFBL0gsNEVBQW9CO0FBQUUsa0ZBQXlHO0FBQzdMLGlCQUFjLDJEQUEyRCxDQUFDLEVBQUE7QUFDMUUsd0NBQXdFLDJDQUEyQyxDQUFDO0FBQXJGLG1FQUFxRjtBQUdwSCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUNsQyxvQ0FBeUI7Q0FDekIsQ0FBQyxDQUFDIn0=