'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
exports.moduleName = 'rl.utilities.services.baseDataService';
exports.factoryName = 'baseDataService';
var DataService = (function () {
    function DataService($http, $q, array, options) {
        this.array = array;
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, options.transform);
        this.useDeepSearch = options.useDeepSearch;
        this.mockData = options.mockData;
        this.endpoint = options.endpoint;
        this.useMock = options.useMock;
        this.logRequests = options.logRequests;
    }
    DataService.prototype.getItemEndpoint = function (id) {
        return this.endpoint + '/' + id.toString();
    };
    DataService.prototype.getList = function (params) {
        var _this = this;
        var requestParams = {
            params: params,
            endpoint: this.endpoint,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        };
        if (this.useDeepSearch) {
            return this.behavior.search(requestParams);
        }
        else {
            return this.behavior.getList(requestParams);
        }
    };
    DataService.prototype.getDetail = function (id) {
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
    DataService.prototype.create = function (domainObject) {
        var _this = this;
        return this.behavior.create({
            domainObject: domainObject,
            endpoint: this.endpoint,
            addMockData: function (data) {
                var nextId = _.maxBy(_this.mockData, 'id').id + 1;
                domainObject.id = nextId;
                _this.mockData.push(domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    DataService.prototype.update = function (domainObject) {
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
    DataService.prototype.delete = function (domainObject) {
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
    return DataService;
})();
exports.DataService = DataService;
dataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
function dataServiceFactory($http, $q, array) {
    return {
        getInstance: function (options) {
            return new DataService($http, $q, array, options);
        },
    };
}
exports.dataServiceFactory = dataServiceFactory;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .factory(exports.factoryName, dataServiceFactory);
//# sourceMappingURL=baseData.service.js.map