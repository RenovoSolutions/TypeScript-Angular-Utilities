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
    AngularFixture.prototype.directive = function (dom) {
        var services = this.inject('$rootScope', '$compile');
        var $rootScope = services.$rootScope;
        var $compile = services.$compile;
        angular.mock.module('renovoTemplates');
        var component = $compile(dom)($rootScope);
        $rootScope.$digest();
        return {
            directive: component,
            scope: component.isolateScope(),
        };
    };
    return AngularFixture;
})();
exports.angularFixture = new AngularFixture();
//# sourceMappingURL=angularFixture.js.map