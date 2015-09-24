'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.promise';
exports.serviceName = 'promiseUtility';
var PromiseUtility = (function () {
    function PromiseUtility() {
    }
    PromiseUtility.prototype.isPromise = function (promise) {
        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    return PromiseUtility;
})();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, PromiseUtility);
//# sourceMappingURL=promise.service.js.map