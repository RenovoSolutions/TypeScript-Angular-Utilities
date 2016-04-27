"use strict";
var converters_1 = require('./converters/converters');
var BaseDataServiceBehavior = (function () {
    function BaseDataServiceBehavior(http, transform) {
        this.http = http;
        this.transform = transform;
    }
    BaseDataServiceBehavior.prototype.getList = function (options) {
        var _this = this;
        var promise;
        if (options.useMock) {
            promise = Promise.resolve(options.getMockData());
        }
        else {
            promise = this.http.get(options.endpoint, options.params)
                .toPromise();
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
            promise = Promise.resolve({
                dataSet: options.getMockData(),
            });
        }
        else {
            promise = this.http.post(options.endpoint, options.params)
                .toPromise();
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
            promise = Promise.resolve(options.getMockData());
        }
        else {
            promise = this.http.get(options.endpoint)
                .toPromise();
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
            promise = Promise.resolve(options.domainObject);
        }
        else {
            promise = this.http.post(options.endpoint, options.domainObject)
                .toPromise();
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
            promise = Promise.resolve(options.domainObject);
        }
        else {
            promise = this.http.put(options.endpoint, options.domainObject)
                .toPromise();
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
            promise = Promise.resolve();
        }
        else {
            promise = this.http.delete(options.endpoint)
                .toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsMkJBQTZDLHlCQUF5QixDQUFDLENBQUE7QUE2Q3ZFO0lBSUMsaUNBQVksSUFBa0IsRUFBRSxTQUF1RTtRQUN0RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQseUNBQU8sR0FBUCxVQUFRLE9BQW1DO1FBQTNDLGlCQWVDO1FBZEEsSUFBSSxPQUE2QixDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ3ZELFNBQVMsRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBaUI7WUFDckMsSUFBSSxHQUFHLDZCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUUs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