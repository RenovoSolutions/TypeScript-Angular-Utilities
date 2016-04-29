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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsMkJBQTZDLHlCQUF5QixDQUFDLENBQUE7QUE2Q3ZFO0lBSUMsaUNBQVksSUFBa0IsRUFBRSxTQUF1RTtRQUN0RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQseUNBQU8sR0FBUCxVQUFRLE9BQW1DO1FBQTNDLGlCQWVDO1FBZEEsSUFBSSxPQUE2QixDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ3BFLFNBQVMsRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBaUI7WUFDckMsSUFBSSxHQUFHLDZCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUUs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