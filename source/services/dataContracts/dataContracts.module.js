'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var baseResourceBuilder_service_1 = require('./baseResourceBuilder/baseResourceBuilder.service');
var baseData_service_1 = require('./baseDataService/baseData.service');
var baseSingletonData_service_1 = require('./baseSingletonDataService/baseSingletonData.service');
exports.moduleName = 'rl.utilities.services.dataContracts';
var baseData_service_2 = require('./baseDataService/baseData.service');
exports.BaseDataService = baseData_service_2.BaseDataService;
exports.baseDataServiceFactoryName = baseData_service_2.factoryName;
__export(require('./baseParentDataService/baseParentData.service'));
var baseSingletonData_service_2 = require('./baseSingletonDataService/baseSingletonData.service');
exports.BaseSingletonDataService = baseSingletonData_service_2.BaseSingletonDataService;
exports.baseSingletonDataServiceFactoryName = baseSingletonData_service_2.factoryName;
__export(require('./baseParentSingletonDataService/baseParentSingletonData.service'));
var baseResourceBuilder_service_2 = require('./baseResourceBuilder/baseResourceBuilder.service');
exports.builderServiceName = baseResourceBuilder_service_2.serviceName;
angular.module(exports.moduleName, [
    baseData_service_1.moduleName,
    baseSingletonData_service_1.moduleName,
    baseResourceBuilder_service_1.moduleName,
]);
//# sourceMappingURL=dataContracts.module.js.map