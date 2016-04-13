'use strict';
var _ = require('lodash');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var SearchUtility = (function () {
    function SearchUtility() {
    }
    SearchUtility.prototype.search = function (object, search, caseSensitive) {
        var _this = this;
        if (object_service_1.objectUtility.isNullOrEmpty(search)) {
            return true;
        }
        if (_.isObject(object)) {
            var values = _.values(object);
            return _.some(values, function (value) { return _this.search(value, search, caseSensitive); });
        }
        else {
            var dataString = object_service_1.objectUtility.toString(object);
            if (!caseSensitive) {
                search = search.toLowerCase();
                dataString = dataString.toLowerCase();
            }
            return string_service_1.stringUtility.contains(dataString, search);
        }
    };
    SearchUtility.prototype.tokenizedSearch = function (object, search, caseSensitive) {
        var _this = this;
        return _.every(search.split(' '), function (subsearch) {
            return _this.search(object, subsearch, caseSensitive);
        });
    };
    return SearchUtility;
}());
exports.searchUtility = new SearchUtility();
//# sourceMappingURL=search.service.js.map