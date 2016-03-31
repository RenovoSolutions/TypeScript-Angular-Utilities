'use strict';
var angular = require('angular');
var array_service_1 = require('../../array/array.service');
var data_service_1 = require('../dataService/data.service');
var dataServiceView_1 = require('../dataService/view/dataServiceView');
var parentData_service_1 = require('../dataService/parent/parentData.service');
var singletonData_service_1 = require('../singletonDataService/singletonData.service');
var parentSingletonData_service_1 = require('../singletonDataService/parent/parentSingletonData.service');
exports.moduleName = 'rl.utilities.services.dataContracts.resourceBuilder';
exports.serviceName = 'resourceBuilder';
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
        return new data_service_1.DataService(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.DataServiceView(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createParentResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentData_service_1.ParentDataService(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.ParentDataServiceView(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new singletonData_service_1.SingletonDataService(this.$http, this.$q, options);
    };
    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentSingletonData_service_1.ParentSingletonDataService(this.$http, this.$q, options);
    };
    BaseResourceBuilder.prototype.useMockIfNoEndpoint = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return options;
    };
    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
    return BaseResourceBuilder;
}());
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=resourceBuilder.service.js.map