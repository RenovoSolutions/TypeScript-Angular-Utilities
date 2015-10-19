'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
exports.moduleName = 'rl.utilities.services.baseDataService';
exports.factoryName = 'baseDataService';
var BaseDataService = (function () {
    function BaseDataService($http, $q, array, endpoint, mockData, useMock) {
        this.$http = $http;
        this.$q = $q;
        this.array = array;
        this.endpoint = endpoint;
        this.mockData = mockData;
        this.useMock = useMock;
    }
    // Build request URL
    BaseDataService.prototype.getEndpoint = function () {
        return this.endpoint;
    };
    BaseDataService.prototype.getItemEndpoint = function (id) {
        return this.endpoint + '/' + id.toString();
    };
    BaseDataService.prototype.getList = function (params) {
        if (this.useMock) {
            return this.$q.when(this.mockData);
        }
        else {
            return this.$http.get(this.getEndpoint(), { params: params })
                .then(function (response) {
                return response.data;
            });
        }
    };
    BaseDataService.prototype.getDetail = function (id) {
        if (this.useMock) {
            return this.$q.when(_.find(this.mockData, function (item) {
                return item.id === id;
            }));
        }
        else {
            return this.$http.get(this.getItemEndpoint(id))
                .then(function (response) {
                return response.data;
            });
        }
    };
    BaseDataService.prototype.create = function (domainObject) {
        if (this.useMock) {
            var nextId = _.max(this.mockData, 'id').id + 1;
            domainObject.id = nextId;
            this.mockData.push(domainObject);
            return this.$q.when(domainObject);
        }
        else {
            return this.$http.post(this.getEndpoint(), JSON.stringify(domainObject))
                .then(function (result) {
                return result.data;
            });
        }
    };
    BaseDataService.prototype.update = function (domainObject) {
        if (this.useMock) {
            var oldObject = _.find(this.mockData, _.find(this.mockData, function (item) {
                return item.id === domainObject.id;
            }));
            oldObject = _.assign(oldObject, domainObject);
            return this.$q.when();
        }
        else {
            return this.$http.put(this.getItemEndpoint(domainObject.id), domainObject).then(function () { return null; });
        }
    };
    BaseDataService.prototype.delete = function (domainObject) {
        if (this.useMock) {
            this.array.remove(this.mockData, domainObject);
            return this.$q.when();
        }
        else {
            return this.$http.delete(this.getItemEndpoint(domainObject.id)).then(function () { return null; });
        }
    };
    return BaseDataService;
})();
exports.BaseDataService = BaseDataService;
baseDataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
function baseDataServiceFactory($http, $q, array) {
    return {
        getInstance: function (endpoint, mockData, useMock) {
            return new BaseDataService($http, $q, array, endpoint, mockData, useMock);
        },
    };
}
exports.baseDataServiceFactory = baseDataServiceFactory;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .factory(exports.factoryName, baseDataServiceFactory);
//# sourceMappingURL=baseData.service.js.map