'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.promise';
exports.serviceName = 'promiseUtility';
var PromiseUtility = (function () {
    function PromiseUtility($q, $injector) {
        this.$q = $q;
        this.$injector = $injector;
    }
    PromiseUtility.prototype.isPromise = function (promise) {
        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    PromiseUtility.prototype.resolvePromises = function (resolves) {
        var _this = this;
        var promises = {};
        _.each(resolves, function (value, key) {
            if (_.isFunction(value) || _.isArray(value)) {
                promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
            }
            else if (_.isString(value)) {
                promises[key] = (_this.$q.when(_this.$injector.get(value)));
            }
            else {
                promises[key] = (_this.$q.when(value));
            }
        });
        return this.$q.all(promises);
    };
    PromiseUtility.$inject = ['$q', '$injector'];
    return PromiseUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, PromiseUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpCLGtCQUFVLEdBQVcsK0JBQStCLENBQUM7QUFDckQsbUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztBQVFsRDtJQUVDLHdCQUFvQixFQUFxQixFQUFVLFNBQXdDO1FBQXZFLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBK0I7SUFBRyxDQUFDO0lBRS9GLGtDQUFTLEdBQVQsVUFBVSxPQUFZO1FBQ3JCLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCx3Q0FBZSxHQUFmLFVBQWdCLFFBQWE7UUFBN0IsaUJBYUM7UUFaQSxJQUFJLFFBQVEsR0FBUSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFVLEVBQUUsR0FBUTtZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBcEJNLHNCQUFPLEdBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFxQmhELHFCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMifQ==