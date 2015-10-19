'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
exports.factoryName = 'baseSingletonDataService';
var BaseSingletonDataService = (function () {
    function BaseSingletonDataService($http, $q, endpoint, mockData, useMock) {
        this.$http = $http;
        this.$q = $q;
        this.endpoint = endpoint;
        this.mockData = mockData;
        this.useMock = useMock;
    }
    BaseSingletonDataService.prototype.get = function () {
        if (this.useMock) {
            return this.$q.when(this.mockData);
        }
        else {
            return this.$http.get(this.endpoint)
                .then(function (response) {
                return response.data;
            });
        }
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
        getInstance: function (endpoint, mockData, useMock) {
            return new BaseSingletonDataService($http, $q, endpoint, mockData, useMock);
        },
    };
}
exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, baseSingletonDataServiceFactory);
//# sourceMappingURL=baseSingletonData.service.js.map