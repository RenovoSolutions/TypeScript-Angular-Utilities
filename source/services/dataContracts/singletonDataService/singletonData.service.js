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
var core_1 = require('@angular/core');
var _ = require('lodash');
var http_service_1 = require('../../http/http.service');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
var dataContractsHelper_service_1 = require('../dataContractsHelper/dataContractsHelper.service');
var SingletonDataService = (function () {
    function SingletonDataService(http, options) {
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior(http, options.transform);
        this.mockData = options.mockData;
        this.endpoint = options.endpoint;
        this.url = this.endpoint;
        this.useMock = options.useMock;
        this.logRequests = options.logRequests;
    }
    SingletonDataService.prototype.get = function () {
        var _this = this;
        return this.behavior.getItem({
            endpoint: this.url,
            getMockData: function () { return _this.mockData; },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    SingletonDataService.prototype.update = function (domainObject) {
        var _this = this;
        return this.behavior.update({
            domainObject: domainObject,
            endpoint: this.url,
            updateMockData: function (data) {
                _this.mockData = _.assign(_this.mockData, domainObject);
            },
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
    };
    SingletonDataService.prototype.version = function (versionNumber) {
        var dataService = _.clone(this);
        dataService.url = dataContractsHelper_service_1.helper.versionEndpoint(dataService.url, versionNumber);
        return dataService;
    };
    return SingletonDataService;
}());
exports.SingletonDataService = SingletonDataService;
var SingletonDataServiceFactory = (function () {
    function SingletonDataServiceFactory(http) {
        this.http = http;
    }
    SingletonDataServiceFactory.prototype.getInstance = function (options) {
        return new SingletonDataService(this.http, options);
    };
    SingletonDataServiceFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_service_1.httpToken)), 
        __metadata('design:paramtypes', [Object])
    ], SingletonDataServiceFactory);
    return SingletonDataServiceFactory;
}());
exports.SingletonDataServiceFactory = SingletonDataServiceFactory;
exports.singletonDataServiceToken = new core_1.OpaqueToken('A service for making http requests against a singleton REST endpoint');
exports.SINGLETON_DATA_SERVICE_PROVIDER = new core_1.Provider(exports.singletonDataServiceToken, {
    useClass: SingletonDataServiceFactory,
});
function SingletonDataServiceProvider(options) {
    return core_1.provide(exports.singletonDataServiceToken, {
        deps: [http_service_1.httpToken],
        useFactory: function (http) { return new SingletonDataService(http, options); },
    });
}
exports.SingletonDataServiceProvider = SingletonDataServiceProvider;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBbUUsZUFBZSxDQUFDLENBQUE7QUFDbkYsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkJBQXdDLHlCQUF5QixDQUFDLENBQUE7QUFDbEUsd0NBQWtFLDRCQUE0QixDQUFDLENBQUE7QUFFL0YsNENBQXVCLG9EQUFvRCxDQUFDLENBQUE7QUFXNUU7SUFTQyw4QkFBWSxJQUFrQixFQUFFLE9BQTRDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpREFBdUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFHLEdBQUg7UUFBQSxpQkFPQztRQU5BLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUM1QixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDbEIsV0FBVyxFQUFFLGNBQW1CLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2RCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxxQ0FBTSxHQUFOLFVBQU8sWUFBdUI7UUFBOUIsaUJBVUM7UUFUQSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDM0IsWUFBWSxFQUFFLFlBQVk7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2xCLGNBQWMsRUFBRSxVQUFDLElBQWU7Z0JBQy9CLEtBQUksQ0FBQyxRQUFRLEdBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBTyxHQUFQLFVBQVEsYUFBcUI7UUFDNUIsSUFBSSxXQUFXLEdBQW9DLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsV0FBVyxDQUFDLEdBQUcsR0FBRyxvQ0FBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQTVDWSw0QkFBb0IsdUJBNENoQyxDQUFBO0FBT0Q7SUFHQyxxQ0FBZ0MsSUFBa0I7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELGlEQUFXLEdBQVgsVUFBdUIsT0FBNEM7UUFDbEUsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBVkY7UUFBQyxpQkFBVSxFQUFFO21CQUlFLGFBQU0sQ0FBQyx3QkFBUyxDQUFDOzttQ0FKbkI7SUFXYixrQ0FBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksbUNBQTJCLDhCQVV2QyxDQUFBO0FBRVksaUNBQXlCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0FBRWpJLHVDQUErQixHQUFhLElBQUksZUFBUSxDQUFDLGlDQUF5QixFQUFFO0lBQ2hHLFFBQVEsRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxDQUFDO0FBRUgsc0NBQTZDLE9BQXNDO0lBQ2xGLE1BQU0sQ0FBQyxjQUFPLENBQUMsaUNBQXlCLEVBQUU7UUFDekMsSUFBSSxFQUFFLENBQUMsd0JBQVMsQ0FBQztRQUNqQixVQUFVLEVBQUUsVUFBQyxJQUFrQixJQUFLLE9BQUEsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQXZDLENBQXVDO0tBQzNFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFMZSxvQ0FBNEIsK0JBSzNDLENBQUE7QUFBQSxDQUFDIn0=