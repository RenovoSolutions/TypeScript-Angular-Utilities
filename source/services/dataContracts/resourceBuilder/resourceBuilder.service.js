'use strict';
var angular = require('angular');
var array_service_1 = require('../../array/array.service');
var data_service_1 = require('../dataService/data.service');
var dataServiceView_1 = require('../dataService/view/dataServiceView');
var parentData_service_1 = require('../dataService/parent/parentData.service');
var singletonData_service_1 = require('../singletonDataService/singletonData.service');
var parentSingletonData_service_1 = require('../singletonDataService/parent/parentSingletonData.service');
exports.moduleName = 'rl.utilities.services.dataContracts.resourceBuilder';
exports.serviceName = 'resourceBuilder';
var BaseResourceBuilder = (function () {
    function BaseResourceBuilder($http, $q, $rootScope, array) {
        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.array = array;
    }
    BaseResourceBuilder.prototype.getLibraryServices = function () {
        return {
            $q: this.$q,
            $rootScope: this.$rootScope,
        };
    };
    BaseResourceBuilder.prototype.createResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new data_service_1.DataService(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.DataServiceView(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createParentResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentData_service_1.ParentDataService(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new dataServiceView_1.ParentDataServiceView(this.$http, this.$q, this.array, options);
    };
    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new singletonData_service_1.SingletonDataService(this.$http, this.$q, options);
    };
    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
        options = this.useMockIfNoEndpoint(options);
        return new parentSingletonData_service_1.ParentSingletonDataService(this.$http, this.$q, options);
    };
    BaseResourceBuilder.prototype.useMockIfNoEndpoint = function (options) {
        options.useMock = options.endpoint == null ? true : options.useMock;
        return options;
    };
    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
    return BaseResourceBuilder;
}());
exports.BaseResourceBuilder = BaseResourceBuilder;
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, BaseResourceBuilder);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw4QkFBOEYsMkJBQTJCLENBQUMsQ0FBQTtBQUkxSCw2QkFBNkQsNkJBQTZCLENBQUMsQ0FBQTtBQUMzRixnQ0FBaUcscUNBQXFDLENBQUMsQ0FBQTtBQUN2SSxtQ0FBc0QsMENBQTBDLENBQUMsQ0FBQTtBQUNqRyxzQ0FBNEQsK0NBQStDLENBQUMsQ0FBQTtBQUM1Ryw0Q0FBd0UsNERBQTRELENBQUMsQ0FBQTtBQUUxSCxrQkFBVSxHQUFXLHFEQUFxRCxDQUFDO0FBQzNFLG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUF5SG5EO0lBRUMsNkJBQW9CLEtBQTJCLEVBQ25DLEVBQXFCLEVBQ3JCLFVBQXFDLEVBQ3JDLEtBQW9CO1FBSFosVUFBSyxHQUFMLEtBQUssQ0FBc0I7UUFDbkMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBMkI7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUFJLENBQUM7SUFFckMsZ0RBQWtCLEdBQWxCO1FBQ0MsTUFBTSxDQUFDO1lBQ04sRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzNCLENBQUM7SUFDSCxDQUFDO0lBRUQsNENBQWMsR0FBZCxVQUFtRSxPQUF1QztRQUN6RyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELGdEQUFrQixHQUFsQixVQUF1RSxPQUF1QztRQUM3RyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELGtEQUFvQixHQUFwQixVQUNFLE9BQWtFO1FBQ25FLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksc0NBQWlCLENBQW9ELElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRCxzREFBd0IsR0FBeEIsVUFDRSxPQUFrRTtRQUNuRSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLHVDQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxxREFBdUIsR0FBdkIsVUFBbUMsT0FBNEM7UUFDOUUsT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSw0Q0FBb0IsQ0FBWSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELDJEQUE2QixHQUE3QixVQUNFLE9BQTJFO1FBQzVFLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksd0RBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTyxpREFBbUIsR0FBM0IsVUFBdUMsT0FBZ0M7UUFDdEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFqRE0sMkJBQU8sR0FBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLDJCQUFnQixDQUFDLENBQUM7SUFrRDVFLDBCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSwyQkFBbUIsc0JBbUQvQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMEJBQWUsQ0FBQyxDQUFDO0tBQzNDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==