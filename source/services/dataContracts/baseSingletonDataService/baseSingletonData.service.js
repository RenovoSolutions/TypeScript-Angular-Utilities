'use strict';
var angular = require('angular');
var _ = require('lodash');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
exports.factoryName = 'baseSingletonDataService';
var SingletonDataService = (function () {
    function SingletonDataService($http, $q, options) {
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, options.transform);
        this.mockData = options.mockData;
        this.endpoint = options.endpoint;
        this.useMock = options.useMock;
        this.logRequests = options.logRequests;
    }
    SingletonDataService.prototype.get = function () {
        var _this = this;
        return this.behavior.getItem({
            endpoint: this.endpoint,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    SingletonDataService.prototype.update = function (domainObject) {
        var _this = this;
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.endpoint,
            updateMockData: function (data) {
                _this.mockData = _.assign(_this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    return SingletonDataService;
}());
exports.SingletonDataService = SingletonDataService;
singletonDataServiceFactory.$inject = ['$http', '$q'];
function singletonDataServiceFactory($http, $q) {
    return {
        getInstance: function (options) {
            return new SingletonDataService($http, $q, options);
        },
    };
}
exports.singletonDataServiceFactory = singletonDataServiceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, singletonDataServiceFactory);
//# sourceMappingURL=baseSingletonData.service.js.map