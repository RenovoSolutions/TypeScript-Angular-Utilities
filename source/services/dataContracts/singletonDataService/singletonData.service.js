'use strict';
var angular = require('angular');
var _ = require('lodash');
var baseDataServiceBehavior_1 = require('../baseDataServiceBehavior');
var dataContractsHelper_service_1 = require('../dataContractsHelper/dataContractsHelper.service');
exports.moduleName = 'rl.utilities.services.dataContracts.singletonDataService';
exports.factoryName = 'singletonDataService';
var SingletonDataService = (function () {
    function SingletonDataService($http, $q, options) {
        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, options.transform);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLHdDQUFrRSw0QkFBNEIsQ0FBQyxDQUFBO0FBRS9GLDRDQUF1QixvREFBb0QsQ0FBQyxDQUFBO0FBRWpFLGtCQUFVLEdBQVcsMERBQTBELENBQUM7QUFDaEYsbUJBQVcsR0FBVyxzQkFBc0IsQ0FBQztBQWN4RDtJQVNJLDhCQUFZLEtBQTJCLEVBQzdCLEVBQXFCLEVBQ3JCLE9BQTRDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpREFBdUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxrQ0FBRyxHQUFIO1FBQUEsaUJBT0M7UUFORyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxjQUFtQixNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQU0sR0FBTixVQUFPLFlBQXVCO1FBQTlCLGlCQVVDO1FBVEcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNsQixjQUFjLEVBQUUsVUFBQyxJQUFlO2dCQUM1QixLQUFJLENBQUMsUUFBUSxHQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUosc0NBQU8sR0FBUCxVQUFRLGFBQXFCO1FBQzVCLElBQUksV0FBVyxHQUFvQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFdBQVcsQ0FBQyxHQUFHLEdBQUcsb0NBQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE5Q1ksNEJBQW9CLHVCQThDaEMsQ0FBQTtBQVNELDJCQUEyQixDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxxQ0FBNEMsS0FBMkIsRUFBRSxFQUFxQjtJQUMxRixNQUFNLENBQUM7UUFDSCxXQUFXLFlBQVksT0FBNEM7WUFDL0QsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQVksS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFOZSxtQ0FBMkIsOEJBTTFDLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQ3pCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLDJCQUEyQixDQUFDLENBQUMifQ==