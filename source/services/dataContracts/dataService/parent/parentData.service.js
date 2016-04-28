"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var data_service_1 = require('../data.service');
var ParentDataService = (function (_super) {
    __extends(ParentDataService, _super);
    function ParentDataService(http, array, options) {
        _super.call(this, http, array, options);
        this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
    }
    ParentDataService.prototype.childContracts = function (id) {
        var _this = this;
        if (_.isUndefined(id)) {
            var dictionary = this.resourceDictionaryBuilder();
            _.each(dictionary, function (dataService) {
                dataService.url = _this.url + dataService.endpoint;
            });
            return dictionary;
        }
        else {
            var dictionary = this.resourceDictionaryBuilder();
            return _.mapValues(dictionary, function (dataService) {
                var contract;
                if (_.isFunction(dataService.AsSingleton)) {
                    contract = dataService.AsSingleton(id);
                }
                else {
                    contract = dataService;
                }
                contract.url = _this.url + '/' + id + contract.endpoint;
                return contract;
            });
        }
    };
    return ParentDataService;
}(data_service_1.DataService));
exports.ParentDataService = ParentDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50RGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyZW50RGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBSzVCLDZCQUE2RCxpQkFBaUIsQ0FBQyxDQUFBO0FBVS9FO0lBQ1MscUNBQXFDO0lBSTdDLDJCQUFZLElBQWtCLEVBQzFCLEtBQW9CLEVBQ3BCLE9BQWtFO1FBQ3JFLGtCQUFNLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztJQUNwRSxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLEVBQVc7UUFBMUIsaUJBc0JDO1FBckJBLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksVUFBVSxHQUE0QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUMzRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFDLFdBQWdCO2dCQUNuQyxXQUFXLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxVQUFVLEdBQTJCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQzFFLE1BQU0sQ0FBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFDLFdBQXVEO2dCQUMzRixJQUFJLFFBQWEsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxRQUFRLEdBQUcsV0FBVyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELFFBQVEsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBRXZELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQW5DRCxDQUNTLDBCQUFXLEdBa0NuQjtBQW5DWSx5QkFBaUIsb0JBbUM3QixDQUFBIn0=