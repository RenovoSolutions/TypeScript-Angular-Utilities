// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
'use strict';
var _ = require('lodash');
var ContractLibrary = (function () {
    function ContractLibrary(builder) {
        this.builder = builder;
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
    ContractLibrary.prototype.mockChild = function (parent, mockCallback) {
        var getChildren = parent.childContracts.bind(parent);
        parent.childContracts = function (id) {
            var children = getChildren(id);
            mockCallback(children);
            return children;
        };
    };
    ContractLibrary.prototype.createMock = function (resource) {
        var _this = this;
        var dataService = this.builder.createResource({});
        dataService.mockGetList = function (data) { return _this.baseMockGet(dataService, 'getList', data); };
        dataService.mockGetDetail = function (data) { return _this.baseMockGet(dataService, 'get', data); };
        this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.createMockParent = function (resource) {
        var _this = this;
        var getChildren = resource != null ? resource.resourceDictionaryBuilder : function () { return {}; };
        var dataService = this.builder.createParentResource({
            resourceDictionaryBuilder: getChildren,
        });
        dataService.mockGetList = function (data) { return _this.baseMockGet(dataService, 'getList', data); };
        dataService.mockGetDetail = function (data) { return _this.baseMockGet(dataService, 'get', data); };
        dataService.mockChild = function (mockCallback) { return _this.mockChild(dataService, mockCallback); };
        this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.createMockSingleton = function (resource) {
        var _this = this;
        var dataService = this.builder.createSingletonResource({});
        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
        this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.updateResource = function (dataService, resource) {
        if (resource != null) {
            _.extend(resource, dataService);
        }
    };
    ContractLibrary.prototype.baseMockGet = function (resource, actionName, data) {
        var _this = this;
        var func = this.sinon.spy(function () {
            return _this.$q.when(data);
        });
        resource[actionName] = func;
        return func;
    };
    Object.defineProperty(ContractLibrary.prototype, "sinon", {
        get: function () {
            return sinon || { spy: function (func) { return func; } };
        },
        enumerable: true,
        configurable: true
    });
    return ContractLibrary;
})();
exports.ContractLibrary = ContractLibrary;
//# sourceMappingURL=contractLibrary.js.map