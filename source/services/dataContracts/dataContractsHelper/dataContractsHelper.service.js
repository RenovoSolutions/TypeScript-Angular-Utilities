'use strict';
var DataContractsHelper = (function () {
    function DataContractsHelper() {
    }
    DataContractsHelper.prototype.versionEndpoint = function (endpoint, versionNumber) {
        var versionExpression = /v[0-9]+/;
        var endpointFragments;
        var searchResult = endpoint.search(versionExpression);
        if (searchResult !== -1) {
            endpointFragments = endpoint.split(versionExpression);
        }
        else {
            endpointFragments = endpoint.split('api');
            endpointFragments[0] += 'api/';
        }
        return endpointFragments.join('v' + versionNumber);
    };
    return DataContractsHelper;
}());
exports.helper = new DataContractsHelper();
//# sourceMappingURL=dataContractsHelper.service.js.map