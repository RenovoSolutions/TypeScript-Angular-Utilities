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
        array = _.reject(array, function (item) {
            return keySelector(item) == null;
        });
        // needs to be seeded with an object or it will be viewed as an array with no items
        return _.reduce(array, function (dictionary, item) {
            dictionary[keySelector(item)] = item;
            return dictionary;
        }, {});
    };
    ArrayUtility.prototype.last = function (array) {
        if (array != null && array.length > 0) {
            return array[array.length - 1];
        }
    };
    ArrayUtility.prototype.has = function (array, index) {
        if (array == null || index < 0 || index >= array.length) {
            return false;
        }
        return array[index] != null;
    };
    return ArrayUtility;
}());
exports.arrayUtility = new ArrayUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, ArrayUtility);
//# sourceMappingURL=array.service.js.map