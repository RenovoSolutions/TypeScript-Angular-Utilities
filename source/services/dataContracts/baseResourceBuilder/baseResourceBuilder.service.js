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
        var _this = this;
        options.useMock = options.endpoint == null ? true : options.useMock;
        var dataService = new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
        dataService.clone = function (endpoint) { return _this.cloneResource(dataService, endpoint); };
        return dataService;
    };
    BaseResourceBuilder.prototype.createResourceView = function (options) {
        var _this = this;
        var dataServiceView = this.createResource(options);
        dataServiceView.clone = function (endpoint) { return _this.cloneResource(dataServiceView, endpoint); };
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
        var _this = this;
        options.useMock = options.endpoint == null ? true : options.useMock;
        var parentDataService = new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
        parentDataService.clone = function (endpoint) { return _this.cloneParentResource(parentDataService, endpoint); };
        return parentDataService;
    };
    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
        var _this = this;
        var dataServiceView = this.createParentResource(options);
        dataServiceView.clone = function (endpoint) { return _this.cloneParentResource(dataServiceView, endpoint); };
        dataServiceView.AsSingleton = function (parentId) {
            return {
                get: function () { return dataServiceView.getDetail(parentId); },
                update: function (domainObject) { return dataServiceView.update(domainObject); },
                useMock: dataServiceView.useMock,
                logRequests: dataServiceView.logRequests,
                childContracts: function () { return dataServiceView.childContracts(parentId); },
                clone: dataServiceView.clone,
            };
        };
        return dataServiceView;
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
        var _this = this;
        options.useMock = options.endpoint == null ? true : options.useMock;
        var dataService = new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
        dataService.clone = function (endpoint) { return _this.cloneSingletonResource(dataService, endpoint); };
        return dataService;
    };
    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
        var _this = this;
        options.useMock = options.endpoint == null ? true : options.useMock;
        var parentDataService = new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
        parentDataService.clone = function (endpoint) { return _this.cloneParentSingletonResource(parentDataService, endpoint); };
        return parentDataService;
    };
    BaseResourceBuilder.prototype.cloneResource = function (resource, endpoint) {
        var castedResource = resource;
        return {
            getList: function (params) { return castedResource.getList(params, endpoint); },
            getDetail: function (id) { return castedResource.getDetail(id, endpoint); },
            create: function (domainObject) { return castedResource.create(domainObject, endpoint); },
            update: function (domainObject) { return castedResource.update(domainObject, endpoint); },
            delete: function (domainObject) { return castedResource.delete(domainObject, endpoint); },
            useMock: castedResource.useMock,
            logRequests: castedResource.logRequests,
        };
    };
    BaseResourceBuilder.prototype.cloneParentResource = function (resource, endpoint) {
        var clone = this.cloneResource(resource, endpoint);
        clone.childContracts = function (id) { return resource.childContracts(id); };
        return clone;
    };
    BaseResourceBuilder.prototype.cloneSingletonResource = function (resource, endpoint) {
        var castedResource = resource;
        return {
            get: function () { return castedResource.get(endpoint); },
            update: function (domainObject) { return castedResource.update(domainObject, endpoint); },
            useMock: castedResource.useMock,
            logRequests: castedResource.logRequests,
        };
    };
    BaseResourceBuilder.prototype.cloneParentSingletonResource = function (resource, endpoint) {
        var clone = this.cloneSingletonResource(resource, endpoint);
        clone.childContracts = function () { return resource.childContracts(); };
        return clone;
    };
    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
    return BaseResourceBuilder;
})();
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=baseResourceBuilder.service.js.map