// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
'use strict';
var _ = require('lodash');
var ContractLibrary = (function () {
    function ContractLibrary(builder, baseEndpoint) {
        this.builder = builder;
        this.baseEndpoint = baseEndpoint;
        var services = builder.getLibraryServices();
        this.$q = services.$q;
        this.$rootScope = services.$rootScope;
    }
    ContractLibrary.prototype.createResource = function (options) {
        var resource = this.builder.createResource(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
    ContractLibrary.prototype.createResourceView = function (options) {
        var resource = this.builder.createResourceView(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
    ContractLibrary.prototype.createParentResource = function (options) {
        var resource = this.builder.createParentResource(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
    ContractLibrary.prototype.createParentResourceView = function (options) {
        var resource = this.builder.createParentResourceView(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
    ContractLibrary.prototype.createSingletonResource = function (options) {
        var resource = this.builder.createSingletonResource(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
    ContractLibrary.prototype.createParentSingletonResource = function (options) {
        var resource = this.builder.createParentSingletonResource(options);
        resource.url = this.baseEndpoint + resource.endpoint;
        return resource;
    };
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
        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
        dataService.mockCreate = function () { return _this.baseMockSave(dataService, 'create'); };
        dataService = this.updateResource(dataService, resource);
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
        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
        dataService.mockCreate = function () { return _this.baseMockSave(dataService, 'create'); };
        dataService = this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.createMockSingleton = function (resource) {
        var _this = this;
        var dataService = this.builder.createSingletonResource({});
        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
        dataService = this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.updateResource = function (dataService, resource) {
        if (resource != null) {
            dataService = _.extend(resource, dataService);
        }
        return dataService;
    };
    ContractLibrary.prototype.baseMockGet = function (resource, actionName, data) {
        var _this = this;
        var func = this.sinon.spy(function () {
            return _this.$q.when(data);
        });
        resource[actionName] = func;
        return func;
    };
    ContractLibrary.prototype.baseMockSave = function (resource, actionName) {
        var _this = this;
        var func = this.sinon.spy(function (data) {
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
}());
exports.ContractLibrary = ContractLibrary;
//# sourceMappingURL=contractLibrary.js.map