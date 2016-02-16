'use strict';
var angular = require('angular');
var _ = require('lodash');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
exports.moduleName = 'rl.utilities.services.genericSearchFilter';
exports.factoryName = 'genericSearchFilterFactory';
exports.filterName = 'search';
var GenericSearchFilter = (function () {
    function GenericSearchFilter(object, string) {
        this.object = object;
        this.string = string;
        this.type = exports.filterName;
        this.minSearchLength = 1;
        this.caseSensitive = false;
    }
    GenericSearchFilter.prototype.serialize = function () {
        return this.searchText != null && this.searchText.length >= this.minSearchLength
            ? this.searchText
            : '';
    };
    GenericSearchFilter.prototype.filter = function (item) {
        if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
            return true;
        }
        return this.searchObject(item, this.searchText, this.caseSensitive);
    };
    GenericSearchFilter.prototype.searchObject = function (item, search, caseSensitive) {
        var _this = this;
        if (_.isObject(item)) {
            var values = _.values(item);
            return _.some(values, function (value) { return _this.searchObject(value, search, caseSensitive); });
        }
        else {
            var dataString = this.object.toString(item);
            if (!caseSensitive) {
                search = search.toLowerCase();
                dataString = dataString.toLowerCase();
            }
            return this.string.contains(dataString, search);
        }
    };
    return GenericSearchFilter;
})();
exports.GenericSearchFilter = GenericSearchFilter;
genericSearchFilterFactory.$inject = [object_service_1.serviceName, string_service_1.serviceName];
function genericSearchFilterFactory(object, stringUtility) {
    'use strict';
    return {
        getInstance: function () {
            return new GenericSearchFilter(object, stringUtility);
        }
    };
}
angular.module(exports.moduleName, [object_service_1.moduleName, string_service_1.moduleName])
    .factory(exports.factoryName, genericSearchFilterFactory);
//# sourceMappingURL=genericSearchFilter.service.js.map