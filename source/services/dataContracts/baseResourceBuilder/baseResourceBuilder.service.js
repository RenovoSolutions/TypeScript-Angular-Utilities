'use strict';
var angular = require('angular');
var array_service_1 = require('../../array/array.service');
var baseData_service_1 = require('../baseDataService/baseData.service');
var baseParentData_service_1 = require('../baseParentDataService/baseParentData.service');
var baseSingletonData_service_1 = require('../baseSingletonDataService/baseSingletonData.service');
exports.moduleName = 'rl.utilities.services.baseResourceBuilder';
exports.serviceName = 'baseResourceBuilder';
var BaseResourceBuilder = (function () {
    function BaseResourceBuilder($http, $q, array) {
        this.$http = $http;
        this.$q = $q;
        this.array = array;
    }
    BaseResourceBuilder.prototype.createResource = function (endpoint, mockData, useMock) {
        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, endpoint, mockData, useMock);
    };
    BaseResourceBuilder.prototype.createParentResource = function (endpoint, mockData, resourceDictionaryBuilder, useMock) {
        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, endpoint, mockData, resourceDictionaryBuilder, useMock);
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (endpoint, mockData, useMock) {
        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, endpoint, mockData, useMock);
    };
    BaseResourceBuilder.$inject = ['$http', '$q', array_service_1.serviceName];
    return BaseResourceBuilder;
})();
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=baseResourceBuilder.service.js.map