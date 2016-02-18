this["rl_utilities"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "output";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var behaviors = __webpack_require__(2);
	exports.behaviors = behaviors;
	var filters = __webpack_require__(4);
	exports.filters = filters;
	var services = __webpack_require__(18);
	exports.services = services;
	var types = __webpack_require__(57);
	exports.types = types;
	exports.name = 'rl.utilities';
	angular.module(exports.name, [
	    behaviors.name,
	    filters.name,
	    services.moduleName,
	]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() { module.exports = this["angular"]; }());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var stopEventPropogation = __webpack_require__(3);
	exports.stopEventPropogation = stopEventPropogation;
	exports.name = 'rl.utilities.behaviors';
	angular.module(exports.name, [
	    stopEventPropogation.moduleName,
	]);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.behaviors.stopEventPropogation';
	exports.directiveName = 'rlStopEventPropagation';
	function stopEventPropagation() {
	    'use strict';
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            element.on(attrs.rlStopEventPropagation, function (event) {
	                event.preventDefault();
	                event.stopPropagation();
	            });
	        }
	    };
	}
	angular.module(exports.moduleName, [])
	    .directive(exports.directiveName, stopEventPropagation);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var isEmpty = __webpack_require__(5);
	exports.isEmpty = isEmpty;
	var truncate = __webpack_require__(16);
	exports.truncate = truncate;
	__export(__webpack_require__(17));
	exports.name = 'rl.utilities.filters';
	angular.module(exports.name, [
	    isEmpty.moduleName,
	    truncate.moduleName,
	]);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var object_service_1 = __webpack_require__(6);
	exports.moduleName = 'rl.utilities.filters.isEmpty';
	exports.serviceName = 'isEmpty';
	exports.filterName = exports.serviceName + 'Filter';
	isEmpty.$inject = [object_service_1.serviceName];
	function isEmpty(object) {
	    'use strict';
	    return function (input, trueWhenEmpty) {
	        var isEmpty = object.isNullOrEmpty(input);
	        if (trueWhenEmpty === false) {
	            return !isEmpty;
	        }
	        return isEmpty;
	    };
	}
	angular.module(exports.moduleName, [object_service_1.moduleName])
	    .filter(exports.serviceName, isEmpty);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var array_service_1 = __webpack_require__(8);
	var __dateUtility = __webpack_require__(9);
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
	})();
	angular.module(exports.moduleName, [array_service_1.moduleName, __dateUtility.moduleName])
	    .service(exports.serviceName, ObjectUtility);


/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() { module.exports = this["_"]; }());

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
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
	    return ArrayUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, ArrayUtility);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(10);
	var time_service_1 = __webpack_require__(12);
	var date_service_1 = __webpack_require__(14);
	var dateTimeFormatStrings_1 = __webpack_require__(15);
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(11);
	exports.moduleName = 'rl.utilities.services.momentWrapper';
	exports.serviceName = 'momentWrapper';
	function momentWrapper() {
	    'use strict';
	    // Using `any` instead of MomentStatic because
	    //  createFromInputFallback doesn't appear to be
	    //  defined in MomentStatic... :-(
	    var momentWrapper = moment; // moment must already be loaded
	    // Set default method for handling non-ISO date conversions.
	    // See 4/28 comment in https://github.com/moment/moment/issues/1407
	    // This also prevents the deprecation warning message to the console.
	    momentWrapper.createFromInputFallback = function (config) {
	        config._d = new Date(config._i);
	    };
	    return momentWrapper;
	}
	exports.momentWrapper = momentWrapper;
	angular.module(exports.moduleName, [])
	    .factory(exports.serviceName, momentWrapper);


