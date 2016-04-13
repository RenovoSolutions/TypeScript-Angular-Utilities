'use strict';
var angular = require('angular');
require('angular-mocks');
var _ = require('lodash');
var AngularFixture = (function () {
    function AngularFixture() {
    }
    AngularFixture.prototype.inject = function () {
        var serviceNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            serviceNames[_i - 0] = arguments[_i];
        }
        // object that will contain all of the services requested
        var services = {};
        // clone the array and add a function that iterates over the original array
        // this avoids iterating over the function itself
        var injectParameters = _.clone(serviceNames);
        injectParameters.push(function () {
            var injectedServices = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injectedServices[_i - 0] = arguments[_i];
            }
            // should get called with the services injected by angular
            // we'll add these to services using the serviceName as the key
            _.each(serviceNames, function (service, index) {
                services[service] = injectedServices[index];
            });
        });
        angular.mock.inject(injectParameters);
        return services;
    };
    AngularFixture.prototype.mock = function (mocks) {
        angular.mock.module(function ($provide) {
            _.each(mocks, function (value, key) {
                $provide.value(key.toString(), value);
            });
        });
    };
    AngularFixture.prototype.controllerWithBindings = function (controllerName, bindings, locals, scope) {
        var services = this.inject('$rootScope', '$controller');
        var $rootScope = services.$rootScope;
        var $controller = services.$controller;
        scope = _.extend($rootScope.$new(), scope);
        if (locals == null) {
            locals = {};
        }
        locals.$scope = scope;
        return {
            scope: scope,
            controller: $controller(controllerName, locals, bindings),
        };
    };
    AngularFixture.prototype.directive = function (directiveName, dom, scope) {
        var services = this.inject('$rootScope', '$compile');
        scope = _.extend(services.$rootScope.$new(), scope);
        var $compile = services.$compile;
        var component = $compile(dom)(scope);
        scope.$digest();
        return {
            directive: component,
            scope: component.isolateScope(),
            controller: component.controller(directiveName),
        };
    };
    return AngularFixture;
}());
exports.angularFixture = new AngularFixture();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhckZpeHR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyRml4dHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxRQUFPLGVBQWUsQ0FBQyxDQUFBO0FBRXZCLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBcUI1QjtJQUFBO0lBZ0VBLENBQUM7SUEvREEsK0JBQU0sR0FBTjtRQUFPLHNCQUF5QjthQUF6QixXQUF5QixDQUF6QixzQkFBeUIsQ0FBekIsSUFBeUI7WUFBekIscUNBQXlCOztRQUMvQix5REFBeUQ7UUFDekQsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1FBRTFCLDJFQUEyRTtRQUMzRSxpREFBaUQ7UUFDakQsSUFBSSxnQkFBZ0IsR0FBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUFDLDBCQUEwQjtpQkFBMUIsV0FBMEIsQ0FBMUIsc0JBQTBCLENBQTFCLElBQTBCO2dCQUExQix5Q0FBMEI7O1lBQ2hELDBEQUEwRDtZQUMxRCwrREFBK0Q7WUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxPQUFlLEVBQUUsS0FBYTtnQkFDbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVELDZCQUFJLEdBQUosVUFBSyxLQUFVO1FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFzQztZQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLEtBQVUsRUFBRSxHQUFXO2dCQUNyQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELCtDQUFzQixHQUF0QixVQUF3QyxjQUFzQixFQUFFLFFBQWMsRUFBRSxNQUFZLEVBQUUsS0FBVztRQUV4RyxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3RCxJQUFJLFVBQVUsR0FBOEIsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNoRSxJQUFJLFdBQVcsR0FBK0IsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUVuRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV0QixNQUFNLENBQUM7WUFDTixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBbUIsV0FBVyxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1NBQzFFLENBQUM7SUFDSCxDQUFDO0lBRUQsa0NBQVMsR0FBVCxVQUEyQixhQUFxQixFQUFFLEdBQVcsRUFBRSxLQUFVO1FBQ3hFLElBQUksUUFBUSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFELEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsSUFBSSxRQUFRLEdBQTRCLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFMUQsSUFBSSxTQUFTLEdBQTZCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFaEIsTUFBTSxDQUFDO1lBQ04sU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDL0IsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1NBQy9DLENBQUM7SUFDSCxDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDO0FBRVUsc0JBQWMsR0FBb0IsSUFBSSxjQUFjLEVBQUUsQ0FBQyJ9