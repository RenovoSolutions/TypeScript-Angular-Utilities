'use strict';
var angular = require('angular');
var array_service_1 = require('../../array/array.service');
var baseData_service_1 = require('../baseDataService/baseData.service');
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
        options.useMock = options.endpoint == null ? true : options.useMock;
        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createResourceView = function (options) {
        var dataServiceView = this.createResource(options);
        dataServiceView.AsSingleton = function (parentId) {
            return {
                get: function () { return dataServiceView.getDetail(parentId); },
                update: function (domainObject) { return dataServiceView.update(domainObject); },
                useMock: dataServiceView.useMock,
                logRequests: dataServiceView.logRequests,
            };
        };
        return dataServiceView;
    };
    BaseResourceBuilder.prototype.createParentResource = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
    };
    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
    return BaseResourceBuilder;
})();
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=baseResourceBuilder.service.js.map