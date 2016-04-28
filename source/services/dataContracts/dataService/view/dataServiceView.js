"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var data_service_1 = require('../data.service');
var parentData_service_1 = require('../parent/parentData.service');
var singletonData_service_1 = require('../../singletonDataService/singletonData.service');
var parentSingletonData_service_1 = require('../../singletonDataService/parent/parentSingletonData.service');
var DataServiceView = (function (_super) {
    __extends(DataServiceView, _super);
    function DataServiceView(http, array, options) {
        _super.call(this, http, array, options);
        this.http = http;
        this.transform = options.transform;
    }
    DataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        var singleton = new singletonData_service_1.SingletonDataService(this.http, {
            endpoint: this.endpoint,
            mockData: mockData,
            transform: this.transform,
            useMock: this.useMock,
            logRequests: this.logRequests,
        });
        singleton.url = this.url;
        return singleton;
    };
    return DataServiceView;
}(data_service_1.DataService));
exports.DataServiceView = DataServiceView;
var ParentDataServiceView = (function (_super) {
    __extends(ParentDataServiceView, _super);
    function ParentDataServiceView(http, array, options) {
        _super.call(this, http, array, options);
        this.http = http;
    }
    ParentDataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        var singleton = new parentSingletonData_service_1.ParentSingletonDataService(this.http, {
            endpoint: this.endpoint,
            mockData: mockData,
            resourceDictionaryBuilder: this.resourceDictionaryBuilder,
            transform: this.transform,
            useMock: this.useMock,
            logRequests: this.logRequests,
            parentId: parentId,
        });
        singleton.url = this.url;
        return singleton;
    };
    return ParentDataServiceView;
}(parentData_service_1.ParentDataService));
exports.ParentDataServiceView = ParentDataServiceView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNlcnZpY2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YVNlcnZpY2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLDZCQUE2RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQy9FLG1DQUFzRCw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3JGLHNDQUE0RCxrREFBa0QsQ0FBQyxDQUFBO0FBQy9HLDRDQUF3RSwrREFBK0QsQ0FBQyxDQUFBO0FBWXhJO0lBQ1MsbUNBQXFDO0lBTTdDLHlCQUFZLElBQWtCLEVBQzFCLEtBQW9CLEVBQ3BCLE9BQXVDO1FBQzFDLGtCQUFNLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksUUFBZ0I7UUFDM0IsSUFBSSxRQUFRLEdBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBZTtZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsR0FBb0MsSUFBSSw0Q0FBb0IsQ0FBWSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQy9GLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBN0JELENBQ1MsMEJBQVcsR0E0Qm5CO0FBN0JZLHVCQUFlLGtCQTZCM0IsQ0FBQTtBQUVEO0lBQ1MseUNBQW9FO0lBTTVFLCtCQUFZLElBQWtCLEVBQzNCLEtBQW9CLEVBQ3BCLE9BQWtFO1FBQ3BFLGtCQUFNLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUMzQixJQUFJLFFBQVEsR0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxJQUFlO1lBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxHQUFtRSxJQUFJLHdEQUEwQixDQUFxQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzdKLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUE5QkQsQ0FDUyxzQ0FBaUIsR0E2QnpCO0FBOUJZLDZCQUFxQix3QkE4QmpDLENBQUEifQ==