'use strict';
var converters_1 = require('./converters/converters');
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
            data = converters_1.converterService.applyTransform(data, _this.transform, false);
            if (options.logRequests) {
                _this.log('getList', options.params, data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.search = function (options) {
        var _this = this;
        var promise;
        if (options.useMock) {
            promise = this.$q.when({
                dataSet: options.getMockData(),
            });
        }
        else {
            promise = this.$http.post(options.endpoint, options.params)
                .then(function (response) {
                return response.data;
            });
        }
        return promise.then(function (result) {
            result.dataSet = converters_1.converterService.applyTransform(result.dataSet, _this.transform, false);
            if (options.logRequests) {
                _this.log('search', options.params, result, options.endpoint, options.useMock);
            }
            return result;
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
            data = converters_1.converterService.applyTransform(data, _this.transform, false);
            if (options.logRequests) {
                _this.log('get', null, data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.create = function (options) {
        var _this = this;
        var promise;
        options.domainObject = converters_1.converterService.applyTransform(options.domainObject, this.transform, true);
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
            data = converters_1.converterService.applyTransform(data, _this.transform, false);
            if (options.logRequests) {
                _this.log('create', options.domainObject, data, options.endpoint, options.useMock);
            }
            return data;
        });
    };
    BaseDataServiceBehavior.prototype.update = function (options) {
        var _this = this;
        var promise;
        options.domainObject = converters_1.converterService.applyTransform(options.domainObject, this.transform, true);
        if (options.useMock) {
            options.updateMockData(options.domainObject);
            promise = this.$q.when(options.domainObject);
        }
        else {
            promise = this.$http.put(options.endpoint, options.domainObject)
                .then(function (result) {
                return result.data;
            });
        }
        return promise.then(function (data) {
            data = converters_1.converterService.applyTransform(data, _this.transform, false);
            if (options.logRequests) {
                _this.log('update', options.domainObject, data, options.endpoint, options.useMock);
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
                _this.log('delete', options.domainObject, null, options.endpoint, options.useMock);
            }
        });
    };
    BaseDataServiceBehavior.prototype.log = function (requestName, params, data, endpoint, useMock) {
        var mockString = useMock ? 'Mocked ' : '';
        var endpointString = endpoint == null ? 'unspecified' : endpoint;
        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
        if (params != null) {
            console.log('params:');
            console.log(params);
        }
        if (data != null) {
            console.log('data:');
            console.log(data);
        }
    };
    return BaseDataServiceBehavior;
}());
exports.BaseDataServiceBehavior = BaseDataServiceBehavior;
//# sourceMappingURL=baseDataServiceBehavior.js.map