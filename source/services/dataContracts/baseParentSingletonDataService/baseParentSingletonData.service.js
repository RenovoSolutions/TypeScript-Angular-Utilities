var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseSingletonData_service_1 = require('../baseSingletonDataService/baseSingletonData.service');
var BaseParentSingletonDataService = (function (_super) {
    __extends(BaseParentSingletonDataService, _super);
    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, map, useMock, logRequests, parentId) {
        _super.call(this, $http, $q, endpoint, mockData, transform, map, useMock, logRequests);
        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
        this.parentId = parentId;
    }
    BaseParentSingletonDataService.prototype.childContracts = function () {
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
            contract.endpoint = _this.endpoint + contract.endpoint;
            return contract;
        });
    };
    return BaseParentSingletonDataService;
})(baseSingletonData_service_1.BaseSingletonDataService);
exports.BaseParentSingletonDataService = BaseParentSingletonDataService;
//# sourceMappingURL=baseParentSingletonData.service.js.map