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
    ArrayUtility.prototype.arrayify = function (maybeArray) {
        if (_.isArray(maybeArray)) {
            return maybeArray;
        }
        else if (maybeArray) {
            return [maybeArray];
        }
        else {
            return [];
        }
    };
    return ArrayUtility;
}());
exports.arrayUtility = new ArrayUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, ArrayUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFycmF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUMsWUFBWSxDQUFDO0FBRWQsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakIsa0JBQVUsR0FBVyw2QkFBNkIsQ0FBQztBQUNuRCxtQkFBVyxHQUFXLGNBQWMsQ0FBQztBQWVoRDtJQUFBO0lBcUZBLENBQUM7SUFwRkEsa0NBQVcsR0FBWCxVQUF1QixLQUFrQixFQUFFLFNBQXlDO1FBQ25GLElBQUksV0FBbUIsQ0FBQztRQUV4QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQWUsRUFBRSxLQUFhO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBa0IsS0FBa0IsRUFBRSxJQUErQztRQUNwRixJQUFJLEtBQWEsQ0FBQztRQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQStCLElBQUksQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBYSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsRUFB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