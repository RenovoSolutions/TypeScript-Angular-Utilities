// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
'use strict';
var ContractLibrary = (function () {
    function ContractLibrary(builder) {
        var services = builder.getLibraryServices();
        this.$q = services.$q;
        this.$rootScope = services.$rootScope;
    }
    ContractLibrary.prototype.flush = function () {
        this.$rootScope.$digest();
    };
    ContractLibrary.prototype.mockGet = function (resource, data) {
        return this.baseMockGet(resource, 'get', data);
    };
    ContractLibrary.prototype.mockGetList = function (resource, data) {
        return this.baseMockGet(resource, 'getList', data);
    };
    ContractLibrary.prototype.mockGetDetail = function (resource, data) {
        return this.baseMockGet(resource, 'getDetail', data);
    };
    ContractLibrary.prototype.baseMockGet = function (resource, actionName, data) {
        var _this = this;
        var sinonInstance = sinon || { spy: function (func) { return func; } };
        var func = sinonInstance.spy(function () {
            return _this.$q.when(data);
        });
        resource[actionName] = func;
        return func;
    };
    return ContractLibrary;
})();
exports.ContractLibrary = ContractLibrary;
//# sourceMappingURL=contractLibrary.js.map