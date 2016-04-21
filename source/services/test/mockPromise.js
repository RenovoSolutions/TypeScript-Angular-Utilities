"use strict";
var ng = require('angular');
var Promise = require('bluebird');
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
    MockPromiseService.prototype.makeMockPromise = function (result) {
        return this.makeDynamicMockPromise(function () { return result; });
    };
    MockPromiseService.prototype.makeDynamicMockPromise = function (result) {
        var request;
        var promise;
        var mocked = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFrQnBDO0lBQUE7SUEyREEsQ0FBQztJQTFEQSxvQ0FBTyxHQUFQLFVBQWUsTUFBMkM7UUFDekQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBK0IsTUFBTSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQVMsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNGLENBQUM7SUFFRCw0Q0FBZSxHQUFmO1FBQXVCLGdCQUFnQjthQUFoQixXQUFnQixDQUFoQixzQkFBZ0IsQ0FBaEIsSUFBZ0I7WUFBaEIsK0JBQWdCOztRQUN0QyxJQUFJLE1BQU0sR0FBa0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVPLDRDQUFlLEdBQXZCLFVBQStCLE1BQWE7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyxtREFBc0IsR0FBOUIsVUFBc0MsTUFBbUM7UUFDeEUsSUFBSSxPQUFZLENBQUM7UUFDakIsSUFBSSxPQUF1QixDQUFDO1FBRTVCLElBQUksTUFBTSxHQUFpRSxDQUFDO1lBQUMsY0FBYztpQkFBZCxXQUFjLENBQWQsc0JBQWMsQ0FBZCxJQUFjO2dCQUFkLDZCQUFjOztZQUMxRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDaEIsQ0FBQztZQUVELE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBUSxVQUFVLE9BQU8sRUFBRSxNQUFNO2dCQUNyRCxPQUFPLEdBQUc7b0JBQ1QsU0FBQSxPQUFPO29CQUNQLFFBQUEsTUFBTTtvQkFDTixNQUFNLEVBQUUsSUFBSTtpQkFDWixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRztZQUFDLGdCQUFnQjtpQkFBaEIsV0FBZ0IsQ0FBaEIsc0JBQWdCLENBQWhCLElBQWdCO2dCQUFoQiwrQkFBZ0I7O1lBQ2hDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxLQUFLLEdBQUc7WUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNyQixPQUFPLENBQUMsTUFBTSxPQUFkLE9BQU8sRUFBVyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLGVBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBRUQsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUEzREQsSUEyREM7QUFFWSxZQUFJLEdBQXdCLElBQUksa0JBQWtCLEVBQUUsQ0FBQyJ9