/***/ },
/* 11 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(11);
	var compareResult_1 = __webpack_require__(13);
	var date_module_1 = __webpack_require__(9);
	exports.moduleName = 'rl.utilities.services.time';
	exports.serviceName = 'timeUtility';
	var TimeUtility = (function () {
	    function TimeUtility() {
	    }
	    TimeUtility.prototype.compareTimes = function (time1, time2) {
	        var format = date_module_1.defaultFormats.timeFormat;
	        var start = moment(time1, format);
	        var end = moment(time2, format);
	        if (start.hours() == end.hours()
	            && start.minutes() == end.minutes()) {
	            return compareResult_1.CompareResult.equal;
	        }
	        else if (start.hours() >= end.hours()
	            && start.minutes() >= end.minutes()) {
	            return compareResult_1.CompareResult.greater;
	        }
	        else {
	            return compareResult_1.CompareResult.less;
	        }
	    };
	    TimeUtility.prototype.millisecondsToSeconds = function (milliseconds) {
	        return Math.floor(milliseconds / 1000);
	    };
	    TimeUtility.prototype.millisecondsToMinutes = function (milliseconds) {
	        return Math.floor(this.millisecondsToSeconds(milliseconds) / 60);
	    };
	    TimeUtility.prototype.millisecondsToHours = function (milliseconds) {
	        return Math.floor(this.millisecondsToMinutes(milliseconds) / 60);
	    };
	    TimeUtility.prototype.millisecondsToDays = function (milliseconds) {
	        return Math.floor(this.millisecondsToHours(milliseconds) / 24);
	    };
	    return TimeUtility;
	})();
	exports.TimeUtility = TimeUtility;
	exports.timeUtility = new TimeUtility();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, TimeUtility);


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	(function (CompareResult) {
	    CompareResult[CompareResult["greater"] = 1] = "greater";
	    CompareResult[CompareResult["equal"] = 0] = "equal";
	    CompareResult[CompareResult["less"] = -1] = "less";
	})(exports.CompareResult || (exports.CompareResult = {}));
	var CompareResult = exports.CompareResult;
	function getCompareResult(num) {
	    'use strict';
	    if (num === 0) {
	        return CompareResult.equal;
	    }
	    else if (num > 0) {
	        return CompareResult.greater;
	    }
	    else {
	        return CompareResult.less;
	    }
	}
	exports.getCompareResult = getCompareResult;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var moment = __webpack_require__(11);
	var time_service_1 = __webpack_require__(12);
	var moment_module_1 = __webpack_require__(10);
	var compareResult_1 = __webpack_require__(13);
	exports.serviceName = 'dateUtility';
	var DateUtility = (function () {
	    function DateUtility(moment, time) {
	        var _this = this;
	        this.moment = moment;
	        this.time = time;
	        this.baseFormat = 'MM-DD-YYYY';
	        this.month = [
	            { name: 'January', days: function () { return 31; } },
	            { name: 'February', days: function (year) { return _this.isLeapYear(year) ? 29 : 28; } },
	            { name: 'March', days: function () { return 31; } },
	            { name: 'April', days: function () { return 30; } },
	            { name: 'May', days: function () { return 31; } },
	            { name: 'June', days: function () { return 30; } },
	            { name: 'July', days: function () { return 31; } },
	            { name: 'August', days: function () { return 31; } },
	            { name: 'September', days: function () { return 30; } },
	            { name: 'October', days: function () { return 31; } },
	            { name: 'November', days: function () { return 30; } },
	            { name: 'December', days: function () { return 31; } },
	        ];
	    }
	    DateUtility.prototype.isLeapYear = function (year) {
	        return new Date(year, 1, 29).getMonth() === 1;
	    };
	    DateUtility.prototype.getFullString = function (month) {
	        return this.month[month].name;
	    };
	    DateUtility.prototype.getDays = function (month, year) {
	        return this.month[month].days(year);
	    };
	    DateUtility.prototype.subtractDates = function (start, end, dateFormat) {
	        if (start == null || end == null) {
	            return null;
	        }
	        var startDate = this.getDate(start, dateFormat);
	        var endDate = this.getDate(end, dateFormat);
	        var result = {};
	        result.days = endDate.getDate() - startDate.getDate();
	        result.years = endDate.getFullYear() - startDate.getFullYear();
	        result.months = endDate.getMonth() - startDate.getMonth();
	        if (result.days < 0) {
	            result.months -= 1;
	            result.days += this.getDays(startDate.getMonth(), startDate.getFullYear());
	        }
	        if (result.months < 0) {
	            result.years -= 1;
	            result.months += 12;
	        }
	        return result;
	    };
	    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
	        var milliseconds = this.subtractDateInMilliseconds(start, end, dateFormat);
	        return this.time.millisecondsToDays(milliseconds);
	    };
	    DateUtility.prototype.subtractDateInMilliseconds = function (start, end, dateFormat) {
	        if (start == null || end == null) {
	            return null;
	        }
	        var startDate = this.getDate(start, dateFormat);
	        var endDate = this.getDate(end, dateFormat);
	        return endDate.getTime() - startDate.getTime();
	    };
	    DateUtility.prototype.compareDates = function (date1, date2, dateFormat) {
	        // subtractDateInDays subtracts the fist from the second, assuming start and end dates
	        var difference = this.subtractDateInMilliseconds(date2, date1, dateFormat);
	        return compareResult_1.getCompareResult(difference);
	    };
	    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
	        if (this.compareDates(date, rangeStart) === compareResult_1.CompareResult.less) {
	            return false;
	        }
	        else if (this.compareDates(date, rangeEnd) === compareResult_1.CompareResult.greater) {
	            return false;
	        }
	        else {
	            return true;
	        }
	    };
	    DateUtility.prototype.getDate = function (date, dateFormat) {
	        if (_.isDate(date)) {
	            return date;
	        }
	        else {
	            return this.moment(date, this.getFormat(dateFormat)).toDate();
	        }
	    };
	    DateUtility.prototype.getDateFromISOString = function (date) {
	        return this.moment(date).toDate();
	    };
	    DateUtility.prototype.isDate = function (date, dateFormat) {
	        if (_.isDate(date)) {
	            //lodash will return true if it is a valid date object, but has in invalid value.
	            //check the time value of the date object to verify that it's a Valid Date.
	            return !isNaN(date.getTime());
	        }
	        return this.moment(date, this.getFormat(dateFormat)).isValid();
	    };
	    DateUtility.prototype.getNow = function () {
	        return new Date();
	    };
	    DateUtility.prototype.formatDate = function (date, dateFormat) {
	        return this.moment(this.getDate(date, dateFormat)).format(this.getFormat(dateFormat));
	    };
	    DateUtility.prototype.getFormat = function (customFormat) {
	        return customFormat != null ? customFormat : this.baseFormat;
	    };
	    DateUtility.prototype.sameDate = function (date1, date2, date1Format, date2Format) {
	        if (date1Format != undefined && date2Format === undefined) {
	            date2Format = date1Format;
	        }
	        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
	            return moment(date1, date1Format).format("MM/DD/YYYY") === moment(date2, date2Format).format("MM/DD/YYYY");
	        }
	        else {
	            return false;
	        }
	    };
	    DateUtility.prototype.sameDateTime = function (date1, date2, date1Format, date2Format) {
	        if (date1Format != undefined && date2Format === undefined) {
	            date2Format = date1Format;
	        }
	        if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
	            return moment(date1, date1Format).format("MM/DD/YYYY +-HHmm") === moment(date2, date2Format).format("MM/DD/YYYY +-HHmm");
	        }
	        else {
	            return false;
	        }
	    };
	    DateUtility.$inject = [moment_module_1.serviceName, time_service_1.serviceName];
	    return DateUtility;
	})();
	exports.DateUtility = DateUtility;
	exports.dateUtility = new DateUtility(moment, time_service_1.timeUtility);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	exports.dateTimeFormatServiceName = 'dateTimeFormatStrings';
	exports.defaultFormats = {
	    isoFormat: 'YYYY-MM-DDTHH:mm:ss',
	    dateTimeFormat: 'M/D/YYYY h:mm A',
	    dateFormat: 'M/D/YYYY',
	    timeFormat: 'h:mmA',
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
	var object_service_1 = __webpack_require__(6);
	exports.moduleName = 'rl.utilities.filters.truncate';
	exports.serviceName = 'truncate';
	exports.filterName = exports.serviceName + 'Filter';
	truncate.$inject = [object_service_1.serviceName];
	function truncate(objectUtility) {
	    'use strict';
	    return function (input, truncateTo, includeEllipses) {
	        includeEllipses = includeEllipses == null ? false : includeEllipses;
	        var out = objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
	        if (out.length) {
	            if (truncateTo != null && out.length > truncateTo) {
	                out = out.substring(0, truncateTo);
	                if (includeEllipses) {
	                    out += '...';
	                }
	            }
	        }
	        return out;
	    };
	}
	angular.module(exports.moduleName, [object_service_1.moduleName])
	    .filter(exports.serviceName, truncate);


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array = __webpack_require__(8);
	exports.array = array;
	var boolean = __webpack_require__(19);
	exports.boolean = boolean;
	var dataContracts = __webpack_require__(20);
	exports.dataContracts = dataContracts;
	var date = __webpack_require__(9);
	exports.date = date;
	var errorHandler = __webpack_require__(33);
	exports.errorHandler = errorHandler;
	var fileSize = __webpack_require__(37);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(41);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(43);
	exports.guid = guid;
	var moment = __webpack_require__(10);
	exports.moment = moment;
	var notification = __webpack_require__(34);
	exports.notification = notification;
	var numberService = __webpack_require__(38);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(46);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(47);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(48);
	exports.promise = promise;
	var stringService = __webpack_require__(42);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(49);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(50);
	exports.test = test;
	var time = __webpack_require__(12);
	exports.time = time;
	var validation = __webpack_require__(53);
	exports.validation = validation;
	exports.moduleName = 'rl.utilities.services';
	angular.module(exports.moduleName, [
	    array.moduleName,
	    boolean.moduleName,
	    dataContracts.moduleName,
	    date.moduleName,
	    errorHandler.moduleName,
	    fileSize.moduleName,
	    genericSearchFilter.moduleName,
	    guid.moduleName,
	    moment.moduleName,
	    notification.moduleName,
	    numberService.moduleName,
	    objectService.moduleName,
	    observable.moduleName,
	    parentChildBehavior.moduleName,
	    promise.moduleName,
	    stringService.moduleName,
	    synchronizedRequests.moduleName,
	    time.moduleName,
	    test.moduleName,
	    validation.moduleName,
	]);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.boolean';
	exports.serviceName = 'booleanUtility';
	var BooleanUtility = (function () {
	    function BooleanUtility() {
	    }
	    BooleanUtility.prototype.toBool = function (object) {
	        return !!object;
	    };
	    return BooleanUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, BooleanUtility);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseResourceBuilder_service_1 = __webpack_require__(21);
	var baseData_service_1 = __webpack_require__(22);
	var baseSingletonData_service_1 = __webpack_require__(26);
	var converters = __webpack_require__(28);
	exports.converters = converters;
	var mocks = __webpack_require__(31);
	exports.mocks = mocks;
	exports.moduleName = 'rl.utilities.services.dataContracts';
	__export(__webpack_require__(32));
	var baseData_service_2 = __webpack_require__(22);
	exports.BaseDataService = baseData_service_2.BaseDataService;
	exports.baseDataServiceFactoryName = baseData_service_2.factoryName;
	__export(__webpack_require__(25));
	var baseSingletonData_service_2 = __webpack_require__(26);
	exports.BaseSingletonDataService = baseSingletonData_service_2.BaseSingletonDataService;
	exports.baseSingletonDataServiceFactoryName = baseSingletonData_service_2.factoryName;
	__export(__webpack_require__(27));
	var baseResourceBuilder_service_2 = __webpack_require__(21);
	exports.builderServiceName = baseResourceBuilder_service_2.serviceName;
	angular.module(exports.moduleName, [
	    baseData_service_1.moduleName,
	    baseSingletonData_service_1.moduleName,
	    baseResourceBuilder_service_1.moduleName,
	]);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array_service_1 = __webpack_require__(8);
	var baseData_service_1 = __webpack_require__(22);
	var baseDataServiceView_1 = __webpack_require__(24);
	var baseParentData_service_1 = __webpack_require__(25);
	var baseSingletonData_service_1 = __webpack_require__(26);
	var baseParentSingletonData_service_1 = __webpack_require__(27);
	exports.moduleName = 'rl.utilities.services.baseResourceBuilder';
	exports.serviceName = 'baseResourceBuilder';
	var BaseResourceBuilder = (function () {
	    function BaseResourceBuilder($http, $q, $rootScope, array) {
	        this.$http = $http;
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	        this.array = array;
	    }
	    BaseResourceBuilder.prototype.getLibraryServices = function () {
	        return {
	            $q: this.$q,
	            $rootScope: this.$rootScope,
	        };
	    };
	    BaseResourceBuilder.prototype.createResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createResourceView = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseDataServiceView_1.BaseDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseDataServiceView_1.BaseParentDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.useMockIfNoEndpoint = function (options) {
	        options.useMock = options.endpoint == null ? true : options.useMock;
	        return options;
	    };
	    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
	    return BaseResourceBuilder;
	})();
	exports.BaseResourceBuilder = BaseResourceBuilder;
	angular.module(exports.moduleName, [array_service_1.moduleName])
	    .service(exports.serviceName, BaseResourceBuilder);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var array_service_1 = __webpack_require__(8);
	var baseDataServiceBehavior_1 = __webpack_require__(23);
	exports.moduleName = 'rl.utilities.services.baseDataService';
	exports.factoryName = 'baseDataService';
	var BaseDataService = (function () {
	    function BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests) {
	        this.array = array;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform);
	    }
	    BaseDataService.prototype.getItemEndpoint = function (id) {
	        return this.endpoint + '/' + id.toString();
	    };
	    BaseDataService.prototype.getList = function (params) {
	        var _this = this;
	        return this.behavior.getList({
	            params: params,
	            endpoint: this.endpoint,
	            getMockData: function () { return _this.mockData; },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    BaseDataService.prototype.getDetail = function (id) {
	        var _this = this;
	        return this.behavior.getItem({
	            endpoint: this.getItemEndpoint(id),
	            getMockData: function () {
	                return _.find(_this.mockData, function (item) {
	                    return item.id === id;
	                });
	            },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    BaseDataService.prototype.create = function (domainObject) {
	        var _this = this;
	        return this.behavior.create({
	            domainObject: domainObject,
	            endpoint: this.endpoint,
	            addMockData: function (data) {
	                var nextId = _.maxBy(_this.mockData, 'id').id + 1;
	                domainObject.id = nextId;
	                _this.mockData.push(domainObject);
	            },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    BaseDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        return this.behavior.update({
	            domainObject: domainObject,
	            endpoint: this.getItemEndpoint(domainObject.id),
	            updateMockData: function (data) {
	                var oldObject = _.find(_this.mockData, function (item) {
	                    return item.id === data.id;
	                });
	                oldObject = _.assign(oldObject, data);
	            },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    BaseDataService.prototype.delete = function (domainObject) {
	        var _this = this;
	        return this.behavior.delete({
	            domainObject: domainObject,
	            endpoint: this.getItemEndpoint(domainObject.id),
	            removeMockData: function (data) {
	                _this.array.remove(_this.mockData, domainObject);
	            },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    return BaseDataService;
	})();
	exports.BaseDataService = BaseDataService;
	baseDataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
	function baseDataServiceFactory($http, $q, array) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
	            return new BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	        },
	    };
	}
	exports.baseDataServiceFactory = baseDataServiceFactory;
	angular.module(exports.moduleName, [array_service_1.moduleName])
	    .factory(exports.factoryName, baseDataServiceFactory);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var BaseDataServiceBehavior = (function () {
	    function BaseDataServiceBehavior($http, $q, transform) {
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	    }
	    BaseDataServiceBehavior.prototype.getList = function (options) {
	        var _this = this;
	        var promise;
	        if (options.useMock) {
	            promise = this.$q.when(options.getMockData());
	        }
	        else {
	            promise = this.$http.get(options.endpoint, { params: options.params })
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            data = _this.applyTransform(data, _this.transform, false);
	            if (options.logRequests) {
	                _this.log('getList', data, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.getItem = function (options) {
	        var _this = this;
	        var promise;
	        if (options.useMock) {
	            promise = this.$q.when(options.getMockData());
	        }
	        else {
	            promise = this.$http.get(options.endpoint)
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            data = _this.applyTransform(data, _this.transform, false);
	            if (options.logRequests) {
	                _this.log('get', data, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.create = function (options) {
	        var _this = this;
	        var promise;
	        options.domainObject = this.applyTransform(options.domainObject, this.transform, true);
	        if (options.useMock) {
	            options.addMockData(options.domainObject);
	            promise = this.$q.when(options.domainObject);
	        }
	        else {
	            promise = this.$http.post(options.endpoint, JSON.stringify(options.domainObject))
	                .then(function (result) {
	                return result.data;
	            });
	        }
	        return promise.then(function (data) {
	            data = _this.applyTransform(data, _this.transform, false);
	            if (options.logRequests) {
	                _this.log('create', data, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.update = function (options) {
	        var _this = this;
	        var promise;
	        options.domainObject = this.applyTransform(options.domainObject, this.transform, true);
	        if (options.useMock) {
	            options.updateMockData(options.domainObject);
	            promise = this.$q.when(options.domainObject);
	        }
	        else {
	            promise = this.$http.put(options.endpoint, options.domainObject)
	                .then(function (result) {
	                return result.data;
	            });
	        }
	        return promise.then(function (data) {
	            data = _this.applyTransform(data, _this.transform, false);
	            if (options.logRequests) {
	                _this.log('update', options.domainObject, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.delete = function (options) {
	        var _this = this;
	        var promise;
	        if (options.useMock) {
	            options.removeMockData(options.domainObject);
	            promise = this.$q.when();
	        }
	        else {
	            promise = this.$http.delete(options.endpoint).then(function () { return null; });
	        }
	        return promise.then(function () {
	            if (options.logRequests) {
	                _this.log('delete', options.domainObject, options.endpoint, options.useMock);
	            }
	        });
	    };
	    BaseDataServiceBehavior.prototype.log = function (requestName, data, endpoint, useMock) {
	        var mockString = useMock ? 'Mocked ' : '';
	        var endpointString = endpoint == null ? 'unspecified' : endpoint;
	        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
	        console.log(data);
	    };
	    BaseDataServiceBehavior.prototype.applyTransform = function (data, transform, toServer) {
	        var _this = this;
	        if (transform == null) {
	            return data;
	        }
	        if (_.isArray(data)) {
	            return _.map(data, function (item) { return _this.applyTransform(item, transform, toServer); });
	        }
	        if (this.isConverter(transform)) {
	            var transformFunc = toServer
	                ? transform.toServer
	                : transform.fromServer;
	            return transformFunc(data);
	        }
	        else {
	            return _.mapValues(data, function (prop, key) {
	                if (_.has(transform, key)) {
	                    return _this.applyTransform(prop, transform[key], toServer);
	                }
	                return prop;
	            });
	        }
	    };
	    BaseDataServiceBehavior.prototype.isConverter = function (object) {
	        return _.isFunction(object.fromServer)
	            || _.isFunction(object.toServer);
	    };
	    return BaseDataServiceBehavior;
	})();
	exports.BaseDataServiceBehavior = BaseDataServiceBehavior;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseData_service_1 = __webpack_require__(22);
	var baseParentData_service_1 = __webpack_require__(25);
	var baseSingletonData_service_1 = __webpack_require__(26);
	var baseParentSingletonData_service_1 = __webpack_require__(27);
	var BaseDataServiceView = (function (_super) {
	    __extends(BaseDataServiceView, _super);
	    function BaseDataServiceView($http, $q, array, _endpoint, mockData, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, array, _endpoint, mockData, transform, useMock, logRequests);
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	    }
	    BaseDataServiceView.prototype.AsSingleton = function (parentId) {
	        var mockData = _.find(this.mockData, function (item) {
	            return item.id === parentId;
	        });
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.transform, this.useMock, this.logRequests);
	    };
	    return BaseDataServiceView;
	})(baseData_service_1.BaseDataService);
	exports.BaseDataServiceView = BaseDataServiceView;
	var BaseParentDataServiceView = (function (_super) {
	    __extends(BaseParentDataServiceView, _super);
	    function BaseParentDataServiceView($http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests);
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	    }
	    BaseParentDataServiceView.prototype.AsSingleton = function (parentId) {
	        var mockData = _.find(this.mockData, function (item) {
	            return item.id === parentId;
	        });
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.useMock, this.logRequests, parentId);
	    };
	    return BaseParentDataServiceView;
	})(baseParentData_service_1.BaseParentDataService);
	exports.BaseParentDataServiceView = BaseParentDataServiceView;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(7);
	var baseData_service_1 = __webpack_require__(22);
	var BaseParentDataService = (function (_super) {
	    __extends(BaseParentDataService, _super);
	    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	    }
	    BaseParentDataService.prototype.childContracts = function (id) {
	        var _this = this;
	        if (_.isUndefined(id)) {
	            var dictionary = this.resourceDictionaryBuilder();
	            _.each(dictionary, function (dataService) {
	                dataService.endpoint = _this.endpoint + dataService.endpoint;
	            });
	            return dictionary;
	        }
	        else {
	            var dictionary = this.resourceDictionaryBuilder();
	            return _.mapValues(dictionary, function (dataService) {
	                var contract;
	                if (_.isFunction(dataService.AsSingleton)) {
	                    contract = dataService.AsSingleton(id);
	                }
	                else {
	                    contract = dataService;
	                }
	                contract.endpoint = _this.endpoint + '/' + id + contract.endpoint;
	                return contract;
	            });
	        }
	    };
	    return BaseParentDataService;
	})(baseData_service_1.BaseDataService);
	exports.BaseParentDataService = BaseParentDataService;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var baseDataServiceBehavior_1 = __webpack_require__(23);
	exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
	exports.factoryName = 'baseSingletonDataService';
	var BaseSingletonDataService = (function () {
	    function BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests) {
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform);
	    }
	    BaseSingletonDataService.prototype.get = function () {
	        var _this = this;
	        return this.behavior.getItem({
	            endpoint: this.endpoint,
	            getMockData: function () { return _this.mockData; },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    BaseSingletonDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        return this.behavior.update({
	            domainObject: domainObject,
	            endpoint: this.endpoint,
	            updateMockData: function (data) {
	                _this.mockData = _.assign(_this.mockData, domainObject);
	            },
	            useMock: this.useMock,
	            logRequests: this.logRequests,
	        });
	    };
	    return BaseSingletonDataService;
	})();
	exports.BaseSingletonDataService = BaseSingletonDataService;
	baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
	function baseSingletonDataServiceFactory($http, $q) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
	            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests);
	        },
	    };
	}
	exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
	angular.module(exports.moduleName, [])
	    .factory(exports.factoryName, baseSingletonDataServiceFactory);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseSingletonData_service_1 = __webpack_require__(26);
	var BaseParentSingletonDataService = (function (_super) {
	    __extends(BaseParentSingletonDataService, _super);
	    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests, parentId) {
	        _super.call(this, $http, $q, endpoint, mockData, transform, useMock, logRequests);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	        this.parentId = parentId;
	    }
	    BaseParentSingletonDataService.prototype.childContracts = function () {
	        var _this = this;
	        var dictionary = this.resourceDictionaryBuilder();
	        return _.mapValues(dictionary, function (dataService) {
	            var contract;
	            if (_.isFunction(dataService.AsSingleton)) {
	                contract = dataService.AsSingleton(_this.parentId);
	            }
	            else {
	                contract = dataService;
	            }
	            contract.endpoint = _this.endpoint + contract.endpoint;
	            return contract;
	        });
	    };
	    return BaseParentSingletonDataService;
	})(baseSingletonData_service_1.BaseSingletonDataService);
	exports.BaseParentSingletonDataService = BaseParentSingletonDataService;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var moment = __webpack_require__(11);
	var date_module_1 = __webpack_require__(9);
	exports.dateConverter = {
	    fromServer: function (raw) {
	        return date_module_1.dateUtility.getDateFromISOString(raw);
	    },
	    toServer: function (data) {
	        return moment(data).format(date_module_1.defaultFormats.isoFormat);
	    },
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	var EnumConverter = (function () {
	    function EnumConverter(enumType) {
	        var _this = this;
	        this.enumType = enumType;
	        this.fromServer = function (raw) {
	            return _this.enumType.get(raw);
	        };
	        this.toServer = function (data) {
	            return data != null
	                ? data.value
	                : null;
	        };
	    }
	    return EnumConverter;
	})();
	exports.EnumConverter = EnumConverter;
	;


/***/ },
/* 31 */
/***/ function(module, exports) {

	// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
	'use strict';


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
	'use strict';
	var _ = __webpack_require__(7);
	var ContractLibrary = (function () {
	    function ContractLibrary(builder) {
	        this.builder = builder;
	        var services = builder.getLibraryServices();
	        this.$q = services.$q;
	        this.$rootScope = services.$rootScope;
	    }
	    ContractLibrary.prototype.flush = function () {
	        this.$rootScope.$digest();
	    };
	    ContractLibrary.prototype.mockGet = function (resource, data) {
	        return this.baseMockGet(resource, 'get', data);
	    };
	    ContractLibrary.prototype.mockGetList = function (resource, data) {
	        return this.baseMockGet(resource, 'getList', data);
	    };
	    ContractLibrary.prototype.mockGetDetail = function (resource, data) {
	        return this.baseMockGet(resource, 'getDetail', data);
	    };
	    ContractLibrary.prototype.mockChild = function (parent, mockCallback) {
	        var getChildren = parent.childContracts.bind(parent);
	        parent.childContracts = function (id) {
	            var children = getChildren(id);
	            mockCallback(children);
	            return children;
	        };
	    };
	    ContractLibrary.prototype.createMock = function (resource) {
	        var _this = this;
	        var dataService = this.builder.createResource({});
	        dataService.mockGetList = function (data) { return _this.baseMockGet(dataService, 'getList', data); };
	        dataService.mockGetDetail = function (data) { return _this.baseMockGet(dataService, 'get', data); };
	        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
	        dataService.mockCreate = function () { return _this.baseMockSave(dataService, 'create'); };
	        dataService = this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.createMockParent = function (resource) {
	        var _this = this;
	        var getChildren = resource != null ? resource.resourceDictionaryBuilder : function () { return {}; };
	        var dataService = this.builder.createParentResource({
	            resourceDictionaryBuilder: getChildren,
	        });
	        dataService.mockGetList = function (data) { return _this.baseMockGet(dataService, 'getList', data); };
	        dataService.mockGetDetail = function (data) { return _this.baseMockGet(dataService, 'get', data); };
	        dataService.mockChild = function (mockCallback) { return _this.mockChild(dataService, mockCallback); };
	        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
	        dataService.mockCreate = function () { return _this.baseMockSave(dataService, 'create'); };
	        dataService = this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.createMockSingleton = function (resource) {
	        var _this = this;
	        var dataService = this.builder.createSingletonResource({});
	        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
	        dataService.mockUpdate = function () { return _this.baseMockSave(dataService, 'update'); };
	        dataService = this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.updateResource = function (dataService, resource) {
	        if (resource != null) {
	            dataService = _.extend(resource, dataService);
	        }
	        return dataService;
	    };
	    ContractLibrary.prototype.baseMockGet = function (resource, actionName, data) {
	        var _this = this;
	        var func = this.sinon.spy(function () {
	            return _this.$q.when(data);
	        });
	        resource[actionName] = func;
	        return func;
	    };
	    ContractLibrary.prototype.baseMockSave = function (resource, actionName) {
	        var _this = this;
	        var func = this.sinon.spy(function (data) {
	            return _this.$q.when(data);
	        });
	        resource[actionName] = func;
	        return func;
	    };
	    Object.defineProperty(ContractLibrary.prototype, "sinon", {
	        get: function () {
	            return sinon || { spy: function (func) { return func; } };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ContractLibrary;
	})();
	exports.ContractLibrary = ContractLibrary;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var notification_service_1 = __webpack_require__(34);
	exports.moduleName = 'rl21.services.errorHandler';
	exports.serviceName = 'errorHandler';
	(function (HttpStatusCode) {
	    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
	    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
	    HttpStatusCode[HttpStatusCode["invalidUrl"] = 404] = "invalidUrl";
	    HttpStatusCode[HttpStatusCode["timeout"] = 408] = "timeout";
	    HttpStatusCode[HttpStatusCode["internalServerError"] = 500] = "internalServerError";
	})(exports.HttpStatusCode || (exports.HttpStatusCode = {}));
	var HttpStatusCode = exports.HttpStatusCode;
	var ErrorHandlerService = (function () {
	    function ErrorHandlerService($window, notification, loginUrl, errorMessages) {
	        this.$window = $window;
	        this.notification = notification;
	        this.loginUrl = loginUrl;
	        this.errorMessages = errorMessages;
	    }
	    ErrorHandlerService.prototype.httpResponseError = function (rejection) {
	        switch (rejection.status) {
	            case HttpStatusCode.unauthorized:
	                this.loggedOutError();
	                break;
	            case HttpStatusCode.forbidden:
	                this.insufficientPermissionsError();
	                break;
	            case HttpStatusCode.invalidUrl:
	                this.invalidUrlError();
	                break;
	            case HttpStatusCode.timeout:
	                this.timeoutError();
	                break;
	            case HttpStatusCode.internalServerError:
	                this.systemError();
	                break;
	            default:
	                console.error(this.errorMessages.defaultError);
	                console.error('Status: ' + rejection.status);
	                console.error('Response: ' + rejection);
	                break;
	        }
	    };
	    ErrorHandlerService.prototype.loggedOutError = function () {
	        this.$window.location = this.loginUrl;
	    };
	    ErrorHandlerService.prototype.insufficientPermissionsError = function () {
	        this.notification.error(this.errorMessages.forbiddenError);
	    };
	    ErrorHandlerService.prototype.invalidUrlError = function () {
	        this.notification.error(this.errorMessages.invalidUrlError);
	    };
	    ErrorHandlerService.prototype.timeoutError = function () {
	        this.notification.error(this.errorMessages.timeoutError);
	        // retry
	    };
	    ErrorHandlerService.prototype.systemError = function () {
	        this.notification.error(this.errorMessages.internalServerError);
	    };
	    return ErrorHandlerService;
	})();
	exports.ErrorHandlerService = ErrorHandlerService;
	var ErrorHandlerServiceProvider = (function () {
	    function ErrorHandlerServiceProvider() {
	        var _this = this;
	        this.$get = function ($window, notification) {
	            return new ErrorHandlerService($window, notification, _this.loginUrl, _this.errorMessages);
	        };
	        this.loginUrl = '/login';
	        this.errorMessages = {
	            forbiddenError: 'You have insufficient permissions to perform this action',
	            invalidUrlError: 'Resource not found. This issue has been logged',
	            timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
	            internalServerError: 'The system has encountered an error. This issue has been logged.' +
	                ' Please contact support if you are unable to complete critical tasks',
	            defaultError: 'Http status code not handled',
	        };
	        this.$get.$inject = ['$window', notification_service_1.serviceName];
	    }
	    return ErrorHandlerServiceProvider;
	})();
	angular.module(exports.moduleName, [notification_service_1.moduleName])
	    .provider(exports.serviceName, new ErrorHandlerServiceProvider());


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(35);
	__export(__webpack_require__(36));
	exports.moduleName = 'rl.utilities.services.notification';
	exports.serviceName = 'notification';
	var NotificationService = (function () {
	    function NotificationService(notifier) {
	        this.notifier = notifier;
	    }
	    NotificationService.prototype.info = function (message) {
	        this.notifier.info(message);
	    };
	    NotificationService.prototype.warning = function (message) {
	        this.notifier.warning(message);
	    };
	    NotificationService.prototype.error = function (message) {
	        this.notifier.error(message);
	    };
	    NotificationService.prototype.success = function (message) {
	        this.notifier.success(message);
	    };
	    return NotificationService;
	})();
	exports.NotificationService = NotificationService;
	function notificationServiceProvider() {
	    'use strict';
	    var _this = this;
	    var provider = {
	        notifier: new baseNotifier_1.BaseNotifier(),
	        setNotifier: function (notifier) {
	            _this.notifier = notifier;
	        },
	        $get: function () {
	            return new NotificationService(_this.notifier);
	        },
	    };
	    return provider;
	}
	exports.notificationServiceProvider = notificationServiceProvider;
	angular.module(exports.moduleName, [])
	    .provider(exports.serviceName, notificationServiceProvider);


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	var BaseNotifier = (function () {
	    function BaseNotifier() {
	    }
	    BaseNotifier.prototype.info = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.warning = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.error = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.success = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.notify = function (message) {
	        window.alert(message);
	        console.log(message);
	    };
	    return BaseNotifier;
	})();
	exports.BaseNotifier = BaseNotifier;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(38);
	var fileSize_service_1 = __webpack_require__(39);
	var fileSizeFilter_1 = __webpack_require__(40);
	__export(__webpack_require__(39));
	__export(__webpack_require__(40));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.number';
	exports.serviceName = 'numberUtility';
	var Sign;
	(function (Sign) {
	    Sign[Sign["positive"] = 1] = "positive";
	    Sign[Sign["negative"] = -1] = "negative";
	})(Sign || (Sign = {}));
	var NumberUtility = (function () {
	    function NumberUtility() {
	    }
	    NumberUtility.prototype.preciseRound = function (num, decimals) {
	        var sign = num >= 0 ? Sign.positive : Sign.negative;
	        return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals));
	    };
	    NumberUtility.prototype.integerDivide = function (dividend, divisor) {
	        return Math.floor(dividend / divisor);
	    };
	    NumberUtility.prototype.roundToStep = function (num, step) {
	        if (!step) {
	            return num;
	        }
	        var remainder = num % step;
	        if (remainder >= step / 2) {
	            return num + (step - remainder);
	        }
	        else {
	            return num - remainder;
	        }
	    };
	    return NumberUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, NumberUtility);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(38);
	exports.factoryName = 'fileSizeFactory';
	var FileSizeService = (function () {
	    function FileSizeService(numberUtility, bytes) {
	        this.BYTES_PER_GB = 1073741824;
	        this.BYTES_PER_MB = 1048576;
	        this.BYTES_PER_KB = 1024;
	        this.bytes = bytes;
	        if (bytes >= this.BYTES_PER_GB) {
	            this.isGB = true;
	            this.GB = bytes / this.BYTES_PER_GB;
	            this.GB = numberUtility.preciseRound(this.GB, 1);
	        }
	        else {
	            this.isGB = false;
	            if (bytes >= this.BYTES_PER_MB) {
	                this.isMB = true;
	                this.MB = bytes / this.BYTES_PER_MB;
	                this.MB = numberUtility.preciseRound(this.MB, 1);
	            }
	            else {
	                this.isMB = false;
	                if (bytes >= this.BYTES_PER_KB) {
	                    this.isKB = true;
	                    this.KB = bytes / this.BYTES_PER_KB;
	                    this.KB = numberUtility.preciseRound(this.KB, 1);
	                }
	                else {
	                    this.isKB = false;
	                }
	            }
	        }
	        this.bytes = Math.round(this.bytes);
	    }
	    FileSizeService.prototype.display = function () {
	        if (this.isGB) {
	            return this.GB + ' GB';
	        }
	        else if (this.isMB) {
	            return this.MB + ' MB';
	        }
	        else if (this.isKB) {
	            return this.KB + ' KB';
	        }
	        else {
	            return this.bytes + ' bytes';
	        }
	    };
	    return FileSizeService;
	})();
	fileSizeFactory.$inject = [number_service_1.serviceName];
	function fileSizeFactory(numberUtility) {
	    'use strict';
	    return {
	        getInstance: function (bytes) {
	            return new FileSizeService(numberUtility, bytes);
	        },
	    };
	}
	exports.fileSizeFactory = fileSizeFactory;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(39);
	// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
	exports.simpleFilterName = 'fileSize';
	exports.filterName = exports.simpleFilterName + 'Filter';
	fileSizeFilter.$inject = [fileSize_service_1.factoryName];
	function fileSizeFilter(fileSizeFactory) {
	    'use strict';
	    return function (bytes) {
	        var fileSize = fileSizeFactory.getInstance(bytes);
	        return fileSize.display();
	    };
	}
	exports.fileSizeFilter = fileSizeFilter;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(42);
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


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.string';
	exports.serviceName = 'stringUtilityService';
	var StringUtilityService = (function () {
	    function StringUtilityService() {
	    }
	    StringUtilityService.prototype.toNumber = function (string) {
	        return +string;
	    };
	    StringUtilityService.prototype.contains = function (str, substring) {
	        if (substring) {
	            return str.indexOf(substring) !== -1;
	        }
	        return true;
	    };
	    StringUtilityService.prototype.substitute = function (formatString) {
	        var _this = this;
	        var params = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            params[_i - 1] = arguments[_i];
	        }
	        _.each(params, function (param, index) {
	            formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
	        });
	        return formatString;
	    };
	    StringUtilityService.prototype.replaceAll = function (str, patternToFind, replacementString) {
	        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
	    };
	    return StringUtilityService;
	})();
	exports.StringUtilityService = StringUtilityService;
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, StringUtilityService);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var uuid = __webpack_require__(44);
	exports.moduleName = 'rl.utilities.services.guid';
	exports.serviceName = 'guidService';
	var GuidService = (function () {
	    function GuidService() {
	    }
	    GuidService.prototype.time = function () {
	        return uuid.v1();
	    };
	    GuidService.prototype.random = function () {
	        return uuid.v4();
	    };
	    return GuidService;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, GuidService);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(45);
	
	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}
	
	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;
	
	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });
	
	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }
	
	  return buf;
	}
	
	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}
	
	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html
	
	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();
	
	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];
	
	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;
	
	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];
	
	  options = options || {};
	
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	
	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
	
	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	
	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }
	
	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }
	
	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }
	
	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;
	
	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;
	
	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;
	
	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;
	
	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;
	
	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;
	
	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;
	
	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }
	
	  return buf ? buf : unparse(b);
	}
	
	// **`v4()` - Generate random UUID**
	
	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;
	
	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};
	
	  var rnds = options.random || (options.rng || _rng)();
	
	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }
	
	  return buf || unparse(rnds);
	}
	
	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	
	module.exports = uuid;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;
	
	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}
	
	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	
	    return _rnds;
	  };
	}
	
	module.exports = rng;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.observable';
	exports.factoryName = 'observableFactory';
	var ObservableService = (function () {
	    function ObservableService() {
	        this.watchers = [];
	        this.nextKey = 0;
	    }
	    ObservableService.prototype.register = function (action, event) {
	        var _this = this;
	        if (!_.isFunction(action)) {
	            console.log('Error: watcher must be a function');
	            return null;
	        }
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.watchers[currentKey] = {
	            action: action,
	            event: event,
	        };
	        return function () {
	            _this.unregister(currentKey);
	        };
	    };
	    ObservableService.prototype.fire = function (event) {
	        var _this = this;
	        var params = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            params[_i - 1] = arguments[_i];
	        }
	        return _(this.watchers).filter(function (watcher) {
	            return watcher != null && watcher.event === event;
	        })
	            .map(function (watcher) {
	            return watcher.action.apply(_this, params);
	        }).value();
	    };
	    ObservableService.prototype.unregister = function (key) {
	        this.watchers[key] = null;
	    };
	    return ObservableService;
	})();
	exports.ObservableService = ObservableService;
	function observableServiceFactory() {
	    'use strict';
	    return {
	        getInstance: function () {
	            return new ObservableService();
	        }
	    };
	}
	exports.observableServiceFactory = observableServiceFactory;
	ng.module(exports.moduleName, [])
	    .factory(exports.factoryName, observableServiceFactory);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.parentChildBehavior';
	exports.serviceName = 'parentChildBehavior';
	var ParentChildBehaviorService = (function () {
	    function ParentChildBehaviorService() {
	    }
	    ParentChildBehaviorService.prototype.getChildBehavior = function (child) {
	        return child && child.viewData != null
	            ? child.viewData.behavior
	            : null;
	    };
	    ParentChildBehaviorService.prototype.triggerChildBehavior = function (child, action) {
	        var behavior = this.getChildBehavior(child);
	        if (behavior == null) {
	            return null;
	        }
	        else {
	            return action(behavior);
	        }
	    };
	    ParentChildBehaviorService.prototype.triggerAllChildBehaviors = function (childList, action) {
	        var behaviors = this.getAllChildBehaviors(childList);
	        return _.map(behaviors, function (behavior) {
	            return action(behavior);
	        });
	    };
	    ParentChildBehaviorService.prototype.getAllChildBehaviors = function (childList) {
	        var _this = this;
	        return _(childList).map(function (child) { return _this.getChildBehavior(child); })
	            .filter(function (behavior) { return behavior != null; })
	            .value();
	    };
	    ParentChildBehaviorService.prototype.registerChildBehavior = function (child, behavior) {
	        if (child == null) {
	            return;
	        }
	        if (child.viewData == null) {
	            child.viewData = { behavior: null };
	        }
	        var currentBehavior = child.viewData.behavior;
	        if (currentBehavior == null) {
	            child.viewData.behavior = behavior;
	        }
	        else {
	            child.viewData.behavior = _.extend(currentBehavior, behavior);
	        }
	    };
	    return ParentChildBehaviorService;
	})();
	exports.ParentChildBehaviorService = ParentChildBehaviorService;
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, ParentChildBehaviorService);


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.promise';
	exports.serviceName = 'promiseUtility';
	var PromiseUtility = (function () {
	    function PromiseUtility($q, $injector) {
	        this.$q = $q;
	        this.$injector = $injector;
	    }
	    PromiseUtility.prototype.isPromise = function (promise) {
	        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	    };
	    PromiseUtility.prototype.resolvePromises = function (resolves) {
	        var _this = this;
	        var promises = {};
	        _.each(resolves, function (value, key) {
	            if (_.isFunction(value) || _.isArray(value)) {
	                promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
	            }
	            else if (_.isString(value)) {
	                promises[key] = (_this.$q.when(_this.$injector.get(value)));
	            }
	            else {
	                promises[key] = (_this.$q.when(value));
	            }
	        });
	        return this.$q.all(promises);
	    };
	    PromiseUtility.$inject = ['$q', '$injector'];
	    return PromiseUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, PromiseUtility);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.synchronizedRequests';
	exports.factoryName = 'synchronizedRequests';
	var SynchronizedRequestsService = (function () {
	    function SynchronizedRequestsService(dataProvider, handleRequest, $q) {
	        this.dataProvider = dataProvider;
	        this.handleRequest = handleRequest;
	        this.$q = $q;
	        this.requestId = 0;
	    }
	    SynchronizedRequestsService.prototype.getData = function () {
	        var _this = this;
	        var params = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            params[_i - 0] = arguments[_i];
	        }
	        // increment the id first - should match current request id
	        this.requestId++;
	        var currentRequestId = this.requestId;
	        this.$q.when(this.dataProvider.apply(this, params)).then(function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            if (currentRequestId == _this.requestId) {
	                _this.handleRequest.apply(_this, data);
	            }
	        });
	    };
	    return SynchronizedRequestsService;
	})();
	exports.SynchronizedRequestsService = SynchronizedRequestsService;
	synchronizedRequestsFactory.$inject = ['$q'];
	function synchronizedRequestsFactory($q) {
	    return {
	        getInstance: function (dataProvider, handleRequest) {
	            return new SynchronizedRequestsService(dataProvider, handleRequest, $q);
	        },
	    };
	}
	exports.synchronizedRequestsFactory = synchronizedRequestsFactory;
	angular.module(exports.moduleName, [])
	    .factory(exports.factoryName, synchronizedRequestsFactory);


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(51);
	exports.mock = mock;
	__export(__webpack_require__(52));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// uses sinon but can't import because sinon uses dynamic requires
	// sinon types will be resolved from tsd.d.ts
	var _ = __webpack_require__(7);
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.test.mock';
	exports.serviceName = 'mockUtility';
	var Mock = (function () {
	    function Mock($q, $rootScope) {
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	    }
	    Mock.prototype.service = function (service) {
	        if (_.isUndefined(service)) {
	            service = {};
	        }
	        service._mock_requestList_ = [];
	        return service;
	    };
	    Mock.prototype.promise = function (service, methodName, data, successful) {
	        var _this = this;
	        // Default successful to true
	        if (_.isUndefined(successful)) {
	            successful = true;
	        }
	        service[methodName] = sinon.spy(function () {
	            var deferred = _this.$q.defer();
	            service._mock_requestList_.push({
	                promise: deferred,
	                data: data,
	                successful: successful,
	            });
	            return deferred.promise;
	        });
	    };
	    Mock.prototype.promiseWithCallback = function (service, methodName, callback, successful) {
	        var _this = this;
	        // Default successful to true
	        if (_.isUndefined(successful)) {
	            successful = true;
	        }
	        service[methodName] = sinon.spy(function () {
	            var params = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                params[_i - 0] = arguments[_i];
	            }
	            var deferred = _this.$q.defer();
	            service._mock_requestList_.push({
	                promise: deferred,
	                data: callback.apply(_this, params),
	                successful: successful,
	            });
	            return deferred.promise;
	        });
	    };
	    Mock.prototype.flush = function (service, scope) {
	        // Save local reference to the request list and then clear
	        var currentPendingRequests = service._mock_requestList_;
	        service._mock_requestList_ = [];
	        // Process the saved list.
	        // This way if any additional requests are generated while processing the current / local list
	        //  these requests will be queued until the next call to flush().
	        _.each(currentPendingRequests, function (request) {
	            if (request.successful) {
	                request.promise.resolve(request.data);
	            }
	            else {
	                request.promise.reject(request.data);
	            }
	            if (_.isUndefined(scope) === false) {
	                scope.$digest();
	            }
	        });
	        this.$rootScope.$apply();
	    };
	    Mock.$inject = ['$q', '$rootScope'];
	    return Mock;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, Mock);


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	__webpack_require__(1);
	var _ = __webpack_require__(7);
	var AngularFixture = (function () {
	    function AngularFixture() {
	    }
	    AngularFixture.prototype.inject = function () {
	        var serviceNames = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            serviceNames[_i - 0] = arguments[_i];
	        }
	        // object that will contain all of the services requested
	        var services = {};
	        // clone the array and add a function that iterates over the original array
	        // this avoids iterating over the function itself
	        var injectParameters = _.clone(serviceNames);
	        injectParameters.push(function () {
	            var injectedServices = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                injectedServices[_i - 0] = arguments[_i];
	            }
	            // should get called with the services injected by angular
	            // we'll add these to services using the serviceName as the key
	            _.each(serviceNames, function (service, index) {
	                services[service] = injectedServices[index];
	            });
	        });
	        angular.mock.inject(injectParameters);
	        return services;
	    };
	    AngularFixture.prototype.mock = function (mocks) {
	        angular.mock.module(function ($provide) {
	            _.each(mocks, function (value, key) {
	                $provide.value(key.toString(), value);
	            });
	        });
	    };
	    AngularFixture.prototype.controllerWithBindings = function (controllerName, bindings, locals, scope) {
	        var services = this.inject('$rootScope', '$controller');
	        var $rootScope = services.$rootScope;
	        var $controller = services.$controller;
	        scope = _.extend($rootScope.$new(), scope);
	        if (locals == null) {
	            locals = {};
	        }
	        locals.$scope = scope;
	        return {
	            scope: scope,
	            controller: $controller(controllerName, locals, bindings),
	        };
	    };
	    AngularFixture.prototype.directive = function (directiveName, dom, scope) {
	        var services = this.inject('$rootScope', '$compile');
	        scope = _.extend(services.$rootScope.$new(), scope);
	        var $compile = services.$compile;
	        var component = $compile(dom)(scope);
	        scope.$digest();
	        return {
	            directive: component,
	            scope: component.isolateScope(),
	            controller: component.controller(directiveName),
	        };
	    };
	    return AngularFixture;
	})();
	exports.angularFixture = new AngularFixture();


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var notification_service_1 = __webpack_require__(34);
	var validator_1 = __webpack_require__(54);
	var compositeValidator_1 = __webpack_require__(55);
	__export(__webpack_require__(56));
	exports.moduleName = 'rl.utilities.services.validation';
	exports.serviceName = 'validationFactory';
	var ValidationService = (function () {
	    function ValidationService(notification) {
	        this.notification = notification;
	    }
	    ValidationService.prototype.buildNotificationWarningValidator = function () {
	        var _this = this;
	        return new validator_1.Validator(function (error) {
	            _this.notification.warning(error);
	        });
	    };
	    ValidationService.prototype.buildNotificationErrorValidator = function () {
	        var _this = this;
	        return new validator_1.Validator(function (error) {
	            _this.notification.error(error);
	        });
	    };
	    ValidationService.prototype.buildCustomValidator = function (showError) {
	        return new validator_1.Validator(showError);
	    };
	    ValidationService.prototype.buildCompositeNotificationWarningValidator = function () {
	        var _this = this;
	        return new compositeValidator_1.CompositeValidator(function (error) {
	            _this.notification.warning(error);
	        });
	    };
	    ValidationService.prototype.buildCompositeNotificationErrorValidator = function () {
	        var _this = this;
	        return new compositeValidator_1.CompositeValidator(function (error) {
	            _this.notification.error(error);
	        });
	    };
	    ValidationService.prototype.buildCompositeCustomValidator = function (showError) {
	        return new compositeValidator_1.CompositeValidator(showError);
	    };
	    ValidationService.$inject = [notification_service_1.serviceName];
	    return ValidationService;
	})();
	exports.ValidationService = ValidationService;
	angular.module(exports.moduleName, [notification_service_1.moduleName])
	    .service(exports.serviceName, ValidationService);


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var Validator = (function () {
	    function Validator(showError) {
	        this.showError = showError;
	        this.validationHandlers = {};
	        this.nextKey = 0;
	    }
	    Validator.prototype.validate = function () {
	        var _this = this;
	        var isValid = true;
	        _.each(this.validationHandlers, function (handler) {
	            var isActive = _this.isActive(handler);
	            if (isActive && !handler.validate()) {
	                isValid = false;
	                var error = _this.errorMessage(handler);
	                _this.showError(error);
	                return false;
	            }
	        });
	        return isValid;
	    };
	    Validator.prototype.getErrorCount = function () {
	        var _this = this;
	        return _.reduce(this.validationHandlers, function (count, handler) {
	            var isActive = _this.isActive(handler);
	            if (isActive && !handler.validate()) {
	                count++;
	            }
	            return count;
	        }, 0);
	    };
	    Validator.prototype.registerValidationHandler = function (handler) {
	        var _this = this;
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.validationHandlers[currentKey] = handler;
	        return function () {
	            _this.unregister(currentKey);
	        };
	    };
	    Validator.prototype.unregister = function (key) {
	        delete this.validationHandlers[key];
	    };
	    Validator.prototype.isActive = function (handler) {
	        return (_.isFunction(handler.isActive) && handler.isActive())
	            || handler.isActive == null
	            || handler.isActive === true;
	    };
	    Validator.prototype.errorMessage = function (handler) {
	        return _.isFunction(handler.errorMessage)
	            ? handler.errorMessage()
	            : handler.errorMessage;
	    };
	    return Validator;
	})();
	exports.Validator = Validator;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var validator_1 = __webpack_require__(54);
	var CompositeValidator = (function () {
	    function CompositeValidator(showError) {
	        this.showError = showError;
	        this.childValidators = {};
	        this.nextKey = 0;
	    }
	    CompositeValidator.prototype.validate = function () {
	        var isValid = true;
	        _.each(this.childValidators, function (handler) {
	            if (!handler.validate()) {
	                isValid = false;
	                return false;
	            }
	        });
	        return isValid;
	    };
	    CompositeValidator.prototype.getErrorCount = function () {
	        return _.reduce(this.childValidators, function (count, handler) {
	            return count += handler.getErrorCount();
	        }, 0);
	    };
	    CompositeValidator.prototype.buildChildValidator = function () {
	        var _this = this;
	        var validator = new validator_1.Validator(function (error) {
	            _this.showError(error);
	        });
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.childValidators[currentKey] = validator;
	        validator.key = currentKey;
	        return validator;
	    };
	    CompositeValidator.prototype.unregisterChild = function (validator) {
	        delete this.childValidators[validator.key];
	    };
	    return CompositeValidator;
	})();
	exports.CompositeValidator = CompositeValidator;


