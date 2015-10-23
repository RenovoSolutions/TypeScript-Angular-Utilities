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
    }
    BaseParentDataService.prototype.childContracts = function (id) {
        return this.resourceDictionaryBuilder(this.endpoint + '/' + id);
    };
    return BaseParentDataService;
})(baseData_service_1.BaseDataService);
exports.BaseParentDataService = BaseParentDataService;
//# sourceMappingURL=baseParentData.service.js.map