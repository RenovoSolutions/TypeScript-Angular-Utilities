'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
exports.moduleName = 'rl.utilities.services.baseDataService';
exports.factoryName = 'baseDataService';
var BaseDataService = (function () {
    function BaseDataService($http, $q, array, _endpoint, mockData, transform, useMock, logRequests) {
        this.$http = $http;
        this.$q = $q;
        this.array = array;
        this._endpoint = _endpoint;
        this.mockData = mockData;
        this.transform = transform;
        this.useMock = useMock;
        this.logRequests = logRequests;
    }
    Object.defineProperty(BaseDataService.prototype, "endpoint", {
        get: function () {
            return this._endpoint;
        },
        enumerable: true,
        configurable: true
    });
    BaseDataService.prototype.getItemEndpoint = function (id, endpoint) {
        var targetEndpoint = this.getEndpointOrDefault(endpoint);
        return targetEndpoint + '/' + id.toString();
    };
    BaseDataService.prototype.getList = function (params, endpoint) {
        var _this = this;
        var promise;
        if (this.useMock) {
            promise = this.$q.when(this.mockData);
        }
        else {
            promise = this.$http.get(this.getEndpointOrDefault(endpoint), { params: params })
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (data) {
            if (_this.transform != null) {
                data = _.map(data, _this.transform);
            }
            if (_this.logRequests) {
                _this.log('getList', data);
            }
            return data;
        });
    };
    BaseDataService.prototype.getDetail = function (id, endpoint) {
        var _this = this;
        var promise;
        if (this.useMock) {
            promise = this.$q.when(_.find(this.mockData, function (item) {
                return item.id === id;
            }));
        }
        else {
            promise = this.$http.get(this.getItemEndpoint(id, endpoint))
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (data) {
            if (_this.transform != null) {
                data = _this.transform(data);
            }
            if (_this.logRequests) {
                _this.log('getDetail', data);
            }
            return data;
        });
    };
    BaseDataService.prototype.create = function (domainObject, endpoint) {
        var _this = this;
        var promise;
        if (this.useMock) {
            var nextId = _.max(this.mockData, 'id').id + 1;
            domainObject.id = nextId;
            this.mockData.push(domainObject);
            promise = this.$q.when(domainObject);
        }
        else {
            promise = this.$http.post(this.getEndpointOrDefault(endpoint), JSON.stringify(domainObject))
                .then(function (result) {
                return result.data;
            });
        }
        return promise.then(function (data) {
            if (_this.logRequests) {
                _this.log('create', data);
            }
            return data;
        });
    };
    BaseDataService.prototype.update = function (domainObject, endpoint) {
        var _this = this;
        var promise;
        if (this.useMock) {
            var oldObject = _.find(this.mockData, _.find(this.mockData, function (item) {
                return item.id === domainObject.id;
            }));
            oldObject = _.assign(oldObject, domainObject);
            promise = this.$q.when();
        }
        else {
            promise = this.$http.put(this.getItemEndpoint(domainObject.id, endpoint), domainObject).then(function () { return null; });
        }
        return promise.then(function () {
            if (_this.logRequests) {
                _this.log('update', domainObject);
            }
        });
    };
    BaseDataService.prototype.delete = function (domainObject, endpoint) {
        var _this = this;
        var promise;
        if (this.useMock) {
            this.array.remove(this.mockData, domainObject);
            promise = this.$q.when();
        }
        else {
            promise = this.$http.delete(this.getItemEndpoint(domainObject.id, endpoint)).then(function () { return null; });
        }
        return promise.then(function () {
            if (_this.logRequests) {
                _this.log('update', domainObject);
            }
        });
    };
    BaseDataService.prototype.log = function (requestName, data) {
        var mockString = this.useMock ? 'Mocked ' : '';
        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        console.log(data);
    };
    BaseDataService.prototype.getEndpointOrDefault = function (endpoint) {
        return endpoint != null ? endpoint : this.endpoint;
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