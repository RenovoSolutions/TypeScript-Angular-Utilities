"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var _ = require('lodash');
var array_service_1 = require('../array/array.service');
var date_module_1 = require('../date/date.module');
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
        else if (this.areDates(obj1, obj2)) {
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
    ObjectUtility.prototype.areDates = function (obj1, obj2) {
        if ((_.isDate(obj1) && _.isDate(obj2))
            || (moment.isMoment(obj1) && moment.isMoment(obj2))) {
            return true;
        }
        return false;
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
    ObjectUtility = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(array_service_1.arrayToken)),
        __param(1, core_1.Inject(date_module_1.dateToken))
    ], ObjectUtility);
    return ObjectUtility;
}());
exports.ObjectUtility = ObjectUtility;
exports.objectUtility = new ObjectUtility(array_service_1.arrayUtility, date_module_1.dateUtility);
exports.objectToken = new core_1.OpaqueToken('A utility for working with objects');
exports.OBJECT_PROVIDER = new core_1.Provider(exports.objectToken, {
    useClass: ObjectUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYmplY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBRTFFLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDhCQUlPLHdCQUF3QixDQUFDLENBQUE7QUFFaEMsNEJBSU8scUJBQXFCLENBQUMsQ0FBQTtBQW1CN0I7SUFJQyx1QkFBZ0MsS0FBb0IsRUFBcUIsV0FBeUI7UUFDakcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDaEMsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxNQUFXO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDRixDQUFDO0lBRUQsMENBQWtCLEdBQWxCLFVBQW1CLE1BQVc7UUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEs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