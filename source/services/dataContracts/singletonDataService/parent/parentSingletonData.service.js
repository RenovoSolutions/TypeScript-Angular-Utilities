"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var singletonData_service_1 = require('../../singletonDataService/singletonData.service');
var ParentSingletonDataService = (function (_super) {
    __extends(ParentSingletonDataService, _super);
    function ParentSingletonDataService(http, options) {
        _super.call(this, http, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNDQUE0RCxrREFBa0QsQ0FBQyxDQUFBO0FBYy9HO0lBQ1MsOENBQStCO0lBS3ZDLG9DQUFZLElBQWtCLEVBQUUsT0FBbUY7UUFDbEgsa0JBQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7UUFDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxtREFBYyxHQUFkO1FBQUEsaUJBY0M7UUFiQSxJQUFJLFVBQVUsR0FBMkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDMUUsTUFBTSxDQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQUMsV0FBNkM7WUFDakYsSUFBSSxRQUFhLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDeEIsQ0FBQztZQUVELFFBQVEsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBRTVDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YsaUNBQUM7QUFBRCxDQUFDLEFBM0JELENBQ1MsNENBQW9CLEdBMEI1QjtBQTNCWSxrQ0FBMEIsNkJBMkJ0QyxDQUFBIn0=