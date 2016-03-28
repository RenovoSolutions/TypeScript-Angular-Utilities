'use strict';
var DataContractsHelper = (function () {
    function DataContractsHelper() {
    }
    DataContractsHelper.prototype.versionEndpoint = function (endpoint, versionNumber) {
        var endpointFragments = endpoint.split('api');
        return endpointFragments.join('api/v' + versionNumber);
    };
    return DataContractsHelper;
}());
exports.helper = new DataContractsHelper();
//# sourceMappingURL=dataContractsHelper.service.js.map