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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udHJhY3RMaWJyYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdFQUFnRTtBQUVoRSxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQTRENUI7SUFJQyx5QkFBb0IsT0FBNkIsRUFDdEMsWUFBcUI7UUFEWixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUMvQixJQUFJLFFBQVEsR0FBMkMsT0FBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFtRSxPQUF1QztRQUN6RyxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2pCLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBdUUsT0FBdUM7UUFDN0csSUFBSSxRQUFRLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2pCLENBQUM7SUFFRCw4Q0FBb0IsR0FBcEIsVUFDRSxPQUFrRTtRQUNuRSxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9B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