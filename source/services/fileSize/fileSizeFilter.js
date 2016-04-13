'use strict';
var fileSize_service_1 = require('./fileSize.service');
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
exports.simpleFilterName = 'fileSize';
exports.filterName = exports.simpleFilterName + 'Filter';
fileSizeFilter.$inject = [fileSize_service_1.factoryName];
function fileSizeFilter(fileSizeFactory) {
    'use strict';
    return function (bytes) {
        var fileSize = fileSizeFactory.getInstance(bytes);
        return fileSize.display();
    };
}
exports.fileSizeFilter = fileSizeFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVNpemVGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlU2l6ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixpQ0FBeUQsb0JBQW9CLENBQUMsQ0FBQTtBQUU5RSw4RkFBOEY7QUFFbkYsd0JBQWdCLEdBQVcsVUFBVSxDQUFDO0FBQ3RDLGtCQUFVLEdBQVcsd0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBTTVELGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyw4QkFBVyxDQUFDLENBQUM7QUFDdkMsd0JBQStCLGVBQWlDO0lBQy9ELFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQyxVQUFDLEtBQWM7UUFDckIsSUFBSSxRQUFRLEdBQWMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNILENBQUM7QUFOZSxzQkFBYyxpQkFNN0IsQ0FBQSJ9