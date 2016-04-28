"use strict";
var core_1 = require('angular2/core');
var _ = require('lodash');
var PromiseUtility = (function () {
    function PromiseUtility() {
    }
    // private injector: Injector;
    // constructor(injector: Injector) {
    // 	this.injector = injector;
    // }
    PromiseUtility.prototype.isPromise = function (promise) {
        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    return PromiseUtility;
}());
exports.PromiseUtility = PromiseUtility;
exports.promiseToken = new core_1.OpaqueToken('A service for working with promises');
exports.PROMISE_PROVIDER = new core_1.Provider(exports.promiseToken, {
    useClass: PromiseUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFDdEQsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFRNUI7SUFBQTtJQTJCQSxDQUFDO0lBMUJBLDhCQUE4QjtJQUU5QixvQ0FBb0M7SUFDcEMsNkJBQTZCO0lBQzdCLElBQUk7SUFFSixrQ0FBUyxHQUFULFVBQVUsT0FBWTtRQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBa0JGLHFCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxzQkFBYyxpQkEyQjFCLENBQUE7QUFFWSxvQkFBWSxHQUFnQixJQUFJLGtCQUFXLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUVuRix3QkFBZ0IsR0FBYSxJQUFJLGVBQVEsQ0FBQyxvQkFBWSxFQUFFO0lBQ3BFLFFBQVEsRUFBRSxjQUFjO0NBQ3hCLENBQUMsQ0FBQyJ9