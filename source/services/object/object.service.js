'use strict';
var angular = require('angular');
var _ = require('lodash');
var array_service_1 = require('../array/array.service');
var __dateUtility = require('../date/date.module');
exports.moduleName = 'rl.utilities.services.object';
exports.serviceName = 'objectUtility';
var ObjectUtility = (function () {
    function ObjectUtility(array, dateUtility) {
        this.array = array;
        this.dateUtility = dateUtility;
    }
    ObjectUtility.prototype.isNullOrEmpty = function (object) {
        if (object == null) {
            return true;
        }
        else if (_.isArray(object)) {
            return _.some(object) === false;
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
        else if (_.isDate(obj1) && _.isDate(obj2)) {
            return this.dateUtility.sameDateTime(obj1, obj2);
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
            if (_.some(keys2)) {
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
    ObjectUtility.prototype.propertyNameToString = function (propertyFunction) {
        var stringValue = propertyFunction.toString();
        var regExpLiteral = /\.([^\.;]+);?\s*\}$/;
        var propertyName = regExpLiteral.exec(stringValue)[1];
        return propertyName;
    };
    ObjectUtility.$inject = [array_service_1.serviceName, __dateUtility.serviceName];
    return ObjectUtility;
}());
exports.objectUtility = new ObjectUtility(array_service_1.arrayUtility, __dateUtility.dateUtility);
angular.module(exports.moduleName, [array_service_1.moduleName, __dateUtility.moduleName])
    .service(exports.serviceName, ObjectUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYmplY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw4QkFLTyx3QkFBd0IsQ0FBQyxDQUFBO0FBRWhDLElBQVksYUFBYSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFMUMsa0JBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUNwRCxtQkFBVyxHQUFXLGVBQWUsQ0FBQztBQWtCakQ7SUFFQyx1QkFBb0IsS0FBb0IsRUFBVSxXQUF1QztRQUFyRSxVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQTRCO0lBQ3pGLENBQUM7SUFFRCxxQ0FBYSxHQUFiLFVBQWMsTUFBVztRQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0YsQ0FBQztJQUVELDBD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