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
//# sourceMappingURL=dataContracts.module.js.map