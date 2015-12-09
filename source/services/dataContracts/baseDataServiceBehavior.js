'use strict';
var _ = require('lodash');
var BaseDataServiceBehavior = (function () {
    function BaseDataServiceBehavior($http, $q, transform) {
        this.$http = $http;
        this.$q = $q;
        this.transform = transform;
    }
    BaseDataServiceBehavior.prototype.getList = function (options) {
        var _this = this;
        var promise;
        if (options.useMock) {
            promise = this.$q.when(options.getMockData());
        }
        else {
            promise = this.$http.get(options.endpoint, { params: options.params })
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (data) {
            if (_this.transform != null) {
                data = _.map(data, _this.transform.fromServer);
            }
            if (options.logRequests) {
                _this.log('getList', data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.getItem = function (options) {
        var _this = this;
        var promise;
        if (options.useMock) {
            promise = this.$q.when(options.getMockData());
        }
        else {
            promise = this.$http.get(options.endpoint)
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (data) {
            data = _this.transformFromServer(data);
            if (options.logRequests) {
                _this.log('get', data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.create = function (options) {
        var _this = this;
        var promise;
        options.domainObject = this.transformToServer(options.domainObject);
        if (options.useMock) {
            options.addMockData(options.domainObject);
            promise = this.$q.when(options.domainObject);
        }
        else {
            promise = this.$http.post(options.endpoint, JSON.stringify(options.domainObject))
                .then(function (result) {
                return result.data;
            });
        }
        return promise.then(function (data) {
            data = _this.transformFromServer(data);
            if (options.logRequests) {
                _this.log('create', data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.update = function (options) {
        var _this = this;
        var promise;
        options.domainObject = this.transformToServer(options.domainObject);
        if (options.useMock) {
            options.updateMockData(options.domainObject);
            promise = this.$q.when(options.domainObject);
        }
        else {
            promise = this.$http.put(options.endpoint, options.domainObject);
        }
        return promise.then(function (data) {
            data = _this.transformFromServer(data);
            if (options.logRequests) {
                _this.log('update', options.domainObject, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.delete = function (options) {
        var _this = this;
        var promise;
        if (options.useMock) {
            options.removeMockData(options.domainObject);
            promise = this.$q.when();
        }
        else {
            promise = this.$http.delete(options.endpoint).then(function () { return null; });
        }
        return promise.then(function () {
            if (options.logRequests) {
                _this.log('delete', options.domainObject, options.endpoint, options.useMock);
            }
        });
    };
    BaseDataServiceBehavior.prototype.log = function (requestName, data, endpoint, useMock) {
        var mockString = useMock ? 'Mocked ' : '';
        var endpointString = endpoint == null ? 'unspecified' : endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        console.log(data);
    };
    BaseDataServiceBehavior.prototype.transformFromServer = function (rawData) {
        return this.transform != null
            ? this.transform.fromServer(rawData)
            : rawData;
    };
    BaseDataServiceBehavior.prototype.transformToServer = function (data) {
        return this.transform != null
            ? this.transform.toServer(data)
            : data;
    };
    return BaseDataServiceBehavior;
})();
exports.BaseDataServiceBehavior = BaseDataServiceBehavior;
//# sourceMappingURL=baseDataServiceBehavior.js.map