'use strict';
var angular = require('angular');
var array_service_1 = require('../../array/array.service');
var baseData_service_1 = require('../baseDataService/baseData.service');
var baseDataServiceView_1 = require('../baseDataService/baseDataServiceView');
var baseParentData_service_1 = require('../baseParentDataService/baseParentData.service');
var baseSingletonData_service_1 = require('../baseSingletonDataService/baseSingletonData.service');
var baseParentSingletonData_service_1 = require('../baseParentSingletonDataService/baseParentSingletonData.service');
exports.moduleName = 'rl.utilities.services.baseResourceBuilder';
exports.serviceName = 'baseResourceBuilder';
var BaseResourceBuilder = (function () {
    function BaseResourceBuilder($http, $q, $rootScope, array) {
        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.array = array;
    }
    BaseResourceBuilder.prototype.getLibraryServices = function () {
        return {
            $q: this.$q,
            $rootScope: this.$rootScope,
        };
    };
    BaseResourceBuilder.prototype.createResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseData_service_1.DataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseDataServiceView_1.DataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createParentResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseParentData_service_1.ParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseDataServiceView_1.ParentDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseSingletonData_service_1.SingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new baseParentSingletonData_service_1.ParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.useMockIfNoEndpoint = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return options;
    };
    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
    return BaseResourceBuilder;
})();
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=baseResourceBuilder.service.js.map