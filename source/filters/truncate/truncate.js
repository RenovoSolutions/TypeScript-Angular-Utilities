'use strict';
var angular = require('angular');
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
var object_service_1 = require('../../services/object/object.service');
exports.moduleName = 'rl.utilities.filters.truncate';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cnVuY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw4RkFBOEY7QUFFOUYsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUVuQyxrQkFBVSxHQUFXLCtCQUErQixDQUFDO0FBQ3JELG1CQUFXLEdBQVcsVUFBVSxDQUFDO0FBQ2pDLGtCQUFVLEdBQVcsbUJBQVcsR0FBRyxRQUFRLENBQUM7QUFPdkQsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLDRCQUFpQixDQUFDLENBQUM7QUFDdkMsa0JBQWtCLGFBQTZCO0lBQzlDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQyxVQUFDLEtBQVcsRUFBRSxVQUFtQixFQUFFLGVBQXlCO1FBQ2xFLGVBQWUsR0FBRyxlQUFlLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxlQUFlLENBQUM7UUFFcEUsSUFBSSxHQUFHLEdBQVcsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDckIsR0FBRyxJQUFJLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQyxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDJCQUFnQixDQUFDLENBQUM7S0FDNUMsTUFBTSxDQUFDLG1CQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMifQ==