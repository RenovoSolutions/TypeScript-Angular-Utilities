"use strict";
var core_1 = require('@angular/core');
var SynchronizedRequestsService = (function () {
    function SynchronizedRequestsService(dataProvider, handleRequest) {
        this.requestId = 0;
        this.dataProvider = dataProvider;
        this.handleRequest = handleRequest;
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
        Promise.resolve(this.dataProvider.apply(this, params)).then(function () {
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
var SynchronizedRequestsFactory = (function () {
    function SynchronizedRequestsFactory() {
    }
    SynchronizedRequestsFactory.prototype.getInstance = function (dataProvider, handleRequest) {
        return new SynchronizedRequestsService(dataProvider, handleRequest);
    };
    return SynchronizedRequestsFactory;
}());
exports.SynchronizedRequestsFactory = SynchronizedRequestsFactory;
exports.synchronizedRequestsToken = new core_1.OpaqueToken('A service for handling multiple requests and returning only the latest');
function SynchronizedRequestsProvider(dataProvider, handleRequest) {
    return core_1.provide(exports.synchronizedRequestsToken, {
        useFactory: function () { return new SynchronizedRequestsService(dataProvider, handleRequest); },
    });
}
exports.SynchronizedRequestsProvider = SynchronizedRequestsProvider;
exports.SYNCHRONIZED_REQUESTS_PROVIDER = new core_1.Provider(exports.synchronizedRequestsToken, {
    useClass: SynchronizedRequestsFactory,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUErQyxlQUFlLENBQUMsQ0FBQTtBQVMvRDtJQUtDLHFDQUFZLFlBQTRCLEVBQ3BDLGFBQStCO1FBTDNCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFNN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDcEMsQ0FBQztJQUVELDZDQUFPLEdBQVA7UUFBQSxpQkFTQztRQVRPLGdCQUFnQjthQUFoQixXQUFnQixDQUFoQixzQkFBZ0IsQ0FBaEIsSUFBZ0I7WUFBaEIsK0JBQWdCOztRQUN2QiwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksZ0JBQWdCLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLE9BQWpCLElBQUksRUFBaUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFBQyxjQUFjO2lCQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7Z0JBQWQsNkJBQWM7O1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsYUFBYSxPQUFsQixLQUFJLEVBQWtCLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRixrQ0FBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksbUNBQTJCLDhCQXFCdkMsQ0FBQTtBQWNEO0lBQUE7SUFJQSxDQUFDO0lBSEEsaURBQVcsR0FBWCxVQUFZLFlBQTRCLEVBQUUsYUFBK0I7UUFDeEUsTUFBTSxDQUFDLElBQUksMkJBQTJCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRixrQ0FBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksbUNBQTJCLDhCQUl2QyxDQUFBO0FBRVksaUNBQXlCLEdBQWdCLElBQUksa0JBQVcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0FBRWhKLHNDQUE2QyxZQUE0QixFQUFFLGFBQStCO0lBQ3pHLE1BQU0sQ0FBQyxjQUFPLENBQUMsaUNBQXlCLEVBQUU7UUFDekMsVUFBVSxFQUFFLGNBQU0sT0FBQSxJQUFJLDJCQUEyQixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsRUFBNUQsQ0FBNEQ7S0FDOUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUplLG9DQUE0QiwrQkFJM0MsQ0FBQTtBQUVZLHNDQUE4QixHQUFhLElBQUksZUFBUSxDQUFDLGlDQUF5QixFQUFFO0lBQy9GLFFBQVEsRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxDQUFDIn0=