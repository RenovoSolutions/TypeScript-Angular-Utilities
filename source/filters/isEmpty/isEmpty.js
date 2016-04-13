'use strict';
var angular = require('angular');
var object_service_1 = require('../../services/object/object.service');
exports.moduleName = 'rl.utilities.filters.isEmpty';
exports.serviceName = 'isEmpty';
exports.filterName = exports.serviceName + 'Filter';
isEmpty.$inject = [object_service_1.serviceName];
function isEmpty(object) {
    'use strict';
    return function (input, trueWhenEmpty) {
        var isEmpty = object.isNullOrEmpty(input);
        if (trueWhenEmpty === false) {
            return !isEmpty;
        }
        return isEmpty;
    };
}
angular.module(exports.moduleName, [object_service_1.moduleName])
    .filter(exports.serviceName, isEmpty);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUVuQyxrQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBQ3BELG1CQUFXLEdBQVcsU0FBUyxDQUFDO0FBQ2hDLGtCQUFVLEdBQVcsbUJBQVcsR0FBRyxRQUFRLENBQUM7QUFNdkQsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLDRCQUFpQixDQUFDLENBQUM7QUFDdEMsaUJBQWlCLE1BQXNCO0lBQ3RDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQyxVQUFDLEtBQVUsRUFBRSxhQUF1QjtRQUMxQyxJQUFJLE9BQU8sR0FBWSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMkJBQWdCLENBQUMsQ0FBQztLQUM1QyxNQUFNLENBQUMsbUJBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyJ9