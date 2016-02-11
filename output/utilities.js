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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDdiZDI3MTQyZWMyZGNjOWY3YjEiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvZmlsdGVycy9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9jb252ZXJ0ZXJzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZGF0ZUNvbnZlcnRlci9kYXRlQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvaXRlbUxpc3QudHMiXSwibmFtZXMiOlsic3RvcEV2ZW50UHJvcGFnYXRpb24iLCJzdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwiaXNFbXB0eSIsIk9iamVjdFV0aWxpdHkiLCJPYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwiT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwiT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJPYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwiT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsIk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJPYmplY3RVdGlsaXR5LnByb3BlcnR5TmFtZVRvU3RyaW5nIiwiQXJyYXlVdGlsaXR5IiwiQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwiQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwiQXJyYXlVdGlsaXR5LnJlbW92ZSIsIkFycmF5VXRpbGl0eS5yZXBsYWNlIiwiQXJyYXlVdGlsaXR5LnN1bSIsIkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJBcnJheVV0aWxpdHkubGFzdCIsIm1vbWVudFdyYXBwZXIiLCJUaW1lVXRpbGl0eSIsIlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwiVGltZVV0aWxpdHkuY29tcGFyZVRpbWVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsIkNvbXBhcmVSZXN1bHQiLCJnZXRDb21wYXJlUmVzdWx0IiwiRGF0ZVV0aWxpdHkiLCJEYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJEYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwiRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsIkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbkRheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyIsIkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsIkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwiRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nIiwiRGF0ZVV0aWxpdHkuaXNEYXRlIiwiRGF0ZVV0aWxpdHkuZ2V0Tm93IiwiRGF0ZVV0aWxpdHkuZm9ybWF0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldEZvcm1hdCIsIkRhdGVVdGlsaXR5LnNhbWVEYXRlIiwiRGF0ZVV0aWxpdHkuc2FtZURhdGVUaW1lIiwidHJ1bmNhdGUiLCJCb29sZWFuVXRpbGl0eSIsIkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwiQm9vbGVhblV0aWxpdHkudG9Cb29sIiwiQmFzZVJlc291cmNlQnVpbGRlciIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY29uc3RydWN0b3IiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmdldExpYnJhcnlTZXJ2aWNlcyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci51c2VNb2NrSWZOb0VuZHBvaW50IiwiQmFzZURhdGFTZXJ2aWNlIiwiQmFzZURhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlLmdldEl0ZW1FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZS5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlLmdldERldGFpbCIsIkJhc2VEYXRhU2VydmljZS5jcmVhdGUiLCJCYXNlRGF0YVNlcnZpY2UudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlLmRlbGV0ZSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmdldExpc3QiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRJdGVtIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZGVsZXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IubG9nIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuYXBwbHlUcmFuc2Zvcm0iLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5pc0NvbnZlcnRlciIsIkJhc2VEYXRhU2VydmljZVZpZXciLCJCYXNlRGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXciLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZSIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5nZXQiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UudXBkYXRlIiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSIsImJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY2hpbGRDb250cmFjdHMiLCJmcm9tU2VydmVyIiwidG9TZXJ2ZXIiLCJFbnVtQ29udmVydGVyIiwiRW51bUNvbnZlcnRlci5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeSIsIkNvbnRyYWN0TGlicmFyeS5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeS5mbHVzaCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXRMaXN0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXREZXRhaWwiLCJDb250cmFjdExpYnJhcnkubW9ja0NoaWxkIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2siLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1BhcmVudCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrU2luZ2xldG9uIiwiQ29udHJhY3RMaWJyYXJ5LnVwZGF0ZVJlc291cmNlIiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrU2F2ZSIsIkNvbnRyYWN0TGlicmFyeS5zaW5vbiIsIkh0dHBTdGF0dXNDb2RlIiwiRXJyb3JIYW5kbGVyU2VydmljZSIsIkVycm9ySGFuZGxlclNlcnZpY2UuY29uc3RydWN0b3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmh0dHBSZXNwb25zZUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5sb2dnZWRPdXRFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW52YWxpZFVybEVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS50aW1lb3V0RXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLnN5c3RlbUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIk5vdGlmaWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJOb3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmciLCJOb3RpZmljYXRpb25TZXJ2aWNlLmVycm9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwibm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIiwiQmFzZU5vdGlmaWVyIiwiQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwiQmFzZU5vdGlmaWVyLmluZm8iLCJCYXNlTm90aWZpZXIud2FybmluZyIsIkJhc2VOb3RpZmllci5lcnJvciIsIkJhc2VOb3RpZmllci5zdWNjZXNzIiwiQmFzZU5vdGlmaWVyLm5vdGlmeSIsIlNpZ24iLCJOdW1iZXJVdGlsaXR5IiwiTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsIk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwiTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwiTnVtYmVyVXRpbGl0eS5yb3VuZFRvU3RlcCIsIkZpbGVTaXplU2VydmljZSIsIkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsIkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwiZmlsZVNpemVGYWN0b3J5IiwiZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwiZmlsZVNpemVGaWx0ZXIiLCJHZW5lcmljU2VhcmNoRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5jb25zdHJ1Y3RvciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hPYmplY3QiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSIsImdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LmdldEluc3RhbmNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5jb25zdHJ1Y3RvciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29udGFpbnMiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5zdWJzdGl0dXRlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsIkd1aWRTZXJ2aWNlIiwiR3VpZFNlcnZpY2UuY29uc3RydWN0b3IiLCJHdWlkU2VydmljZS50aW1lIiwiR3VpZFNlcnZpY2UucmFuZG9tIiwiT2JzZXJ2YWJsZVNlcnZpY2UiLCJPYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsIk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwiT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsIk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJQcm9taXNlVXRpbGl0eSIsIlByb21pc2VVdGlsaXR5LmNvbnN0cnVjdG9yIiwiUHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlIiwiUHJvbWlzZVV0aWxpdHkucmVzb2x2ZVByb21pc2VzIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlLmdldERhdGEiLCJzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkiLCJzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJNb2NrIiwiTW9jay5jb25zdHJ1Y3RvciIsIk1vY2suc2VydmljZSIsIk1vY2sucHJvbWlzZSIsIk1vY2sucHJvbWlzZVdpdGhDYWxsYmFjayIsIk1vY2suZmx1c2giLCJBbmd1bGFyRml4dHVyZSIsIkFuZ3VsYXJGaXh0dXJlLmNvbnN0cnVjdG9yIiwiQW5ndWxhckZpeHR1cmUuaW5qZWN0IiwiQW5ndWxhckZpeHR1cmUubW9jayIsIkFuZ3VsYXJGaXh0dXJlLmNvbnRyb2xsZXJXaXRoQmluZGluZ3MiLCJBbmd1bGFyRml4dHVyZS5kaXJlY3RpdmUiLCJWYWxpZGF0aW9uU2VydmljZSIsIlZhbGlkYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ3VzdG9tVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yIiwiVmFsaWRhdG9yIiwiVmFsaWRhdG9yLmNvbnN0cnVjdG9yIiwiVmFsaWRhdG9yLnZhbGlkYXRlIiwiVmFsaWRhdG9yLmdldEVycm9yQ291bnQiLCJWYWxpZGF0b3IucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciIsIlZhbGlkYXRvci51bnJlZ2lzdGVyIiwiVmFsaWRhdG9yLmlzQWN0aXZlIiwiVmFsaWRhdG9yLmVycm9yTWVzc2FnZSIsIkNvbXBvc2l0ZVZhbGlkYXRvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci5jb25zdHJ1Y3RvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci52YWxpZGF0ZSIsIkNvbXBvc2l0ZVZhbGlkYXRvci5nZXRFcnJvckNvdW50IiwiQ29tcG9zaXRlVmFsaWRhdG9yLmJ1aWxkQ2hpbGRWYWxpZGF0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IudW5yZWdpc3RlckNoaWxkIiwiSXRlbUxpc3QiLCJJdGVtTGlzdC5jb25zdHJ1Y3RvciIsIkl0ZW1MaXN0LnNldEl0ZW1zIiwiSXRlbUxpc3QuZ2V0IiwiSXRlbUxpc3QuYWxsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztB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QSxRQUFhQTtTQUE3QkcsaUJBYUNBO1NBWkFBLElBQUlBLFFBQVFBLEdBQVFBLEVBQUVBLENBQUNBO1NBQ3ZCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxVQUFDQSxLQUFVQSxFQUFFQSxHQUFRQTthQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQzdDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM5REEsQ0FBQ0E7YUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQzlCQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUMzREEsQ0FBQ0E7YUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7aUJBQ1BBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEtBQUlBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2FBQ3ZDQSxDQUFDQTtTQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUVIQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUM5QkEsQ0FB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Q0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7S0FDcEJBLENBQUNBO0tBRURGLHNCQUFHQSxHQUFIQSxVQUFJQSxLQUFzQkE7U0FDekJHLElBQUlBLFNBQXlDQSxDQUFDQTtTQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsS0FBS0EsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLFNBQVNBLEdBQUdBLFVBQUNBLElBQWVBO2lCQUMzQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDOUJBLENBQUNBLENBQUNBO1NBQ0hBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLFNBQVNBLEdBQUdBLFVBQUNBLElBQWVBO2lCQUMzQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLENBQUNBLENBQUNBO1NBQ0hBLENBQUNBO1NBRURBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO0tBQ3RDQSxDQUFDQTtLQUVESCxzQkFBR0EsR0FBSEE7U0FDQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7S0FDbkJBLENBQUNBO0tBQ0ZKLGVBQUNBO0FBQURBLEVBQUNBLElBQUE7QUExQlksaUJBQVEsV0EwQnBCIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIm91dHB1dFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDdiZDI3MTQyZWMyZGNjOWY3YjFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYmVoYXZpb3JzIGZyb20gJy4vYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9maWx0ZXJzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvc2VydmljZXMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcy90eXBlcy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHsgYmVoYXZpb3JzLCBmaWx0ZXJzLCBzZXJ2aWNlcywgdHlwZXMgfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0YmVoYXZpb3JzLm5hbWUsXHJcblx0ZmlsdGVycy5uYW1lLFxyXG5cdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS91dGlsaXRpZXMudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImFuZ3VsYXJcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBzdG9wRXZlbnRQcm9wb2dhdGlvbiBmcm9tICcuL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcbmV4cG9ydCB7IHN0b3BFdmVudFByb3BvZ2F0aW9uIH07XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcbmV4cG9ydCB2YXIgZGlyZWN0aXZlTmFtZTogc3RyaW5nID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIGFuZ3VsYXIuSUF0dHJpYnV0ZXMge1xyXG5cdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKTogYW5ndWxhci5JRGlyZWN0aXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRsaW5rKHNjb3BlOiBhbmd1bGFyLklTY29wZVxyXG5cdFx0XHQsIGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHQsIGF0dHJzOiBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyk6IHZvaWQge1xyXG5cdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBpc0VtcHR5IGZyb20gJy4vaXNFbXB0eS9pc0VtcHR5JztcclxuaW1wb3J0ICogYXMgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZS90cnVuY2F0ZSc7XHJcblxyXG5leHBvcnQgeyBpc0VtcHR5LCB0cnVuY2F0ZSB9O1xyXG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0aXNFbXB0eS5tb2R1bGVOYW1lLFxyXG5cdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7XHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnaXNFbXB0eSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW47XHJcbn1cclxuXHJcbmlzRW1wdHkuJGluamVjdCA9IFtvYmplY3RTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSk6IElJc0VtcHR5RmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0dmFyIGlzRW1wdHk6IGJvb2xlYW4gPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcblxyXG5cdFx0aWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0c2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSxcclxuXHRJQXJyYXlVdGlsaXR5XHJcbn0gZnJvbSAnLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBfX2RhdGVVdGlsaXR5IGZyb20gJy4uL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdFV0aWxpdHkge1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbjtcclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHRwcm9wZXJ0eU5hbWVUb1N0cmluZyhwcm9wZXJ0eUZ1bmN0aW9uOiAoKSA9PiBhbnkpOiBzdHJpbmc7XHJcblxyXG59XHJcblxyXG5jbGFzcyBPYmplY3RVdGlsaXR5IGltcGxlbWVudHMgSU9iamVjdFV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFthcnJheVNlcnZpY2VOYW1lLCBfX2RhdGVVdGlsaXR5LnNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5LCBwcml2YXRlIGRhdGVVdGlsaXR5OiBfX2RhdGVVdGlsaXR5LklEYXRlVXRpbGl0eSkge1xyXG5cdH1cclxuXHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gXy5zb21lKG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHR9XHJcblxyXG5cdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0dmFyIHR5cGUyOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMjtcclxuXHJcblx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChfLmlzRGF0ZShvYmoxKSAmJiBfLmlzRGF0ZShvYmoyKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRlVXRpbGl0eS5zYW1lRGF0ZVRpbWUob2JqMSwgb2JqMik7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdHZhciBrZXlzMjogc3RyaW5nW10gPSBfLmtleXMob2JqMik7XHJcblx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdGlmIChfLnNvbWUoa2V5czIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0fVxyXG5cclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvcGVydHlOYW1lVG9TdHJpbmcocHJvcGVydHlGdW5jdGlvbjogKCkgPT4gYW55KTogc3RyaW5nIHtcclxuXHRcdGxldCBzdHJpbmdWYWx1ZSA9IHByb3BlcnR5RnVuY3Rpb24udG9TdHJpbmcoKTtcclxuXHRcdGxldCByZWdFeHBMaXRlcmFsID0gL1xcLihbXlxcLjtdKyk7P1xccypcXH0kLztcclxuXHRcdGxldCBwcm9wZXJ0eU5hbWUgPSAgcmVnRXhwTGl0ZXJhbC5leGVjKHN0cmluZ1ZhbHVlKVsxXTtcclxuXHRcdHJldHVybiBwcm9wZXJ0eU5hbWU7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lLF9fZGF0ZVV0aWxpdHkubW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIl9cIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlx0J3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlO1xyXG5cdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdH1cclxuXHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIH0pXHJcblx0XHQ6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSB7XHJcblx0XHQvLyBuZWVkcyB0byBiZSBzZWVkZWQgd2l0aCBhbiBvYmplY3Qgb3IgaXQgd2lsbCBiZSB2aWV3ZWQgYXMgYW4gYXJyYXkgd2l0aCBubyBpdGVtc1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9LCBpdGVtOiBURGF0YVR5cGUpOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0gPT4ge1xyXG5cdFx0XHRkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSwgPGFueT57fSk7XHJcblx0fVxyXG5cclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlIHtcclxuXHRcdGlmIChhcnJheSAhPSBudWxsICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lIH0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0ZVV0aWxpdHksIHNlcnZpY2VOYW1lIH0gZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudE1vZHVsZU5hbWUsIHRpbWVNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIm1vbWVudFwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9tZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi4vZGF0ZS9kYXRlLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0aW1lVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lVXRpbGl0eSB7XHJcblx0Y29tcGFyZVRpbWVzKHRpbWUxOiBzdHJpbmcsIHRpbWUyOiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0O1xyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0Y29tcGFyZVRpbWVzKHRpbWUxOiBzdHJpbmcsIHRpbWUyOiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0IHtcclxuXHRcdGxldCBmb3JtYXQ6IHN0cmluZyA9IGRlZmF1bHRGb3JtYXRzLnRpbWVGb3JtYXQ7XHJcblxyXG5cdFx0bGV0IHN0YXJ0OiBtb21lbnQuTW9tZW50ID0gbW9tZW50KHRpbWUxLCBmb3JtYXQpO1xyXG5cdFx0bGV0IGVuZDogbW9tZW50Lk1vbWVudCA9IG1vbWVudCh0aW1lMiwgZm9ybWF0KTtcclxuXHJcblx0XHRpZiAoc3RhcnQuaG91cnMoKSA9PSBlbmQuaG91cnMoKVxyXG5cdFx0XHQmJiBzdGFydC5taW51dGVzKCkgPT0gZW5kLm1pbnV0ZXMoKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5lcXVhbDtcclxuXHRcdH0gZWxzZSBpZiAoc3RhcnQuaG91cnMoKSA+PSBlbmQuaG91cnMoKVxyXG5cdFx0XHRcdCYmIHN0YXJ0Lm1pbnV0ZXMoKSA+PSBlbmQubWludXRlcygpKSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHRpbWVVdGlsaXR5OiBJVGltZVV0aWxpdHkgPSBuZXcgVGltZVV0aWxpdHkoKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0Z3JlYXRlciA9IDEsXHJcblx0ZXF1YWwgPSAwLFxyXG5cdGxlc3MgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyB0aW1lTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyB0aW1lU2VydmljZU5hbWUsXHJcblx0SVRpbWVVdGlsaXR5LFxyXG5cdHRpbWVVdGlsaXR5LFxyXG59IGZyb20gJy4uL3RpbWUvdGltZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG1vbWVudFNlcnZpY2VOYW1lLFxyXG59IGZyb20gJy4uL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCwgZ2V0Q29tcGFyZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnO1xyXG5cclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlVmFsdWUge1xyXG5cdHllYXJzOiBudW1iZXI7XHJcblx0bW9udGhzOiBudW1iZXI7XHJcblx0ZGF5czogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nO1xyXG5cdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlO1xyXG5cdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdHN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IENvbXBhcmVSZXN1bHQ7XHJcblx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuO1xyXG5cdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGU7XHJcblx0Z2V0RGF0ZUZyb21JU09TdHJpbmcoZGF0ZTogc3RyaW5nKTogRGF0ZTtcclxuXHRpc0RhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0Z2V0Tm93KCk6IERhdGU7XHJcblx0Zm9ybWF0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nO1xyXG5cdHNhbWVEYXRlKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRzYW1lRGF0ZVRpbWUoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlMUZvcm1hdD86IHN0cmluZywgZGF0ZTJGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFttb21lbnRTZXJ2aWNlTmFtZSwgdGltZVNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbWVudDogbW9tZW50Lk1vbWVudFN0YXRpYywgcHJpdmF0ZSB0aW1lOiBJVGltZVV0aWxpdHkpIHtcclxuXHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XTtcclxuXHR9XHJcblxyXG5cdG1vbnRoOiBJTW9udGhbXTtcclxuXHRwcml2YXRlIGJhc2VGb3JtYXQ6IHN0cmluZyA9ICdNTS1ERC1ZWVlZJztcclxuXHJcblx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHR9XHJcblxyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0cmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblx0XHRyZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgLT0gMTtcclxuXHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRyZXN1bHQubW9udGhzICs9IDEyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHR2YXIgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0cmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHJldHVybiBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblx0fVxyXG5cclxuXHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHQvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG5cdFx0dmFyIGRpZmZlcmVuY2U6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiBnZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdH1cclxuXHJcblx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBDb21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG5cdFx0XHRyZXR1cm4gPERhdGU+ZGF0ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKS50b0RhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGUge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KGRhdGUpLnRvRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzRGF0ZShkYXRlKSlcclxuXHRcdHtcclxuXHRcdFx0Ly9sb2Rhc2ggd2lsbCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBhIHZhbGlkIGRhdGUgb2JqZWN0LCBidXQgaGFzIGluIGludmFsaWQgdmFsdWUuXHJcblx0XHRcdC8vY2hlY2sgdGhlIHRpbWUgdmFsdWUgb2YgdGhlIGRhdGUgb2JqZWN0IHRvIHZlcmlmeSB0aGF0IGl0J3MgYSBWYWxpZCBEYXRlLlxyXG5cdFx0XHRyZXR1cm4gIWlzTmFOKGRhdGUuZ2V0VGltZSgpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKS5pc1ZhbGlkKCk7XHJcblx0fVxyXG5cclxuXHRnZXROb3coKTogRGF0ZSB7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoKTtcclxuXHR9XHJcblxyXG5cdGZvcm1hdERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQodGhpcy5nZXREYXRlKGRhdGUsIGRhdGVGb3JtYXQpKS5mb3JtYXQodGhpcy5nZXRGb3JtYXQoZGF0ZUZvcm1hdCkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRGb3JtYXQoY3VzdG9tRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIGN1c3RvbUZvcm1hdCAhPSBudWxsID8gY3VzdG9tRm9ybWF0IDogdGhpcy5iYXNlRm9ybWF0O1xyXG5cdH1cclxuXHJcblx0c2FtZURhdGUoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlMUZvcm1hdD86IHN0cmluZywgZGF0ZTJGb3JtYXQ/OiBzdHJpbmcpIHtcclxuXHRcdGlmIChkYXRlMUZvcm1hdCAhPSB1bmRlZmluZWQgJiYgZGF0ZTJGb3JtYXQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRkYXRlMkZvcm1hdCA9IGRhdGUxRm9ybWF0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNEYXRlKGRhdGUxLCBkYXRlMUZvcm1hdCkgJiYgdGhpcy5pc0RhdGUoZGF0ZTIsIGRhdGUyRm9ybWF0KSkge1xyXG5cdFx0XHRyZXR1cm4gbW9tZW50KDxhbnk+ZGF0ZTEsZGF0ZTFGb3JtYXQpLmZvcm1hdChcIk1NL0REL1lZWVlcIikgPT09IG1vbWVudCg8YW55PmRhdGUyLGRhdGUyRm9ybWF0KS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2FtZURhdGVUaW1lKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKSB7XHJcblx0XHRpZiAoZGF0ZTFGb3JtYXQgIT0gdW5kZWZpbmVkICYmIGRhdGUyRm9ybWF0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGF0ZTJGb3JtYXQgPSBkYXRlMUZvcm1hdDtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRGF0ZShkYXRlMSwgZGF0ZTFGb3JtYXQpICYmIHRoaXMuaXNEYXRlKGRhdGUyLCBkYXRlMkZvcm1hdCkpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudCg8YW55PmRhdGUxLGRhdGUxRm9ybWF0KS5mb3JtYXQoXCJNTS9ERC9ZWVlZICstSEhtbVwiKSA9PT0gbW9tZW50KDxhbnk+ZGF0ZTIsZGF0ZTJGb3JtYXQpLmZvcm1hdChcIk1NL0REL1lZWVkgKy1ISG1tXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkYXRlVXRpbGl0eTogSURhdGVVdGlsaXR5ID0gbmV3IERhdGVVdGlsaXR5KG1vbWVudCwgdGltZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlRm9ybWF0U3RyaW5ncyB7XHJcblx0aXNvRm9ybWF0OiBzdHJpbmc7XHJcblx0ZGF0ZVRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0dGltZUZvcm1hdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0aXNvRm9ybWF0OiAnWVlZWS1NTS1ERFRISDptbTpzcycsXHJcblx0ZGF0ZVRpbWVGb3JtYXQ6ICdNL0QvWVlZWSBoOm1tIEEnLFxyXG5cdGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcblx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcbn1cclxuXHJcbnRydW5jYXRlLiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGFycmF5IGZyb20gJy4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGJvb2xlYW4gZnJvbSAnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGRhdGFDb250cmFjdHMgZnJvbSAnLi9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZGF0ZSBmcm9tICcuL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSAnLi9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBmaWxlU2l6ZSBmcm9tICcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGdlbmVyaWNTZWFyY2hGaWx0ZXIgZnJvbSAnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGd1aWQgZnJvbSAnLi9ndWlkL2d1aWQuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICcuL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuaW1wb3J0ICogYXMgbm90aWZpY2F0aW9uIGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbnVtYmVyU2VydmljZSBmcm9tICcuL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9iamVjdFNlcnZpY2UgZnJvbSAnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlIGZyb20gJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwYXJlbnRDaGlsZEJlaGF2aW9yIGZyb20gJy4vcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwcm9taXNlIGZyb20gJy4vcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzdHJpbmdTZXJ2aWNlIGZyb20gJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgc3luY2hyb25pemVkUmVxdWVzdHMgZnJvbSAnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgdGVzdCBmcm9tICcuL3Rlc3QvdGVzdC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0aW1lIGZyb20gJy4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhcnJheSxcclxuXHRib29sZWFuLFxyXG5cdGRhdGFDb250cmFjdHMsXHJcbiAgICBkYXRlLFxyXG4gICAgZXJyb3JIYW5kbGVyLFxyXG5cdGZpbGVTaXplLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIsXHJcblx0Z3VpZCxcclxuXHRtb21lbnQsXHJcblx0bm90aWZpY2F0aW9uLFxyXG5cdG51bWJlclNlcnZpY2UgYXMgbnVtYmVyLFxyXG5cdG9iamVjdFNlcnZpY2UgYXMgb2JqZWN0LFxyXG5cdG9ic2VydmFibGUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvcixcclxuXHRwcm9taXNlLFxyXG5cdHN0cmluZ1NlcnZpY2UgYXMgc3RyaW5nLFxyXG5cdHN5bmNocm9uaXplZFJlcXVlc3RzLFxyXG5cdHRlc3QsXHJcblx0dGltZSxcclxuXHR2YWxpZGF0aW9uLFxyXG59O1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuXHRkYXRhQ29udHJhY3RzLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRlLm1vZHVsZU5hbWUsXHJcbiAgICBlcnJvckhhbmRsZXIubW9kdWxlTmFtZSxcclxuXHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuXHRndWlkLm1vZHVsZU5hbWUsXHJcblx0bW9tZW50Lm1vZHVsZU5hbWUsXHJcblx0bm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0bnVtYmVyU2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRzdHJpbmdTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMubW9kdWxlTmFtZSxcclxuXHR0aW1lLm1vZHVsZU5hbWUsXHJcblx0dGVzdC5tb2R1bGVOYW1lLFxyXG5cdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyByZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIGNvbnZlcnRlcnMgZnJvbSAnLi9jb252ZXJ0ZXJzL2NvbnZlcnRlcnMnO1xyXG5pbXBvcnQgKiBhcyBtb2NrcyBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0YUNvbnRyYWN0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvY29udHJhY3RMaWJyYXJ5JztcclxuZXhwb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgSUJhc2VEYXRhU2VydmljZUZhY3RvcnksIElCYXNlRG9tYWluT2JqZWN0LCBCYXNlRGF0YVNlcnZpY2UsIGZhY3RvcnlOYW1lIGFzIGJhc2VEYXRhU2VydmljZUZhY3RvcnlOYW1lIH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3LCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnksIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgZmFjdG9yeU5hbWUgYXMgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlUmVzb3VyY2VCdWlsZGVyLCBzZXJ2aWNlTmFtZSBhcyBidWlsZGVyU2VydmljZU5hbWUgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuZXhwb3J0IHsgY29udmVydGVycywgbW9ja3MgfTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRiYXNlRGF0YVNlcnZpY2VNb2R1bGVOYW1lLFxyXG5cdGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUsXHJcblx0cmVzb3VyY2VCdWlsZGVyTW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElDb250cmFjdExpYnJhcnksIENvbnRyYWN0TGlicmFyeSwgSUxpYnJhcnlTZXJ2aWNlcyB9IGZyb20gJy4vY29udHJhY3RMaWJyYXJ5JztcclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcsIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LCBCYXNlRGF0YVNlcnZpY2VWaWV3LCBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlLCBCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYmFzZVJlc291cmNlQnVpbGRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIFVybCB0byBoaXQgd2l0aCBnZXRMaXN0IGFuZCBjcmVhdGVcclxuXHQqIC0gZXh0ZW5kZWQgd2l0aCAvaWQgZm9yIGdldERldGFpbCwgdXBkYXRlLCBhbmQgZGVsZXRlXHJcblx0Ki9cclxuXHRlbmRwb2ludD86IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0KiBGbGFnIGZvciBzcGVjaWZ5aW5nIGlmIHRoZSBkYXRhIHNlcnZpY2Ugc2hvdWxkIHVzZSB0aGUgbW9jayBkYXRhIG9yIGhpdCB0aGUgYWN0dWFsIGVuZHBvaW50XHJcblx0KiBkZWZhdWx0cyB0byB0cnVlIGlmIGVuZHBvaW50IGlzIG5vdCBkZWZpbmVkXHJcblx0Ki9cclxuXHR1c2VNb2NrPzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0KiBGbGFnIGZvciBzcGVjaWZ5aW5nIGlmIHRoZSBkYXRhIHNlcnZpY2Ugc2hvdWxkIGxvZyBhbGwgcmVxdWVzdHMgYWdhaW5zdCB0aGUgY29udHJhY3RcclxuXHQqL1xyXG5cdGxvZ1JlcXVlc3RzPzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0KiBNYXBwaW5nIHRvIHNwZWNpZnkgaG93IHByb3BlcnRpZXMgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIHRvIGFuZCBmcm9tIHRoZSBzZXJ2ZXJcclxuXHQqL1xyXG5cdHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PiBleHRlbmRzIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEV4YW1wbGUgZGF0YSBzZXQgdG8gYmUgdXNlZCBmb3IgdGVzdGluZyBhbmQgcHJvdG90eXBpbmcgaW5zdGVhZCBvZiBoaXR0aW5nIHRoZSBlbmRwb2ludFxyXG5cdCovXHJcblx0bW9ja0RhdGE/OiBURGF0YVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBFeGFtcGxlIG9iamVjdCB0byBiZSB1c2VkIGZvciB0ZXN0aW5nIGFuZCBwcm90b3R5cGluZyBpbnN0ZWFkIG9mIGhpdHRpbmcgdGhlIGVuZHBvaW50XHJcblx0Ki9cclxuXHRtb2NrRGF0YT86IFREYXRhVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VSZXNvdXJjZUJ1aWxkZXIge1xyXG5cdC8qKlxyXG5cdCogQSBoZWxwZXIgdG8gcGFzcyBpbnRvIHRoZSBjb25zdHJ1Y3RvciB3aGVuIGJ1aWxkaW5nIGEgbmV3IGNvbnRyYWN0cyBsaWJyYXJ5XHJcblx0Ki9cclxuXHRnZXRMaWJyYXJ5U2VydmljZXMoKTogSUxpYnJhcnlTZXJ2aWNlcztcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBzdGFuZGFyZCByZXNvdXJjZSB3aXRoIGdldExpc3QsIGdldERldGFpbCwgY3JlYXRlLCB1cGRhdGUsIGRlbGV0ZVxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHN0YW5kYXJkIHJlc291cmNlIHdpdGggZ2V0TGlzdCwgZ2V0RGV0YWlsLCBjcmVhdGUsIHVwZGF0ZSwgZGVsZXRlXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQ+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIHZvaWQ+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHN0YW5kYXJkIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzdGFuZGFyZCB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgdm9pZCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2Ugd2l0aCBzdWItcmVzb3VyY2VzIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2Ugd2l0aCBzdWItcmVzb3VyY2VzIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBEZXByZWNhdGVkIC0gQ3JlYXRlIGEgc2luZ2xldG9uIHJlc291cmNlIHdpdGggZ2V0IGFuZCB1cGRhdGVcclxuXHQqL1xyXG5cdGNyZWF0ZVNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZT4ob3B0aW9uczogSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogRGVwcmVjYXRlZCAtIENyZWF0ZSBhIHBhcmVudCBzaW5nbGV0b24gcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzaW5nbGV0b24gd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVzb3VyY2VCdWlsZGVyIGltcGxlbWVudHMgSUJhc2VSZXNvdXJjZUJ1aWxkZXIge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJGh0dHAnLCAnJHEnLCAnJHJvb3RTY29wZScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7IH1cclxuXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0JHE6IHRoaXMuJHEsXHJcblx0XHRcdCRyb290U2NvcGU6IHRoaXMuJHJvb3RTY29wZSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2VWaWV3KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudERhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZT4ob3B0aW9uczogSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50U2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1c2VNb2NrSWZOb0VuZHBvaW50PFREYXRhVHlwZT4ob3B0aW9uczogSUJhc2VPcHRpb25zPFREYXRhVHlwZT4pOiBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0XHRvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG5cdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQmFzZVJlc291cmNlQnVpbGRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VEYXRhU2VydmljZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdiYXNlRGF0YVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURvbWFpbk9iamVjdCB7XHJcbiAgICBpZD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0Z2V0TGlzdChwYXJhbXM/OiBUU2VhcmNoUGFyYW1zKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICBnZXREZXRhaWwoaWQ6IG51bWJlcik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGRlbGV0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcblxyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBpbXBsZW1lbnRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcbiAgICBwcml2YXRlIGJlaGF2aW9yOiBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIHByb3RlY3RlZCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG4gICAgICAgICAgICAsIHB1YmxpYyB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgcHVibGljIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLmJlaGF2aW9yID0gbmV3IEJhc2VEYXRhU2VydmljZUJlaGF2aW9yKCRodHRwLCAkcSwgdHJhbnNmb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEl0ZW1FbmRwb2ludChpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmRwb2ludCArICcvJyArIGlkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlzdChwYXJhbXM6IFRTZWFyY2hQYXJhbXMpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0TGlzdCh7XHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGVbXSA9PiB7IHJldHVybiB0aGlzLm1vY2tEYXRhIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGV0YWlsKGlkOiBudW1iZXIpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldEl0ZW0oe1xyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5nZXRJdGVtRW5kcG9pbnQoaWQpLFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgYWRkTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0SWQ6IG51bWJlciA9IF8ubWF4QnkodGhpcy5tb2NrRGF0YSwgJ2lkJykuaWQgKyAxO1xyXG4gICAgICAgICAgICAgICAgZG9tYWluT2JqZWN0LmlkID0gbmV4dElkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2NrRGF0YS5wdXNoKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci51cGRhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCksXHJcbiAgICAgICAgICAgIHVwZGF0ZU1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkT2JqZWN0OiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBvbGRPYmplY3QgPSA8VERhdGFUeXBlPl8uYXNzaWduKG9sZE9iamVjdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZGVsZXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLFxyXG4gICAgICAgICAgICByZW1vdmVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUodGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGVbXVxyXG4gICAgICAgICwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxufVxyXG5cclxuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHkpOiBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnZlcnRlcjxURGF0YVR5cGU+IHtcclxuXHRmcm9tU2VydmVyKHJhdzogYW55KTogVERhdGFUeXBlO1xyXG4gICAgdG9TZXJ2ZXIoZGF0YTogVERhdGFUeXBlKTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBlbmRwb2ludDogc3RyaW5nO1xyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIHBhcmFtczogYW55O1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICBhZGRNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICB1cGRhdGVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICByZW1vdmVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IHtcclxuXHRnZXRMaXN0KG9wdGlvbnM6IElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICBnZXRJdGVtKG9wdGlvbnM6IElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgY3JlYXRlKG9wdGlvbnM6IElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGRlbGV0ZShvcHRpb25zOiBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHtbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55Pn0pIHsgfVxyXG5cclxuICAgIGdldExpc3Qob3B0aW9uczogSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmdldE1vY2tEYXRhKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldChvcHRpb25zLmVuZHBvaW50LCB7IHBhcmFtczogb3B0aW9ucy5wYXJhbXMgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGVbXT4pOiBURGF0YVR5cGVbXSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlW10gPT4ge1xyXG5cdFx0XHRkYXRhID0gdGhpcy5hcHBseVRyYW5zZm9ybShkYXRhLCB0aGlzLnRyYW5zZm9ybSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2dldExpc3QnLCBkYXRhLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShvcHRpb25zOiBJR2V0SXRlbU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5nZXRNb2NrRGF0YSgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5nZXQob3B0aW9ucy5lbmRwb2ludClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0oZGF0YSwgdGhpcy50cmFuc2Zvcm0sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdnZXQnLCBkYXRhLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShvcHRpb25zOiBJQ3JlYXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIG9wdGlvbnMuZG9tYWluT2JqZWN0ID0gdGhpcy5hcHBseVRyYW5zZm9ybShvcHRpb25zLmRvbWFpbk9iamVjdCwgdGhpcy50cmFuc2Zvcm0sIHRydWUpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hZGRNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnBvc3Qob3B0aW9ucy5lbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kb21haW5PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKGRhdGEsIHRoaXMudHJhbnNmb3JtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnY3JlYXRlJywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0ob3B0aW9ucy5kb21haW5PYmplY3QsIHRoaXMudHJhbnNmb3JtLCB0cnVlKTtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudXBkYXRlTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpXHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnB1dChvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLmRvbWFpbk9iamVjdClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hcHBseVRyYW5zZm9ybShkYXRhLCB0aGlzLnRyYW5zZm9ybSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3VwZGF0ZScsIG9wdGlvbnMuZG9tYWluT2JqZWN0LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShvcHRpb25zOiBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnJlbW92ZU1vY2tEYXRhKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmRlbGV0ZTx2b2lkPihvcHRpb25zLmVuZHBvaW50KS50aGVuKCgpOiB2b2lkID0+IHsgcmV0dXJuIG51bGw7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdkZWxldGUnLCBvcHRpb25zLmRvbWFpbk9iamVjdCwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nKHJlcXVlc3ROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZywgdXNlTW9jazogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb2NrU3RyaW5nID0gdXNlTW9jayA/ICdNb2NrZWQgJyA6ICcnO1xyXG4gICAgICAgIGxldCBlbmRwb2ludFN0cmluZyA9IGVuZHBvaW50ID09IG51bGwgPyAndW5zcGVjaWZpZWQnIDogZW5kcG9pbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9ja1N0cmluZyArIHJlcXVlc3ROYW1lICsgJyBmb3IgZW5kcG9pbnQgJyArIGVuZHBvaW50U3RyaW5nICsgJzonKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRyYW5zZm9ybShkYXRhOiBhbnksIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxhbnk+IHwge1tpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+fSwgdG9TZXJ2ZXI6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKHRyYW5zZm9ybSA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIF8ubWFwKGRhdGEsIChpdGVtOiBhbnkpOiBhbnkgPT4geyByZXR1cm4gdGhpcy5hcHBseVRyYW5zZm9ybShpdGVtLCB0cmFuc2Zvcm0sIHRvU2VydmVyKTsgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNDb252ZXJ0ZXIodHJhbnNmb3JtKSkge1xyXG5cdFx0XHRsZXQgdHJhbnNmb3JtRnVuYzogeyAoZGF0YTogYW55KTogYW55IH0gPSB0b1NlcnZlclxyXG5cdFx0XHRcdD8gKDxJQ29udmVydGVyPGFueT4+dHJhbnNmb3JtKS50b1NlcnZlclxyXG5cdFx0XHRcdDogKDxJQ29udmVydGVyPGFueT4+dHJhbnNmb3JtKS5mcm9tU2VydmVyO1xyXG5cdFx0XHRyZXR1cm4gdHJhbnNmb3JtRnVuYyhkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRhdGEsIChwcm9wOiBhbnksIGtleTogc3RyaW5nKTogYW55ID0+IHtcclxuXHRcdFx0XHRpZiAoXy5oYXModHJhbnNmb3JtLCBrZXkpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBseVRyYW5zZm9ybShwcm9wLCB0cmFuc2Zvcm1ba2V5XSwgdG9TZXJ2ZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gcHJvcDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdHByaXZhdGUgaXNDb252ZXJ0ZXIob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBfLmlzRnVuY3Rpb24ob2JqZWN0LmZyb21TZXJ2ZXIpXHJcblx0XHRcdHx8IF8uaXNGdW5jdGlvbihvYmplY3QudG9TZXJ2ZXIpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlLCBCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPntcclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+XHJcblx0ZXh0ZW5kcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPlxyXG5cdGltcGxlbWVudHMgSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBfZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuICAgICAgICAgICAgLCB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0XHRsZXQgbW9ja0RhdGE6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09PSBwYXJlbnRJZDtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPih0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmVuZHBvaW50LCBtb2NrRGF0YSwgdGhpcy50cmFuc2Zvcm0sIHRoaXMudXNlTW9jaywgdGhpcy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRpbXBsZW1lbnRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIF9lbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcblx0XHRcdCwgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZX1cclxuICAgICAgICAgICAgLCBwcml2YXRlIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcbiAgICAgICAgICAgICwgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdGxldCBtb2NrRGF0YTogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0uaWQgPT09IHBhcmVudElkO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPih0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmVuZHBvaW50LCBtb2NrRGF0YSwgdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0aGlzLnRyYW5zZm9ybSwgdGhpcy51c2VNb2NrLCB0aGlzLmxvZ1JlcXVlc3RzLCBwYXJlbnRJZCk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+e1xyXG5cdGNoaWxkQ29udHJhY3RzKGlkPzogbnVtYmVyKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4gaW1wbGVtZW50cyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRjb25zdHJ1Y3RvcigkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCAkcTogbmcuSVFTZXJ2aWNlLCBhcnJheTogSUFycmF5VXRpbGl0eSwgZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcblx0XHQsIHB1YmxpYyByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9XHJcblx0XHQsIHRyYW5zZm9ybT86IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG5cdFx0LCB1c2VNb2NrPzogYm9vbGVhblxyXG4gICAgICAgICwgbG9nUmVxdWVzdHM/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y2hpbGRDb250cmFjdHMoaWQ/OiBudW1iZXIpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChpZCkpIHtcclxuXHRcdFx0bGV0IGRpY3Rpb25hcnk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKCk7XHJcblx0XHRcdF8uZWFjaChkaWN0aW9uYXJ5LCAoZGF0YVNlcnZpY2U6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGRhdGFTZXJ2aWNlLmVuZHBvaW50ID0gdGhpcy5lbmRwb2ludCArIGRhdGFTZXJ2aWNlLmVuZHBvaW50O1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgZGljdGlvbmFyeToge1tpbmRleDogc3RyaW5nXTogYW55fSA9IHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcigpO1xyXG5cdFx0XHRyZXR1cm4gPGFueT5fLm1hcFZhbHVlcyhkaWN0aW9uYXJ5LCAoZGF0YVNlcnZpY2U6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gfCBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4gPT4ge1xyXG5cdFx0XHRcdGxldCBjb250cmFjdDogYW55O1xyXG5cdFx0XHRcdGlmIChfLmlzRnVuY3Rpb24oZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24pKSB7XHJcblx0XHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKGlkKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGNvbnRyYWN0LmVuZHBvaW50ID0gdGhpcy5lbmRwb2ludCArICcvJyArIGlkICsgY29udHJhY3QuZW5kcG9pbnQ7XHJcblxyXG5cdFx0XHRcdHJldHVybiBjb250cmFjdDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgZ2V0KCk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuXHJcbiAgICB1c2VNb2NrOiBib29sZWFuO1xyXG4gICAgbG9nUmVxdWVzdHM6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICBwcml2YXRlIGJlaGF2aW9yOiBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIHByaXZhdGUgbW9ja0RhdGE6IFREYXRhVHlwZVxyXG4gICAgICAgICAgICAsIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcbiAgICAgICAgICAgICwgcHVibGljIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBwdWJsaWMgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldEl0ZW0oe1xyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGUgPT4geyByZXR1cm4gdGhpcy5tb2NrRGF0YTsgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgdXBkYXRlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9ja0RhdGEgPSA8VERhdGFUeXBlPl8uYXNzaWduKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZSwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZSwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT57XHJcblx0Y2hpbGRDb250cmFjdHMoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE6IFREYXRhVHlwZVxyXG5cdFx0LCBwcml2YXRlIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcblx0XHQsIGxvZ1JlcXVlc3RzPzogYm9vbGVhblxyXG5cdFx0LCBwcml2YXRlIHBhcmVudElkPzogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRsZXQgZGljdGlvbmFyeToge1tpbmRleDogc3RyaW5nXTogYW55fSA9IHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcigpO1xyXG5cdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIGFueT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gfCBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgYW55PiA9PiB7XHJcblx0XHRcdGxldCBjb250cmFjdDogYW55O1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKSkge1xyXG5cdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24odGhpcy5wYXJlbnRJZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgY29udHJhY3QuZW5kcG9pbnQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gY29udHJhY3Q7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZUNvbnZlcnRlci9kYXRlQ29udmVydGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnVtQ29udmVydGVyL2VudW1Db252ZXJ0ZXInO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvY29udmVydGVycy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgZGF0ZVV0aWxpdHksIGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi4vLi4vLi4vZGF0ZS9kYXRlLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgbGV0IGRhdGVDb252ZXJ0ZXI6IElDb252ZXJ0ZXI8RGF0ZT4gPSB7XHJcblx0ZnJvbVNlcnZlcihyYXc6IHN0cmluZyk6IERhdGUge1xyXG5cdFx0cmV0dXJuIGRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nKHJhdyk7XHJcblx0fSxcclxuXHR0b1NlcnZlcihkYXRhOiBEYXRlKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBtb21lbnQoZGF0YSkuZm9ybWF0KGRlZmF1bHRGb3JtYXRzLmlzb0Zvcm1hdCk7XHJcblx0fSxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2RhdGVDb252ZXJ0ZXIvZGF0ZUNvbnZlcnRlci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUl0ZW1MaXN0LCBJSXRlbSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2l0ZW1MaXN0JztcclxuXHJcbmV4cG9ydCB7IElDb252ZXJ0ZXIgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnVtQ29udmVydGVyPFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiBpbXBsZW1lbnRzIElDb252ZXJ0ZXI8VEl0ZW1UeXBlPiB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbnVtVHlwZTogSUl0ZW1MaXN0PFRJdGVtVHlwZT4pIHt9XHJcblxyXG5cdGZyb21TZXJ2ZXI6IHsgKHJhdzogbnVtYmVyKTogVEl0ZW1UeXBlIH0gPSAocmF3OiBudW1iZXIpOiBUSXRlbVR5cGUgPT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZW51bVR5cGUuZ2V0KHJhdyk7XHJcblx0fVxyXG5cdHRvU2VydmVyOiB7IChkYXRhOiBUSXRlbVR5cGUpOiBudW1iZXIgfSA9IChkYXRhOiBUSXRlbVR5cGUpOiBudW1iZXIgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGEgIT0gbnVsbFxyXG5cdFx0XHQ/IGRhdGEudmFsdWVcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2VudW1Db252ZXJ0ZXIvZW51bUNvbnZlcnRlci50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDcmVhdGUoKTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrQ2hpbGQobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZDtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDcmVhdGUoKTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0bW9ja0dldChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9kYXRhU2VydmljZU1vY2tzLnRzXG4gKiovIiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElCYXNlUmVzb3VyY2VCdWlsZGVyLCBCYXNlUmVzb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlTW9jaywgSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2ssIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrIH0gZnJvbSAnLi9kYXRhU2VydmljZU1vY2tzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyYWN0TGlicmFyeSB7XHJcblx0Ly8gZXh0ZW5kIHdpdGggY3VzdG9tIGludGVyZmFjZSBzcGVjaWZ5aW5nIGNoaWxkIHJlc291cmNlc1xyXG5cclxuXHRmbHVzaCgpOiB2b2lkO1xyXG5cclxuXHRtb2NrR2V0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXRMaXN0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblxyXG5cdG1vY2tDaGlsZChwYXJlbnQ6IGFueSwgbW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZDtcclxuXHRjcmVhdGVNb2NrKHJlc291cmNlPzogYW55KTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+O1xyXG5cdGNyZWF0ZU1vY2tQYXJlbnQocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxhbnksIGFueSwgYW55PjtcclxuXHRjcmVhdGVNb2NrU2luZ2xldG9uKHJlc291cmNlPzogYW55KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGlicmFyeVNlcnZpY2VzIHtcclxuXHQkcTogbmcuSVFTZXJ2aWNlO1xyXG5cdCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJhY3RMaWJyYXJ5IGltcGxlbWVudHMgSUNvbnRyYWN0TGlicmFyeSB7XHJcblx0cHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlO1xyXG5cdHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYnVpbGRlcjogSUJhc2VSZXNvdXJjZUJ1aWxkZXIpIHtcclxuXHRcdGxldCBzZXJ2aWNlczogSUxpYnJhcnlTZXJ2aWNlcyA9ICg8QmFzZVJlc291cmNlQnVpbGRlcj5idWlsZGVyKS5nZXRMaWJyYXJ5U2VydmljZXMoKTtcclxuXHRcdHRoaXMuJHEgPSBzZXJ2aWNlcy4kcTtcclxuXHRcdHRoaXMuJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0fVxyXG5cclxuXHRmbHVzaCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblx0fVxyXG5cdG1vY2tHZXQocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXQnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tHZXRMaXN0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0TGlzdCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0dldERldGFpbChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldERldGFpbCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0NoaWxkKHBhcmVudDogYW55LCBtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkIHtcclxuXHRcdGxldCBnZXRDaGlsZHJlbjogeyhpZDogbnVtYmVyKTogYW55fSA9IHBhcmVudC5jaGlsZENvbnRyYWN0cy5iaW5kKHBhcmVudCk7XHJcblx0XHRwYXJlbnQuY2hpbGRDb250cmFjdHMgPSAoaWQ6IG51bWJlcik6IGFueSA9PiB7XHJcblx0XHRcdGxldCBjaGlsZHJlbjogYW55ID0gZ2V0Q2hpbGRyZW4oaWQpO1xyXG5cdFx0XHRtb2NrQ2FsbGJhY2soY2hpbGRyZW4pO1xyXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrKHJlc291cmNlPzogYW55KTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUmVzb3VyY2U8YW55LCBhbnk+KHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXRMaXN0ID0gKGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldExpc3QnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXREZXRhaWwgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja1VwZGF0ZSA9ICgpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrU2F2ZShkYXRhU2VydmljZSwgJ3VwZGF0ZScpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0NyZWF0ZSA9ICgpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrU2F2ZShkYXRhU2VydmljZSwgJ2NyZWF0ZScpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UgPSB0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT4ge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiBhbnkgPSByZXNvdXJjZSAhPSBudWxsID8gcmVzb3VyY2UucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA6ICgpOiBhbnkgPT4geyByZXR1cm4ge307IH07XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2U8YW55LCBhbnksIGFueT4oe1xyXG5cdFx0XHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiBnZXRDaGlsZHJlbixcclxuXHRcdH0pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrQ2hpbGQgPSAobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCA9PiB7IHJldHVybiB0aGlzLm1vY2tDaGlsZChkYXRhU2VydmljZSwgbW9ja0NhbGxiYWNrKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tVcGRhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICd1cGRhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tDcmVhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICdjcmVhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlID0gdGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT4ge1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2Uoe30pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrVXBkYXRlID0gKCk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tTYXZlKGRhdGFTZXJ2aWNlLCAndXBkYXRlJyk7IH07XHJcblx0XHRkYXRhU2VydmljZSA9IHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2U6IGFueSwgcmVzb3VyY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKHJlc291cmNlICE9IG51bGwpIHtcclxuXHRcdFx0ZGF0YVNlcnZpY2UgPSBfLmV4dGVuZChyZXNvdXJjZSwgZGF0YVNlcnZpY2UpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBiYXNlTW9ja0dldChyZXNvdXJjZTogYW55LCBhY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdGxldCBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHRoaXMuc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kcS53aGVuKGRhdGEpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcblx0XHRyZXR1cm4gZnVuYztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tTYXZlKHJlc291cmNlOiBhbnksIGFjdGlvbk5hbWU6IHN0cmluZyk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdGxldCBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHRoaXMuc2lub24uc3B5KChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kcS53aGVuKGRhdGEpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcblx0XHRyZXR1cm4gZnVuYztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0IHNpbm9uKCk6IFNpbm9uLlNpbm9uU3RhdGljIHtcclxuXHRcdHJldHVybiBzaW5vbiB8fCA8YW55Pnsgc3B5OiAoZnVuYzogYW55KTogYW55ID0+IHsgcmV0dXJuIGZ1bmM7IH0gfTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgc2VydmljZU5hbWUgYXMgbm90aWZpY2F0aW9uU2VydmljZU5hbWUsXHJcbiAgICBtb2R1bGVOYW1lIGFzIG5vdGlmaWNhdGlvbk1vZHVsZU5hbWUsXHJcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEuc2VydmljZXMuZXJyb3JIYW5kbGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Vycm9ySGFuZGxlcic7XHJcblxyXG5leHBvcnQgZW51bSBIdHRwU3RhdHVzQ29kZSB7XHJcblx0dW5hdXRob3JpemVkID0gNDAxLFxyXG5cdGZvcmJpZGRlbiA9IDQwMyxcclxuXHRpbnZhbGlkVXJsID0gNDA0LFxyXG5cdHRpbWVvdXQgPSA0MDgsXHJcblx0aW50ZXJuYWxTZXJ2ZXJFcnJvciA9IDUwMCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVqZWN0aW9uIHtcclxuXHRzdGF0dXM6IEh0dHBTdGF0dXNDb2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvckhhbmRsZXJTZXJ2aWNlIHtcclxuXHRodHRwUmVzcG9uc2VFcnJvcihyZWplY3Rpb246IElSZWplY3Rpb24pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvck1lc3NhZ2VzIHtcclxuICAgIGZvcmJpZGRlbkVycm9yOiBzdHJpbmc7XHJcbiAgICBpbnZhbGlkVXJsRXJyb3I6IHN0cmluZztcclxuICAgIHRpbWVvdXRFcnJvcjogc3RyaW5nO1xyXG4gICAgaW50ZXJuYWxTZXJ2ZXJFcnJvcjogc3RyaW5nO1xyXG4gICAgZGVmYXVsdEVycm9yOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckhhbmRsZXJTZXJ2aWNlIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIGxvZ2luVXJsOiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcml2YXRlIGVycm9yTWVzc2FnZXM6IElFcnJvck1lc3NhZ2VzKSB7IH1cclxuXHJcblx0aHR0cFJlc3BvbnNlRXJyb3IocmVqZWN0aW9uOiBJUmVqZWN0aW9uKTogdm9pZCB7XHJcblx0XHRzd2l0Y2ggKHJlamVjdGlvbi5zdGF0dXMpIHtcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS51bmF1dGhvcml6ZWQ6XHJcblx0XHRcdFx0dGhpcy5sb2dnZWRPdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmZvcmJpZGRlbjpcclxuXHRcdFx0XHR0aGlzLmluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5pbnZhbGlkVXJsOlxyXG5cdFx0XHRcdHRoaXMuaW52YWxpZFVybEVycm9yKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUudGltZW91dDpcclxuXHRcdFx0XHR0aGlzLnRpbWVvdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmludGVybmFsU2VydmVyRXJyb3I6XHJcblx0XHRcdFx0dGhpcy5zeXN0ZW1FcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmRlZmF1bHRFcnJvcik7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignU3RhdHVzOiAnICsgcmVqZWN0aW9uLnN0YXR1cyk7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUmVzcG9uc2U6ICcgKyByZWplY3Rpb24pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBsb2dnZWRPdXRFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbiA9IDxhbnk+dGhpcy5sb2dpblVybDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5mb3JiaWRkZW5FcnJvcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGludmFsaWRVcmxFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5pbnZhbGlkVXJsRXJyb3IpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0aW1lb3V0RXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMudGltZW91dEVycm9yKTtcclxuXHRcdC8vIHJldHJ5XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN5c3RlbUVycm9yKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmludGVybmFsU2VydmVyRXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgYW5ndWxhci5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBlcnJvck1lc3NhZ2VzOiBJRXJyb3JNZXNzYWdlcztcclxuICAgICRnZXQoJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAsIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJRXJyb3JIYW5kbGVyU2VydmljZTtcclxufVxyXG5cclxuY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlczogSUVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVybCA9ICcvbG9naW4nO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgICAgICAgICAgZm9yYmlkZGVuRXJyb3I6ICdZb3UgaGF2ZSBpbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMgdG8gcGVyZm9ybSB0aGlzIGFjdGlvbicsXHJcbiAgICAgICAgICAgIGludmFsaWRVcmxFcnJvcjogJ1Jlc291cmNlIG5vdCBmb3VuZC4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQnLFxyXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3I6ICdSZXF1ZXN0IHRpbWVkIG91dC4gQ2hlY2sgeW91ciBuZXR3b3JrIGNvbm5lY3Rpb24gb3IgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IgZm9yIGlzc3VlcycsXHJcbiAgICAgICAgICAgIGludGVybmFsU2VydmVyRXJyb3I6ICdUaGUgc3lzdGVtIGhhcyBlbmNvdW50ZXJlZCBhbiBlcnJvci4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQuJyArXHJcbiAgICAgICAgICAgICcgUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBpZiB5b3UgYXJlIHVuYWJsZSB0byBjb21wbGV0ZSBjcml0aWNhbCB0YXNrcycsXHJcbiAgICAgICAgICAgIGRlZmF1bHRFcnJvcjogJ0h0dHAgc3RhdHVzIGNvZGUgbm90IGhhbmRsZWQnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy4kZ2V0LiRpbmplY3QgPSBbJyR3aW5kb3cnLCBub3RpZmljYXRpb25TZXJ2aWNlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgJGdldDogYW55ID0gKCR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSk6IElFcnJvckhhbmRsZXJTZXJ2aWNlID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9ySGFuZGxlclNlcnZpY2UoJHdpbmRvdywgbm90aWZpY2F0aW9uLCB0aGlzLmxvZ2luVXJsLCB0aGlzLmVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbm90aWZpY2F0aW9uTW9kdWxlTmFtZV0pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBuZXcgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyKCkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VOb3RpZmllciB9IGZyb20gJy4vYmFzZU5vdGlmaWVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdub3RpZmljYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5pbmZvKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIud2FybmluZyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5lcnJvcihtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLnN1Y2Nlc3MobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBhbmd1bGFyLklTZXJ2aWNlUHJvdmlkZXIge1xyXG5cdHNldE5vdGlmaWVyKG5vdGlmaWVyOiBJTm90aWZpZXIpOiB2b2lkO1xyXG5cdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgZXh0ZW5kcyBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHRub3RpZmllcjogSU5vdGlmaWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0bGV0IHByb3ZpZGVyOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgPSB7XHJcblx0XHRub3RpZmllcjogbmV3IEJhc2VOb3RpZmllcigpLFxyXG5cdFx0c2V0Tm90aWZpZXI6IChub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdH0sXHJcblx0XHQkZ2V0OiAoKTogSU5vdGlmaWNhdGlvblNlcnZpY2UgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdHJldHVybiBwcm92aWRlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTm90aWZpZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTm90aWZpZXIgaW1wbGVtZW50cyBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHdpbmRvdy5hbGVydChtZXNzYWdlKTtcclxuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBudW1iZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyIH0gZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplRmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyTW9kdWxlTmFtZV0pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHQuZmlsdGVyKHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5lbnVtIFNpZ24ge1xyXG5cdHBvc2l0aXZlID0gMSxcclxuXHRuZWdhdGl2ZSA9IC0xLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0fVxyXG5cclxuXHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG5cdH1cclxuXHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIXN0ZXApIHtcclxuXHRcdFx0cmV0dXJuIG51bTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcmVtYWluZGVyOiBudW1iZXIgPSBudW0gJSBzdGVwO1xyXG5cclxuXHRcdGlmIChyZW1haW5kZXIgPj0gc3RlcCAvIDIpIHtcclxuXHRcdFx0cmV0dXJuIG51bSArIChzdGVwIC0gcmVtYWluZGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudW0gLSByZW1haW5kZXI7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElOdW1iZXJVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBudW1iZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRkaXNwbGF5KCk6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRCWVRFU19QRVJfR0I6IG51bWJlciA9IDEwNzM3NDE4MjQ7XHJcblx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0Ynl0ZXM6IG51bWJlcjtcclxuXHJcblx0R0I6IG51bWJlcjtcclxuXHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRNQjogbnVtYmVyO1xyXG5cdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdEtCOiBudW1iZXI7XHJcblx0aXNLQjogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogSU51bWJlclV0aWxpdHksIGJ5dGVzOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0dGhpcy5pc0dCID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxufVxyXG5cclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyU2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5KTogSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBmYWN0b3J5TmFtZSwgSUZpbGVTaXplRmFjdG9yeSwgSUZpbGVTaXplIH0gZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbmV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG59XHJcblxyXG5maWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0cmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBzdHJpbmdNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIHN0cmluZ1NlcnZpY2VOYW1lLFxyXG5cdElTdHJpbmdVdGlsaXR5U2VydmljZSxcclxufSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUZpbHRlciB9IGZyb20gJy4uLy4uL2ZpbHRlcnMvZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHR0eXBlOiBzdHJpbmc7XHJcblx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdG1pblNlYXJjaExlbmd0aDogbnVtYmVyO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0bWluU2VhcmNoTGVuZ3RoOiBudW1iZXIgPSAxO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIG9iamVjdDogSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSB8fCB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDwgdGhpcy5taW5TZWFyY2hMZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdHJldHVybiBfLnNvbWUodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbn1cclxuXHJcbmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWUsIHN0cmluZ1NlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSxcclxuXHRzdHJpbmdVdGlsaXR5OiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lLCBzdHJpbmdNb2R1bGVOYW1lXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiArc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHR9XHJcblxyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmd1aWQnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZ3VpZFNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR3VpZFNlcnZpY2Uge1xyXG5cdHRpbWUoKTogc3RyaW5nO1xyXG5cdHJhbmRvbSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRTZXJ2aWNlIGltcGxlbWVudHMgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52MSgpO1xyXG5cdH1cclxuXHJcblx0cmFuZG9tKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52NCgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEd1aWRTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ3VpZC9ndWlkLnNlcnZpY2UudHNcbiAqKi8iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgcm5nO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgIHJldHVybiBfcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3JuZy1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRldmVudD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0fSlcclxuXHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHR9KS52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcblxyXG5uZy5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxuXHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdHJlc29sdmVQcm9taXNlcyhyZXNvbHZlczogYW55KTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckaW5qZWN0b3InXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7fVxyXG5cclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0fVxyXG5cclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcHJvbWlzZXM6IGFueSA9IHt9O1xyXG5cdFx0Xy5lYWNoKHJlc29sdmVzLCAodmFsdWU6IGFueSwga2V5OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkgfHwgXy5pc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmdldCh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih2YWx1ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4kcS5hbGwocHJvbWlzZXMpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN5bmNocm9uaXplZFJlcXVlc3RzJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0ZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlcjtcclxuXHRoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrO1xyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHJlcXVlc3RJZDogbnVtYmVyID0gMDtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlclxyXG5cdFx0XHQsIHB1YmxpYyBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHsgfVxyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHRcdC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcblx0XHR0aGlzLnJlcXVlc3RJZCsrO1xyXG5cdFx0bGV0IGN1cnJlbnRSZXF1ZXN0SWQ6IG51bWJlciA9IHRoaXMucmVxdWVzdElkO1xyXG5cdFx0dGhpcy4kcS53aGVuKHRoaXMuZGF0YVByb3ZpZGVyKC4uLnBhcmFtcykpLnRoZW4oKC4uLmRhdGE6IGFueVtdKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChjdXJyZW50UmVxdWVzdElkID09IHRoaXMucmVxdWVzdElkKSB7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGVSZXF1ZXN0KC4uLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RHZXR0ZXIge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0Q2FsbGJhY2sge1xyXG5cdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn1cclxuXHJcbnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxOiBhbmd1bGFyLklRU2VydmljZSk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyLCBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrKTogSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJy4vbW9jayc7XHJcbmV4cG9ydCB7IG1vY2sgfTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYW5ndWxhckZpeHR1cmUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdG1vY2subW9kdWxlTmFtZSxcclxuXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9ja1V0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0cHJvbWlzZTogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRkYXRhOiBURGF0YVR5cGU7XHJcblx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgTW9jayB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzZXJ2aWNlKSkge1xyXG5cdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdHZhciBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPiA9IHRoaXMuJHEuZGVmZXI8VERhdGFUeXBlPigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBhbmd1bGFyLklTY29wZSk6IHZvaWQge1xyXG5cdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuXHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE1vY2spO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2sudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2FuZ3VsYXItbW9ja3MnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHQ6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0ZGlyZWN0aXZlPFRDb250cm9sbGVyVHlwZT4oZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBkb206IHN0cmluZywgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG59XHJcblxyXG5jbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHR9XHJcblxyXG5cdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdHZhciAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbnkpOiBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZChzZXJ2aWNlcy4kcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdHZhciAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHR2YXIgY29tcG9uZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkgPSAkY29tcGlsZShkb20pKHNjb3BlKTtcclxuXHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0Y29udHJvbGxlcjogY29tcG9uZW50LmNvbnRyb2xsZXIoZGlyZWN0aXZlTmFtZSksXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbm90aWZpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBub3RpZmljYXRpb25TZXJ2aWNlTmFtZSxcclxuXHRJTm90aWZpY2F0aW9uU2VydmljZSxcclxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSUNvbXBvc2l0ZVZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdGlvblR5cGVzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvc2l0ZVZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3ZhbGlkYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgZXJyb3Igbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyB3YXJuaW5nIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSkgeyB9XHJcblxyXG5cdGJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZEN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBWYWxpZGF0aW9uU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciBpbXBsZW1lbnRzIElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogc3RyaW5nXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRsZXQgZXJyb3I6IHN0cmluZyA9IHRoaXMuZXJyb3JNZXNzYWdlKGhhbmRsZXIpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogbnVtYmVyID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvdW50O1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc0FjdGl2ZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZXJyb3JNZXNzYWdlKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHQ/ICg8eyAoKTogc3RyaW5nIH0+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0OiA8c3RyaW5nPmhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUNvbXBvc2l0ZVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcblxyXG5pbnRlcmZhY2UgSVJlZ2lzdGVyZWRWYWxpZGF0b3IgZXh0ZW5kcyBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRrZXk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVZhbGlkYXRvciBpbXBsZW1lbnRzIElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgY2hpbGRWYWxpZGF0b3JzOiB7IFtpbmRleDogc3RyaW5nXTogSVNpbXBsZVZhbGlkYXRvciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoaGFuZGxlcjogSVNpbXBsZVZhbGlkYXRvcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAoIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKDxhbnk+dGhpcy5jaGlsZFZhbGlkYXRvcnMsIChjb3VudDogbnVtYmVyLCBoYW5kbGVyOiBJU2ltcGxlVmFsaWRhdG9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0cmV0dXJuIGNvdW50ICs9IGhhbmRsZXIuZ2V0RXJyb3JDb3VudCgpO1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0bGV0IHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy5jaGlsZFZhbGlkYXRvcnNbY3VycmVudEtleV0gPSB2YWxpZGF0b3I7XHJcblx0XHQoPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5ID0gY3VycmVudEtleTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvcik6IHZvaWQge1xyXG5cdFx0ZGVsZXRlIHRoaXMuY2hpbGRWYWxpZGF0b3JzWyg8SVJlZ2lzdGVyZWRWYWxpZGF0b3I+dmFsaWRhdG9yKS5rZXldO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdG9yIHtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW1wbGVWYWxpZGF0b3IgZXh0ZW5kcyBJVmFsaWRhdG9yIHtcclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2l0ZVZhbGlkYXRvciBleHRlbmRzIElWYWxpZGF0b3Ige1xyXG5cdGJ1aWxkQ2hpbGRWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHR1bnJlZ2lzdGVyQ2hpbGQodmFsaWRhdG9yOiBJU2ltcGxlVmFsaWRhdG9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHsoKTogc3RyaW5nfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyIHtcclxuXHQoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb25UeXBlcy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcGFyZVJlc3VsdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaXRlbUxpc3QnO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtIHtcclxuICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkaXNwbGF5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUl0ZW1MaXN0PFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiB7XHJcblx0Z2V0KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBUSXRlbVR5cGU7XHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbUxpc3Q8VEl0ZW1UeXBlIGV4dGVuZHMgSUl0ZW0+IHtcclxuXHRwcml2YXRlIGl0ZW1zOiBUSXRlbVR5cGVbXTtcclxuXHJcblx0c2V0SXRlbXMoaXRlbXM6IFRJdGVtVHlwZVtdKTogdm9pZCB7XHJcblx0XHR0aGlzLml0ZW1zID0gaXRlbXM7XHJcblx0fVxyXG5cclxuXHRnZXQodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IFRJdGVtVHlwZSB7XHJcblx0XHR2YXIgcHJlZGljYXRlOiB7IChpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIH07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cHJlZGljYXRlID0gKGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoaXRlbS5uYW1lID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwcmVkaWNhdGUgPSAoaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIChpdGVtLnZhbHVlID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIF8uZmluZCh0aGlzLml0ZW1zLCBwcmVkaWNhdGUpO1xyXG5cdH1cclxuXHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9pdGVtTGlzdC50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=