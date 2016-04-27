"use strict";
var _ = require('lodash');
var ContractLibrary = (function () {
    function ContractLibrary(builder, baseEndpoint) {
        this.builder = builder;
        this.baseEndpoint = baseEndpoint;
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
        // flush es6 promises
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
        dataService.mockUpdate = function (dataTransform) { return _this.baseMockSave(dataService, 'update', dataTransform); };
        dataService.mockCreate = function (dataTransform) { return _this.baseMockSave(dataService, 'create', dataTransform); };
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
        dataService.mockUpdate = function (dataTransform) { return _this.baseMockSave(dataService, 'update', dataTransform); };
        dataService.mockCreate = function (dataTransform) { return _this.baseMockSave(dataService, 'create', dataTransform); };
        dataService = this.updateResource(dataService, resource);
        return dataService;
    };
    ContractLibrary.prototype.createMockSingleton = function (resource) {
        var _this = this;
        var dataService = this.builder.createSingletonResource({});
        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
        dataService.mockUpdate = function (dataTransform) { return _this.baseMockSave(dataService, 'update', dataTransform); };
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
        var func = this.sinon.spy(function () {
            return Promise.resolve(data);
        });
        resource[actionName] = func;
        return func;
    };
    ContractLibrary.prototype.baseMockSave = function (resource, actionName, dataTransform) {
        var func = this.sinon.spy(function (data) {
            if (dataTransform) {
                data = dataTransform(data);
            }
            return Promise.resolve(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udHJhY3RMaWJyYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQXdENUI7SUFJQyx5QkFBWSxPQUF5QixFQUFFLFlBQXFCO1FBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ2xDLENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQW1FLE9BQXVDO1FBQ3pHLElBQUksUUFBUSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUF1RSxPQUF1QztRQUM3RyxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVELDhDQUFvQixHQUFwQixVQUNFLE9BQWtFO1FBQ25FLElBQUksUUFBUSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNqQixDQUFDO0lBRUQsa0RBQXdCLEdBQXhCLFVBQ0UsT0FBa0U7UUFDbkUs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