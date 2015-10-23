'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
exports.factoryName = 'baseSingletonDataService';
var BaseSingletonDataService = (function () {
    function BaseSingletonDataService($http, $q, _endpoint, mockData, transform, useMock, logRequests) {
        this.$http = $http;
        this.$q = $q;
        this._endpoint = _endpoint;
        this.mockData = mockData;
        this.transform = transform;
        this.useMock = useMock;
        this.logRequests = logRequests;
    }
    Object.defineProperty(BaseSingletonDataService.prototype, "endpoint", {
        get: function () {
            return this._endpoint;
        },
        enumerable: true,
        configurable: true
    });
    BaseSingletonDataService.prototype.get = function () {
        var _this = this;
        var promise;
        if (this.useMock) {
            promise = this.$q.when(this.mockData);
        }
        else {
            promise = this.$http.get(this.endpoint)
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (data) {
            if (_this.transform != null) {
                data = _this.transform(data);
            }
            if (_this.logRequests) {
                _this.log('get', data);
            }
            return data;
        });
    };
    BaseSingletonDataService.prototype.update = function (domainObject) {
        var _this = this;
        var promise;
        if (this.useMock) {
            this.mockData = _.assign(this.mockData, domainObject);
            promise = this.$q.when();
        }
        else {
            promise = this.$http.put(this.endpoint, domainObject).then(function () { return null; });
        }
        return promise.then(function () {
            if (_this.logRequests) {
                _this.log('update', domainObject);
            }
        });
    };
    BaseSingletonDataService.prototype.log = function (requestName, data) {
        var mockString = this.useMock ? 'Mocked ' : '';
        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        console.log(data);
    };
    return BaseSingletonDataService;
})();
exports.BaseSingletonDataService = BaseSingletonDataService;
baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
function baseSingletonDataServiceFactory($http, $q) {
    return {
        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}
exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, baseSingletonDataServiceFactory);
//# sourceMappingURL=baseSingletonData.service.js.map