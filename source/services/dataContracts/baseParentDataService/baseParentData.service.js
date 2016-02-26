"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var baseData_service_1 = require('../baseDataService/baseData.service');
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
                dataService.endpoint = _this.endpoint + dataService.endpoint;
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
                contract.endpoint = _this.endpoint + '/' + id + contract.endpoint;
                return contract;
            });
        }
    };
    return ParentDataService;
}(baseData_service_1.DataService));
exports.ParentDataService = ParentDataService;
//# sourceMappingURL=baseParentData.service.js.map