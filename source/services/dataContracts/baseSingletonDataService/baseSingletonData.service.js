'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
exports.factoryName = 'baseSingletonDataService';
var BaseSingletonDataService = (function () {
    function BaseSingletonDataService($http, $q, _endpoint, mockData, transform, useMock) {
        this.$http = $http;
        this.$q = $q;
        this._endpoint = _endpoint;
        this.mockData = mockData;
        this.transform = transform;
        this.useMock = useMock;
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
            return data;
        });
    };
    BaseSingletonDataService.prototype.update = function (domainObject) {
        if (this.useMock) {
            this.mockData = _.assign(this.mockData, domainObject);
            return this.$q.when();
        }
        else {
            return this.$http.put(this.endpoint, domainObject).then(function () { return null; });
        }
    };
    return BaseSingletonDataService;
})();
exports.BaseSingletonDataService = BaseSingletonDataService;
baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
function baseSingletonDataServiceFactory($http, $q) {
    return {
        getInstance: function (endpoint, mockData, transform, useMock) {
            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock);
        },
    };
}
exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, baseSingletonDataServiceFactory);
//# sourceMappingURL=baseSingletonData.service.js.map