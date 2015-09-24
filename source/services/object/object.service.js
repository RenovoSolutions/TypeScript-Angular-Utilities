'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../array/array.service');
exports.moduleName = 'rl.utilities.services.object';
exports.serviceName = 'objectUtility';
var ObjectUtility = (function () {
    function ObjectUtility(array) {
        this.array = array;
    }
    ObjectUtility.prototype.isNullOrEmpty = function (object) {
        if (object == null) {
            return true;
        }
        else if (_.isArray(object)) {
            return _.any(object) === false;
        }
        else if (_.isNumber(object)) {
            return _.isNaN(object);
        }
        else {
            return object === '';
        }
    };
    ObjectUtility.prototype.isNullOrWhitespace = function (object) {
        if (_.isString(object)) {
            object = object.trim();
        }
        return this.isNullOrEmpty(object);
    };
    ObjectUtility.prototype.areEqual = function (obj1, obj2) {
        var _this = this;
        var type1 = typeof obj1;
        var type2 = typeof obj2;
        if (obj1 == null && obj2 == null) {
            return true;
        }
        else if (obj1 == null || obj2 == null) {
            return false;
        }
        if (type1 !== type2) {
            return false;
        }
        else if (obj1 instanceof Array) {
            if (obj1.length !== obj2.length) {
                return false;
            }
            for (var i = 0; i < obj1.length; i++) {
                if (this.areEqual(obj1[i], obj2[i]) === false) {
                    return false;
                }
            }
        }
        else if (type1 === 'object') {
            //init an object with the keys from obj2
            var keys2 = _.keys(obj2);
            _.forIn(obj1, function (value, key) {
                if (_.has(obj2, key)) {
                    //compare value against the value with the same key in obj2, then remove the key
                    if (_this.areEqual(value, obj2[key]) === false) {
                        return false;
                    }
                    else {
                        _this.array.remove(keys2, key);
                    }
                }
                else {
                    return false;
                }
            });
            //if there are still keys left in keys2, we know they are not equal (obj2 has more properties)
            if (_.any(keys2)) {
                return false;
            }
        }
        else {
            //if types are primitive, do a simple comparison
            return obj1 === obj2;
        }
        return true;
    };
    ObjectUtility.prototype.toString = function (object) {
        return object + '';
    };
    ObjectUtility.prototype.valueOrDefault = function (value, defaultValue) {
        if (value != null) {
            return value;
        }
        else {
            return defaultValue;
        }
    };
    ObjectUtility.$inject = [array_service_1.serviceName];
    return ObjectUtility;
})();
angular.module(exports.moduleName, [array_service_1.moduleName])
    .service(exports.serviceName, ObjectUtility);
//# sourceMappingURL=object.service.js.map