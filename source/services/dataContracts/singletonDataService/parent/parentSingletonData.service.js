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
//# sourceMappingURL=parentSingletonData.service.js.map