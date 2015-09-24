'use strict';
var angular = require('angular');
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
var object_service_1 = require('../../services/object/object.service');
exports.moduleName = 'rl21.utilities.filters.truncate';
exports.serviceName = 'truncate';
exports.filterName = exports.serviceName + 'Filter';
truncate.$inject = [object_service_1.serviceName];
function truncate(objectUtility) {
    'use strict';
    return function (input, truncateTo, includeEllipses) {
        includeEllipses = includeEllipses == null ? false : includeEllipses;
        var out = objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
        if (out.length) {
            if (truncateTo != null && out.length > truncateTo) {
                out = out.substring(0, truncateTo);
                if (includeEllipses) {
                    out += '...';
                }
            }
        }
        return out;
    };
}
angular.module(exports.moduleName, [object_service_1.moduleName])
    .filter(exports.serviceName, truncate);
//# sourceMappingURL=truncate.js.map