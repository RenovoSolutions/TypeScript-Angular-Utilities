'use strict';
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
        var singleton = new singletonData_service_1.SingletonDataService(this.$http, this.$q, {
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
    function ParentDataServiceView($http, $q, array, options) {
        _super.call(this, $http, $q, array, options);
        this.$http = $http;
        this.$q = $q;
    }
    ParentDataServiceView.prototype.AsSingleton = function (parentId) {
        var mockData = _.find(this.mockData, function (item) {
            return item.id === parentId;
        });
        var singleton = new parentSingletonData_service_1.ParentSingletonDataService(this.$http, this.$q, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNlcnZpY2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YVNlcnZpY2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBS2IsNkJBQTZELGlCQUFpQixDQUFDLENBQUE7QUFDL0UsbUNBQXNELDhCQUE4QixDQUFDLENBQUE7QUFDckYsc0NBQTRELGtEQUFrRCxDQUFDLENBQUE7QUFDL0csNENBQXdFLCtEQUErRCxDQUFDLENBQUE7QUFrQnhJO0lBQ1MsbUNBQXFDO0lBSzdDLHlCQUFvQixLQUEyQixFQUMxQixFQUFxQixFQUM3QixLQUFvQixFQUM3QixPQUF1QztRQUMxQyxrQkFBTSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUpkLFVBQUssR0FBTCxLQUFLLENBQXNCO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBSXpDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLFFBQWdCO1FBQzNCLElBQUksUUFBUSxHQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQWU7WUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLEdBQW9DLElBQUksNENBQW9CLENBQVksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ3pHLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBNUJELENBQ1MsMEJBQVcsR0EyQm5CO0FBNUJZLHVCQUFlLGtCQTRCM0IsQ0FBQTtBQUVEO0lBQ1MseUNBQW9FO0lBSzVFLCtCQUFvQixLQUEyQixFQUMxQixFQUFxQixFQUM3QixLQUFvQixFQUM3QixPQUFrRTtRQUNyRSxrQkFBTSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUpkLFVBQUssR0FBTCxLQUFLLENBQXNCO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO0lBSTFDLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksUUFBZ0I7UUFDM0IsSUFBSSxRQUFRLEdBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBZTtZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsR0FBbUUsSUFBSSx3REFBMEIsQ0FBcUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ3ZLLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUE3QkQsQ0FDUyxzQ0FBaUIsR0E0QnpCO0FBN0JZLDZCQUFxQix3QkE2QmpDLENBQUEifQ==