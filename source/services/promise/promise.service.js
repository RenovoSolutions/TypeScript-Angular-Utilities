'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.promise';
exports.serviceName = 'promiseUtility';
var PromiseUtility = (function () {
    function PromiseUtility($q, $injector) {
        this.$q = $q;
        this.$injector = $injector;
    }
    PromiseUtility.prototype.isPromise = function (promise) {
        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    PromiseUtility.prototype.resolvePromises = function (resolves) {
        var _this = this;
        var promises = {};
        _.each(resolves, function (value, key) {
            if (_.isFunction(value) || _.isArray(value)) {
                promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
            }
            else if (_.isString(value)) {
                promises[key] = (_this.$q.when(_this.$injector.get(value)));
            }
            else {
                promises[key] = (_this.$q.when(value));
            }
        });
        return this.$q.all(promises);
    };
    PromiseUtility.$inject = ['$q', '$injector'];
    return PromiseUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, PromiseUtility);
//# sourceMappingURL=promise.service.js.map