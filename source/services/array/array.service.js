'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.array';
exports.serviceName = 'arrayUtility';
var ArrayUtility = (function () {
    function ArrayUtility() {
    }
    ArrayUtility.prototype.findIndexOf = function (array, predicate) {
        var targetIndex;
        _.each(array, function (item, index) {
            if (predicate(item)) {
                targetIndex = index;
                return false;
            }
        });
        return targetIndex != null ? targetIndex : -1;
    };
    ArrayUtility.prototype.remove = function (array, item) {
        var index;
        if (_.isFunction(item)) {
            index = this.findIndexOf(array, item);
        }
        else {
            index = _.indexOf(array, item);
        }
        if (index >= 0) {
            return array.splice(index, 1)[0];
        }
        else {
            return null;
        }
    };
    ArrayUtility.prototype.replace = function (array, oldItem, newItem) {
        var index = _.indexOf(array, oldItem);
        if (index >= 0) {
            array.splice(index, 1, newItem);
        }
    };
    ArrayUtility.prototype.sum = function (array, transform) {
        var list;
        if (transform != null) {
            list = _.map(array, function (item) { return transform(item); });
        }
        else {
            list = array;
        }
        return _.reduce(list, function (sum, num) { return sum + num; }, 0);
    };
    ArrayUtility.prototype.toDictionary = function (array, keySelector) {
        return _.reduce(array, function (dictionary, item) {
            dictionary[keySelector(item)] = item;
            return dictionary;
        }, {});
    };
    return ArrayUtility;
})();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, ArrayUtility);
//# sourceMappingURL=array.service.js.map