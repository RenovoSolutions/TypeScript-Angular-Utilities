"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var singletonData_service_1 = require('../../singletonDataService/singletonData.service');
var ParentSingletonDataService = (function (_super) {
    __extends(ParentSingletonDataService, _super);
    function ParentSingletonDataService($http, $q, options) {
        _super.call(this, $http, $q, options);
        this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
        this.parentId = options.parentId;
    }
    ParentSingletonDataService.prototype.childContracts = function () {
        var _this = this;
        var dictionary = this.resourceDictionaryBuilder();
        return _.mapValues(dictionary, function (dataService) {
            var contract;
            if (_.isFunction(dataService.AsSingleton)) {
                contract = dataService.AsSingleton(_this.parentId);
            }
            else {
                contract = dataService;
            }
            contract.url = _this.url + contract.endpoint;
            return contract;
        });
    };
    return ParentSingletonDataService;
}(singletonData_service_1.SingletonDataService));
exports.ParentSingletonDataService = ParentSingletonDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLHNDQUE0RCxrREFBa0QsQ0FBQyxDQUFBO0FBaUIvRztJQUNTLDhDQUErQjtJQUt2QyxvQ0FBWSxLQUFzQixFQUFFLEVBQWdCLEVBQUUsT0FBbUY7UUFDeEksa0JBQU0sS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMseUJBQXlCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsbURBQWMsR0FBZDtRQUFBLGlCQWNDO1FBYkEsSUFBSSxVQUFVLEdBQTJCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQzFFLE1BQU0sQ0FBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFDLFdBQTZDO1lBQ2pGLElBQUksUUFBYSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUU1QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNGLGlDQUFDO0FBQUQsQ0FBQyxBQTNCRCxDQUNTLDRDQUFvQixHQTBCNUI7QUEzQlksa0NBQTBCLDZCQTJCdEMsQ0FBQSJ9