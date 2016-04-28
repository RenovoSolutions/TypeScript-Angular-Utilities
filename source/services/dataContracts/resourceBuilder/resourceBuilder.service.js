"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var array_service_1 = require('../../array/array.service');
var http_service_1 = require('../../http/http.service');
var data_service_1 = require('../dataService/data.service');
var dataServiceView_1 = require('../dataService/view/dataServiceView');
var parentData_service_1 = require('../dataService/parent/parentData.service');
var singletonData_service_1 = require('../singletonDataService/singletonData.service');
var parentSingletonData_service_1 = require('../singletonDataService/parent/parentSingletonData.service');
var ResourceBuilder = (function () {
    function ResourceBuilder(http, array) {
    }
    ResourceBuilder.prototype.createResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new data_service_1.DataService(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.DataServiceView(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createParentResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentData_service_1.ParentDataService(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createParentResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.ParentDataServiceView(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new singletonData_service_1.SingletonDataService(this.http, options);
    };
    ResourceBuilder.prototype.createParentSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentSingletonData_service_1.ParentSingletonDataService(this.http, options);
    };
    ResourceBuilder.prototype.useMockIfNoEndpoint = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return options;
    };
    ResourceBuilder = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_service_1.httpToken)),
        __param(1, core_1.Inject(array_service_1.arrayToken)), 
        __metadata('design:paramtypes', [Object, Object])
    ], ResourceBuilder);
    return ResourceBuilder;
}());
exports.ResourceBuilder = ResourceBuilder;
exports.resourceBuilderToken = new core_1.OpaqueToken('A helper for building resources for hitting REST endpoints');
exports.RESOURCE_BUILDER_PROVIDER = new core_1.Provider(exports.resourceBuilderToken, {
    useClass: ResourceBuilder,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBRTFFLDhCQUEwQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3RFLDZCQUF3Qyx5QkFBeUIsQ0FBQyxDQUFBO0FBR2xFLDZCQUE2RCw2QkFBNkIsQ0FBQyxDQUFBO0FBQzNGLGdDQUFpRyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3ZJLG1DQUFzRCwwQ0FBMEMsQ0FBQyxDQUFBO0FBQ2pHLHNDQUE0RCwrQ0FBK0MsQ0FBQyxDQUFBO0FBQzVHLDRDQUF3RSw0REFBNEQsQ0FBQyxDQUFBO0FBcUhySTtJQUlDLHlCQUErQixJQUFrQixFQUN6QixLQUFvQjtJQUFJLENBQUM7SUFFakQsd0NBQWMsR0FBZCxVQUFtRSxPQUF1QztRQUN6RyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBdUUsT0FBdUM7UUFDN0csT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsOENBQW9CLEdBQXBCLFVBQ0UsT0FBa0U7UUFDbkUsT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxzQ0FBaUIsQ0FBb0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRCxrREFBd0IsR0FBeEIsVUFDRSxPQUFrRTtRQUNuRSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLHVDQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsaURBQXVCLEdBQXZCLFVBQW1DLE9BQTRDO1FBQzlFLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksNENBQW9CLENBQVksSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsdURBQTZCLEdBQTdCLFVBQ0UsT0FBMkU7UUFDNUUsT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSx3REFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyw2Q0FBbUIsR0FBM0IsVUFBdUMsT0FBZ0M7UUFDdEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUE1Q0Y7UUFBQyxpQkFBVSxFQUFFO21CQUtDLGFBQU0sQ0FBQyx3QkFBUyxDQUFDO21CQUN6QixhQUFNLENBQUMsMEJBQVUsQ0FBQzs7dUJBTlg7SUE2Q2Isc0JBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLHVCQUFlLGtCQTRDM0IsQ0FBQTtBQUVZLDRCQUFvQixHQUFnQixJQUFJLGtCQUFXLENBQUMsNERBQTRELENBQUMsQ0FBQztBQUVsSCxpQ0FBeUIsR0FBYSxJQUFJLGVBQVEsQ0FBQyw0QkFBb0IsRUFBRTtJQUNyRixRQUFRLEVBQUUsZUFBZTtDQUN6QixDQUFDLENBQUMifQ==