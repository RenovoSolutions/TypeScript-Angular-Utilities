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
//# sourceMappingURL=isEmpty.js.map