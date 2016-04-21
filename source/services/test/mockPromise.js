"use strict";
var ng = require('angular');
var Promise = require('bluebird');
var _ = require('lodash');
var MockPromiseService = (function () {
    function MockPromiseService() {
    }
    MockPromiseService.prototype.promise = function (result) {
        if (ng.isFunction(result)) {
            return this.makeDynamicMockPromise(result);
        }
        else {
            return this.makeMockPromise(result);
        }
    };
    MockPromiseService.prototype.rejectedPromise = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        var mocked = this.makeMockPromise(null);
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
    MockPromiseService.prototype.makeMockPromise = function (result) {
        return this.makeDynamicMockPromise(function () { return result; });
    };
    MockPromiseService.prototype.makeDynamicMockPromise = function (result) {
        var request;
        var promise;
        var promiseBuilder = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (request) {
                return promise;
            }
            promise = new Promise(function (resolve, reject) {
                request = {
                    resolve: resolve,
                    reject: reject,
                    params: args,
                };
            });
            return promise;
        });
        var spiedBuilder = sinon.spy(promiseBuilder);
        var mocked = spiedBuilder;
        mocked.reject = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            mocked.rejected = true;
            mocked.rejectParams = params;
        };
        mocked.flush = function () {
            if (request) {
                if (mocked.rejected) {
                    request.reject.apply(request, mocked.rejectParams);
                }
                else {
                    request.resolve(result.apply(void 0, request.params));
                }
                request = null;
            }
        };
        return mocked;
    };
    return MockPromiseService;
}());
exports.mock = new MockPromiseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDcEMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFtQjVCO0lBQUE7SUFzRUEsQ0FBQztJQXJFQSxvQ0FBTyxHQUFQLFVBQWUsTUFBMkM7UUFDekQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBOEIsTUFBTSxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQVEsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNGLENBQUM7SUFFRCw0Q0FBZSxHQUFmO1FBQXVCLGdCQUFnQjthQUFoQixXQUFnQixDQUFoQixzQkFBZ0IsQ0FBaEIsSUFBZ0I7WUFBaEIsK0JBQWdCOztRQUN0QyxJQUFJLE1BQU0sR0FBa0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxPQUFZO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsT0FBNEI7WUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyw0Q0FBZSxHQUF2QixVQUErQixNQUFhO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sbURBQXNCLEdBQTlCLFVBQXNDLE1BQW1DO1FBQ3hFLElBQUksT0FBWSxDQUFDO1FBQ2pCLElBQUksT0FBdUIsQ0FBQztRQUU1QixJQUFJLGNBQWMsR0FBUSxDQUFDO1lBQUMsY0FBYztpQkFBZCxXQUFjLENBQWQsc0JBQWMsQ0FBZCxJQUFjO2dCQUFkLDZCQUFjOztZQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDaEIsQ0FBQztZQUVELE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBUSxVQUFVLE9BQU8sRUFBRSxNQUFNO2dCQUNyRCxPQUFPLEdBQUc7b0JBQ1QsU0FBQSxPQUFPO29CQUNQLFFBQUEsTUFBTTtvQkFDTixNQUFNLEVBQUUsSUFBSTtpQkFDWixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEdBQVEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLE1BQU0sR0FBa0UsWUFBWSxDQUFDO1FBRXpGLE1BQU0sQ0FBQyxNQUFNLEdBQUc7WUFBQyxnQkFBZ0I7aUJBQWhCLFdBQWdCLENBQWhCLHNCQUFnQixDQUFoQixJQUFnQjtnQkFBaEIsK0JBQWdCOztZQUNoQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxHQUFHO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDckIsT0FBTyxDQUFDLE1BQU0sT0FBZCxPQUFPLEVBQVcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxlQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUVELE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBdEVELElBc0VDO0FBRVksWUFBSSxHQUF3QixJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==