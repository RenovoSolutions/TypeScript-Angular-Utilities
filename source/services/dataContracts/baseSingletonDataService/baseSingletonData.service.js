'use strict';
var angular = require('angular');
var _ = require('lodash');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
exports.factoryName = 'baseSingletonDataService';
var BaseSingletonDataService = (function () {
    function BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests) {
        this.endpoint = endpoint;
        this.mockData = mockData;
        this.useMock = useMock;
        this.logRequests = logRequests;
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform);
    }
    BaseSingletonDataService.prototype.get = function () {
        var _this = this;
        return this.behavior.getItem({
            endpoint: this.endpoint,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    BaseSingletonDataService.prototype.update = function (domainObject) {
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
    return BaseSingletonDataService;
})();
exports.BaseSingletonDataService = BaseSingletonDataService;
baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
function baseSingletonDataServiceFactory($http, $q) {
    return {
        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests);
        },
    };
}
exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, baseSingletonDataServiceFactory);
//# sourceMappingURL=baseSingletonData.service.js.map