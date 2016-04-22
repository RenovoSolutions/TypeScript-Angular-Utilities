"use strict";
var ng = require('angular');
var Promise = require('bluebird');
var _ = require('lodash');
var MockPromiseService = (function () {
    function MockPromiseService() {
    }
    MockPromiseService.prototype.promise = function (result, share) {
        if (ng.isUndefined(share)) {
            share = false;
        }
        if (ng.isFunction(result)) {
            return this.makeDynamicMockPromise(result, share);
        }
        else {
            return this.makeMockPromise(result, share);
        }
    };
    MockPromiseService.prototype.rejectedPromise = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        var mocked = this.makeMockPromise(null, false);
        mocked.rejected = true;
        mocked.rejectParams = params;
        return mocked;
    };
    MockPromiseService.prototype.flushAll = function (service) {
        _.each(service, function (promise) {
            if (promise && _.isFunction(promise.flush)) {
                promise.flush();
            }
        });
    };
    MockPromiseService.prototype.makeMockPromise = function (result, share) {
        return this.makeDynamicMockPromise(function () { return result; }, share);
    };
    MockPromiseService.prototype.makeDynamicMockPromise = function (result, shareParam) {
        var share = shareParam;
        ;
        var requests = [];
        // let request: any;
        // let promise: Promise<TData>;
        // Return a function that will build a pending promise when called
        var promiseBuilder = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (share && _.some(requests)) {
                return _.first(requests).promise;
            }
            var newRequest = {
                resolve: null,
                reject: null,
                params: args,
                promise: null,
            };
            newRequest.promise = new Promise(function (resolve, reject) {
                newRequest.resolve = resolve;
                newRequest.reject = reject;
            });
            requests.push(newRequest);
            return newRequest.promise;
        });
        var spiedBuilder = sinon.spy(promiseBuilder);
        var mocked = spiedBuilder;
        // Mark promise to be rejected
        mocked.reject = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            mocked.rejected = true;
            mocked.rejectParams = params;
        };
        // Mark promise to be shared in builder
        mocked.share = function (shareParam) {
            if (ng.isUndefined(shareParam)) {
                share = true;
            }
            share = shareParam;
        };
        // If current request, resolve and clear
        mocked.flush = function () {
            _.each(requests, function (request) {
                if (mocked.rejected) {
                    request.reject.apply(request, mocked.rejectParams);
                }
                else {
                    request.resolve(result.apply(void 0, request.params));
                }
            });
            requests = [];
        };
        return mocked;
    };
    return MockPromiseService;
}());
exports.mock = new MockPromiseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDcEMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFvQjVCO0lBQUE7SUFxR0EsQ0FBQztJQXBHQSxvQ0FBTyxHQUFQLFVBQWUsTUFBNEMsRUFBRSxLQUFlO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBOEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFRLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0YsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFBdUIsZ0JBQWdCO2FBQWhCLFdBQWdCLENBQWhCLHNCQUFnQixDQUFoQixJQUFnQjtZQUFoQiwrQkFBZ0I7O1FBQ3RDLElBQUksTUFBTSxHQUFrQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxPQUFZO1FB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