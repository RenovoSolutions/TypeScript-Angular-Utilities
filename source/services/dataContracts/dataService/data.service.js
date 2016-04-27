"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
var http_service_1 = require('../../http/http.service');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
var dataContractsHelper_service_1 = require('../dataContractsHelper/dataContractsHelper.service');
var DataService = (function () {
    function DataService(http, array, options) {
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior(http, options.transform);
        this.useDeepSearch = options.useDeepSearch;
        this.mockData = options.mockData;
        this.endpoint = options.endpoint;
        this.url = this.endpoint;
        this.useMock = options.useMock;
        this.logRequests = options.logRequests;
    }
    DataService.prototype.getItemEndpoint = function (id) {
        return this.url + '/' + id.toString();
    };
    DataService.prototype.getList = function (params) {
        var _this = this;
        var requestParams = {
            params: params,
            endpoint: this.url,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        };
        if (this.useDeepSearch) {
            return this.behavior.search(requestParams);
        }
        else {
            return this.behavior.getList(requestParams);
        }
    };
    DataService.prototype.getDetail = function (id) {
        var _this = this;
        return this.behavior.getItem({
            endpoint: this.getItemEndpoint(id),
            getMockData: function () {
                return _.find(_this.mockData, function (item) {
                    return item.id === id;
                });
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    DataService.prototype.create = function (domainObject) {
        var _this = this;
        return this.behavior.create({
            domainObject: domainObject,
            endpoint: this.url,
            addMockData: function (data) {
                var nextId = _.maxBy(_this.mockData, 'id').id + 1;
                domainObject.id = nextId;
                _this.mockData.push(domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    DataService.prototype.update = function (domainObject) {
        var _this = this;
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            updateMockData: function (data) {
                var oldObject = _.find(_this.mockData, function (item) {
                    return item.id === data.id;
                });
                oldObject = _.assign(oldObject, data);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    DataService.prototype.delete = function (domainObject) {
        var _this = this;
        return this.behavior.delete({
            domainObject: domainObject,
            endpoint: this.getItemEndpoint(domainObject.id),
            removeMockData: function (data) {
                _this.array.remove(_this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    DataService.prototype.version = function (versionNumber) {
        var dataService = _.clone(this);
        dataService.url = dataContractsHelper_service_1.helper.versionEndpoint(dataService.url, versionNumber);
        return dataService;
    };
    DataService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_service_1.httpToken)),
        __param(1, core_1.Inject(array_service_1.arrayToken))
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
var DataServiceFactory = (function () {
    function DataServiceFactory(http, array) {
        this.http = http;
        this.array = array;
    }
    DataServiceFactory.prototype.getInstance = function (options) {
        return new DataService(this.http, this.array, options);
    };
    DataServiceFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_service_1.httpToken)),
        __param(1, core_1.Inject(array_service_1.arrayToken))
    ], DataServiceFactory);
    return DataServiceFactory;
}());
exports.DataServiceFactory = DataServiceFactory;
exports.dataServiceToken = new core_1.OpaqueToken('A service for making http requests against a REST endpoint');
exports.DATA_SERVICE_PROVIDER = new core_1.Provider(exports.dataServiceToken, {
    useClass: DataServiceFactory,
});
exports.DataServiceProvider = function (options) {
    return core_1.provide(exports.dataServiceToken, {
        deps: [http_service_1.httpToken, array_service_1.arrayToken],
        useFactory: function (http, array) { return new DataService(http, array, options); },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBbUUsZUFBZSxDQUFDLENBQUE7QUFDbkYsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsOEJBQTBDLDJCQUEyQixDQUFDLENBQUE7QUFDdEUsNkJBQXdDLHlCQUF5QixDQUFDLENBQUE7QUFDbEUsd0NBQW1GLDRCQUE0QixDQUFDLENBQUE7QUFFaEgsNENBQXVCLG9EQUFvRCxDQUFDLENBQUE7QUF1QjVFO0lBVUMscUJBQStCLElBQWtCLEVBQ3pCLEtBQW9CLEVBQ3hDLE9BQXVDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpREFBdUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxxQ0FBZSxHQUF2QixVQUF3QixFQUFVO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxNQUFxQjtRQUE3QixpQkFjQztRQWJBLElBQUksYUFBYSxHQUErQjtZQUMvQyxNQUFNLEVBQUUs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