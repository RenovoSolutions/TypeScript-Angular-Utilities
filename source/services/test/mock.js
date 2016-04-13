'use strict';
// uses sinon but can't import because sinon uses dynamic requires
// sinon types will be resolved from tsd.d.ts
var _ = require('lodash');
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.test.mock';
exports.serviceName = 'mockUtility';
var Mock = (function () {
    function Mock($q, $rootScope) {
        this.$q = $q;
        this.$rootScope = $rootScope;
    }
    Mock.prototype.service = function (service) {
        if (_.isUndefined(service)) {
            service = {};
        }
        service._mock_requestList_ = [];
        return service;
    };
    Mock.prototype.promise = function (service, methodName, data, successful) {
        var _this = this;
        // Default successful to true
        if (_.isUndefined(successful)) {
            successful = true;
        }
        service[methodName] = sinon.spy(function () {
            var deferred = _this.$q.defer();
            service._mock_requestList_.push({
                promise: deferred,
                data: data,
                successful: successful,
            });
            return deferred.promise;
        });
    };
    Mock.prototype.promiseWithCallback = function (service, methodName, callback, successful) {
        var _this = this;
        // Default successful to true
        if (_.isUndefined(successful)) {
            successful = true;
        }
        service[methodName] = sinon.spy(function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            var deferred = _this.$q.defer();
            service._mock_requestList_.push({
                promise: deferred,
                data: callback.apply(_this, params),
                successful: successful,
            });
            return deferred.promise;
        });
    };
    Mock.prototype.flush = function (service, scope) {
        // Save local reference to the request list and then clear
        var currentPendingRequests = service._mock_requestList_;
        service._mock_requestList_ = [];
        // Process the saved list.
        // This way if any additional requests are generated while processing the current / local list
        //  these requests will be queued until the next call to flush().
        _.each(currentPendingRequests, function (request) {
            if (request.successful) {
                request.promise.resolve(request.data);
            }
            else {
                request.promise.reject(request.data);
            }
            if (_.isUndefined(scope) === false) {
                scope.$digest();
            }
        });
        this.$rootScope.$apply();
    };
    Mock.$inject = ['$q', '$rootScope'];
    return Mock;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, Mock);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsa0VBQWtFO0FBQ2xFLDZDQUE2QztBQUU3QyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLGlDQUFpQyxDQUFDO0FBQ3ZELG1CQUFXLEdBQVcsYUFBYSxDQUFDO0FBZS9DO0lBRUMsY0FBb0IsRUFBcUIsRUFBVSxVQUFxQztRQUFwRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTJCO0lBQUksQ0FBQztJQUU3RixzQkFBTyxHQUFQLFVBQVEsT0FBYTtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFFaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQsc0JBQU8sR0FBUCxVQUFtQixPQUFZLEVBQUUsVUFBa0IsRUFBRSxJQUFnQixFQUFFLFVBQW9CO1FBQTNGLGlCQWlCQztRQWhCQSw2QkFBNkI7UUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxRQUFRLEdBQWlDLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFN0QsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDL0Is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