/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(13));
	__export(__webpack_require__(58));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var ItemList = (function () {
	    function ItemList() {
	    }
	    ItemList.prototype.setItems = function (items) {
	        this.items = items;
	    };
	    ItemList.prototype.get = function (value) {
	        var predicate;
	        if (typeof value === 'string') {
	            predicate = function (item) {
	                return (item.name === value);
	            };
	        }
	        else {
	            predicate = function (item) {
	                return (item.value === value);
	            };
	        }
	        return _.find(this.items, predicate);
	    };
	    ItemList.prototype.all = function () {
	        return this.items;
	    };
	    return ItemList;
	})();
	exports.ItemList = ItemList;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ0ZmZlN2IzYTZjMjBhODFlOTQiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvZmlsdGVycy9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9jb252ZXJ0ZXJzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZGF0ZUNvbnZlcnRlci9kYXRlQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvaXRlbUxpc3QudHMiXSwibmFtZXMiOlsic3RvcEV2ZW50UHJvcGFnYXRpb24iLCJzdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwiaXNFbXB0eSIsIk9iamVjdFV0aWxpdHkiLCJPYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwiT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwiT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJPYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwiT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsIk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJPYmplY3RVdGlsaXR5LnByb3BlcnR5TmFtZVRvU3RyaW5nIiwiQXJyYXlVdGlsaXR5IiwiQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwiQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwiQXJyYXlVdGlsaXR5LnJlbW92ZSIsIkFycmF5VXRpbGl0eS5yZXBsYWNlIiwiQXJyYXlVdGlsaXR5LnN1bSIsIkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJBcnJheVV0aWxpdHkubGFzdCIsIm1vbWVudFdyYXBwZXIiLCJUaW1lVXRpbGl0eSIsIlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwiVGltZVV0aWxpdHkuY29tcGFyZVRpbWVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsIkNvbXBhcmVSZXN1bHQiLCJnZXRDb21wYXJlUmVzdWx0IiwiRGF0ZVV0aWxpdHkiLCJEYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJEYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwiRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsIkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbkRheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyIsIkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsIkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwiRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nIiwiRGF0ZVV0aWxpdHkuaXNEYXRlIiwiRGF0ZVV0aWxpdHkuZ2V0Tm93IiwiRGF0ZVV0aWxpdHkuZm9ybWF0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldEZvcm1hdCIsIkRhdGVVdGlsaXR5LnNhbWVEYXRlIiwiRGF0ZVV0aWxpdHkuc2FtZURhdGVUaW1lIiwidHJ1bmNhdGUiLCJCb29sZWFuVXRpbGl0eSIsIkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwiQm9vbGVhblV0aWxpdHkudG9Cb29sIiwiQmFzZVJlc291cmNlQnVpbGRlciIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY29uc3RydWN0b3IiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmdldExpYnJhcnlTZXJ2aWNlcyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci51c2VNb2NrSWZOb0VuZHBvaW50IiwiQmFzZURhdGFTZXJ2aWNlIiwiQmFzZURhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlLmdldEl0ZW1FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZS5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlLmdldERldGFpbCIsIkJhc2VEYXRhU2VydmljZS5jcmVhdGUiLCJCYXNlRGF0YVNlcnZpY2UudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlLmRlbGV0ZSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmdldExpc3QiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRJdGVtIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZGVsZXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IubG9nIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuYXBwbHlUcmFuc2Zvcm0iLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5pc0NvbnZlcnRlciIsIkJhc2VEYXRhU2VydmljZVZpZXciLCJCYXNlRGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXciLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZSIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5nZXQiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UudXBkYXRlIiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSIsImJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY2hpbGRDb250cmFjdHMiLCJmcm9tU2VydmVyIiwidG9TZXJ2ZXIiLCJFbnVtQ29udmVydGVyIiwiRW51bUNvbnZlcnRlci5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeSIsIkNvbnRyYWN0TGlicmFyeS5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeS5mbHVzaCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXRMaXN0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXREZXRhaWwiLCJDb250cmFjdExpYnJhcnkubW9ja0NoaWxkIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2siLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1BhcmVudCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrU2luZ2xldG9uIiwiQ29udHJhY3RMaWJyYXJ5LnVwZGF0ZVJlc291cmNlIiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrU2F2ZSIsIkNvbnRyYWN0TGlicmFyeS5zaW5vbiIsIkh0dHBTdGF0dXNDb2RlIiwiRXJyb3JIYW5kbGVyU2VydmljZSIsIkVycm9ySGFuZGxlclNlcnZpY2UuY29uc3RydWN0b3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmh0dHBSZXNwb25zZUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5sb2dnZWRPdXRFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW52YWxpZFVybEVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS50aW1lb3V0RXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLnN5c3RlbUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIk5vdGlmaWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJOb3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmciLCJOb3RpZmljYXRpb25TZXJ2aWNlLmVycm9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwibm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIiwiQmFzZU5vdGlmaWVyIiwiQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwiQmFzZU5vdGlmaWVyLmluZm8iLCJCYXNlTm90aWZpZXIud2FybmluZyIsIkJhc2VOb3RpZmllci5lcnJvciIsIkJhc2VOb3RpZmllci5zdWNjZXNzIiwiQmFzZU5vdGlmaWVyLm5vdGlmeSIsIlNpZ24iLCJOdW1iZXJVdGlsaXR5IiwiTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsIk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwiTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwiTnVtYmVyVXRpbGl0eS5yb3VuZFRvU3RlcCIsIkZpbGVTaXplU2VydmljZSIsIkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsIkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwiZmlsZVNpemVGYWN0b3J5IiwiZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwiZmlsZVNpemVGaWx0ZXIiLCJHZW5lcmljU2VhcmNoRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5jb25zdHJ1Y3RvciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VyaWFsaXplIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJHZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsImdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwiZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJTdHJpbmdVdGlsaXR5U2VydmljZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UudG9OdW1iZXIiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnN1YnN0aXR1dGUiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5yZXBsYWNlQWxsIiwiR3VpZFNlcnZpY2UiLCJHdWlkU2VydmljZS5jb25zdHJ1Y3RvciIsIkd1aWRTZXJ2aWNlLnRpbWUiLCJHdWlkU2VydmljZS5yYW5kb20iLCJPYnNlcnZhYmxlU2VydmljZSIsIk9ic2VydmFibGVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiT2JzZXJ2YWJsZVNlcnZpY2UucmVnaXN0ZXIiLCJPYnNlcnZhYmxlU2VydmljZS5maXJlIiwiT2JzZXJ2YWJsZVNlcnZpY2UudW5yZWdpc3RlciIsIm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSIsIm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsIlByb21pc2VVdGlsaXR5IiwiUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJQcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJQcm9taXNlVXRpbGl0eS5yZXNvbHZlUHJvbWlzZXMiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UuZ2V0RGF0YSIsInN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSIsInN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS5nZXRJbnN0YW5jZSIsIk1vY2siLCJNb2NrLmNvbnN0cnVjdG9yIiwiTW9jay5zZXJ2aWNlIiwiTW9jay5wcm9taXNlIiwiTW9jay5wcm9taXNlV2l0aENhbGxiYWNrIiwiTW9jay5mbHVzaCIsIkFuZ3VsYXJGaXh0dXJlIiwiQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJBbmd1bGFyRml4dHVyZS5pbmplY3QiLCJBbmd1bGFyRml4dHVyZS5tb2NrIiwiQW5ndWxhckZpeHR1cmUuY29udHJvbGxlcldpdGhCaW5kaW5ncyIsIkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsIlZhbGlkYXRpb25TZXJ2aWNlIiwiVmFsaWRhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDdXN0b21WYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3IiLCJWYWxpZGF0b3IiLCJWYWxpZGF0b3IuY29uc3RydWN0b3IiLCJWYWxpZGF0b3IudmFsaWRhdGUiLCJWYWxpZGF0b3IuZ2V0RXJyb3JDb3VudCIsIlZhbGlkYXRvci5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyIiwiVmFsaWRhdG9yLnVucmVnaXN0ZXIiLCJWYWxpZGF0b3IuaXNBY3RpdmUiLCJWYWxpZGF0b3IuZXJyb3JNZXNzYWdlIiwiQ29tcG9zaXRlVmFsaWRhdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLmNvbnN0cnVjdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLnZhbGlkYXRlIiwiQ29tcG9zaXRlVmFsaWRhdG9yLmdldEVycm9yQ291bnQiLCJDb21wb3NpdGVWYWxpZGF0b3IuYnVpbGRDaGlsZFZhbGlkYXRvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci51bnJlZ2lzdGVyQ2hpbGQiLCJJdGVtTGlzdCIsIkl0ZW1MaXN0LmNvbnN0cnVjdG9yIiwiSXRlbUxpc3Quc2V0SXRlbXMiLCJJdGVtTGlzdC5nZXQiLCJJdGVtTGlzdC5hbGwiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLEtBQVksU0FBUyx1QkFBTSxDQUE4QixDQUFDO0FBS2pELGtCQUFTO0FBSmxCLEtBQVksT0FB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QUFZQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsS0FBS0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2pDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTthQUNkQSxDQUFDQTthQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtpQkFDOUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO3FCQUMvQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7aUJBQ2RBLENBQUNBO2FBQ0ZBLENBQUNBO1NBQ0ZBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQzdDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUNsREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLHdDQUF3Q0E7YUFDeENBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ25DQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFD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RUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDakdBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNyREEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN6REEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEs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QTtLQUU1RkQseUNBQU9BLEdBQVBBLFVBQVFBLE9BQW1DQTtTQUEzQ0UsaUJBaUJDQTtTQWhCR0EsSUFBSUEsT0FBc0NBLENBQUNBO1NBQzNDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNsQkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7U0FDbERBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ0pBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2tCQUNqRUEsSUFBSUEsQ0FBQ0EsVUFBQ0EsUUFBc0RBO2lCQUM3REEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDekJBLENBQUNBLENBQUNBLENBQUNBO1NBQ1BBLENBQUNBO1NBQ0RBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLElBQWlCQTthQUMzQ0EsSUFBSUEsR0FBR0EsS0FBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsRUFBRUEsS0FBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDL0NBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2lCQUN0QkEsS0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7YUFDakVBLENBQUNBO2FBQ0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2hCQSxDQUFDQSxDQUFDQTtLQUNOQSxDQUFDQTtLQUVERix5Q0FBT0EsR0FBUEEsVUFBUUEsT0FBbUNBO1NBQTNDRyxpQkFpQkNBO1NBaEJHQSxJQUFJQSxPQUFvQ0EsQ0FBQ0E7U0FDekNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2FBQ2xCQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtTQUNsREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7a0JBQ3JDQSxJQUFJQSxDQUFDQSxVQUFDQSxRQUFvREE7aUJBQzNEQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQzdEQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREgsd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q0ksaUJBbUJDQTtTQWxCR0EsSUFBSUEsT0FBb0NBLENBQUNBO1NBQ3pDQSxPQUFPQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUN2RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQzFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtTQUNqREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7a0JBQzVFQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFrREE7aUJBQ3pEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hFQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREosd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q0ssaUJBbUJDQTtTQWxCR0EsSUFBSUEsT0FBb0NBLENBQUNBO1NBQ3pDQSxPQUFPQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUN2RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBO2FBQzVDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtTQUNqREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0E7a0JBQzNEQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFrREE7aUJBQ3pEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hGQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREwsd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q00saUJBYUNBO1NBWkdBLElBQUlBLE9BQStCQSxDQUFDQTtTQUNwQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQzdDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtTQUM3QkEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBT0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDM0ZBLENBQUNBO1NBQ0RBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBO2FBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hGQSxDQUFDQTtTQUNMQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNQQSxDQUFDQTtLQUVPTixxQ0FBR0EsR0FBWEEsVUFBWUEsV0FBbUJBLEVBQUVBLElBQVNBLEVBQUVBLFFBQWdCQSxFQUFFQSxPQUFnQkE7U0FDMUVPLElBQUlBLFVBQVVBLEdBQUdBLE9BQU9BLEdBQUdBLFNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO1NBQzFDQSxJQUFJQSxjQUFjQSxHQUFHQSxRQUFRQSxJQUFJQSxJQUFJQSxHQUFHQSxhQUFhQSxHQUFHQSxRQUFRQSxDQUFDQTtTQUNqRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsV0FBV0EsR0FBR0EsZ0JBQWdCQSxHQUFHQSxjQUFjQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtTQUNoRkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0tBRURQLGdEQUFjQSxHQUFkQSxVQUFlQSxJQUFTQSxFQUFFQSxTQUErREEsRUFBRUEsUUFBaUJBO1NBQTVHUSxpQkFzQkNBO1NBckJIQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7U0FDYkEsQ0FBQ0E7U0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDckJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLElBQVNBLElBQVlBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ3BHQSxDQUFDQTtTQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNqQ0EsSUFBSUEsYUFBYUEsR0FBeUJBLFFBQVFBO21CQUM3QkEsU0FBVUEsQ0FBQ0EsUUFBUUE7bUJBQ25CQSxTQUFVQSxDQUFDQSxVQUFVQSxDQUFDQTthQUMzQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDNUJBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLE1BQU1BLENBQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLElBQVNBLEVBQUVBLEdBQVdBO2lCQUNwREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQzNCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtpQkFDNURBLENBQUNBO2lCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUNiQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNKQSxDQUFDQTtLQUNDQSxDQUFDQTtLQUVJUiw2Q0FBV0EsR0FBbkJBLFVBQW9CQSxNQUFXQTtTQUM5QlMsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUNuQ0EsQ0FBQ0E7S0FDRlQsOEJBQUNBO0FBQURBLEVBQUNBLElBQUE7QUF2SVksZ0NBQXVCLDBCQXVJbkM7Ozs7Ozs7QUN2TEQsYUFBWSxDQUFDOzs7Ozs7QUFLYiw4Q0FBcUUsRUFBb0IsQ0FBQztBQUMxRixvREFBOEQsRUFBaUQsQ0FBQztBQUNoSCx1REFBb0UsRUFBdUQsQ0FBQztBQUM1SCw2REFBZ0YsRUFBbUUsQ0FBQztBQVdwSjtLQUNTVSx1Q0FBeUNBO0tBRTlDQSw2QkFBb0JBLEtBQTJCQSxFQUM3QkEsRUFBcUJBLEVBQzdCQSxLQUFvQkEsRUFDcEJBLFNBQWlCQSxFQUNqQkEsUUFBcUJBLEVBQ2JBLFNBQXVFQSxFQUMvRUEsT0FBZ0JBLEVBQ2hCQSxXQUFvQkE7U0FDaENDLGtCQUFNQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQVJ4REEsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBc0JBO1NBQzdCQSxPQUFFQSxHQUFGQSxFQUFFQSxDQUFtQkE7U0FJckJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQThEQTtLQUk1RkEsQ0FBQ0E7S0FFREQseUNBQVdBLEdBQVhBLFVBQVlBLFFBQWdCQTtTQUMzQkUsSUFBSUEsUUFBUUEsR0FBY0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsSUFBZUE7YUFDL0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBO1NBQzdCQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNIQSxNQUFNQSxDQUFDQSxJQUFJQSxvREFBd0JBLENBQVlBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0tBQzlJQSxDQUFDQTtLQUNGRiwwQkFBQ0E7QUFBREEsRUFBQ0EsRUFuQlEsa0NBQWUsRUFtQnZCO0FBcEJZLDRCQUFtQixzQkFvQi9CO0FBRUQ7S0FDU0csNkNBQXdFQTtLQUU3RUEsbUNBQW9CQSxLQUEyQkEsRUFDN0JBLEVBQXFCQSxFQUM3QkEsS0FBb0JBLEVBQ3BCQSxTQUFpQkEsRUFDakJBLFFBQXFCQSxFQUM5QkEseUJBQXdEQSxFQUN2Q0EsU0FBdUVBLEVBQy9FQSxPQUFnQkEsRUFDaEJBLFdBQW9CQTtTQUNoQ0Msa0JBQU1BLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLEVBQUVBLHlCQUF5QkEsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FUbkZBLFVBQUtBLEdBQUxBLEtBQUtBLENBQXNCQTtTQUM3QkEsT0FBRUEsR0FBRkEsRUFBRUEsQ0FBbUJBO1NBS3JCQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUE4REE7S0FJNUZBLENBQUNBO0tBRURELCtDQUFXQSxHQUFYQSxVQUFZQSxRQUFnQkE7U0FDM0JFLElBQUlBLFFBQVFBLEdBQWNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFVBQUNBLElBQWVBO2FBQy9EQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQTtTQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0VBQThCQSxDQUFxQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUN2TkEsQ0FBQ0E7S0FDRkYsZ0NBQUNBO0FBQURBLEVBQUNBLEVBcEJRLDhDQUFxQixFQW9CN0I7QUFyQlksa0NBQXlCLDRCQXFCckM7Ozs7Ozs7Ozs7OztBQzdERCxLQUFZLENBQUMsdUJBQU0sQ0FBUSxDQUFDO0FBSzVCLDhDQUFxRSxFQUFxQyxDQUFDO0FBUzNHO0tBQ1NHLHlDQUF5Q0E7S0FDakRBLCtCQUFZQSxLQUFzQkEsRUFBRUEsRUFBZ0JBLEVBQUVBLEtBQW9CQSxFQUFFQSxRQUFnQkEsRUFBRUEsUUFBcUJBLEVBQ3pHQSx5QkFBMERBLEVBQ2pFQSxTQUF3RUEsRUFDeEVBLE9BQWlCQSxFQUNYQSxXQUFxQkE7U0FDN0JDLGtCQUFNQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUpwRUEsOEJBQXlCQSxHQUF6QkEseUJBQXlCQSxDQUFpQ0E7S0FLcEVBLENBQUNBO0tBRURELDhDQUFjQSxHQUFkQSxVQUFlQSxFQUFXQTtTQUExQkUsaUJBc0JDQTtTQXJCQUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkJBLElBQUlBLFVBQVVBLEdBQTRCQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO2FBQzNFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxVQUFDQSxXQUFnQkE7aUJBQ25DQSxXQUFXQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQTthQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDSEEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7U0FDbkJBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLElBQUlBLFVBQVVBLEdBQTJCQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO2FBQzFFQSxNQUFNQSxDQUFNQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxFQUFFQSxVQUFDQSxXQUEyREE7aUJBQy9GQSxJQUFJQSxRQUFhQSxDQUFDQTtpQkFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3FCQUMzQ0EsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7aUJBQ3hDQSxDQUFDQTtpQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7cUJBQ1BBLFFBQVFBLEdBQUdBLFdBQVdBLENBQUNBO2lCQUN4QkEsQ0FBQ0E7aUJBRURBLFFBQVFBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBO2lCQUVqRUEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7YUFDakJBLENBQUNBLENBQUNBLENBQUNBO1NBQ0pBLENBQUNBO0tBQ0ZBLENBQUNBO0tBQ0ZGLDRCQUFDQTtBQUFEQSxFQUFDQSxFQWhDUSxrQ0FBZSxFQWdDdkI7QUFqQ1ksOEJBQXFCLHdCQWlDakM7Ozs7Ozs7QUNoREQsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUNuQyxLQUFZLENBQUMsdUJBQU0sQ0FBUSxDQUFDO0FBRTVCLHFEQUE4RSxFQUE0QixDQUFDO0FBRWhHLG1CQUFVLEdBQVcsZ0RBQWdELENBQUM7QUFDdEUsb0JBQVcsR0FBVywwQkFBMEIsQ0FBQztBQVU1RDtLQUdJRyxrQ0FBWUEsS0FBMkJBLEVBQzdCQSxFQUFxQkEsRUFDZEEsUUFBZ0JBLEVBQ2ZBLFFBQW1CQSxFQUMzQkEsU0FBdUVBLEVBQ2hFQSxPQUFnQkEsRUFDaEJBLFdBQW9CQTtTQUpwQkMsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBUUE7U0FDZkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBV0E7U0FFcEJBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVNBO1NBQ2hCQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBU0E7U0FDdkNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLGlEQUF1QkEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7S0FDaEVBLENBQUNBO0tBRURELHNDQUFHQSxHQUFIQTtTQUFBRSxpQkFPQ0E7U0FOR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDekJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO2FBQ3ZCQSxXQUFXQSxFQUFFQSxjQUFtQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkRBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREYseUNBQU1BLEdBQU5BLFVBQU9BLFlBQXVCQTtTQUE5QkcsaUJBVUNBO1NBVEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2FBQ3hCQSxZQUFZQSxFQUFFQSxZQUFZQTthQUMxQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7YUFDdkJBLGNBQWNBLEVBQUVBLFVBQUNBLElBQWVBO2lCQUM1QkEsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBY0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0E7YUFDckVBLENBQUNBO2FBQ0RBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FDTEgsK0JBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFqQ1ksaUNBQXdCLDJCQWlDcEM7QUFNRCxnQ0FBK0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsMENBQWdELEtBQTJCLEVBQUUsRUFBcUI7S0FDOUZJLE1BQU1BLENBQUNBO1NBQ0hBLFdBQVdBLFlBQVlBLFFBQWdCQSxFQUFFQSxRQUFvQkEsRUFBRUEsU0FBOEVBLEVBQUVBLE9BQWlCQSxFQUFFQSxXQUFxQkE7YUFDbkxDLE1BQU1BLENBQUNBLElBQUlBLHdCQUF3QkEsQ0FBWUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FDbkhBLENBQUNBO01BQ0pELENBQUNBO0FBQ05BLEVBQUNBO0FBTmUsd0NBQStCLGtDQU05QztBQUVELFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7TUFDekIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDaEUzRCx1REFBb0UsRUFBdUQsQ0FBQztBQVM1SDtLQUNTRSxrREFBbUNBO0tBQzNDQSx3Q0FBWUEsS0FBc0JBLEVBQUVBLEVBQWdCQSxFQUFFQSxRQUFnQkEsRUFBRUEsUUFBbUJBLEVBQ2hGQSx5QkFBMERBLEVBQ2xFQSxTQUF3RUEsRUFDeEVBLE9BQWlCQSxFQUNqQkEsV0FBcUJBLEVBQ2JBLFFBQWlCQTtTQUMzQkMsa0JBQU1BLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1NBTDVEQSw4QkFBeUJBLEdBQXpCQSx5QkFBeUJBLENBQWlDQTtTQUkxREEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBU0E7S0FFNUJBLENBQUNBO0tBRURELHVEQUFjQSxHQUFkQTtTQUFBRSxpQkFjQ0E7U0FiQUEsSUFBSUEsVUFBVUEsR0FBMkJBLElBQUlBLENBQUNBLHlCQUF5QkEsRUFBRUEsQ0FBQ0E7U0FDMUVBLE1BQU1BLENBQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQVVBLEVBQUVBLFVBQUNBLFdBQWlEQTthQUNyRkEsSUFBSUEsUUFBYUEsQ0FBQ0E7YUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUMzQ0EsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7YUFDbkRBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQTthQUN4QkEsQ0FBQ0E7YUFFREEsUUFBUUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7YUFFdERBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1NBQ2pCQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNKQSxDQUFDQTtLQUNGRixxQ0FBQ0E7QUFBREEsRUFBQ0EsRUF6QlEsb0RBQXdCLEVBeUJoQztBQTFCWSx1Q0FBOEIsaUNBMEIxQzs7Ozs7OztBQ3RDRCxhQUFZLENBQUM7Ozs7QUFFYiw4QkFBYyxFQUErQixDQUFDO0FBQzlDLDhCQUFjLEVBQStCLENBQUM7Ozs7Ozs7QUNIOUMsYUFBWSxDQUFDO0FBRWIsS0FBWSxNQUFNLHVCQUFNLEVBQVEsQ0FBQztBQUdqQyx5Q0FBNEMsQ0FBMkIsQ0FBQztBQUU3RCxzQkFBYSxHQUFxQjtLQUM1QyxVQUFVLFlBQUMsR0FBVztTQUNyQkcsTUFBTUEsQ0FBQ0EseUJBQVdBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7S0FDOUNBLENBQUNBO0tBQ0QsUUFBUSxZQUFDLElBQVU7U0FDbEJDLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLDRCQUFjQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtLQUN0REEsQ0FBQ0E7RUFDRCxDQUFDOzs7Ozs7O0FDZEYsYUFBWSxDQUFDO0FBU2I7S0FDQ0MsdUJBQW9CQSxRQUE4QkE7U0FEbkRDLGlCQVdDQTtTQVZvQkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBc0JBO1NBRWxEQSxlQUFVQSxHQUFpQ0EsVUFBQ0EsR0FBV0E7YUFDdERBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1NBQy9CQSxDQUFDQTtTQUNEQSxhQUFRQSxHQUFrQ0EsVUFBQ0EsSUFBZUE7YUFDekRBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLElBQUlBO21CQUNoQkEsSUFBSUEsQ0FBQ0EsS0FBS0E7bUJBQ1ZBLElBQUlBLENBQUNBO1NBQ1RBLENBQUNBO0tBVG9EQSxDQUFDQTtLQVV2REQsb0JBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFYWSxzQkFBYSxnQkFXekI7QUFBQSxFQUFDOzs7Ozs7O0FDcEJGLGlFQUFnRTtBQUVoRSxhQUFZLENBQUM7Ozs7Ozs7QUNGYixpRUFBZ0U7QUFFaEUsYUFBWSxDQUFDO0FBR2IsS0FBWSxDQUFDLHVCQUFNLENBQVEsQ0FBQztBQXlCNUI7S0FJQ0UseUJBQW9CQSxPQUE2QkE7U0FBN0JDLFlBQU9BLEdBQVBBLE9BQU9BLENBQXNCQTtTQUNoREEsSUFBSUEsUUFBUUEsR0FBMkNBLE9BQVFBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7U0FDckZBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBO1NBQ3RCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQTtLQUN2Q0EsQ0FBQ0E7S0FFREQsK0JBQUtBLEdBQUxBO1NBQ0NFLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0tBQzNCQSxDQUFDQTtLQUNERixpQ0FBT0EsR0FBUEEsVUFBUUEsUUFBYUEsRUFBRUEsSUFBU0E7U0FDL0JHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0tBQ2hEQSxDQUFDQTtLQUVESCxxQ0FBV0EsR0FBWEEsVUFBWUEsUUFBYUEsRUFBRUEsSUFBU0E7U0FDbkNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0tBQ3BEQSxDQUFDQTtLQUVESix1Q0FBYUEsR0FBYkEsVUFBY0EsUUFBYUEsRUFBRUEsSUFBU0E7U0FDckNLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0tBQ3REQSxDQUFDQTtLQUVETCxtQ0FBU0EsR0FBVEEsVUFBVUEsTUFBV0EsRUFBRUEsWUFBdUNBO1NBQzdETSxJQUFJQSxXQUFXQSxHQUF3QkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7U0FDMUVBLE1BQU1BLENBQUNBLGNBQWNBLEdBQUdBLFVBQUNBLEVBQVVBO2FBQ2xDQSxJQUFJQSxRQUFRQSxHQUFRQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTthQUNwQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7YUFDdkJBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1NBQ2pCQSxDQUFDQTtLQUNGQSxDQUFDQTtLQUVETixvQ0FBVUEsR0FBVkEsVUFBV0EsUUFBY0E7U0FBekJPLGlCQVFDQTtTQVBBQSxJQUFJQSxXQUFXQSxHQUF3Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsY0FBY0EsQ0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7U0FDakdBLFdBQVdBLENBQUNBLFdBQVdBLEdBQUdBLFVBQUNBLElBQVdBLElBQXVCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUN0SEEsV0FBV0EsQ0FBQ0EsYUFBYUEsR0FBR0EsVUFBQ0EsSUFBU0EsSUFBdUJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xIQSxXQUFXQSxDQUFDQSxVQUFVQSxHQUFHQSxjQUF3QkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDcEdBLFdBQVdBLENBQUNBLFVBQVVBLEdBQUdBLGNBQXdCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNwR0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsV0FBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDekRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0tBQ3BCQSxDQUFDQTtLQUVEUCwwQ0FBZ0JBLEdBQWhCQSxVQUFpQkEsUUFBY0E7U0FBL0JRLGlCQVlDQTtTQVhBQSxJQUFJQSxXQUFXQSxHQUFRQSxRQUFRQSxJQUFJQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQSx5QkFBeUJBLEdBQUdBLGNBQWFBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ3pHQSxJQUFJQSxXQUFXQSxHQUFtREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esb0JBQW9CQSxDQUFnQkE7YUFDbEhBLHlCQUF5QkEsRUFBRUEsV0FBV0E7VUFDdENBLENBQUNBLENBQUNBO1NBQ0hBLFdBQVdBLENBQUNBLFdBQVdBLEdBQUdBLFVBQUNBLElBQVdBLElBQXVCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUN0SEEsV0FBV0EsQ0FBQ0EsYUFBYUEsR0FBR0EsVUFBQ0EsSUFBU0EsSUFBdUJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xIQSxXQUFXQSxDQUFDQSxTQUFTQSxHQUFHQSxVQUFDQSxZQUF1Q0EsSUFBYUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDaklBLFdBQVdBLENBQUNBLFVBQVVBLEdBQUdBLGNBQXdCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNwR0EsV0FBV0EsQ0FBQ0EsVUFBVUEsR0FBR0EsY0FBd0JBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ3BHQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtTQUN6REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7S0FDcEJBLENBQUNBO0tBRURSLDZDQUFtQkEsR0FBbkJBLFVBQW9CQSxRQUFjQTtTQUFsQ1MsaUJBTUNBO1NBTEFBLElBQUlBLFdBQVdBLEdBQTRDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSx1QkFBdUJBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1NBQ3BHQSxXQUFXQSxDQUFDQSxPQUFPQSxHQUFHQSxVQUFDQSxJQUFTQSxJQUF1QkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsV0FBV0EsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDNUdBLFdBQVdBLENBQUNBLFVBQVVBLEdBQUdBLGNBQXdCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNwR0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsV0FBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDekRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0tBQ3BCQSxDQUFDQTtLQUVPVCx3Q0FBY0EsR0FBdEJBLFVBQXVCQSxXQUFnQkEsRUFBRUEsUUFBY0E7U0FDdERVLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ3RCQSxXQUFXQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUMvQ0EsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7S0FDcEJBLENBQUNBO0tBRU9WLHFDQUFXQSxHQUFuQkEsVUFBb0JBLFFBQWFBLEVBQUVBLFVBQWtCQSxFQUFFQSxJQUFTQTtTQUFoRVcsaUJBTUNBO1NBTEFBLElBQUlBLElBQUlBLEdBQW1CQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQTthQUN6Q0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDM0JBLENBQUNBLENBQUNBLENBQUNBO1NBQ0hBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1NBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtLQUNiQSxDQUFDQTtLQUVPWCxzQ0FBWUEsR0FBcEJBLFVBQXFCQSxRQUFhQSxFQUFFQSxVQUFrQkE7U0FBdERZLGlCQU1DQTtTQUxBQSxJQUFJQSxJQUFJQSxHQUFtQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQ0EsSUFBU0E7YUFDbkRBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1NBQzNCQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNIQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtTQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7S0FDYkEsQ0FBQ0E7S0FFRFosc0JBQVlBLGtDQUFLQTtjQUFqQkE7YUFDQ2EsTUFBTUEsQ0FBQ0EsS0FBS0EsSUFBU0EsRUFBRUEsR0FBR0EsRUFBRUEsVUFBQ0EsSUFBU0EsSUFBWUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7U0FDcEVBLENBQUNBOzs7UUFBQWI7S0FDRkEsc0JBQUNBO0FBQURBLEVBQUNBLElBQUE7QUE1Rlksd0JBQWUsa0JBNEYzQjs7Ozs7OztBQzFIRCxhQUFZLENBQUM7QUFJYixrREFJTyxFQUFzQyxDQUFDO0FBRW5DLG1CQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsb0JBQVcsR0FBVyxjQUFjLENBQUM7QUFFaEQsWUFBWSxjQUFjO0tBQ3pCYyxxRUFBa0JBO0tBQ2xCQSwrREFBZUE7S0FDZkEsaUVBQWdCQTtLQUNoQkEsMkRBQWFBO0tBQ2JBLG1GQUF5QkE7QUFDMUJBLEVBQUNBLEVBTlcsc0JBQWMsS0FBZCxzQkFBYyxRQU16QjtBQU5ELEtBQVksY0FBYyxHQUFkLHNCQU1YO0FBa0JEO0tBQ0NDLDZCQUFvQkEsT0FBMEJBLEVBQ3pCQSxZQUFrQ0EsRUFDbENBLFFBQWdCQSxFQUNoQkEsYUFBNkJBO1NBSDlCQyxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7U0FDekJBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFzQkE7U0FDbENBLGFBQVFBLEdBQVJBLFFBQVFBLENBQVFBO1NBQ2hCQSxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBZ0JBO0tBQUlBLENBQUNBO0tBRXZERCwrQ0FBaUJBLEdBQWpCQSxVQUFrQkEsU0FBcUJBO1NBQ3RDRSxNQUFNQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTthQUMxQkEsS0FBS0EsY0FBY0EsQ0FBQ0EsWUFBWUE7aUJBQy9CQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtpQkFDdEJBLEtBQUtBLENBQUNBO2FBQ1BBLEtBQUtBLGNBQWNBLENBQUNBLFNBQVNBO2lCQUM1QkEsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxFQUFFQSxDQUFDQTtpQkFDcENBLEtBQUtBLENBQUNBO2FBQ1BBLEtBQUtBLGNBQWNBLENBQUNBLFVBQVVBO2lCQUM3QkEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7aUJBQ3ZCQSxLQUFLQSxDQUFDQTthQUNQQSxLQUFLQSxjQUFjQSxDQUFDQSxPQUFPQTtpQkFDMUJBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLENBQUNBO2lCQUNwQkEsS0FBS0EsQ0FBQ0E7YUFDUEEsS0FBS0EsY0FBY0EsQ0FBQ0EsbUJBQW1CQTtpQkFDdENBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO2lCQUNuQkEsS0FBS0EsQ0FBQ0E7YUFDUEE7aUJBQ0NBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2lCQUMvQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7aUJBQzdDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQTtpQkFDeENBLEtBQUtBLENBQUNBO1NBQ1JBLENBQUNBO0tBQ0ZBLENBQUNBO0tBRU9GLDRDQUFjQSxHQUF0QkE7U0FDQ0csSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsR0FBUUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7S0FDNUNBLENBQUNBO0tBRU9ILDBEQUE0QkEsR0FBcENBO1NBQ0NJLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO0tBQzVEQSxDQUFDQTtLQUVPSiw2Q0FBZUEsR0FBdkJBO1NBQ0NLLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO0tBQzdEQSxDQUFDQTtLQUVPTCwwQ0FBWUEsR0FBcEJBO1NBQ0NNLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO1NBQ3pEQSxRQUFRQTtLQUNUQSxDQUFDQTtLQUVPTix5Q0FBV0EsR0FBbkJBO1NBQ0NPLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7S0FDakVBLENBQUNBO0tBQ0ZQLDBCQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBbkRZLDRCQUFtQixzQkFtRC9CO0FBU0Q7S0FJSVE7U0FKSkMsaUJBcUJDQTtTQUpHQSxTQUFJQSxHQUFRQSxVQUFDQSxPQUEwQkEsRUFDN0JBLFlBQWtDQTthQUN4Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxPQUFPQSxFQUFFQSxZQUFZQSxFQUFFQSxLQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtTQUM3RkEsQ0FBQ0E7U0FmR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7U0FDekJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO2FBQ2pCQSxjQUFjQSxFQUFFQSwwREFBMERBO2FBQzFFQSxlQUFlQSxFQUFFQSxnREFBZ0RBO2FBQ2pFQSxZQUFZQSxFQUFFQSwyRkFBMkZBO2FBQ3pHQSxtQkFBbUJBLEVBQUVBLGtFQUFrRUE7aUJBQ3ZGQSxzRUFBc0VBO2FBQ3RFQSxZQUFZQSxFQUFFQSw4QkFBOEJBO1VBQy9DQSxDQUFDQTtTQUNGQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxTQUFTQSxFQUFFQSxrQ0FBdUJBLENBQUNBLENBQUNBO0tBQzdEQSxDQUFDQTtLQU1MRCxrQ0FBQ0E7QUFBREEsRUFBQ0EsSUFBQTtBQUVELFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLGlDQUFzQixDQUFDLENBQUM7TUFDbEQsUUFBUSxDQUFDLG1CQUFXLEVBQUUsSUFBSSwyQkFBMkIsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7QUN6SDNELGFBQVksQ0FBQzs7OztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFHbkMsMENBQTZCLEVBQWdCLENBQUM7QUFFOUMsOEJBQWMsRUFBcUIsQ0FBQztBQUV6QixtQkFBVSxHQUFXLG9DQUFvQyxDQUFDO0FBQzFELG9CQUFXLEdBQVcsY0FBYyxDQUFDO0FBU2hEO0tBQ0NFLDZCQUFvQkEsUUFBbUJBO1NBQW5CQyxhQUFRQSxHQUFSQSxRQUFRQSxDQUFXQTtLQUFHQSxDQUFDQTtLQUUzQ0Qsa0NBQUlBLEdBQUpBLFVBQUtBLE9BQWVBO1NBQ25CRSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUM3QkEsQ0FBQ0E7S0FFREYscUNBQU9BLEdBQVBBLFVBQVFBLE9BQWVBO1NBQ3RCRyxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUNoQ0EsQ0FBQ0E7S0FFREgsbUNBQUtBLEdBQUxBLFVBQU1BLE9BQWVBO1NBQ3BCSSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUM5QkEsQ0FBQ0E7S0FFREoscUNBQU9BLEdBQVBBLFVBQVFBLE9BQWVBO1NBQ3RCSyxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUNoQ0EsQ0FBQ0E7S0FDRkwsMEJBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFsQlksNEJBQW1CLHNCQWtCL0I7QUFXRDtLQUNDTSxZQUFZQSxDQUFDQTtLQURkQSxpQkFjQ0E7S0FYQUEsSUFBSUEsUUFBUUEsR0FBeUNBO1NBQ3BEQSxRQUFRQSxFQUFFQSxJQUFJQSwyQkFBWUEsRUFBRUE7U0FDNUJBLFdBQVdBLEVBQUVBLFVBQUNBLFFBQW1CQTthQUNoQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7U0FDMUJBLENBQUNBO1NBQ0RBLElBQUlBLEVBQUVBO2FBQ0xBLE1BQU1BLENBQUNBLElBQUlBLG1CQUFtQkEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDL0NBLENBQUNBO01BQ0RBLENBQUNBO0tBRUZBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO0FBQ2pCQSxFQUFDQTtBQWRlLG9DQUEyQiw4QkFjMUM7QUFFRCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO01BQzVCLFFBQVEsQ0FBQyxtQkFBVyxFQUFFLDJCQUEyQixDQUFDLENBQUM7Ozs7Ozs7QUNqRXJELGFBQVksQ0FBQztBQUliO0tBQUFDO0tBcUJBQyxDQUFDQTtLQXBCQUQsMkJBQUlBLEdBQUpBLFVBQUtBLE9BQWVBO1NBQ25CRSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUN0QkEsQ0FBQ0E7S0FFREYsOEJBQU9BLEdBQVBBLFVBQVFBLE9BQWVBO1NBQ3RCRyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUN0QkEsQ0FBQ0E7S0FFREgsNEJBQUtBLEdBQUxBLFVBQU1BLE9BQWVBO1NBQ3BCSSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUN0QkEsQ0FBQ0E7S0FFREosOEJBQU9BLEdBQVBBLFVBQVFBLE9BQWVBO1NBQ3RCSyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtLQUN0QkEsQ0FBQ0E7S0FFT0wsNkJBQU1BLEdBQWRBLFVBQWVBLE9BQWVBO1NBQzdCTSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUN0QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0tBQ0ZOLG1CQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBckJZLHFCQUFZLGVBcUJ4Qjs7Ozs7OztBQ3pCRCxhQUFZLENBQUM7Ozs7Ozs7QUNBYixhQUFZLENBQUM7Ozs7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLDRDQUErQyxFQUEwQixDQUFDO0FBQzFFLDhDQUE2QyxFQUFvQixDQUFDO0FBQ2xFLDRDQUFpRCxFQUFrQixDQUFDO0FBRXBFLDhCQUFjLEVBQW9CLENBQUM7QUFDbkMsOEJBQWMsRUFBa0IsQ0FBQztBQUV0QixtQkFBVSxHQUFXLGdDQUFnQyxDQUFDO0FBRWpFLFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDJCQUFnQixDQUFDLENBQUM7TUFDNUMsT0FBTyxDQUFDLDhCQUFXLEVBQUUsa0NBQWUsQ0FBQztNQUNyQyxNQUFNLENBQUMsaUNBQWdCLEVBQUUsK0JBQWMsQ0FBQyxDQUFDOzs7Ozs7O0FDZjNDLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFeEIsbUJBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUNwRCxvQkFBVyxHQUFXLGVBQWUsQ0FBQztBQUVqRCxLQUFLLElBR0o7QUFIRCxZQUFLLElBQUk7S0FDUk8sdUNBQVlBO0tBQ1pBLHdDQUFhQTtBQUNkQSxFQUFDQSxFQUhJLElBQUksS0FBSixJQUFJLFFBR1I7QUFRRDtLQUFBQztLQXVCQUMsQ0FBQ0E7S0F0QkFELG9DQUFZQSxHQUFaQSxVQUFhQSxHQUFXQSxFQUFFQSxRQUFnQkE7U0FDekNFLElBQUlBLElBQUlBLEdBQVNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1NBQzFEQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFTQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUN2R0EsQ0FBQ0E7S0FFREYscUNBQWFBLEdBQWJBLFVBQWNBLFFBQWdCQSxFQUFFQSxPQUFlQTtTQUM5Q0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7S0FDdkNBLENBQUNBO0tBRURILG1DQUFXQSxHQUFYQSxVQUFZQSxHQUFXQSxFQUFFQSxJQUFZQTtTQUNwQ0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDWEEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FDWkEsQ0FBQ0E7U0FFREEsSUFBSUEsU0FBU0EsR0FBV0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7U0FFbkNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQzNCQSxNQUFNQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQTtTQUNqQ0EsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDUEEsTUFBTUEsQ0FBQ0EsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0E7U0FDeEJBLENBQUNBO0tBQ0ZBLENBQUNBO0tBQ0ZKLG9CQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBRUQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztNQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7OztBQzVDdEMsYUFBWSxDQUFDO0FBRWIsNENBQWlFLEVBQTBCLENBQUM7QUFFakYsb0JBQVcsR0FBVyxpQkFBaUIsQ0FBQztBQU1uRDtLQWdCQ0sseUJBQVlBLGFBQTZCQSxFQUFFQSxLQUFhQTtTQWZ4REMsaUJBQVlBLEdBQVdBLFVBQVVBLENBQUNBO1NBQ2xDQSxpQkFBWUEsR0FBV0EsT0FBT0EsQ0FBQ0E7U0FDL0JBLGlCQUFZQSxHQUFXQSxJQUFJQSxDQUFDQTtTQWMzQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7U0FFbkJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2FBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTthQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7YUFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xEQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTthQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtpQkFDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2lCQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbERBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtpQkFFbEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO3FCQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7cUJBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtxQkFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2lCQUNsREEsQ0FBQ0E7aUJBQUNBLElBQUlBLENBQUNBLENBQUNBO3FCQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtpQkFDbkJBLENBQUNBO2FBQ0ZBLENBQUNBO1NBQ0ZBLENBQUNBO1NBRURBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0tBQ3JDQSxD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ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJvdXRwdXRcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGZkNGZmZTdiM2E2YzIwYTgxZTk0XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGJlaGF2aW9ycyBmcm9tICcuL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMvdHlwZXMubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7IGJlaGF2aW9ycywgZmlsdGVycywgc2VydmljZXMsIHR5cGVzIH07XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdGJlaGF2aW9ycy5uYW1lLFxyXG5cdGZpbHRlcnMubmFtZSxcclxuXHRzZXJ2aWNlcy5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdXRpbGl0aWVzLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJhbmd1bGFyXCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgc3RvcEV2ZW50UHJvcG9nYXRpb24gZnJvbSAnLi9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5leHBvcnQgeyBzdG9wRXZlbnRQcm9wb2dhdGlvbiB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0c3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5leHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBhbmd1bGFyLklBdHRyaWJ1dGVzIHtcclxuXHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IGFuZ3VsYXIuSURpcmVjdGl2ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0bGluayhzY29wZTogYW5ndWxhci5JU2NvcGVcclxuXHRcdFx0LCBlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnlcclxuXHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgaXNFbXB0eSBmcm9tICcuL2lzRW1wdHkvaXNFbXB0eSc7XHJcbmltcG9ydCAqIGFzIHRydW5jYXRlIGZyb20gJy4vdHJ1bmNhdGUvdHJ1bmNhdGUnO1xyXG5cclxuZXhwb3J0IHsgaXNFbXB0eSwgdHJ1bmNhdGUgfTtcclxuZXhwb3J0ICogZnJvbSAnLi9maWx0ZXInO1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG5cdG1vZHVsZU5hbWUgYXMgb2JqZWN0TW9kdWxlTmFtZVxyXG59IGZyb20gJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2lzRW1wdHknO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJc0VtcHR5RmlsdGVyIHtcclxuXHQoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuO1xyXG59XHJcblxyXG5pc0VtcHR5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdDogSU9iamVjdFV0aWxpdHkpOiBJSXNFbXB0eUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuID0+IHtcclxuXHRcdHZhciBpc0VtcHR5OiBib29sZWFuID0gb2JqZWN0LmlzTnVsbE9yRW1wdHkoaW5wdXQpO1xyXG5cclxuXHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gIWlzRW1wdHk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0TW9kdWxlTmFtZV0pXHJcblx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsXHJcblx0bW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUsXHJcblx0SUFycmF5VXRpbGl0eVxyXG59IGZyb20gJy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgX19kYXRlVXRpbGl0eSBmcm9tICcuLi9kYXRlL2RhdGUubW9kdWxlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0cHJvcGVydHlOYW1lVG9TdHJpbmcocHJvcGVydHlGdW5jdGlvbjogKCkgPT4gYW55KTogc3RyaW5nO1xyXG5cclxufVxyXG5cclxuY2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXlTZXJ2aWNlTmFtZSwgX19kYXRlVXRpbGl0eS5zZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogSUFycmF5VXRpbGl0eSwgcHJpdmF0ZSBkYXRlVXRpbGl0eTogX19kYXRlVXRpbGl0eS5JRGF0ZVV0aWxpdHkpIHtcclxuXHR9XHJcblxyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uc29tZShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG5cdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcblx0fVxyXG5cclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0dmFyIHR5cGUxOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMTtcclxuXHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoXy5pc0RhdGUob2JqMSkgJiYgXy5pc0RhdGUob2JqMikpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGF0ZVV0aWxpdHkuc2FtZURhdGVUaW1lKG9iajEsIG9iajIpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG5cdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcblx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRpZiAoXy5zb21lKGtleXMyKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdHJldHVybiBvYmoxID09PSBvYmoyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdH1cclxuXHJcblx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3BlcnR5TmFtZVRvU3RyaW5nKHByb3BlcnR5RnVuY3Rpb246ICgpID0+IGFueSk6IHN0cmluZyB7XHJcblx0XHRsZXQgc3RyaW5nVmFsdWUgPSBwcm9wZXJ0eUZ1bmN0aW9uLnRvU3RyaW5nKCk7XHJcblx0XHRsZXQgcmVnRXhwTGl0ZXJhbCA9IC9cXC4oW15cXC47XSspOz9cXHMqXFx9JC87XHJcblx0XHRsZXQgcHJvcGVydHlOYW1lID0gIHJlZ0V4cExpdGVyYWwuZXhlYyhzdHJpbmdWYWx1ZSlbMV07XHJcblx0XHRyZXR1cm4gcHJvcGVydHlOYW1lO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZSxfX2RhdGVVdGlsaXR5Lm1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBPYmplY3RVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJfXCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJfXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcdCd1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhcnJheVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXJyYXlVdGlsaXR5IHtcclxuXHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZTtcclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZTtcclxuXHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm06IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyO1xyXG5cdHN1bShhcnJheTogbnVtYmVyW10pOiBudW1iZXI7XHJcblx0bGFzdDxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSk6IFREYXRhVHlwZTtcclxuXHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZ30pOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH07XHJcbn1cclxuXHJcbmNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlciB7XHJcblx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG5cdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0fVxyXG5cclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdGlmIChfLmlzRnVuY3Rpb24oaXRlbSkpIHtcclxuXHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW5kZXggPSBfLmluZGV4T2YoYXJyYXksIDxURGF0YVR5cGU+aXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0cmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHR2YXIgaW5kZXg6IG51bWJlciA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcblxyXG5cdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0dmFyIGxpc3Q6IG51bWJlcltdO1xyXG5cclxuXHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKGxpc3QsIChzdW06IG51bWJlciwgbnVtOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gc3VtICsgbnVtOyB9LCAwKTtcclxuXHR9XHJcblxyXG5cdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB9KVxyXG5cdFx0OiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0ge1xyXG5cdFx0Ly8gbmVlZHMgdG8gYmUgc2VlZGVkIHdpdGggYW4gb2JqZWN0IG9yIGl0IHdpbGwgYmUgdmlld2VkIGFzIGFuIGFycmF5IHdpdGggbm8gaXRlbXNcclxuXHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSwgaXRlbTogVERhdGFUeXBlKTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9ID0+IHtcclxuXHRcdFx0ZGljdGlvbmFyeVtrZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdH0sIDxhbnk+e30pO1xyXG5cdH1cclxuXHJcblx0bGFzdDxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSk6IFREYXRhVHlwZSB7XHJcblx0XHRpZiAoYXJyYXkgIT0gbnVsbCAmJiBhcnJheS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgbW9tZW50TW9kdWxlTmFtZSB9IGZyb20gJy4uL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyB0aW1lTW9kdWxlTmFtZSB9IGZyb20gJy4uL3RpbWUvdGltZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IERhdGVVdGlsaXR5LCBzZXJ2aWNlTmFtZSB9IGZyb20gJy4vZGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGVmYXVsdEZvcm1hdHMgfSBmcm9tICcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RhdGUuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFttb21lbnRNb2R1bGVOYW1lLCB0aW1lTW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIERhdGVVdGlsaXR5KVxyXG5cdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vbWVudFdyYXBwZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vbWVudFdyYXBwZXIoKTogdm9pZCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHQvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcblx0Ly8gIGNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrIGRvZXNuJ3QgYXBwZWFyIHRvIGJlXHJcblx0Ly8gIGRlZmluZWQgaW4gTW9tZW50U3RhdGljLi4uIDotKFxyXG5cdHZhciBtb21lbnRXcmFwcGVyOiBhbnkgPSBtb21lbnQ7IC8vIG1vbWVudCBtdXN0IGFscmVhZHkgYmUgbG9hZGVkXHJcblxyXG5cdC8vIFNldCBkZWZhdWx0IG1ldGhvZCBmb3IgaGFuZGxpbmcgbm9uLUlTTyBkYXRlIGNvbnZlcnNpb25zLlxyXG5cdC8vIFNlZSA0LzI4IGNvbW1lbnQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDdcclxuXHQvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuXHRtb21lbnRXcmFwcGVyLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gKGNvbmZpZzogYW55KTogdm9pZCA9PiB7XHJcblx0XHRjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBtb21lbnRXcmFwcGVyO1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm1vbWVudFwiXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4uL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdGNvbXBhcmVUaW1lcyh0aW1lMTogc3RyaW5nLCB0aW1lMjogc3RyaW5nKTogQ29tcGFyZVJlc3VsdDtcclxuXHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdGNvbXBhcmVUaW1lcyh0aW1lMTogc3RyaW5nLCB0aW1lMjogc3RyaW5nKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRsZXQgZm9ybWF0OiBzdHJpbmcgPSBkZWZhdWx0Rm9ybWF0cy50aW1lRm9ybWF0O1xyXG5cclxuXHRcdGxldCBzdGFydDogbW9tZW50Lk1vbWVudCA9IG1vbWVudCh0aW1lMSwgZm9ybWF0KTtcclxuXHRcdGxldCBlbmQ6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQodGltZTIsIGZvcm1hdCk7XHJcblxyXG5cdFx0aWYgKHN0YXJ0LmhvdXJzKCkgPT0gZW5kLmhvdXJzKClcclxuXHRcdFx0JiYgc3RhcnQubWludXRlcygpID09IGVuZC5taW51dGVzKCkpIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXJ0LmhvdXJzKCkgPj0gZW5kLmhvdXJzKClcclxuXHRcdFx0XHQmJiBzdGFydC5taW51dGVzKCkgPj0gZW5kLm1pbnV0ZXMoKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGxldCB0aW1lVXRpbGl0eTogSVRpbWVVdGlsaXR5ID0gbmV3IFRpbWVVdGlsaXR5KCk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBlbnVtIENvbXBhcmVSZXN1bHQge1xyXG5cdGdyZWF0ZXIgPSAxLFxyXG5cdGVxdWFsID0gMCxcclxuXHRsZXNzID0gLTEsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bTogbnVtYmVyKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdGlmIChudW0gPT09IDApIHtcclxuXHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG5cdH0gZWxzZSBpZiAobnVtID4gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgdGltZU1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgdGltZVNlcnZpY2VOYW1lLFxyXG5cdElUaW1lVXRpbGl0eSxcclxuXHR0aW1lVXRpbGl0eSxcclxufSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbW9tZW50TW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBtb21lbnRTZXJ2aWNlTmFtZSxcclxufSBmcm9tICcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmltcG9ydCB7IENvbXBhcmVSZXN1bHQsIGdldENvbXBhcmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0JztcclxuXHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHR5ZWFyczogbnVtYmVyO1xyXG5cdG1vbnRoczogbnVtYmVyO1xyXG5cdGRheXM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZTtcclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0O1xyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGU7XHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGdldE5vdygpOiBEYXRlO1xyXG5cdGZvcm1hdERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IHN0cmluZztcclxuXHRzYW1lRGF0ZShkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGUxRm9ybWF0Pzogc3RyaW5nLCBkYXRlMkZvcm1hdD86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0c2FtZURhdGVUaW1lKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbW9tZW50U2VydmljZU5hbWUsIHRpbWVTZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogSVRpbWVVdGlsaXR5KSB7XHJcblx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRtb250aDogSU1vbnRoW107XHJcblx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0fVxyXG5cclxuXHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHR2YXIgcmVzdWx0OiBJRGF0ZVZhbHVlID0gPGFueT57fTtcclxuXHRcdHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRyZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQueWVhcnMgLT0gMTtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyArPSAxMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0dmFyIG1pbGxpc2Vjb25kczogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydCwgZW5kLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRyZXR1cm4gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IENvbXBhcmVSZXN1bHQge1xyXG5cdFx0Ly8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuXHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcblx0XHRyZXR1cm4gZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuXHR9XHJcblxyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IENvbXBhcmVSZXN1bHQubGVzcykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuXHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkudG9EYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlRnJvbUlTT1N0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbWVudChkYXRlKS50b0RhdGUoKTtcclxuXHR9XHJcblxyXG5cdGlzRGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpXHJcblx0XHR7XHJcblx0XHRcdC8vbG9kYXNoIHdpbGwgcmV0dXJuIHRydWUgaWYgaXQgaXMgYSB2YWxpZCBkYXRlIG9iamVjdCwgYnV0IGhhcyBpbiBpbnZhbGlkIHZhbHVlLlxyXG5cdFx0XHQvL2NoZWNrIHRoZSB0aW1lIHZhbHVlIG9mIHRoZSBkYXRlIG9iamVjdCB0byB2ZXJpZnkgdGhhdCBpdCdzIGEgVmFsaWQgRGF0ZS5cclxuXHRcdFx0cmV0dXJuICFpc05hTihkYXRlLmdldFRpbWUoKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkuaXNWYWxpZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0Tm93KCk6IERhdGUge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHRoaXMuZ2V0RGF0ZShkYXRlLCBkYXRlRm9ybWF0KSkuZm9ybWF0KHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Rm9ybWF0KGN1c3RvbUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBjdXN0b21Gb3JtYXQgIT0gbnVsbCA/IGN1c3RvbUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHR9XHJcblxyXG5cdHNhbWVEYXRlKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKSB7XHJcblx0XHRpZiAoZGF0ZTFGb3JtYXQgIT0gdW5kZWZpbmVkICYmIGRhdGUyRm9ybWF0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGF0ZTJGb3JtYXQgPSBkYXRlMUZvcm1hdDtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRGF0ZShkYXRlMSwgZGF0ZTFGb3JtYXQpICYmIHRoaXMuaXNEYXRlKGRhdGUyLCBkYXRlMkZvcm1hdCkpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudCg8YW55PmRhdGUxLGRhdGUxRm9ybWF0KS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpID09PSBtb21lbnQoPGFueT5kYXRlMixkYXRlMkZvcm1hdCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNhbWVEYXRlVGltZShkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGUxRm9ybWF0Pzogc3RyaW5nLCBkYXRlMkZvcm1hdD86IHN0cmluZykge1xyXG5cdFx0aWYgKGRhdGUxRm9ybWF0ICE9IHVuZGVmaW5lZCAmJiBkYXRlMkZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRhdGUyRm9ybWF0ID0gZGF0ZTFGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0RhdGUoZGF0ZTEsIGRhdGUxRm9ybWF0KSAmJiB0aGlzLmlzRGF0ZShkYXRlMiwgZGF0ZTJGb3JtYXQpKSB7XHJcblx0XHRcdHJldHVybiBtb21lbnQoPGFueT5kYXRlMSxkYXRlMUZvcm1hdCkuZm9ybWF0KFwiTU0vREQvWVlZWSArLUhIbW1cIikgPT09IG1vbWVudCg8YW55PmRhdGUyLGRhdGUyRm9ybWF0KS5mb3JtYXQoXCJNTS9ERC9ZWVlZICstSEhtbVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgZGF0ZVV0aWxpdHk6IElEYXRlVXRpbGl0eSA9IG5ldyBEYXRlVXRpbGl0eShtb21lbnQsIHRpbWVVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgdmFyIGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdFN0cmluZ3Mge1xyXG5cdGlzb0Zvcm1hdDogc3RyaW5nO1xyXG5cdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0ZGF0ZUZvcm1hdDogc3RyaW5nO1xyXG5cdHRpbWVGb3JtYXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHZhciBkZWZhdWx0Rm9ybWF0czogSURhdGVGb3JtYXRTdHJpbmdzID0ge1xyXG5cdGlzb0Zvcm1hdDogJ1lZWVktTU0tRERUSEg6bW06c3MnLFxyXG5cdGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuXHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdHRpbWVGb3JtYXQ6ICdoOm1tQScsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbmltcG9ydCB7XHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG59IGZyb20gJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0cnVuY2F0ZSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRydW5jYXRlRmlsdGVyIHtcclxuXHQoaW5wdXQ/OiBzdHJpbmcsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG59XHJcblxyXG50cnVuY2F0ZS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0dmFyIG91dDogc3RyaW5nID0gb2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoaW5wdXQpID8gJycgOiBpbnB1dC50b1N0cmluZygpO1xyXG5cdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdG91dCA9IG91dC5zdWJzdHJpbmcoMCwgdHJ1bmNhdGVUbyk7XHJcblx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG91dDtcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0TW9kdWxlTmFtZV0pXHJcblx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyV2l0aENvdW50cyBleHRlbmRzIElGaWx0ZXIge1xyXG5cdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VyaWFsaXphYmxlRmlsdGVyIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0c2VyaWFsaXplPFRGaWx0ZXJEYXRhPigpOiBURmlsdGVyRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyIHtcclxuXHR0eXBlOiBzdHJpbmc7XHJcblx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBhcnJheSBmcm9tICcuL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBib29sZWFuIGZyb20gJy4vYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBkYXRhQ29udHJhY3RzIGZyb20gJy4vZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGRhdGUgZnJvbSAnLi9kYXRlL2RhdGUubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20gJy4vZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZmlsZVNpemUgZnJvbSAnLi9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBnZW5lcmljU2VhcmNoRmlsdGVyIGZyb20gJy4vZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBndWlkIGZyb20gJy4vZ3VpZC9ndWlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIG5vdGlmaWNhdGlvbiBmcm9tICcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG51bWJlclNlcnZpY2UgZnJvbSAnLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBvYmplY3RTZXJ2aWNlIGZyb20gJy4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZSBmcm9tICcuL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgcGFyZW50Q2hpbGRCZWhhdmlvciBmcm9tICcuL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgcHJvbWlzZSBmcm9tICcuL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgc3RyaW5nU2VydmljZSBmcm9tICcuL3N0cmluZy9zdHJpbmcuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHN5bmNocm9uaXplZFJlcXVlc3RzIGZyb20gJy4vc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHRlc3QgZnJvbSAnLi90ZXN0L3Rlc3QubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdGltZSBmcm9tICcuL3RpbWUvdGltZS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgdmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB7XHJcblx0YXJyYXksXHJcblx0Ym9vbGVhbixcclxuXHRkYXRhQ29udHJhY3RzLFxyXG4gICAgZGF0ZSxcclxuICAgIGVycm9ySGFuZGxlcixcclxuXHRmaWxlU2l6ZSxcclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyLFxyXG5cdGd1aWQsXHJcblx0bW9tZW50LFxyXG5cdG5vdGlmaWNhdGlvbixcclxuXHRudW1iZXJTZXJ2aWNlIGFzIG51bWJlcixcclxuXHRvYmplY3RTZXJ2aWNlIGFzIG9iamVjdCxcclxuXHRvYnNlcnZhYmxlLFxyXG5cdHBhcmVudENoaWxkQmVoYXZpb3IsXHJcblx0cHJvbWlzZSxcclxuXHRzdHJpbmdTZXJ2aWNlIGFzIHN0cmluZyxcclxuXHRzeW5jaHJvbml6ZWRSZXF1ZXN0cyxcclxuXHR0ZXN0LFxyXG5cdHRpbWUsXHJcblx0dmFsaWRhdGlvbixcclxufTtcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0ZGF0YUNvbnRyYWN0cy5tb2R1bGVOYW1lLFxyXG4gICAgZGF0ZS5tb2R1bGVOYW1lLFxyXG4gICAgZXJyb3JIYW5kbGVyLm1vZHVsZU5hbWUsXHJcblx0ZmlsZVNpemUubW9kdWxlTmFtZSxcclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyLm1vZHVsZU5hbWUsXHJcblx0Z3VpZC5tb2R1bGVOYW1lLFxyXG5cdG1vbWVudC5tb2R1bGVOYW1lLFxyXG5cdG5vdGlmaWNhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdG51bWJlclNlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRvYmplY3RTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0b2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG5cdHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuXHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0c3RyaW5nU2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdHN5bmNocm9uaXplZFJlcXVlc3RzLm1vZHVsZU5hbWUsXHJcblx0dGltZS5tb2R1bGVOYW1lLFxyXG5cdHRlc3QubW9kdWxlTmFtZSxcclxuXHR2YWxpZGF0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4nO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQm9vbGVhblV0aWxpdHkge1xyXG5cdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNsYXNzIEJvb2xlYW5VdGlsaXR5IGltcGxlbWVudHMgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhIW9iamVjdDtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCb29sZWFuVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgcmVzb3VyY2VCdWlsZGVyTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIGJhc2VEYXRhU2VydmljZU1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBjb252ZXJ0ZXJzIGZyb20gJy4vY29udmVydGVycy9jb252ZXJ0ZXJzJztcclxuaW1wb3J0ICogYXMgbW9ja3MgZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGFDb250cmFjdHMnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeSc7XHJcbmV4cG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRGF0YVNlcnZpY2VGYWN0b3J5LCBJQmFzZURvbWFpbk9iamVjdCwgQmFzZURhdGFTZXJ2aWNlLCBmYWN0b3J5TmFtZSBhcyBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldywgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIGZhY3RvcnlOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnlOYW1lIH0gZnJvbSAnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZVJlc291cmNlQnVpbGRlciwgc2VydmljZU5hbWUgYXMgYnVpbGRlclNlcnZpY2VOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmV4cG9ydCB7IGNvbnZlcnRlcnMsIG1vY2tzIH07XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0YmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSxcclxuXHRiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2R1bGVOYW1lLFxyXG5cdHJlc291cmNlQnVpbGRlck1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsIG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lIH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQ29udHJhY3RMaWJyYXJ5LCBDb250cmFjdExpYnJhcnksIElMaWJyYXJ5U2VydmljZXMgfSBmcm9tICcuL2NvbnRyYWN0TGlicmFyeSc7XHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3LCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldywgQmFzZURhdGFTZXJ2aWNlVmlldywgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnREYXRhU2VydmljZSwgQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBVcmwgdG8gaGl0IHdpdGggZ2V0TGlzdCBhbmQgY3JlYXRlXHJcblx0KiAtIGV4dGVuZGVkIHdpdGggL2lkIGZvciBnZXREZXRhaWwsIHVwZGF0ZSwgYW5kIGRlbGV0ZVxyXG5cdCovXHJcblx0ZW5kcG9pbnQ/OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCB1c2UgdGhlIG1vY2sgZGF0YSBvciBoaXQgdGhlIGFjdHVhbCBlbmRwb2ludFxyXG5cdCogZGVmYXVsdHMgdG8gdHJ1ZSBpZiBlbmRwb2ludCBpcyBub3QgZGVmaW5lZFxyXG5cdCovXHJcblx0dXNlTW9jaz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCBsb2cgYWxsIHJlcXVlc3RzIGFnYWluc3QgdGhlIGNvbnRyYWN0XHJcblx0Ki9cclxuXHRsb2dSZXF1ZXN0cz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogTWFwcGluZyB0byBzcGVjaWZ5IGhvdyBwcm9wZXJ0aWVzIHNob3VsZCBiZSB0cmFuc2Zvcm1lZCB0byBhbmQgZnJvbSB0aGUgc2VydmVyXHJcblx0Ki9cclxuXHR0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4gZXh0ZW5kcyBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBFeGFtcGxlIGRhdGEgc2V0IHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcgYW5kIHByb3RvdHlwaW5nIGluc3RlYWQgb2YgaGl0dGluZyB0aGUgZW5kcG9pbnRcclxuXHQqL1xyXG5cdG1vY2tEYXRhPzogVERhdGFUeXBlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRnVuY3Rpb24gdGhhdCBidWlsZHMgYSBkaWN0aW9uYXJ5IG9mIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI/OiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IGV4dGVuZHMgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRXhhbXBsZSBvYmplY3QgdG8gYmUgdXNlZCBmb3IgdGVzdGluZyBhbmQgcHJvdG90eXBpbmcgaW5zdGVhZCBvZiBoaXR0aW5nIHRoZSBlbmRwb2ludFxyXG5cdCovXHJcblx0bW9ja0RhdGE/OiBURGF0YVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRnVuY3Rpb24gdGhhdCBidWlsZHMgYSBkaWN0aW9uYXJ5IG9mIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI/OiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUmVzb3VyY2VCdWlsZGVyIHtcclxuXHQvKipcclxuXHQqIEEgaGVscGVyIHRvIHBhc3MgaW50byB0aGUgY29uc3RydWN0b3Igd2hlbiBidWlsZGluZyBhIG5ldyBjb250cmFjdHMgbGlicmFyeVxyXG5cdCovXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXM7XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3RhbmRhcmQgcmVzb3VyY2Ugd2l0aCBnZXRMaXN0LCBnZXREZXRhaWwsIGNyZWF0ZSwgdXBkYXRlLCBkZWxldGVcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBzdGFuZGFyZCByZXNvdXJjZSB3aXRoIGdldExpc3QsIGdldERldGFpbCwgY3JlYXRlLCB1cGRhdGUsIGRlbGV0ZVxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzdGFuZGFyZCB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgcGFyZW50IHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc3RhbmRhcmQgd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCB2b2lkLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogRGVwcmVjYXRlZCAtIENyZWF0ZSBhIHNpbmdsZXRvbiByZXNvdXJjZSB3aXRoIGdldCBhbmQgdXBkYXRlXHJcblx0Ki9cclxuXHRjcmVhdGVTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGU+KG9wdGlvbnM6IElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIERlcHJlY2F0ZWQgLSBDcmVhdGUgYSBwYXJlbnQgc2luZ2xldG9uIHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc2luZ2xldG9uIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50U2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVJlc291cmNlQnVpbGRlciBpbXBsZW1lbnRzIElCYXNlUmVzb3VyY2VCdWlsZGVyIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRodHRwJywgJyRxJywgJyRyb290U2NvcGUnLCBhcnJheVNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSBhcnJheTogSUFycmF5VXRpbGl0eSkgeyB9XHJcblxyXG5cdGdldExpYnJhcnlTZXJ2aWNlcygpOiBJTGlicmFyeVNlcnZpY2VzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCRxOiB0aGlzLiRxLFxyXG5cdFx0XHQkcm9vdFNjb3BlOiB0aGlzLiRyb290U2NvcGUsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlVmlldyh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnREYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGU+KG9wdGlvbnM6IElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXNlTW9ja0lmTm9FbmRwb2ludDxURGF0YVR5cGU+KG9wdGlvbnM6IElCYXNlT3B0aW9uczxURGF0YVR5cGU+KTogSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdFx0b3B0aW9ucy51c2VNb2NrID0gb3B0aW9ucy5lbmRwb2ludCA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMudXNlTW9jaztcclxuXHRcdHJldHVybiBvcHRpb25zO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJhc2VSZXNvdXJjZUJ1aWxkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlRGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYmFzZURhdGFTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEb21haW5PYmplY3Qge1xyXG4gICAgaWQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdGdldExpc3QocGFyYW1zPzogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgZ2V0RGV0YWlsKGlkOiBudW1iZXIpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBjcmVhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBkZWxldGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgcHJpdmF0ZSBiZWhhdmlvcjogSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0dGhpcy5iZWhhdmlvciA9IG5ldyBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcigkaHR0cCwgJHEsIHRyYW5zZm9ybSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtRW5kcG9pbnQoaWQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExpc3QocGFyYW1zOiBUU2VhcmNoUGFyYW1zKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldExpc3Qoe1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlW10gPT4geyByZXR1cm4gdGhpcy5tb2NrRGF0YSB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERldGFpbChpZDogbnVtYmVyKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRJdGVtKHtcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGlkKSxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5jcmVhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIGFkZE1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dElkOiBudW1iZXIgPSBfLm1heEJ5KHRoaXMubW9ja0RhdGEsICdpZCcpLmlkICsgMTtcclxuICAgICAgICAgICAgICAgIGRvbWFpbk9iamVjdC5pZCA9IG5leHRJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9ja0RhdGEucHVzaChkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IudXBkYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLFxyXG4gICAgICAgICAgICB1cGRhdGVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9sZE9iamVjdDogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgb2xkT2JqZWN0ID0gPFREYXRhVHlwZT5fLmFzc2lnbihvbGRPYmplY3QsIGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmRlbGV0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5nZXRJdGVtRW5kcG9pbnQoZG9tYWluT2JqZWN0LmlkKSxcclxuICAgICAgICAgICAgcmVtb3ZlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXkucmVtb3ZlKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlW11cclxuICAgICAgICAsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfSwgdXNlTW9jaz86IGJvb2xlYW4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcbn1cclxuXHJcbmJhc2VEYXRhU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCBhcnJheVNlcnZpY2VOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2VEYXRhU2VydmljZUZhY3RvcnkoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCAkcTogYW5ndWxhci5JUVNlcnZpY2UsIGFycmF5OiBJQXJyYXlVdGlsaXR5KTogSUJhc2VEYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGVbXVxyXG4gICAgICAgICAgICAsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfSwgdXNlTW9jaz86IGJvb2xlYW4sIGxvZ1JlcXVlc3RzPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4oJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShmYWN0b3J5TmFtZSwgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb252ZXJ0ZXI8VERhdGFUeXBlPiB7XHJcblx0ZnJvbVNlcnZlcihyYXc6IGFueSk6IFREYXRhVHlwZTtcclxuICAgIHRvU2VydmVyKGRhdGE6IFREYXRhVHlwZSk6IGFueSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZW5kcG9pbnQ6IHN0cmluZztcclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2V0TGlzdE9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBwYXJhbXM6IGFueTtcclxuICAgIGdldE1vY2tEYXRhKCk6IFREYXRhVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGdldE1vY2tEYXRhKCk6IFREYXRhVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ3JlYXRlT3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGRvbWFpbk9iamVjdDogVERhdGFUeXBlO1xyXG4gICAgYWRkTW9ja0RhdGEoZGF0YTogVERhdGFUeXBlKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXBkYXRlT3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGRvbWFpbk9iamVjdDogVERhdGFUeXBlO1xyXG4gICAgdXBkYXRlTW9ja0RhdGEoZGF0YTogVERhdGFUeXBlKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGRvbWFpbk9iamVjdDogVERhdGFUeXBlO1xyXG4gICAgcmVtb3ZlTW9ja0RhdGEoZGF0YTogVERhdGFUeXBlKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiB7XHJcblx0Z2V0TGlzdChvcHRpb25zOiBJR2V0TGlzdE9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgZ2V0SXRlbShvcHRpb25zOiBJR2V0SXRlbU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGNyZWF0ZShvcHRpb25zOiBJQ3JlYXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBkZWxldGUob3B0aW9uczogSURlbGV0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7W2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT59KSB7IH1cclxuXHJcbiAgICBnZXRMaXN0KG9wdGlvbnM6IElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5nZXRNb2NrRGF0YSgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5nZXQob3B0aW9ucy5lbmRwb2ludCwgeyBwYXJhbXM6IG9wdGlvbnMucGFyYW1zIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlW10+KTogVERhdGFUeXBlW10gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGVbXSk6IFREYXRhVHlwZVtdID0+IHtcclxuXHRcdFx0ZGF0YSA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0oZGF0YSwgdGhpcy50cmFuc2Zvcm0sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdnZXRMaXN0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0ob3B0aW9uczogSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKGRhdGEsIHRoaXMudHJhbnNmb3JtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUob3B0aW9uczogSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0ob3B0aW9ucy5kb21haW5PYmplY3QsIHRoaXMudHJhbnNmb3JtLCB0cnVlKTtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYWRkTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wb3N0KG9wdGlvbnMuZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZG9tYWluT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hcHBseVRyYW5zZm9ybShkYXRhLCB0aGlzLnRyYW5zZm9ybSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2NyZWF0ZScsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgb3B0aW9ucy5kb21haW5PYmplY3QgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKG9wdGlvbnMuZG9tYWluT2JqZWN0LCB0aGlzLnRyYW5zZm9ybSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnVwZGF0ZU1vY2tEYXRhKG9wdGlvbnMuZG9tYWluT2JqZWN0KVxyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wdXQob3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5kb21haW5PYmplY3QpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZT4pOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0oZGF0YSwgdGhpcy50cmFuc2Zvcm0sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCd1cGRhdGUnLCBvcHRpb25zLmRvbWFpbk9iamVjdCwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUob3B0aW9uczogSURlbGV0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5kZWxldGU8dm9pZD4ob3B0aW9ucy5lbmRwb2ludCkudGhlbigoKTogdm9pZCA9PiB7IHJldHVybiBudWxsOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZGVsZXRlJywgb3B0aW9ucy5kb21haW5PYmplY3QsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZyhyZXF1ZXN0TmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIGVuZHBvaW50OiBzdHJpbmcsIHVzZU1vY2s6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbW9ja1N0cmluZyA9IHVzZU1vY2sgPyAnTW9ja2VkICcgOiAnJztcclxuICAgICAgICBsZXQgZW5kcG9pbnRTdHJpbmcgPSBlbmRwb2ludCA9PSBudWxsID8gJ3Vuc3BlY2lmaWVkJyA6IGVuZHBvaW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vY2tTdHJpbmcgKyByZXF1ZXN0TmFtZSArICcgZm9yIGVuZHBvaW50ICcgKyBlbmRwb2ludFN0cmluZyArICc6Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUcmFuc2Zvcm0oZGF0YTogYW55LCB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8YW55PiB8IHtbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55Pn0sIHRvU2VydmVyOiBib29sZWFuKTogYW55IHtcclxuXHRcdGlmICh0cmFuc2Zvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoXy5pc0FycmF5KGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBfLm1hcChkYXRhLCAoaXRlbTogYW55KTogYW55ID0+IHsgcmV0dXJuIHRoaXMuYXBwbHlUcmFuc2Zvcm0oaXRlbSwgdHJhbnNmb3JtLCB0b1NlcnZlcik7IH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmlzQ29udmVydGVyKHRyYW5zZm9ybSkpIHtcclxuXHRcdFx0bGV0IHRyYW5zZm9ybUZ1bmM6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gdG9TZXJ2ZXJcclxuXHRcdFx0XHQ/ICg8SUNvbnZlcnRlcjxhbnk+PnRyYW5zZm9ybSkudG9TZXJ2ZXJcclxuXHRcdFx0XHQ6ICg8SUNvbnZlcnRlcjxhbnk+PnRyYW5zZm9ybSkuZnJvbVNlcnZlcjtcclxuXHRcdFx0cmV0dXJuIHRyYW5zZm9ybUZ1bmMoZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gPGFueT5fLm1hcFZhbHVlcyhkYXRhLCAocHJvcDogYW55LCBrZXk6IHN0cmluZyk6IGFueSA9PiB7XHJcblx0XHRcdFx0aWYgKF8uaGFzKHRyYW5zZm9ybSwga2V5KSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlUcmFuc2Zvcm0ocHJvcCwgdHJhbnNmb3JtW2tleV0sIHRvU2VydmVyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHByb3A7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRwcml2YXRlIGlzQ29udmVydGVyKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc0Z1bmN0aW9uKG9iamVjdC5mcm9tU2VydmVyKVxyXG5cdFx0XHR8fCBfLmlzRnVuY3Rpb24ob2JqZWN0LnRvU2VydmVyKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsIG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lIH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnREYXRhU2VydmljZSwgQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IGV4dGVuZHMgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT57XHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPlxyXG5cdGV4dGVuZHMgQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz5cclxuXHRpbXBsZW1lbnRzIElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgX2VuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuICAgICAgICAgICAgLCBwcml2YXRlIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcbiAgICAgICAgICAgICwgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdFx0bGV0IG1vY2tEYXRhOiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gcGFyZW50SWQ7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4odGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5lbmRwb2ludCwgbW9ja0RhdGEsIHRoaXMudHJhbnNmb3JtLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0aW1wbGVtZW50cyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBfZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG5cdFx0XHQsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGV9XHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG4gICAgICAgICAgICAsIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBhcnJheSwgX2VuZHBvaW50LCBtb2NrRGF0YSwgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRsZXQgbW9ja0RhdGE6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09PSBwYXJlbnRJZDtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4odGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5lbmRwb2ludCwgbW9ja0RhdGEsIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgdGhpcy50cmFuc2Zvcm0sIHRoaXMudXNlTW9jaywgdGhpcy5sb2dSZXF1ZXN0cywgcGFyZW50SWQpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHkgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPntcclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHksIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG5cdFx0LCBwdWJsaWMgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeyAoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfVxyXG5cdFx0LCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuXHRcdCwgdXNlTW9jaz86IGJvb2xlYW5cclxuICAgICAgICAsIGxvZ1JlcXVlc3RzPzogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNoaWxkQ29udHJhY3RzKGlkPzogbnVtYmVyKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUge1xyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoaWQpKSB7XHJcblx0XHRcdGxldCBkaWN0aW9uYXJ5OiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSA9IHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcigpO1xyXG5cdFx0XHRfLmVhY2goZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRkYXRhU2VydmljZS5lbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQgKyBkYXRhU2VydmljZS5lbmRwb2ludDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGRpY3Rpb25hcnk6IHtbaW5kZXg6IHN0cmluZ106IGFueX0gPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIoKTtcclxuXHRcdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHwgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+ID0+IHtcclxuXHRcdFx0XHRsZXQgY29udHJhY3Q6IGFueTtcclxuXHRcdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKSkge1xyXG5cdFx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZS5Bc1NpbmdsZXRvbihpZCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb250cmFjdC5lbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZCArIGNvbnRyYWN0LmVuZHBvaW50O1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gY29udHJhY3Q7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcblxyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgcHJpdmF0ZSBiZWhhdmlvcjogSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcml2YXRlIG1vY2tEYXRhOiBURGF0YVR5cGVcclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG4gICAgICAgICAgICAsIHB1YmxpYyB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgcHVibGljIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLmJlaGF2aW9yID0gbmV3IEJhc2VEYXRhU2VydmljZUJlaGF2aW9yKCRodHRwLCAkcSwgdHJhbnNmb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRJdGVtKHtcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlID0+IHsgcmV0dXJuIHRoaXMubW9ja0RhdGE7IH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci51cGRhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIHVwZGF0ZU1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vY2tEYXRhID0gPFREYXRhVHlwZT5fLmFzc2lnbih0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IHtcclxuICAgIGdldEluc3RhbmNlPFREYXRhVHlwZT4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGUsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfSwgdXNlTW9jaz86IGJvb2xlYW4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcbn1cclxuXHJcbmJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCAkcTogYW5ndWxhci5JUVNlcnZpY2UpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZT4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGUsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfSwgdXNlTW9jaz86IGJvb2xlYW4sIGxvZ1JlcXVlc3RzPzogYm9vbGVhbik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4oJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50c1xuICoqLyIsImltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+e1xyXG5cdGNoaWxkQ29udHJhY3RzKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVcclxuXHRcdCwgcHJpdmF0ZSByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9XHJcblx0XHQsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG5cdFx0LCB1c2VNb2NrPzogYm9vbGVhblxyXG5cdFx0LCBsb2dSZXF1ZXN0cz86IGJvb2xlYW5cclxuXHRcdCwgcHJpdmF0ZSBwYXJlbnRJZD86IG51bWJlcikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y2hpbGRDb250cmFjdHMoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUge1xyXG5cdFx0bGV0IGRpY3Rpb25hcnk6IHtbaW5kZXg6IHN0cmluZ106IGFueX0gPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIoKTtcclxuXHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBhbnk+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHwgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIGFueT4gPT4ge1xyXG5cdFx0XHRsZXQgY29udHJhY3Q6IGFueTtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihkYXRhU2VydmljZS5Bc1NpbmdsZXRvbikpIHtcclxuXHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKHRoaXMucGFyZW50SWQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnRyYWN0LmVuZHBvaW50ID0gdGhpcy5lbmRwb2ludCArIGNvbnRyYWN0LmVuZHBvaW50O1xyXG5cclxuXHRcdFx0cmV0dXJuIGNvbnRyYWN0O1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RhdGVDb252ZXJ0ZXIvZGF0ZUNvbnZlcnRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2NvbnZlcnRlcnMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi8uLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IGRhdGVVdGlsaXR5LCBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4uLy4uLy4uL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IGxldCBkYXRlQ29udmVydGVyOiBJQ29udmVydGVyPERhdGU+ID0ge1xyXG5cdGZyb21TZXJ2ZXIocmF3OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdHJldHVybiBkYXRlVXRpbGl0eS5nZXREYXRlRnJvbUlTT1N0cmluZyhyYXcpO1xyXG5cdH0sXHJcblx0dG9TZXJ2ZXIoZGF0YTogRGF0ZSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gbW9tZW50KGRhdGEpLmZvcm1hdChkZWZhdWx0Rm9ybWF0cy5pc29Gb3JtYXQpO1xyXG5cdH0sXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9kYXRlQ29udmVydGVyL2RhdGVDb252ZXJ0ZXIudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi8uLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElJdGVtTGlzdCwgSUl0ZW0gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9pdGVtTGlzdCc7XHJcblxyXG5leHBvcnQgeyBJQ29udmVydGVyIH07XHJcblxyXG5leHBvcnQgY2xhc3MgRW51bUNvbnZlcnRlcjxUSXRlbVR5cGUgZXh0ZW5kcyBJSXRlbT4gaW1wbGVtZW50cyBJQ29udmVydGVyPFRJdGVtVHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZW51bVR5cGU6IElJdGVtTGlzdDxUSXRlbVR5cGU+KSB7fVxyXG5cclxuXHRmcm9tU2VydmVyOiB7IChyYXc6IG51bWJlcik6IFRJdGVtVHlwZSB9ID0gKHJhdzogbnVtYmVyKTogVEl0ZW1UeXBlID0+IHtcclxuXHRcdHJldHVybiB0aGlzLmVudW1UeXBlLmdldChyYXcpO1xyXG5cdH1cclxuXHR0b1NlcnZlcjogeyAoZGF0YTogVEl0ZW1UeXBlKTogbnVtYmVyIH0gPSAoZGF0YTogVEl0ZW1UeXBlKTogbnVtYmVyID0+IHtcclxuXHRcdHJldHVybiBkYXRhICE9IG51bGxcclxuXHRcdFx0PyBkYXRhLnZhbHVlXHJcblx0XHRcdDogbnVsbDtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9lbnVtQ29udmVydGVyL2VudW1Db252ZXJ0ZXIudHNcbiAqKi8iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZU1vY2s8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IGV4dGVuZHMgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRtb2NrR2V0TGlzdChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja1VwZGF0ZSgpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrQ3JlYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRtb2NrR2V0TGlzdChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0NoaWxkKG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcblx0bW9ja1VwZGF0ZSgpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrQ3JlYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdG1vY2tHZXQoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja1VwZGF0ZSgpOiBTaW5vbi5TaW5vblNweTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZVJlc291cmNlQnVpbGRlciwgQmFzZVJlc291cmNlQnVpbGRlciB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZU1vY2ssIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jayB9IGZyb20gJy4vZGF0YVNlcnZpY2VNb2Nrcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250cmFjdExpYnJhcnkge1xyXG5cdC8vIGV4dGVuZCB3aXRoIGN1c3RvbSBpbnRlcmZhY2Ugc3BlY2lmeWluZyBjaGlsZCByZXNvdXJjZXNcclxuXHJcblx0Zmx1c2goKTogdm9pZDtcclxuXHJcblx0bW9ja0dldChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRtb2NrQ2hpbGQocGFyZW50OiBhbnksIG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PjtcclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT47XHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxpYnJhcnlTZXJ2aWNlcyB7XHJcblx0JHE6IG5nLklRU2VydmljZTtcclxuXHQkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyYWN0TGlicmFyeSBpbXBsZW1lbnRzIElDb250cmFjdExpYnJhcnkge1xyXG5cdHByaXZhdGUgJHE6IG5nLklRU2VydmljZTtcclxuXHRwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkZXI6IElCYXNlUmVzb3VyY2VCdWlsZGVyKSB7XHJcblx0XHRsZXQgc2VydmljZXM6IElMaWJyYXJ5U2VydmljZXMgPSAoPEJhc2VSZXNvdXJjZUJ1aWxkZXI+YnVpbGRlcikuZ2V0TGlicmFyeVNlcnZpY2VzKCk7XHJcblx0XHR0aGlzLiRxID0gc2VydmljZXMuJHE7XHJcblx0XHR0aGlzLiRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdH1cclxuXHJcblx0Zmx1c2goKTogdm9pZCB7XHJcblx0XHR0aGlzLiRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdH1cclxuXHRtb2NrR2V0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0JywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldExpc3QnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tHZXREZXRhaWwocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXREZXRhaWwnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tDaGlsZChwYXJlbnQ6IGFueSwgbW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCB7XHJcblx0XHRsZXQgZ2V0Q2hpbGRyZW46IHsoaWQ6IG51bWJlcik6IGFueX0gPSBwYXJlbnQuY2hpbGRDb250cmFjdHMuYmluZChwYXJlbnQpO1xyXG5cdFx0cGFyZW50LmNoaWxkQ29udHJhY3RzID0gKGlkOiBudW1iZXIpOiBhbnkgPT4ge1xyXG5cdFx0XHRsZXQgY2hpbGRyZW46IGFueSA9IGdldENoaWxkcmVuKGlkKTtcclxuXHRcdFx0bW9ja0NhbGxiYWNrKGNoaWxkcmVuKTtcclxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiB7XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVJlc291cmNlPGFueSwgYW55Pih7fSk7XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0TGlzdCA9IChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXRMaXN0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0RGV0YWlsID0gKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXQnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tVcGRhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICd1cGRhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tDcmVhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICdjcmVhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlID0gdGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9ja1BhcmVudChyZXNvdXJjZT86IGFueSk6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+IHtcclxuXHRcdGxldCBnZXRDaGlsZHJlbjogYW55ID0gcmVzb3VyY2UgIT0gbnVsbCA/IHJlc291cmNlLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIgOiAoKTogYW55ID0+IHsgcmV0dXJuIHt9OyB9O1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxhbnksIGFueSwgYW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlPGFueSwgYW55LCBhbnk+KHtcclxuXHRcdFx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogZ2V0Q2hpbGRyZW4sXHJcblx0XHR9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXRMaXN0ID0gKGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldExpc3QnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXREZXRhaWwgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0NoaWxkID0gKG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQgPT4geyByZXR1cm4gdGhpcy5tb2NrQ2hpbGQoZGF0YVNlcnZpY2UsIG1vY2tDYWxsYmFjayk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrVXBkYXRlID0gKCk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tTYXZlKGRhdGFTZXJ2aWNlLCAndXBkYXRlJyk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrQ3JlYXRlID0gKCk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tTYXZlKGRhdGFTZXJ2aWNlLCAnY3JlYXRlJyk7IH07XHJcblx0XHRkYXRhU2VydmljZSA9IHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlKHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXQgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja1VwZGF0ZSA9ICgpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrU2F2ZShkYXRhU2VydmljZSwgJ3VwZGF0ZScpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UgPSB0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlOiBhbnksIHJlc291cmNlPzogYW55KTogYW55IHtcclxuXHRcdGlmIChyZXNvdXJjZSAhPSBudWxsKSB7XHJcblx0XHRcdGRhdGFTZXJ2aWNlID0gXy5leHRlbmQocmVzb3VyY2UsIGRhdGFTZXJ2aWNlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tHZXQocmVzb3VyY2U6IGFueSwgYWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRsZXQgZnVuYzogU2lub24uU2lub25TcHkgPSB0aGlzLnNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHEud2hlbihkYXRhKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVzb3VyY2VbYWN0aW9uTmFtZV0gPSBmdW5jO1xyXG5cdFx0cmV0dXJuIGZ1bmM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGJhc2VNb2NrU2F2ZShyZXNvdXJjZTogYW55LCBhY3Rpb25OYW1lOiBzdHJpbmcpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRsZXQgZnVuYzogU2lub24uU2lub25TcHkgPSB0aGlzLnNpbm9uLnNweSgoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHEud2hlbihkYXRhKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVzb3VyY2VbYWN0aW9uTmFtZV0gPSBmdW5jO1xyXG5cdFx0cmV0dXJuIGZ1bmM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBzaW5vbigpOiBTaW5vbi5TaW5vblN0YXRpYyB7XHJcblx0XHRyZXR1cm4gc2lub24gfHwgPGFueT57IHNweTogKGZ1bmM6IGFueSk6IGFueSA9PiB7IHJldHVybiBmdW5jOyB9IH07XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgIHNlcnZpY2VOYW1lIGFzIG5vdGlmaWNhdGlvblNlcnZpY2VOYW1lLFxyXG4gICAgbW9kdWxlTmFtZSBhcyBub3RpZmljYXRpb25Nb2R1bGVOYW1lLFxyXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnNlcnZpY2VzLmVycm9ySGFuZGxlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdlcnJvckhhbmRsZXInO1xyXG5cclxuZXhwb3J0IGVudW0gSHR0cFN0YXR1c0NvZGUge1xyXG5cdHVuYXV0aG9yaXplZCA9IDQwMSxcclxuXHRmb3JiaWRkZW4gPSA0MDMsXHJcblx0aW52YWxpZFVybCA9IDQwNCxcclxuXHR0aW1lb3V0ID0gNDA4LFxyXG5cdGludGVybmFsU2VydmVyRXJyb3IgPSA1MDAsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlamVjdGlvbiB7XHJcblx0c3RhdHVzOiBIdHRwU3RhdHVzQ29kZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyU2VydmljZSB7XHJcblx0aHR0cFJlc3BvbnNlRXJyb3IocmVqZWN0aW9uOiBJUmVqZWN0aW9uKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JNZXNzYWdlcyB7XHJcbiAgICBmb3JiaWRkZW5FcnJvcjogc3RyaW5nO1xyXG4gICAgaW52YWxpZFVybEVycm9yOiBzdHJpbmc7XHJcbiAgICB0aW1lb3V0RXJyb3I6IHN0cmluZztcclxuICAgIGludGVybmFsU2VydmVyRXJyb3I6IHN0cmluZztcclxuICAgIGRlZmF1bHRFcnJvcjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZSBpbXBsZW1lbnRzIElFcnJvckhhbmRsZXJTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25TZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBsb2dpblVybDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBlcnJvck1lc3NhZ2VzOiBJRXJyb3JNZXNzYWdlcykgeyB9XHJcblxyXG5cdGh0dHBSZXNwb25zZUVycm9yKHJlamVjdGlvbjogSVJlamVjdGlvbik6IHZvaWQge1xyXG5cdFx0c3dpdGNoIChyZWplY3Rpb24uc3RhdHVzKSB7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUudW5hdXRob3JpemVkOlxyXG5cdFx0XHRcdHRoaXMubG9nZ2VkT3V0RXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5mb3JiaWRkZW46XHJcblx0XHRcdFx0dGhpcy5pbnN1ZmZpY2llbnRQZXJtaXNzaW9uc0Vycm9yKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUuaW52YWxpZFVybDpcclxuXHRcdFx0XHR0aGlzLmludmFsaWRVcmxFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLnRpbWVvdXQ6XHJcblx0XHRcdFx0dGhpcy50aW1lb3V0RXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5pbnRlcm5hbFNlcnZlckVycm9yOlxyXG5cdFx0XHRcdHRoaXMuc3lzdGVtRXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5kZWZhdWx0RXJyb3IpO1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1N0YXR1czogJyArIHJlamVjdGlvbi5zdGF0dXMpO1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Jlc3BvbnNlOiAnICsgcmVqZWN0aW9uKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbG9nZ2VkT3V0RXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLiR3aW5kb3cubG9jYXRpb24gPSA8YW55PnRoaXMubG9naW5Vcmw7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMuZm9yYmlkZGVuRXJyb3IpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpbnZhbGlkVXJsRXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMuaW52YWxpZFVybEVycm9yKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdGltZW91dEVycm9yKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLnRpbWVvdXRFcnJvcik7XHJcblx0XHQvLyByZXRyeVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzeXN0ZW1FcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5pbnRlcm5hbFNlcnZlckVycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciBleHRlbmRzIGFuZ3VsYXIuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlczogSUVycm9yTWVzc2FnZXM7XHJcbiAgICAkZ2V0KCR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgLCBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25TZXJ2aWNlKTogSUVycm9ySGFuZGxlclNlcnZpY2U7XHJcbn1cclxuXHJcbmNsYXNzIEVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciBpbXBsZW1lbnRzIElFcnJvckhhbmRsZXJTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIGVycm9yTWVzc2FnZXM6IElFcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9naW5VcmwgPSAnL2xvZ2luJztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSB7XHJcbiAgICAgICAgICAgIGZvcmJpZGRlbkVycm9yOiAnWW91IGhhdmUgaW5zdWZmaWNpZW50IHBlcm1pc3Npb25zIHRvIHBlcmZvcm0gdGhpcyBhY3Rpb24nLFxyXG4gICAgICAgICAgICBpbnZhbGlkVXJsRXJyb3I6ICdSZXNvdXJjZSBub3QgZm91bmQuIFRoaXMgaXNzdWUgaGFzIGJlZW4gbG9nZ2VkJyxcclxuICAgICAgICAgICAgdGltZW91dEVycm9yOiAnUmVxdWVzdCB0aW1lZCBvdXQuIENoZWNrIHlvdXIgbmV0d29yayBjb25uZWN0aW9uIG9yIGNvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yIGZvciBpc3N1ZXMnLFxyXG4gICAgICAgICAgICBpbnRlcm5hbFNlcnZlckVycm9yOiAnVGhlIHN5c3RlbSBoYXMgZW5jb3VudGVyZWQgYW4gZXJyb3IuIFRoaXMgaXNzdWUgaGFzIGJlZW4gbG9nZ2VkLicgK1xyXG4gICAgICAgICAgICAnIFBsZWFzZSBjb250YWN0IHN1cHBvcnQgaWYgeW91IGFyZSB1bmFibGUgdG8gY29tcGxldGUgY3JpdGljYWwgdGFza3MnLFxyXG4gICAgICAgICAgICBkZWZhdWx0RXJyb3I6ICdIdHRwIHN0YXR1cyBjb2RlIG5vdCBoYW5kbGVkJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuJGdldC4kaW5qZWN0ID0gWyckd2luZG93Jywgbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgICRnZXQ6IGFueSA9ICgkd2luZG93OiBuZy5JV2luZG93U2VydmljZVxyXG4gICAgICAgICAgICAsIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJRXJyb3JIYW5kbGVyU2VydmljZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXJTZXJ2aWNlKCR3aW5kb3csIG5vdGlmaWNhdGlvbiwgdGhpcy5sb2dpblVybCwgdGhpcy5lcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5wcm92aWRlcihzZXJ2aWNlTmFtZSwgbmV3IEVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlcigpKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElOb3RpZmllciB9IGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBCYXNlTm90aWZpZXIgfSBmcm9tICcuL2Jhc2VOb3RpZmllcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24nO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpZXI6IElOb3RpZmllcikge31cclxuXHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgYW5ndWxhci5JU2VydmljZVByb3ZpZGVyIHtcclxuXHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHQkZ2V0KCk6IElOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlckludGVybmFsIGV4dGVuZHMgSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciB7XHJcblx0bm90aWZpZXI6IElOb3RpZmllcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcigpOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGxldCBwcm92aWRlcjogSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlckludGVybmFsID0ge1xyXG5cdFx0bm90aWZpZXI6IG5ldyBCYXNlTm90aWZpZXIoKSxcclxuXHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XHJcblx0XHR9LFxyXG5cdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0cmV0dXJuIG5ldyBOb3RpZmljYXRpb25TZXJ2aWNlKHRoaXMubm90aWZpZXIpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gcHJvdmlkZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5wcm92aWRlcihzZXJ2aWNlTmFtZSwgbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBub3RpZnkobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR3aW5kb3cuYWxlcnQobWVzc2FnZSk7XHJcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL2Jhc2VOb3RpZmllci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWVyIHtcclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvblR5cGVzLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgbnVtYmVyTW9kdWxlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkgfSBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlciB9IGZyb20gJy4vZmlsZVNpemVGaWx0ZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW251bWJlck1vZHVsZU5hbWVdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkpXHJcblx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuZW51bSBTaWduIHtcclxuXHRwb3NpdGl2ZSA9IDEsXHJcblx0bmVnYXRpdmUgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdH1cclxuXHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHR9XHJcblxyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCFzdGVwKSB7XHJcblx0XHRcdHJldHVybiBudW07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlbWFpbmRlcjogbnVtYmVyID0gbnVtICUgc3RlcDtcclxuXHJcblx0XHRpZiAocmVtYWluZGVyID49IHN0ZXAgLyAyKSB7XHJcblx0XHRcdHJldHVybiBudW0gKyAoc3RlcCAtIHJlbWFpbmRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVtIC0gcmVtYWluZGVyO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTnVtYmVyVXRpbGl0eSwgc2VydmljZU5hbWUgYXMgbnVtYmVyU2VydmljZU5hbWUgfSBmcm9tICcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZSB7XHJcblx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEZpbGVTaXplU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU2l6ZSB7XHJcblx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRCWVRFU19QRVJfS0I6IG51bWJlciA9IDEwMjQ7XHJcblxyXG5cdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdEdCOiBudW1iZXI7XHJcblx0aXNHQjogYm9vbGVhbjtcclxuXHJcblx0TUI6IG51bWJlcjtcclxuXHRpc01COiBib29sZWFuO1xyXG5cclxuXHRLQjogbnVtYmVyO1xyXG5cdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHR0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0dGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5pc0dCKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemU7XHJcbn1cclxuXHJcbmZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlclNlcnZpY2VOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBJTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIElGaWxlU2l6ZUZhY3RvcnksIElGaWxlU2l6ZSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcblxyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG5leHBvcnQgdmFyIHNpbXBsZUZpbHRlck5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdChieXRlcz86IG51bWJlcik6IHN0cmluZztcclxufVxyXG5cclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3RvcnkpOiBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdHZhciBmaWxlU2l6ZTogSUZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuXHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG59IGZyb20gJy4uL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgc3RyaW5nTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBzdHJpbmdTZXJ2aWNlTmFtZSxcclxuXHRJU3RyaW5nVXRpbGl0eVNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElTZXJpYWxpemFibGVGaWx0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXJzL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgSVNlcmlhbGl6YWJsZUZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRtaW5TZWFyY2hMZW5ndGg6IG51bWJlcjtcclxuXHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0c2VyaWFsaXplKCk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0bWluU2VhcmNoTGVuZ3RoOiBudW1iZXIgPSAxO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIG9iamVjdDogSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHsgfVxyXG5cclxuXHRzZXJpYWxpemUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLnNlYXJjaFRleHQgIT0gbnVsbCAmJiB0aGlzLnNlYXJjaFRleHQubGVuZ3RoID49IHRoaXMubWluU2VhcmNoTGVuZ3RoXHJcblx0XHRcdD8gdGhpcy5zZWFyY2hUZXh0XHJcblx0XHRcdDogbnVsbDtcclxuXHR9XHJcblxyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSB8fCB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDwgdGhpcy5taW5TZWFyY2hMZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdHJldHVybiBfLnNvbWUodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbn1cclxuXHJcbmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWUsIHN0cmluZ1NlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSxcclxuXHRzdHJpbmdVdGlsaXR5OiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lLCBzdHJpbmdNb2R1bGVOYW1lXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiArc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHR9XHJcblxyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmd1aWQnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZ3VpZFNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR3VpZFNlcnZpY2Uge1xyXG5cdHRpbWUoKTogc3RyaW5nO1xyXG5cdHJhbmRvbSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRTZXJ2aWNlIGltcGxlbWVudHMgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52MSgpO1xyXG5cdH1cclxuXHJcblx0cmFuZG9tKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52NCgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEd1aWRTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ3VpZC9ndWlkLnNlcnZpY2UudHNcbiAqKi8iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgcm5nO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgIHJldHVybiBfcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3JuZy1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRldmVudD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0fSlcclxuXHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHR9KS52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcblxyXG5uZy5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxuXHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdHJlc29sdmVQcm9taXNlcyhyZXNvbHZlczogYW55KTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckaW5qZWN0b3InXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7fVxyXG5cclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0fVxyXG5cclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcHJvbWlzZXM6IGFueSA9IHt9O1xyXG5cdFx0Xy5lYWNoKHJlc29sdmVzLCAodmFsdWU6IGFueSwga2V5OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkgfHwgXy5pc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmdldCh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih2YWx1ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4kcS5hbGwocHJvbWlzZXMpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN5bmNocm9uaXplZFJlcXVlc3RzJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0ZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlcjtcclxuXHRoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrO1xyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHJlcXVlc3RJZDogbnVtYmVyID0gMDtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlclxyXG5cdFx0XHQsIHB1YmxpYyBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHsgfVxyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHRcdC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcblx0XHR0aGlzLnJlcXVlc3RJZCsrO1xyXG5cdFx0bGV0IGN1cnJlbnRSZXF1ZXN0SWQ6IG51bWJlciA9IHRoaXMucmVxdWVzdElkO1xyXG5cdFx0dGhpcy4kcS53aGVuKHRoaXMuZGF0YVByb3ZpZGVyKC4uLnBhcmFtcykpLnRoZW4oKC4uLmRhdGE6IGFueVtdKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChjdXJyZW50UmVxdWVzdElkID09IHRoaXMucmVxdWVzdElkKSB7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGVSZXF1ZXN0KC4uLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RHZXR0ZXIge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0Q2FsbGJhY2sge1xyXG5cdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn1cclxuXHJcbnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxOiBhbmd1bGFyLklRU2VydmljZSk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyLCBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrKTogSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJy4vbW9jayc7XHJcbmV4cG9ydCB7IG1vY2sgfTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYW5ndWxhckZpeHR1cmUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdG1vY2subW9kdWxlTmFtZSxcclxuXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9ja1V0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0cHJvbWlzZTogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRkYXRhOiBURGF0YVR5cGU7XHJcblx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgTW9jayB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzZXJ2aWNlKSkge1xyXG5cdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdHZhciBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPiA9IHRoaXMuJHEuZGVmZXI8VERhdGFUeXBlPigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBhbmd1bGFyLklTY29wZSk6IHZvaWQge1xyXG5cdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuXHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE1vY2spO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2sudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2FuZ3VsYXItbW9ja3MnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHQ6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0ZGlyZWN0aXZlPFRDb250cm9sbGVyVHlwZT4oZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBkb206IHN0cmluZywgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG59XHJcblxyXG5jbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHR9XHJcblxyXG5cdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdHZhciAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbnkpOiBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZChzZXJ2aWNlcy4kcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdHZhciAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHR2YXIgY29tcG9uZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkgPSAkY29tcGlsZShkb20pKHNjb3BlKTtcclxuXHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0Y29udHJvbGxlcjogY29tcG9uZW50LmNvbnRyb2xsZXIoZGlyZWN0aXZlTmFtZSksXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbm90aWZpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBub3RpZmljYXRpb25TZXJ2aWNlTmFtZSxcclxuXHRJTm90aWZpY2F0aW9uU2VydmljZSxcclxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSUNvbXBvc2l0ZVZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdGlvblR5cGVzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvc2l0ZVZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3ZhbGlkYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgZXJyb3Igbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyB3YXJuaW5nIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSkgeyB9XHJcblxyXG5cdGJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZEN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBWYWxpZGF0aW9uU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciBpbXBsZW1lbnRzIElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogc3RyaW5nXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRsZXQgZXJyb3I6IHN0cmluZyA9IHRoaXMuZXJyb3JNZXNzYWdlKGhhbmRsZXIpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogbnVtYmVyID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvdW50O1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc0FjdGl2ZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZXJyb3JNZXNzYWdlKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHQ/ICg8eyAoKTogc3RyaW5nIH0+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0OiA8c3RyaW5nPmhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUNvbXBvc2l0ZVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcblxyXG5pbnRlcmZhY2UgSVJlZ2lzdGVyZWRWYWxpZGF0b3IgZXh0ZW5kcyBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRrZXk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVZhbGlkYXRvciBpbXBsZW1lbnRzIElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgY2hpbGRWYWxpZGF0b3JzOiB7IFtpbmRleDogc3RyaW5nXTogSVNpbXBsZVZhbGlkYXRvciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoaGFuZGxlcjogSVNpbXBsZVZhbGlkYXRvcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAoIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKDxhbnk+dGhpcy5jaGlsZFZhbGlkYXRvcnMsIChjb3VudDogbnVtYmVyLCBoYW5kbGVyOiBJU2ltcGxlVmFsaWRhdG9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0cmV0dXJuIGNvdW50ICs9IGhhbmRsZXIuZ2V0RXJyb3JDb3VudCgpO1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0bGV0IHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy5jaGlsZFZhbGlkYXRvcnNbY3VycmVudEtleV0gPSB2YWxpZGF0b3I7XHJcblx0XHQoPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5ID0gY3VycmVudEtleTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvcik6IHZvaWQge1xyXG5cdFx0ZGVsZXRlIHRoaXMuY2hpbGRWYWxpZGF0b3JzWyg8SVJlZ2lzdGVyZWRWYWxpZGF0b3I+dmFsaWRhdG9yKS5rZXldO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdG9yIHtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW1wbGVWYWxpZGF0b3IgZXh0ZW5kcyBJVmFsaWRhdG9yIHtcclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2l0ZVZhbGlkYXRvciBleHRlbmRzIElWYWxpZGF0b3Ige1xyXG5cdGJ1aWxkQ2hpbGRWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHR1bnJlZ2lzdGVyQ2hpbGQodmFsaWRhdG9yOiBJU2ltcGxlVmFsaWRhdG9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHsoKTogc3RyaW5nfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyIHtcclxuXHQoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb25UeXBlcy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcGFyZVJlc3VsdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaXRlbUxpc3QnO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtIHtcclxuICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkaXNwbGF5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUl0ZW1MaXN0PFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiB7XHJcblx0Z2V0KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBUSXRlbVR5cGU7XHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbUxpc3Q8VEl0ZW1UeXBlIGV4dGVuZHMgSUl0ZW0+IHtcclxuXHRwcml2YXRlIGl0ZW1zOiBUSXRlbVR5cGVbXTtcclxuXHJcblx0c2V0SXRlbXMoaXRlbXM6IFRJdGVtVHlwZVtdKTogdm9pZCB7XHJcblx0XHR0aGlzLml0ZW1zID0gaXRlbXM7XHJcblx0fVxyXG5cclxuXHRnZXQodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IFRJdGVtVHlwZSB7XHJcblx0XHR2YXIgcHJlZGljYXRlOiB7IChpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIH07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cHJlZGljYXRlID0gKGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoaXRlbS5uYW1lID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwcmVkaWNhdGUgPSAoaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIChpdGVtLnZhbHVlID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIF8uZmluZCh0aGlzLml0ZW1zLCBwcmVkaWNhdGUpO1xyXG5cdH1cclxuXHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9pdGVtTGlzdC50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=