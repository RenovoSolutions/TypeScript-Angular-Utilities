'use strict';
var DataContractsHelper = (function () {
    function DataContractsHelper() {
    }
    DataContractsHelper.prototype.versionEndpoint = function (endpoint, versionNumber) {
        var versionExpression = /\/v\d+\//;
        var apiExpression = /\/api\//;
        var versionString = 'v' + versionNumber;
        var searchResult = endpoint.search(versionExpression);
        if (searchResult !== -1) {
            return endpoint.replace(versionExpression, '/' + versionString + '/');
        }
        else {
            return endpoint.replace(apiExpression, '/api/' + versionString + '/');
        }
    };
    return DataContractsHelper;
}());
exports.helper = new DataContractsHelper();
//# sourceMappingURL=dataContractsHelper.service.js.map