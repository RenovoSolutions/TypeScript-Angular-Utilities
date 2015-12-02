var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseData_service_1 = require('../baseDataService/baseData.service');
var BaseParentDataService = (function (_super) {
    __extends(BaseParentDataService, _super);
    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
        _super.call(this, $http, $q, array, endpoint, mockData, transform, useMock, logRequests);
        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
        this._childContracts = this.resourceDictionaryBuilder();
    }
    BaseParentDataService.prototype.childContracts = function (id) {
        var _this = this;
        if (_.isUndefined(id)) {
            return _.mapValues(this._childContracts, function (dataService) {
                var contract = dataService.clone();
                contract.endpoint = _this.endpoint + contract.endpoint;
                return contract;
            });
        }
        else {
            var dictionary = this._childContracts;
            return _.mapValues(dictionary, function (dataService) {
                var contract = dataService;
                if (_.isFunction(contract.AsSingleton)) {
                    contract = contract.AsSingleton(id);
                }
                else {
                    contract = contract.clone();
                }
                contract.endpoint = _this.endpoint + '/' + id + contract.endpoint;
                return contract;
            });
        }
    };
    Object.defineProperty(BaseParentDataService.prototype, "baseChildContracts", {
        get: function () {
            return this._childContracts;
        },
        enumerable: true,
        configurable: true
    });
    return BaseParentDataService;
})(baseData_service_1.BaseDataService);
exports.BaseParentDataService = BaseParentDataService;
//# sourceMappingURL=baseParentData.service.js.map