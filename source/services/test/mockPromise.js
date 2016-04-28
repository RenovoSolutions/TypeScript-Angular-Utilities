"use strict";
var _ = require('lodash');
var MockPromiseService = (function () {
    function MockPromiseService() {
    }
    MockPromiseService.prototype.promise = function (result, share) {
        if (_.isUndefined(share)) {
            share = false;
        }
        if (_.isFunction(result)) {
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
        var mocked;
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
                rejected: mocked.rejected,
                rejectParams: mocked.rejectParams,
            };
            newRequest.promise = new Promise(function (resolve, reject) {
                newRequest.resolve = resolve;
                newRequest.reject = reject;
            });
            requests.push(newRequest);
            return newRequest.promise;
        });
        var spiedBuilder = sinon.spy(promiseBuilder);
        mocked = spiedBuilder;
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
            if (_.isUndefined(shareParam)) {
                share = true;
            }
            share = shareParam;
        };
        // If current request, resolve and clear
        mocked.flush = function () {
            _.each(requests, function (request) {
                if (request.rejected) {
                    request.reject.apply(request, request.rejectParams);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFvQjVCO0lBQUE7SUF1R0EsQ0FBQztJQXRHQSxvQ0FBTyxHQUFQLFVBQWUsTUFBNEMsRUFBRSxLQUFlO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBOEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFRLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0YsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFBdUIsZ0JBQWdCO2FBQWhCLFdBQWdCLENBQWhCLHNCQUFnQixDQUFoQixJQUFnQjtZQUFoQiwrQkFBZ0I7O1FBQ3RDLElBQUksTUFBTSxHQUFrQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxPQUFZO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsT0FBNEI7WUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJ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