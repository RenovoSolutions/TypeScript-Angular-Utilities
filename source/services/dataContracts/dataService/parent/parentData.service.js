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
    function ParentDataService($http, $q, array, options) {
        _super.call(this, $http, $q, array, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50RGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyZW50RGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBSTVCLDZCQUE2RCxpQkFBaUIsQ0FBQyxDQUFBO0FBYS9FO0lBQ1MscUNBQXFDO0lBSTdDLDJCQUFZLEtBQXNCLEVBQzlCLEVBQWdCLEVBQ2hCLEtBQW9CLEVBQ3BCLE9BQWtFO1FBQ3JFLGtCQUFNLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDcEUsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZSxFQUFXO1FBQTFCLGlCQXNCQztRQXJCQSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLFVBQVUsR0FBNEIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQyxXQUFnQjtnQkFDbkMsV0FBVyxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ25CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksVUFBVSxHQUEyQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUMxRSxNQUFNLENBQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBQyxXQUF1RDtnQkFDM0YsSUFBSSxRQUFhLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsUUFBUSxHQUFHLFdBQVcsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUV2RCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNGLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFwQ0QsQ0FDUywwQkFBVyxHQW1DbkI7QUFwQ1kseUJBQWlCLG9CQW9DN0IsQ0FBQSJ9