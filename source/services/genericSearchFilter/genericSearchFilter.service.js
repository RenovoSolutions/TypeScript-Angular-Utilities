'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var filter_1 = require('../../filters/filter');
exports.moduleName = 'rl.utilities.services.genericSearchFilter';
exports.factoryName = 'genericSearchFilterFactory';
exports.filterName = 'search';
var GenericSearchFilter = (function (_super) {
    __extends(GenericSearchFilter, _super);
    function GenericSearchFilter(object, string) {
        _super.call(this);
        this.object = object;
        this.string = string;
        this.type = exports.filterName;
        this.minSearchLength = 1;
        this.caseSensitive = false;
    }
    Object.defineProperty(GenericSearchFilter.prototype, "searchText", {
        get: function () {
            return this._searchText;
        },
        set: function (value) {
            this._searchText = value;
            this.onChange(false);
        },
        enumerable: true,
        configurable: true
    });
    GenericSearchFilter.prototype.serialize = function () {
        return this.searchText != null && this.searchText.length >= this.minSearchLength
            ? this.searchText
            : null;
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
}(filter_1.SerializableFilter));
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