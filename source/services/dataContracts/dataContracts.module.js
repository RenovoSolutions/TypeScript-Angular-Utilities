"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var resourceBuilder_service_1 = require('./resourceBuilder/resourceBuilder.service');
var data_service_1 = require('./dataService/data.service');
var singletonData_service_1 = require('./singletonDataService/singletonData.service');
var converters = require('./converters/converters');
exports.converters = converters;
var mocks = require('./contractLibrary/dataServiceMocks');
exports.mocks = mocks;
__export(require('./contractLibrary/contractLibrary'));
__export(require('./dataService/data.service'));
__export(require('./dataService/view/dataServiceView'));
__export(require('./dataService/parent/parentData.service'));
__export(require('./singletonDataService/singletonData.service'));
__export(require('./singletonDataService/parent/parentSingletonData.service'));
__export(require('./resourceBuilder/resourceBuilder.service'));
exports.DATA_CONTRACT_PROVIDERS = [
    resourceBuilder_service_1.RESOURCE_BUILDER_PROVIDER,
    data_service_1.DATA_SERVICE_PROVIDER,
    singletonData_service_1.SINGLETON_DATA_SERVICE_PROVIDER,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YUNvbnRyYWN0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhQ29udHJhY3RzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsd0NBQTBDLDJDQUEyQyxDQUFDLENBQUE7QUFDdEYsNkJBQXNDLDRCQUE0QixDQUFDLENBQUE7QUFDbkUsc0NBQWdELDhDQUE4QyxDQUFDLENBQUE7QUFFL0YsSUFBWSxVQUFVLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQVU3QyxrQkFBVTtBQVRuQixJQUFZLEtBQUssV0FBTSxvQ0FBb0MsQ0FBQyxDQUFBO0FBU3ZDLGFBQUs7QUFQMUIsaUJBQWMsbUNBQW1DLENBQUMsRUFBQTtBQUNsRCxpQkFBYyw0QkFBNEIsQ0FBQyxFQUFBO0FBQzNDLGlCQUFjLG9DQUFvQyxDQUFDLEVBQUE7QUFDbkQsaUJBQWMseUNBQXlDLENBQUMsRUFBQTtBQUN4RCxpQkFBYyw4Q0FBOEMsQ0FBQyxFQUFBO0FBQzdELGlCQUFjLDJEQUEyRCxDQUFDLEVBQUE7QUFDMUUsaUJBQWMsMkNBQTJDLENBQUMsRUFBQTtBQUc3QywrQkFBdUIsR0FBZTtJQUNsRCxtREFBeUI7SUFDekIsb0NBQXFCO0lBQ3JCLHVEQUErQjtDQUMvQixDQUFDIn0=