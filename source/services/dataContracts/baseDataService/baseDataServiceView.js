'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseData_service_1 = require('./baseData.service');
var baseParentData_service_1 = require('../baseParentDataService/baseParentData.service');
var baseSingletonData_service_1 = require('../baseSingletonDataService/baseSingletonData.service');
var baseParentSingletonData_service_1 = require('../baseParentSingletonDataService/baseParentSingletonData.service');
var BaseDataServiceView = (function (_super) {
    __extends(BaseDataServiceView, _super);
    function BaseDataServiceView($http, $q, array, _endpoint, mockData, transform, useMock, logRequests) {
        _super.call(this, $http, $q, array, _endpoint, mockData, transform, useMock, logRequests);
        this.$http = $http;
        this.$q = $q;
        this.transform = transform;
    }
    BaseDataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.transform, this.useMock, this.logRequests);
    };
    return BaseDataServiceView;
})(baseData_service_1.BaseDataService);
exports.BaseDataServiceView = BaseDataServiceView;
var BaseParentDataServiceView = (function (_super) {
    __extends(BaseParentDataServiceView, _super);
    function BaseParentDataServiceView($http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
        _super.call(this, $http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests);
        this.$http = $http;
        this.$q = $q;
        this.transform = transform;
    }
    BaseParentDataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.useMock, this.logRequests);
    };
    return BaseParentDataServiceView;
})(baseParentData_service_1.BaseParentDataService);
exports.BaseParentDataServiceView = BaseParentDataServiceView;
//# sourceMappingURL=baseDataServiceView.js.map