'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../../array/array.service');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
var dataContractsHelper_service_1 = require('../dataContractsHelper/dataContractsHelper.service');
exports.moduleName = 'rl.utilities.services.dataContracts.dataService';
exports.factoryName = 'dataService';
var DataService = (function () {
    function DataService($http, $q, array, options) {
        this.array = array;
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, options.transform);
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
    return DataService;
}());
exports.DataService = DataService;
dataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
function dataServiceFactory($http, $q, array) {
    return {
        getInstance: function (options) {
            return new DataService($http, $q, array, options);
        },
    };
}
exports.dataServiceFactory = dataServiceFactory;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .factory(exports.factoryName, dataServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDhCQUE4RiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFILHdDQUFtRiw0QkFBNEIsQ0FBQyxDQUFBO0FBRWhILDRDQUF1QixvREFBb0QsQ0FBQyxDQUFBO0FBRWpFLGtCQUFVLEdBQVcsaURBQWlELENBQUM7QUFDdkUsbUJBQVcsR0FBVyxhQUFhLENBQUM7QUF5Qi9DO0lBU0kscUJBQVksS0FBMkIsRUFDN0IsRUFBcUIsRUFDWCxLQUFvQixFQUN2QyxPQUF1QztRQURwQixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpREFBdUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBRU8scUNBQWUsR0FBdkIsVUFBd0IsRUFBVTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lB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