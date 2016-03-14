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
var DataServiceView = (function (_super) {
    __extends(DataServiceView, _super);
    function DataServiceView($http, $q, array, options) {
        _super.call(this, $http, $q, array, options);
        this.$http = $http;
        this.$q = $q;
        this.transform = options.transform;
    }
    DataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        return new baseSingletonData_service_1.SingletonDataService(this.$http, this.$q, {
            endpoint: this.endpoint,
            mockData: mockData,
            transform: this.transform,
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    return DataServiceView;
}(baseData_service_1.DataService));
exports.DataServiceView = DataServiceView;
var ParentDataServiceView = (function (_super) {
    __extends(ParentDataServiceView, _super);
    function ParentDataServiceView($http, $q, array, options) {
        _super.call(this, $http, $q, array, options);
        this.$http = $http;
        this.$q = $q;
    }
    ParentDataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        return new baseParentSingletonData_service_1.ParentSingletonDataService(this.$http, this.$q, {
            endpoint: this.endpoint,
            mockData: mockData,
            resourceDictionaryBuilder: this.resourceDictionaryBuilder,
            transform: this.transform,
            useMock: this.useMock,
            logRequests: this.logRequests,
            parentId: parentId,
        });
    };
    return ParentDataServiceView;
}(baseParentData_service_1.ParentDataService));
exports.ParentDataServiceView = ParentDataServiceView;
//# sourceMappingURL=baseDataServiceView.js.map