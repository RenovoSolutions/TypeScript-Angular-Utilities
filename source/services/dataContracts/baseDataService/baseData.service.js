'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
exports.moduleName = 'rl.utilities.services.baseDataService';
exports.factoryName = 'baseDataService';
var BaseDataService = (function () {
    function BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests) {
        this.array = array;
        this.endpoint = endpoint;
        this.mockData = mockData;
        this.useMock = useMock;
        this.logRequests = logRequests;
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform);
    }
    BaseDataService.prototype.getItemEndpoint = function (id) {
        return this.endpoint + '/' + id.toString();
    };
    BaseDataService.prototype.getList = function (params) {
        var _this = this;
        return this.behavior.getList({
            params: params,
            endpoint: this.endpoint,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    BaseDataService.prototype.getDetail = function (id) {
        var _this = this;
        return this.behavior.getItem({
            endpoint: this.getItemEndpoint(id),
            getMockData: function () {
                return _.find(_this.mockData, function (item) {
                    return item.id === id;
                });
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    BaseDataService.prototype.create = function (domainObject) {
        var _this = this;
        return this.behavior.create({
            domainObject: domainObject,
            endpoint: this.endpoint,
            addMockData: function (data) {
                var nextId = _.max(_this.mockData, 'id').id + 1;
                domainObject.id = nextId;
                _this.mockData.push(domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    BaseDataService.prototype.update = function (domainObject) {
        var _this = this;
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            updateMockData: function (data) {
                var oldObject = _.find(_this.mockData, function (item) {
                    return item.id === data.id;
                });
                oldObject = _.assign(oldObject, data);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    BaseDataService.prototype.delete = function (domainObject) {
        var _this = this;
        return this.behavior.delete({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            removeMockData: function (data) {
                _this.array.remove(_this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    return BaseDataService;
})();
exports.BaseDataService = BaseDataService;
baseDataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
function baseDataServiceFactory($http, $q, array) {
    return {
        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
            return new BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}
exports.baseDataServiceFactory = baseDataServiceFactory;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .factory(exports.factoryName, baseDataServiceFactory);
//# sourceMappingURL=baseData.service.js.map