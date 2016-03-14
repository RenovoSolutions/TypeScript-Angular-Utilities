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
//# sourceMappingURL=synchronizedRequests.service.js.map