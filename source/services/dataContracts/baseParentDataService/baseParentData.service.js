var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var baseData_service_1 = require('../baseDataService/baseData.service');
var BaseParentDataService = (function (_super) {
    __extends(BaseParentDataService, _super);
    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
        _super.call(this, $http, $q, array, endpoint, mockData, transform, useMock, logRequests);
        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
    }
    BaseParentDataService.prototype.childContracts = function (id) {
        var _this = this;
        if (_.isUndefined(id)) {
            var dictionary = this.resourceDictionaryBuilder(this.endpoint);
            _.each(dictionary, function (dataService) {
                dataService.endpoint = _this.endpoint + dataService.endpoint;
            });
        }
        else {
            var dictionary = this.resourceDictionaryBuilder(this.endpoint + '/' + id);
            return _.mapValues(dictionary, function (dataService) {
                var contract;
                if (_.isFunction(dataService.AsSingleton)) {
                    contract = dataService.AsSingleton(id);
                }
                else {
                    contract = dataService;
                }
                contract.endpoint = _this.endpoint + '/' + id + contract.endpoint;
                return contract;
            });
        }
    };
    return BaseParentDataService;
})(baseData_service_1.BaseDataService);
exports.BaseParentDataService = BaseParentDataService;
//# sourceMappingURL=baseParentData.service.js.map