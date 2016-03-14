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
//# sourceMappingURL=fileSizeFilter.js.map