'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.synchronizedRequests';
exports.factoryName = 'synchronizedRequests';
var SynchronizedRequestsService = (function () {
    function SynchronizedRequestsService(dataProvider, handleRequest, $q) {
        this.dataProvider = dataProvider;
        this.handleRequest = handleRequest;
        this.$q = $q;
        this.requestId = 0;
    }
    SynchronizedRequestsService.prototype.getData = function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        // increment the id first - should match current request id
        this.requestId++;
        var currentRequestId = this.requestId;
        this.$q.when(this.dataProvider.apply(this, params)).then(function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            if (currentRequestId == _this.requestId) {
                _this.handleRequest.apply(_this, data);
            }
        });
    };
    return SynchronizedRequestsService;
}());
exports.SynchronizedRequestsService = SynchronizedRequestsService;
synchronizedRequestsFactory.$inject = ['$q'];
function synchronizedRequestsFactory($q) {
    return {
        getInstance: function (dataProvider, handleRequest) {
            return new SynchronizedRequestsService(dataProvider, handleRequest, $q);
        },
    };
}
exports.synchronizedRequestsFactory = synchronizedRequestsFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, synchronizedRequestsFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyw0Q0FBNEMsQ0FBQztBQUNsRSxtQkFBVyxHQUFXLHNCQUFzQixDQUFDO0FBU3hEO0lBRUMscUNBQW1CLFlBQTRCLEVBQ3BDLGFBQStCLEVBQzlCLEVBQXFCO1FBRmQsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUh6QixjQUFTLEdBQVcsQ0FBQyxDQUFDO0lBR08sQ0FBQztJQUV0Qyw2Q0FBTyxHQUFQO1FBQUEsaUJBU0M7UUFUTyxnQkFBZ0I7YUFBaEIsV0FBZ0IsQ0FBaEIsc0JBQWdCLENBQWhCLElBQWdCO1lBQWhCLCtCQUFnQjs7UUFDdkIsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLGdCQUFnQixHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksT0FBakIsSUFBSSxFQUFpQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUFDLGNBQWM7aUJBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztnQkFBZCw2QkFBYzs7WUFDOUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxhQUFhLE9BQWxCLEtBQUksRUFBa0IsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNGLGtDQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxtQ0FBMkIsOEJBZ0J2QyxDQUFBO0FBY0QsMkJBQTJCLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MscUNBQTRDLEVBQXFCO0lBQ2hFLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBQyxZQUE0QixFQUFFLGFBQStCO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLDJCQUEyQixDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBTmUsbUNBQTJCLDhCQU0xQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDIn0=