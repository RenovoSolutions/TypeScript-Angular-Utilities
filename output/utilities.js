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
	var services = __webpack_require__(11);
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
	var truncate = __webpack_require__(9);
	exports.truncate = truncate;
	__export(__webpack_require__(10));
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
	    ObjectUtility.$inject = [array_service_1.serviceName];
	    return ObjectUtility;
	})();
	angular.module(exports.moduleName, [array_service_1.moduleName])
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
/* 10 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array = __webpack_require__(8);
	exports.array = array;
	var boolean = __webpack_require__(12);
	exports.boolean = boolean;
	var dataContracts = __webpack_require__(13);
	exports.dataContracts = dataContracts;
	var date = __webpack_require__(24);
	exports.date = date;
	var errorHandler = __webpack_require__(33);
	exports.errorHandler = errorHandler;
	var fileSize = __webpack_require__(37);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(41);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(43);
	exports.guid = guid;
	var moment = __webpack_require__(25);
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
	var time = __webpack_require__(26);
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseResourceBuilder_service_1 = __webpack_require__(14);
	var baseData_service_1 = __webpack_require__(15);
	var baseSingletonData_service_1 = __webpack_require__(19);
	var converters = __webpack_require__(21);
	exports.converters = converters;
	var mocks = __webpack_require__(31);
	exports.mocks = mocks;
	exports.moduleName = 'rl.utilities.services.dataContracts';
	__export(__webpack_require__(32));
	var baseData_service_2 = __webpack_require__(15);
	exports.BaseDataService = baseData_service_2.BaseDataService;
	exports.baseDataServiceFactoryName = baseData_service_2.factoryName;
	__export(__webpack_require__(18));
	var baseSingletonData_service_2 = __webpack_require__(19);
	exports.BaseSingletonDataService = baseSingletonData_service_2.BaseSingletonDataService;
	exports.baseSingletonDataServiceFactoryName = baseSingletonData_service_2.factoryName;
	__export(__webpack_require__(20));
	var baseResourceBuilder_service_2 = __webpack_require__(14);
	exports.builderServiceName = baseResourceBuilder_service_2.serviceName;
	angular.module(exports.moduleName, [
	    baseData_service_1.moduleName,
	    baseSingletonData_service_1.moduleName,
	    baseResourceBuilder_service_1.moduleName,
	]);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array_service_1 = __webpack_require__(8);
	var baseData_service_1 = __webpack_require__(15);
	var baseDataServiceView_1 = __webpack_require__(17);
	var baseParentData_service_1 = __webpack_require__(18);
	var baseSingletonData_service_1 = __webpack_require__(19);
	var baseParentSingletonData_service_1 = __webpack_require__(20);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var array_service_1 = __webpack_require__(8);
	var baseDataServiceBehavior_1 = __webpack_require__(16);
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseData_service_1 = __webpack_require__(15);
	var baseParentData_service_1 = __webpack_require__(18);
	var baseSingletonData_service_1 = __webpack_require__(19);
	var baseParentSingletonData_service_1 = __webpack_require__(20);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(7);
	var baseData_service_1 = __webpack_require__(15);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var baseDataServiceBehavior_1 = __webpack_require__(16);
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseSingletonData_service_1 = __webpack_require__(19);
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(22));
	__export(__webpack_require__(30));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var moment = __webpack_require__(23);
	var date_module_1 = __webpack_require__(24);
	exports.dateConverter = {
	    fromServer: function (raw) {
	        return date_module_1.dateUtility.getDateFromISOString(raw);
	    },
	    toServer: function (data) {
	        return moment(data).format(date_module_1.defaultFormats.isoFormat);
	    },
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(25);
	var time_service_1 = __webpack_require__(26);
	var date_service_1 = __webpack_require__(28);
	var dateTimeFormatStrings_1 = __webpack_require__(29);
	__export(__webpack_require__(28));
	__export(__webpack_require__(29));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(23);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(23);
	var compareResult_1 = __webpack_require__(27);
	var date_module_1 = __webpack_require__(24);
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var moment = __webpack_require__(23);
	var time_service_1 = __webpack_require__(26);
	var moment_module_1 = __webpack_require__(25);
	var compareResult_1 = __webpack_require__(27);
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
	            var r = !isNaN(date.getTime());
	            return r;
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
	            return moment(date1).format("MM/DD/YYYY") === moment(date2).format("MM/DD/YYYY");
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
	            return moment(date1).format("MM/DD/YYYY +-HHmm") === moment(date2).format("MM/DD/YYYY +-HHmm");
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
/* 29 */
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
/* 30 */
/***/ function(module, exports) {

	'use strict';
	var EnumConverter = (function () {
	    function EnumConverter(enumType) {
	        this.enumType = enumType;
	    }
	    EnumConverter.prototype.fromServer = function (raw) {
	        return this.enumType.get(raw);
	    };
	    EnumConverter.prototype.toServer = function (data) {
	        return data != null
	            ? data.value
	            : null;
	    };
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
	__export(__webpack_require__(27));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQzNGQ0ODMyM2NmZDQ3YWNiOWUiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2NvbnZlcnRlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9kYXRlQ29udmVydGVyL2RhdGVDb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvaXRlbUxpc3QudHMiXSwibmFtZXMiOlsic3RvcEV2ZW50UHJvcGFnYXRpb24iLCJzdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwiaXNFbXB0eSIsIk9iamVjdFV0aWxpdHkiLCJPYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwiT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwiT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJPYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwiT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsIk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJBcnJheVV0aWxpdHkiLCJBcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJBcnJheVV0aWxpdHkuZmluZEluZGV4T2YiLCJBcnJheVV0aWxpdHkucmVtb3ZlIiwiQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJBcnJheVV0aWxpdHkuc3VtIiwiQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsIkFycmF5VXRpbGl0eS5sYXN0IiwidHJ1bmNhdGUiLCJCb29sZWFuVXRpbGl0eSIsIkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwiQm9vbGVhblV0aWxpdHkudG9Cb29sIiwiQmFzZVJlc291cmNlQnVpbGRlciIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY29uc3RydWN0b3IiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmdldExpYnJhcnlTZXJ2aWNlcyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci51c2VNb2NrSWZOb0VuZHBvaW50IiwiQmFzZURhdGFTZXJ2aWNlIiwiQmFzZURhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlLmdldEl0ZW1FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZS5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlLmdldERldGFpbCIsIkJhc2VEYXRhU2VydmljZS5jcmVhdGUiLCJCYXNlRGF0YVNlcnZpY2UudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlLmRlbGV0ZSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmdldExpc3QiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRJdGVtIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZGVsZXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IubG9nIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuYXBwbHlUcmFuc2Zvcm0iLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5pc0NvbnZlcnRlciIsIkJhc2VEYXRhU2VydmljZVZpZXciLCJCYXNlRGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXciLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZSIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5nZXQiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UudXBkYXRlIiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSIsImJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY2hpbGRDb250cmFjdHMiLCJmcm9tU2VydmVyIiwidG9TZXJ2ZXIiLCJtb21lbnRXcmFwcGVyIiwiVGltZVV0aWxpdHkiLCJUaW1lVXRpbGl0eS5jb25zdHJ1Y3RvciIsIlRpbWVVdGlsaXR5LmNvbXBhcmVUaW1lcyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvTWludXRlcyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMiLCJDb21wYXJlUmVzdWx0IiwiZ2V0Q29tcGFyZVJlc3VsdCIsIkRhdGVVdGlsaXR5IiwiRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJEYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwiRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsIkRhdGVVdGlsaXR5LmdldERheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMiLCJEYXRlVXRpbGl0eS5jb21wYXJlRGF0ZXMiLCJEYXRlVXRpbGl0eS5kYXRlSW5SYW5nZSIsIkRhdGVVdGlsaXR5LmdldERhdGUiLCJEYXRlVXRpbGl0eS5nZXREYXRlRnJvbUlTT1N0cmluZyIsIkRhdGVVdGlsaXR5LmlzRGF0ZSIsIkRhdGVVdGlsaXR5LmdldE5vdyIsIkRhdGVVdGlsaXR5LmZvcm1hdERhdGUiLCJEYXRlVXRpbGl0eS5nZXRGb3JtYXQiLCJEYXRlVXRpbGl0eS5zYW1lRGF0ZSIsIkRhdGVVdGlsaXR5LnNhbWVEYXRlVGltZSIsIkVudW1Db252ZXJ0ZXIiLCJFbnVtQ29udmVydGVyLmNvbnN0cnVjdG9yIiwiRW51bUNvbnZlcnRlci5mcm9tU2VydmVyIiwiRW51bUNvbnZlcnRlci50b1NlcnZlciIsIkNvbnRyYWN0TGlicmFyeSIsIkNvbnRyYWN0TGlicmFyeS5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeS5mbHVzaCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXRMaXN0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXREZXRhaWwiLCJDb250cmFjdExpYnJhcnkubW9ja0NoaWxkIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2siLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1BhcmVudCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrU2luZ2xldG9uIiwiQ29udHJhY3RMaWJyYXJ5LnVwZGF0ZVJlc291cmNlIiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrU2F2ZSIsIkNvbnRyYWN0TGlicmFyeS5zaW5vbiIsIkh0dHBTdGF0dXNDb2RlIiwiRXJyb3JIYW5kbGVyU2VydmljZSIsIkVycm9ySGFuZGxlclNlcnZpY2UuY29uc3RydWN0b3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmh0dHBSZXNwb25zZUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5sb2dnZWRPdXRFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UuaW52YWxpZFVybEVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS50aW1lb3V0RXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLnN5c3RlbUVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIiwiRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIk5vdGlmaWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJOb3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmciLCJOb3RpZmljYXRpb25TZXJ2aWNlLmVycm9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwibm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIiwiQmFzZU5vdGlmaWVyIiwiQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwiQmFzZU5vdGlmaWVyLmluZm8iLCJCYXNlTm90aWZpZXIud2FybmluZyIsIkJhc2VOb3RpZmllci5lcnJvciIsIkJhc2VOb3RpZmllci5zdWNjZXNzIiwiQmFzZU5vdGlmaWVyLm5vdGlmeSIsIlNpZ24iLCJOdW1iZXJVdGlsaXR5IiwiTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsIk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwiTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwiTnVtYmVyVXRpbGl0eS5yb3VuZFRvU3RlcCIsIkZpbGVTaXplU2VydmljZSIsIkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsIkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwiZmlsZVNpemVGYWN0b3J5IiwiZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwiZmlsZVNpemVGaWx0ZXIiLCJHZW5lcmljU2VhcmNoRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5jb25zdHJ1Y3RvciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hPYmplY3QiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSIsImdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LmdldEluc3RhbmNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5jb25zdHJ1Y3RvciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29udGFpbnMiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5zdWJzdGl0dXRlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsIkd1aWRTZXJ2aWNlIiwiR3VpZFNlcnZpY2UuY29uc3RydWN0b3IiLCJHdWlkU2VydmljZS50aW1lIiwiR3VpZFNlcnZpY2UucmFuZG9tIiwiT2JzZXJ2YWJsZVNlcnZpY2UiLCJPYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsIk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwiT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsIk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJQcm9taXNlVXRpbGl0eSIsIlByb21pc2VVdGlsaXR5LmNvbnN0cnVjdG9yIiwiUHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlIiwiUHJvbWlzZVV0aWxpdHkucmVzb2x2ZVByb21pc2VzIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlLmdldERhdGEiLCJzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkiLCJzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJNb2NrIiwiTW9jay5jb25zdHJ1Y3RvciIsIk1vY2suc2VydmljZSIsIk1vY2sucHJvbWlzZSIsIk1vY2sucHJvbWlzZVdpdGhDYWxsYmFjayIsIk1vY2suZmx1c2giLCJBbmd1bGFyRml4dHVyZSIsIkFuZ3VsYXJGaXh0dXJlLmNvbnN0cnVjdG9yIiwiQW5ndWxhckZpeHR1cmUuaW5qZWN0IiwiQW5ndWxhckZpeHR1cmUubW9jayIsIkFuZ3VsYXJGaXh0dXJlLmNvbnRyb2xsZXJXaXRoQmluZGluZ3MiLCJBbmd1bGFyRml4dHVyZS5kaXJlY3RpdmUiLCJWYWxpZGF0aW9uU2VydmljZSIsIlZhbGlkYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ3VzdG9tVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yIiwiVmFsaWRhdG9yIiwiVmFsaWRhdG9yLmNvbnN0cnVjdG9yIiwiVmFsaWRhdG9yLnZhbGlkYXRlIiwiVmFsaWRhdG9yLmdldEVycm9yQ291bnQiLCJWYWxpZGF0b3IucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciIsIlZhbGlkYXRvci51bnJlZ2lzdGVyIiwiVmFsaWRhdG9yLmlzQWN0aXZlIiwiVmFsaWRhdG9yLmVycm9yTWVzc2FnZSIsIkNvbXBvc2l0ZVZhbGlkYXRvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci5jb25zdHJ1Y3RvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci52YWxpZGF0ZSIsIkNvbXBvc2l0ZVZhbGlkYXRvci5nZXRFcnJvckNvdW50IiwiQ29tcG9zaXRlVmFsaWRhdG9yLmJ1aWxkQ2hpbGRWYWxpZGF0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IudW5yZWdpc3RlckNoaWxkIiwiSXRlbUxpc3QiLCJJdGVtTGlzdC5jb25zdHJ1Y3RvciIsIkl0ZW1MaXN0LnNldEl0ZW1zIiwiSXRlbUxpc3QuZ2V0IiwiSXRlbUxpc3QuYWxsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztBQUgzQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQUcxQixpQkFBUTtBQUZyQyxLQUFZLEtBQUssdUJBQU0sRUFBc0IsQ0FBQztBQUVQLGNBQUs7QUFFakMsYUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixTQUFTLENBQUMsSUFBSTtLQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1osUUFBUSxDQUFDLFVBQVU7RUFDbkIsQ0FBQyxDQUFDOzs7Ozs7O0FDakJILGNBQWEsa0NBQWtDLEVBQUUsSTs7Ozs7O0FDQWpELGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFbkMsS0FBWSxvQkFBb0IsdUJBQU0sQ0FBNkMsQ0FBQztBQUUzRSw2QkFBb0I7QUFFbEIsYUFBSSxHQUFXLHdCQUF3QixDQUFDO0FBRW5ELFFBQU8sQ0FBQyxNQUFNLENBQUMsWUFBSSxFQUFFO0tBQ3BCLG9CQUFvQixDQUFDLFVBQVU7RUFDL0IsQ0FBQyxDQUFDOzs7Ozs7O0FDWkgsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUV4QixtQkFBVSxHQUFXLDZDQUE2QyxDQUFDO0FBQ25FLHNCQUFhLEdBQVcsd0JBQXdCLENBQUM7QUFNNUQ7S0FDQ0EsWUFBWUEsQ0FBQ0E7S0FDYkEsTUFBTUEsQ0FBQ0E7U0FDTkEsUUFBUUEsRUFBRUEsR0FBR0E7U0FDYkEsSUFBSUEsWUFBQ0EsS0FBcUJBLEVBQ3ZCQSxPQUFpQ0EsRUFDakNBLEtBQWlDQTthQUNuQ0MsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxVQUFDQSxLQUFVQTtpQkFDbkRBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO2lCQUN2QkEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7YUFDekJBLENBQUNBLENBQUNBLENBQUNBO1NBQ0pBLENBQUNBO01BQ0RELENBQUNBO0FBQ0hBLEVBQUNBO0FBRUQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztNQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDekJqRCxLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLEtBQVksT0FBTyx1QkFBTSxDQUFtQixDQUFDO0FBR3BDLGdCQUFPO0FBRmhCLEtBQVksUUFBUSx1QkFBTSxDQUFxQixDQUFDO0FBRTlCLGlCQUFRO0FBQzFCLDhCQUFjLEVBQVUsQ0FBQztBQUVkLGFBQUksR0FBVyxzQkFBc0IsQ0FBQztBQUVqRCxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixPQUFPLENBQUMsVUFBVTtLQUNsQixRQUFRLENBQUMsVUFBVTtFQUNuQixDQUFDLENBQUM7Ozs7Ozs7QUNiSCxhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLDRDQUlPLENBQXNDLENBQUM7QUFFbkMsbUJBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUNwRCxvQkFBVyxHQUFXLFNBQVMsQ0FBQztBQUNoQyxtQkFBVSxHQUFXLG1CQUFXLEdBQUcsUUFBUSxDQUFDO0FBTXZELFFBQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxDQUFDO0FBQ3RDLGtCQUFpQixNQUFzQjtLQUN0Q0UsWUFBWUEsQ0FBQ0E7S0FDYkEsTUFBTUEsQ0FBQ0EsVUFBQ0EsS0FBVUEsRUFBRUEsYUFBdUJBO1NBQzFDQSxJQUFJQSxPQUFPQSxHQUFZQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtTQUVuREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDN0JBLE1BQU1BLENBQUNBLENBQUNBLE9BQU9BLENBQUNBO1NBQ2pCQSxDQUFDQTtTQUNEQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtLQUNoQkEsQ0FBQ0EsQ0FBQ0E7QUFDSEEsRUFBQ0E7QUFFRCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO01BQzVDLE1BQU0sQ0FBQyxtQkFBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0FDaEMvQixhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBQ25DLEtBQVksQ0FBQyx1QkFBTSxDQUFRLENBQUM7QUFFNUIsMkNBSU8sQ0FBd0IsQ0FBQztBQUVyQixtQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBQ3BELG9CQUFXLEdBQVcsZUFBZSxDQUFDO0FBZ0JqRDtLQUVFQyx1QkFBb0JBLEtBQW9CQTtTQUFwQkMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBZUE7S0FDeENBLENBQUNBO0tBRUZELHFDQUFhQSxHQUFiQSxVQUFjQSxNQUFXQTtTQUN4QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDcEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2JBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQzlCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQTtTQUNqQ0EsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1NBQ3hCQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNQQSxNQUFNQSxDQUFDQSxNQUFNQSxLQUFLQSxFQUFFQSxDQUFDQTtTQUN0QkEsQ0FBQ0E7S0FDRkEsQ0FBQ0E7S0FFREYsMENBQWtCQSxHQUFsQkEsVUFBbUJBLE1BQVdBO1NBQzdCRyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN4QkEsTUFBTUEsR0FBWUEsTUFBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7U0FDbENBLENBQUNBO1NBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0tBQ25DQSxDQUFDQTtLQUVESCxnQ0FBUUEsR0FBUkEsVUFBU0EsSUFBU0EsRUFBRUEsSUFBU0E7U0FBN0JJLGlCQStDQ0E7U0E5Q0FBLElBQUlBLEtBQUtBLEdBQVdBLE9BQU9BLElBQUlBLENBQUNBO1NBQ2hDQSxJQUFJQSxLQUFLQSxHQUFXQSxPQUFPQSxJQUFJQSxDQUFDQTtTQUVoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2JBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ3pDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtTQUNkQSxDQUFDQTtTQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNyQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7U0FDZEEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEtBQUtBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2lCQUNqQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7YUFDZEEsQ0FBQ0E7YUFFREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7aUJBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtxQkFDL0NBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2lCQUNkQSxDQUFDQTthQUNGQSxDQUFDQTtTQUNGQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTthQUMvQkEsd0NBQXdDQTthQUN4Q0EsSUFBSUEsS0FBS0EsR0FBYUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDbkNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLEtBQVVBLEVBQUVBLEdBQVdBO2lCQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQ3RCQSxnRkFBZ0ZBO3FCQUNoRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7eUJBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtxQkFDZEEsQ0FBQ0E7cUJBQUNBLElBQUlBLENBQUNBLENBQUNBO3lCQUNQQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtxQkFDL0JBLENBQUNBO2lCQUNGQSxDQUFDQTtpQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7cUJBQ1BBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2lCQUNkQSxDQUFDQTthQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNIQSw4RkFBOEZBO2FBQzlGQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDbkJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2FBQ2RBLENBQUNBO1NBQ0ZBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLGdEQUFnREE7YUFDaERBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLElBQUlBLENBQUNBO1NBQ3RCQSxDQUFDQTtTQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtLQUNiQSxDQUFDQTtLQUVESixnQ0FBUUEsR0FBUkEsVUFBU0EsTUFBV0E7U0FDbkJLLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBO0tBQ3BCQSxDQUFDQTtLQUVETCxzQ0FBY0EsR0FBZEEsVUFBZUEsS0FBVUEsRUFBRUEsWUFBaUJBO1NBQzNDTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNuQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7U0FDZEEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDUEEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7U0FDckJBLENBQUNBO0tBQ0ZBLENBQUNBO0tBbkZPTixxQkFBT0EsR0FBYUEsQ0FBQ0EsMkJBQWdCQSxDQUFDQSxDQUFDQTtLQW9GaERBLG9CQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBRUQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMEJBQWUsQ0FBQyxDQUFDO01BQzNDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0FDcEh0QyxjQUFhLDRCQUE0QixFQUFFLEk7Ozs7OztBQ0ExQyxhQUFZLENBQUM7QUFFZCxLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBQ25DLEtBQVksQ0FBQyx1QkFBTSxDQUFRLENBQUM7QUFFakIsbUJBQVUsR0FBVyw2QkFBNkIsQ0FBQztBQUNuRCxvQkFBVyxHQUFXLGNBQWMsQ0FBQztBQWFoRDtLQUFBTztLQWdFQUMsQ0FBQ0E7S0EvREFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTtTQUNuRkUsSUFBSUEsV0FBbUJBLENBQUNBO1NBRXhCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxJQUFlQSxFQUFFQSxLQUFhQTthQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ3JCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtpQkFDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2FBQ2RBLENBQUNBO1NBQ0ZBLENBQUNBLENBQUNBLENBQUNBO1NBRUhBLE1BQU1BLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO0tBQy9DQSxDQUFDQTtLQUVERiw2QkFBTUEsR0FBTkEsVUFBa0JBLEtBQWtCQSxFQUFFQSxJQUErQ0E7U0FDcEZHLElBQUlBLEtBQWFBLENBQUNBO1NBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN4QkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsRUFBK0JBLElBQUlBLENBQUNBLENBQUNBO1NBQ3BFQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFhQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUMzQ0EsQ0FBQ0E7U0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDaEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xDQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNQQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNiQSxDQUFDQTtLQUNGQSxDQUFDQTtLQUVESCw4QkFBT0EsR0FBUEEsVUFBbUJBLEtBQWtCQSxFQUFFQSxPQUFrQkEsRUFBRUEsT0FBa0JBO1NBQzVFSSxJQUFJQSxLQUFLQSxHQUFXQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDaEJBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO1NBQ2pDQSxDQUFDQTtLQUNGQSxDQUFDQTtLQUVESiwwQkFBR0EsR0FBSEEsVUFBZUEsS0FBa0JBLEVBQUVBLFNBQXlDQTtTQUMzRUssSUFBSUEsSUFBY0EsQ0FBQ0E7U0FFbkJBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ3ZCQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxJQUFlQSxJQUFlQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUMvRUEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDUEEsSUFBSUEsR0FBVUEsS0FBS0EsQ0FBQ0E7U0FDckJBLENBQUNBO1NBRURBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLEdBQVdBLEVBQUVBLEdBQVdBLElBQWVBLE1BQU1BLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0tBQ3ZGQSxDQUFDQTtLQUVETCxtQ0FBWUEsR0FBWkEsVUFBd0JBLEtBQWtCQSxFQUFFQSxXQUEwQ0E7U0FFckZNLG1GQUFtRkE7U0FDbkZBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLFVBQTBDQSxFQUFFQSxJQUFlQTthQUNsRkEsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7YUFDckNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO1NBQ25CQSxDQUFDQSxFQUFPQSxFQUFFQSxDQUFDQSxDQUFDQTtLQUNiQSxDQUFDQTtLQUVETiwyQkFBSUEsR0FBSkEsVUFBZ0JBLEtBQWtCQTtTQUNqQ08sRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1NBQ2hDQSxDQUFDQTtLQUNGQSxDQUFDQTtLQUNGUCxtQkFBQ0E7QUFBREEsRUFBQ0EsSUFBQTtBQUVELFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7TUFDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7QUN0RnJDLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFbkMsK0ZBQThGO0FBRTlGLDRDQUlPLENBQXNDLENBQUM7QUFFbkMsbUJBQVUsR0FBVywrQkFBK0IsQ0FBQztBQUNyRCxvQkFBVyxHQUFXLFVBQVUsQ0FBQztBQUNqQyxtQkFBVSxHQUFXLG1CQUFXLEdBQUcsUUFBUSxDQUFDO0FBT3ZELFNBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxDQUFDO0FBQ3ZDLG1CQUFrQixhQUE2QjtLQUM5Q1EsWUFBWUEsQ0FBQ0E7S0FDYkEsTUFBTUEsQ0FBQ0EsVUFBQ0EsS0FBV0EsRUFBRUEsVUFBbUJBLEVBQUVBLGVBQXlCQTtTQUNsRUEsZUFBZUEsR0FBR0EsZUFBZUEsSUFBSUEsSUFBSUEsR0FBR0EsS0FBS0EsR0FBR0EsZUFBZUEsQ0FBQ0E7U0FFcEVBLElBQUlBLEdBQUdBLEdBQVdBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7U0FDbEZBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2FBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDbkRBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO2lCQUNuQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQ3JCQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtpQkFDZEEsQ0FBQ0E7YUFDRkEsQ0FBQ0E7U0FDRkEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7S0FDWkEsQ0FBQ0EsQ0FBQ0E7QUFDSEEsRUFBQ0E7QUFFRCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO01BQzVDLE1BQU0sQ0FBQyxtQkFBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7O0FDekNoQyxhQUFZLENBQUM7Ozs7Ozs7QUNBYixhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLEtBQVksS0FBSyx1QkFBTSxDQUF1QixDQUFDO0FBc0I5QyxjQUFLO0FBckJOLEtBQVksT0FBTyx1QkFBTSxFQUEyQixDQUFDO0FBc0JwRCxnQkFBTztBQXJCUixLQUFZLGFBQWEsdUJBQU0sRUFBc0MsQ0FBQztBQXNCckUsc0JBQWE7QUFyQmQsS0FBWSxJQUFJLHVCQUFNLEVBQW9CLENBQUM7QUFzQnZDLGFBQUk7QUFyQlIsS0FBWSxZQUFZLHVCQUFNLEVBQXFDLENBQUM7QUFzQmhFLHFCQUFZO0FBckJoQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQXNCdEQsaUJBQVE7QUFyQlQsS0FBWSxtQkFBbUIsdUJBQU0sRUFBbUQsQ0FBQztBQXNCeEYsNEJBQW1CO0FBckJwQixLQUFZLElBQUksdUJBQU0sRUFBcUIsQ0FBQztBQXNCM0MsYUFBSTtBQXJCTCxLQUFZLE1BQU0sdUJBQU0sRUFBd0IsQ0FBQztBQXNCaEQsZUFBTTtBQXJCUCxLQUFZLFlBQVksdUJBQU0sRUFBcUMsQ0FBQztBQXNCbkUscUJBQVk7QUFyQmIsS0FBWSxhQUFhLHVCQUFNLEVBQXlCLENBQUM7QUFzQnZDLGVBQU07QUFyQnhCLEtBQVksYUFBYSx1QkFBTSxDQUF5QixDQUFDO0FBc0J2QyxlQUFNO0FBckJ4QixLQUFZLFVBQVUsdUJBQU0sRUFBaUMsQ0FBQztBQXNCN0QsbUJBQVU7QUFyQlgsS0FBWSxtQkFBbUIsdUJBQU0sRUFBbUQsQ0FBQztBQXNCeEYsNEJBQW1CO0FBckJwQixLQUFZLE9BQU8sdUJBQU0sRUFBMkIsQ0FBQztBQXNCcEQsZ0JBQU87QUFyQlIsS0FBWSxhQUFhLHVCQUFNLEVBQXlCLENBQUM7QUFzQnZDLGVBQU07QUFyQnhCLEtBQVksb0JBQW9CLHVCQUFNLEVBQXFELENBQUM7QUFzQjNGLDZCQUFvQjtBQXJCckIsS0FBWSxJQUFJLHVCQUFNLEVBQW9CLENBQUM7QUFzQjFDLGFBQUk7QUFyQkwsS0FBWSxJQUFJLHVCQUFNLEVBQXFCLENBQUM7QUFzQjNDLGFBQUk7QUFyQkwsS0FBWSxVQUFVLHVCQUFNLEVBQWlDLENBQUM7QUFzQjdELG1CQUFVO0FBR0EsbUJBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUV4RCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7S0FDMUIsS0FBSyxDQUFDLFVBQVU7S0FDaEIsT0FBTyxDQUFDLFVBQVU7S0FDbEIsYUFBYSxDQUFDLFVBQVU7S0FDckIsSUFBSSxDQUFDLFVBQVU7S0FDZixZQUFZLENBQUMsVUFBVTtLQUMxQixRQUFRLENBQUMsVUFBVTtLQUNuQixtQkFBbUIsQ0FBQyxVQUFVO0tBQzlCLElBQUksQ0FBQyxVQUFVO0tBQ2YsTUFBTSxDQUFDLFVBQVU7S0FDakIsWUFBWSxDQUFDLFVBQVU7S0FDdkIsYUFBYSxDQUFDLFVBQVU7S0FDeEIsYUFBYSxDQUFDLFVBQVU7S0FDeEIsVUFBVSxDQUFDLFVBQVU7S0FDckIsbUJBQW1CLENBQUMsVUFBVTtLQUM5QixPQUFPLENBQUMsVUFBVTtLQUNsQixhQUFhLENBQUMsVUFBVTtLQUN4QixvQkFBb0IsQ0FBQyxVQUFVO0tBQy9CLElBQUksQ0FBQyxVQUFVO0tBQ2YsSUFBSSxDQUFDLFVBQVU7S0FDZixVQUFVLENBQUMsVUFBVTtFQUNyQixDQUFDLENBQUM7Ozs7Ozs7QUN2RUgsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUV4QixtQkFBVSxHQUFXLCtCQUErQixDQUFDO0FBQ3JELG9CQUFXLEdBQVcsZ0JBQWdCLENBQUM7QUFNbEQ7S0FBQUM7S0FJQUMsQ0FBQ0E7S0FIQUQsK0JBQU1BLEdBQU5BLFVBQU9BLE1BQVdBO1NBQ2pCRSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTtLQUNqQkEsQ0FBQ0E7S0FDRkYscUJBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFFRCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO01BQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7O0FDbEJ2QyxhQUFZLENBQUM7Ozs7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLHlEQUF3RCxFQUFtRCxDQUFDO0FBQzVHLDhDQUF3RCxFQUFvQyxDQUFDO0FBQzdGLHVEQUFpRSxFQUFzRCxDQUFDO0FBRXhILEtBQVksVUFBVSx1QkFBTSxFQUF5QixDQUFDO0FBWTdDLG1CQUFVO0FBWG5CLEtBQVksS0FBSyx1QkFBTSxFQUF3QyxDQUFDO0FBVzNDLGNBQUs7QUFUZixtQkFBVSxHQUFXLHFDQUFxQyxDQUFDO0FBRXRFLDhCQUFjLEVBQXVDLENBQUM7QUFDdEQsOENBQXlJLEVBQW9DLENBQUM7QUFBdkcsOERBQWU7QUFBRSxxRUFBc0Y7QUFFOUssOEJBQWMsRUFBZ0QsQ0FBQztBQUMvRCx1REFBMEosRUFBc0QsQ0FBQztBQUEzSSx5RkFBd0I7QUFBRSx1RkFBaUg7QUFDak4sOEJBQWMsRUFBa0UsQ0FBQztBQUNqRix5REFBd0UsRUFBbUQsQ0FBQztBQUE3Rix3RUFBNkY7QUFHNUgsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0tBQzFCLDZCQUF5QjtLQUN6QixzQ0FBa0M7S0FDbEMsd0NBQXlCO0VBQ3pCLENBQUMsQ0FBQzs7Ozs7OztBQzFCSCxhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBRW5DLDJDQUE4RixDQUEyQixDQUFDO0FBSTFILDhDQUFxRSxFQUFxQyxDQUFDO0FBQzNHLGlEQUFpSCxFQUF3QyxDQUFDO0FBQzFKLG9EQUE4RCxFQUFpRCxDQUFDO0FBQ2hILHVEQUFvRSxFQUF1RCxDQUFDO0FBQzVILDZEQUFnRixFQUFtRSxDQUFDO0FBRXpJLG1CQUFVLEdBQVcsMkNBQTJDLENBQUM7QUFDakUsb0JBQVcsR0FBVyxxQkFBcUIsQ0FBQztBQW9IdkQ7S0FFQ0csNkJBQW9CQSxLQUEyQkEsRUFDbkNBLEVBQXFCQSxFQUNyQkEsVUFBcUNBLEVBQ3JDQSxLQUFvQkE7U0FIWkMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBc0JBO1NBQ25DQSxPQUFFQSxHQUFGQSxFQUFFQSxDQUFtQkE7U0FDckJBLGVBQVVBLEdBQVZBLFVBQVVBLENBQTJCQTtTQUNyQ0EsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBZUE7S0FBSUEsQ0FBQ0E7S0FFckNELGdEQUFrQkEsR0FBbEJBO1NBQ0NFLE1BQU1BLENBQUNBO2FBQ05BLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBO2FBQ1hBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBO1VBQzNCQSxDQUFDQTtLQUNIQSxDQUFDQTtLQUVERiw0Q0FBY0EsR0FBZEEsVUFBbUVBLE9BQXVDQTtTQUN6R0csT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsa0NBQWVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0tBQzFKQSxDQUFDQTtLQUVESCxnREFBa0JBLEdBQWxCQSxVQUF1RUEsT0FBdUNBO1NBQzdHSSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1NBQzVDQSxNQUFNQSxDQUFDQSxJQUFJQSx5Q0FBbUJBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0tBQzlKQSxDQUFDQTtLQUVESixrREFBb0JBLEdBQXBCQSxVQUNFQSxPQUFrRUE7U0FDbkVLLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDNUNBLE1BQU1BLENBQUNBLElBQUlBLDhDQUFxQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EseUJBQXlCQSxFQUFFQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtLQUNuTUEsQ0FBQ0E7S0FFREwsc0RBQXdCQSxHQUF4QkEsVUFDRUEsT0FBa0VBO1NBQ25FTSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1NBQzVDQSxNQUFNQSxDQUFDQSxJQUFJQSwrQ0FBeUJBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLHlCQUF5QkEsRUFBRUEsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FDdk1BLENBQUNBO0tBRUROLHFEQUF1QkEsR0FBdkJBLFVBQW1DQSxPQUE0Q0E7U0FDOUVPLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDNUNBLE1BQU1BLENBQUNBLElBQUlBLG9EQUF3QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FDdkpBLENBQUNBO0tBRURQLDJEQUE2QkEsR0FBN0JBLFVBQ0VBLE9BQTJFQTtTQUM1RVEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0VBQThCQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSx5QkFBeUJBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0tBQ2hNQSxDQUFDQTtLQUVPUixpREFBbUJBLEdBQTNCQSxVQUF1Q0EsT0FBZ0NBO1NBQ3RFUyxPQUFPQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQTtTQUNwRUEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7S0FDaEJBLENBQUNBO0tBakRNVCwyQkFBT0EsR0FBYUEsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsWUFBWUEsRUFBRUEsMkJBQWdCQSxDQUFDQSxDQUFDQTtLQWtENUVBLDBCQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBbkRZLDRCQUFtQixzQkFtRC9CO0FBRUQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMEJBQWUsQ0FBQyxDQUFDO01BQzNDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Ozs7Ozs7QUN6TDVDLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFDbkMsS0FBWSxDQUFDLHVCQUFNLENBQVEsQ0FBQztBQUU1QiwyQ0FBOEYsQ0FBMkIsQ0FBQztBQUMxSCxxREFBOEUsRUFBNEIsQ0FBQztBQUVoRyxtQkFBVSxHQUFXLHVDQUF1QyxDQUFDO0FBQzdELG9CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFpQm5EO0tBR0lVLHlCQUFZQSxLQUEyQkEsRUFDN0JBLEVBQXFCQSxFQUNYQSxLQUFvQkEsRUFDdkJBLFFBQWdCQSxFQUNiQSxRQUFxQkEsRUFDL0JBLFNBQXVFQSxFQUNoRUEsT0FBZ0JBLEVBQ2hCQSxXQUFvQkE7U0FMakJDLFVBQUtBLEdBQUxBLEtBQUtBLENBQWVBO1NBQ3ZCQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFRQTtTQUNiQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFhQTtTQUV4QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBU0E7U0FDaEJBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFTQTtTQUN2Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsaURBQXVCQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtLQUNoRUEsQ0FBQ0E7S0FFT0QseUNBQWVBLEdBQXZCQSxVQUF3QkEsRUFBVUE7U0FDOUJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO0tBQy9DQSxDQUFDQTtLQUVERixpQ0FBT0EsR0FBUEEsVUFBUUEsTUFBcUJBO1NBQTdCRyxpQkFRQ0E7U0FQR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDekJBLE1BQU1BLEVBQUVBLE1BQU1BO2FBQ2RBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO2FBQ3ZCQSxXQUFXQSxFQUFFQSxjQUFxQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBQ0EsQ0FBQ0E7YUFDeERBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREgsbUNBQVNBLEdBQVRBLFVBQVVBLEVBQVVBO1NBQXBCSSxpQkFXQ0E7U0FWR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDekJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLEVBQUVBLENBQUNBO2FBQ2xDQSxXQUFXQSxFQUFFQTtpQkFDVEEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsSUFBZUE7cUJBQ3pDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxDQUFDQTtpQkFDMUJBLENBQUNBLENBQUNBLENBQUNBO2FBQ1BBLENBQUNBO2FBQ0RBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREosZ0NBQU1BLEdBQU5BLFVBQU9BLFlBQXVCQTtTQUE5QkssaUJBWUNBO1NBWEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2FBQ3hCQSxZQUFZQSxFQUFFQSxZQUFZQTthQUMxQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7YUFDdkJBLFdBQVdBLEVBQUVBLFVBQUNBLElBQWVBO2lCQUN6QkEsSUFBSUEsTUFBTUEsR0FBV0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7aUJBQ3pEQSxZQUFZQSxDQUFDQSxFQUFFQSxHQUFHQSxNQUFNQSxDQUFDQTtpQkFDekJBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQ3JDQSxDQUFDQTthQUNEQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQTthQUNyQkEsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsV0FBV0E7VUFDaENBLENBQUNBLENBQUNBO0tBQ1BBLENBQUNBO0tBRURMLGdDQUFNQSxHQUFOQSxVQUFPQSxZQUF1QkE7U0FBOUJNLGlCQWFDQTtTQVpHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTthQUN4QkEsWUFBWUEsRUFBRUEsWUFBWUE7YUFDMUJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBO2FBQy9DQSxjQUFjQSxFQUFFQSxVQUFDQSxJQUFlQTtpQkFDNUJBLElBQUlBLFNBQVNBLEdBQWNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFVBQUNBLElBQWVBO3FCQUM3REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsS0FBS0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7aUJBQy9CQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDSEEsU0FBU0EsR0FBY0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDckRBLENBQUNBO2FBQ0RBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFRE4sZ0NBQU1BLEdBQU5BLFVBQU9BLFlBQXVCQTtTQUE5Qk8saUJBVUNBO1NBVEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2FBQ3hCQSxZQUFZQSxFQUFFQSxZQUFZQTthQUMxQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7YUFDL0NBLGNBQWNBLEVBQUVBLFVBQUNBLElBQWVBO2lCQUM1QkEsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0E7YUFDbkRBLENBQUNBO2FBQ0RBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FDTFAsc0JBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFqRlksd0JBQWUsa0JBaUYzQjtBQU9ELHVCQUFzQixDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsMkJBQWdCLENBQUMsQ0FBQztBQUNuRSxpQ0FBdUMsS0FBMkIsRUFBRSxFQUFxQixFQUFFLEtBQW9CO0tBQzNHUSxNQUFNQSxDQUFDQTtTQUNIQSxXQUFXQSxZQUFxREEsUUFBZ0JBLEVBQUVBLFFBQXNCQSxFQUNsR0EsU0FBOEVBLEVBQUVBLE9BQWlCQSxFQUFFQSxXQUFxQkE7YUFDMUhDLE1BQU1BLENBQUNBLElBQUlBLGVBQWVBLENBQTJCQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUNoSUEsQ0FBQ0E7TUFDSkQsQ0FBQ0E7QUFDTkEsRUFBQ0E7QUFQZSwrQkFBc0IseUJBT3JDO0FBRUQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMEJBQWUsQ0FBQyxDQUFDO01BQ3hDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLHNCQUFzQixDQUFDLENBQUM7Ozs7Ozs7QUM3SGxELGFBQVksQ0FBQztBQUdiLEtBQVksQ0FBQyx1QkFBTSxDQUFRLENBQUM7QUE2QzVCO0tBQ0lFLGlDQUFvQkEsS0FBMkJBLEVBQzdCQSxFQUFxQkEsRUFDckJBLFNBQXFFQTtTQUZuRUMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBc0JBO1NBQzdCQSxPQUFFQSxHQUFGQSxFQUFFQSxDQUFtQkE7U0FDckJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQTREQTtLQUFJQSxDQUFDQTtLQUU1RkQseUNBQU9BLEdBQVBBLFVBQVFBLE9BQW1DQTtTQUEzQ0UsaUJBaUJDQTtTQWhCR0EsSUFBSUEsT0FBc0NBLENBQUNBO1NBQzNDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNsQkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7U0FDbERBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ0pBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2tCQUNqRUEsSUFBSUEsQ0FBQ0EsVUFBQ0EsUUFBc0RBO2lCQUM3REEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDekJBLENBQUNBLENBQUNBLENBQUNBO1NBQ1BBLENBQUNBO1NBQ0RBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLElBQWlCQTthQUMzQ0EsSUFBSUEsR0FBR0EsS0FBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsRUFBRUEsS0FBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDL0NBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2lCQUN0QkEsS0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7YUFDakVBLENBQUNBO2FBQ0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2hCQSxDQUFDQSxDQUFDQTtLQUNOQSxDQUFDQTtLQUVERix5Q0FBT0EsR0FBUEEsVUFBUUEsT0FBbUNBO1NBQTNDRyxpQkFpQkNBO1NBaEJHQSxJQUFJQSxPQUFvQ0EsQ0FBQ0E7U0FDekNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2FBQ2xCQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtTQUNsREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7a0JBQ3JDQSxJQUFJQSxDQUFDQSxVQUFDQSxRQUFvREE7aUJBQzNEQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQzdEQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREgsd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q0ksaUJBbUJDQTtTQWxCR0EsSUFBSUEsT0FBb0NBLENBQUNBO1NBQ3pDQSxPQUFPQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUN2RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQzFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtTQUNqREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7a0JBQzVFQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFrREE7aUJBQ3pEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hFQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREosd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q0ssaUJBbUJDQTtTQWxCR0EsSUFBSUEsT0FBb0NBLENBQUNBO1NBQ3pDQSxPQUFPQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUN2RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBO2FBQzVDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtTQUNqREEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0E7a0JBQzNEQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFrREE7aUJBQ3pEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUEEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBZUE7YUFDaENBLElBQUlBLEdBQUdBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUlBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2FBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hGQSxDQUFDQTthQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREwsd0NBQU1BLEdBQU5BLFVBQU9BLE9BQWtDQTtTQUF6Q00saUJBYUNBO1NBWkdBLElBQUlBLE9BQStCQSxDQUFDQTtTQUNwQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE9BQU9BLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQzdDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtTQUM3QkEsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBT0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDM0ZBLENBQUNBO1NBQ0RBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBO2FBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdEJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2FBQ2hGQSxDQUFDQTtTQUNMQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNQQSxDQUFDQTtLQUVPTixxQ0FBR0EsR0FBWEEsVUFBWUEsV0FBbUJBLEVBQUVBLElBQVNBLEVBQUVBLFFBQWdCQSxFQUFFQSxPQUFnQkE7U0FDMUVPLElBQUlBLFVBQVVBLEdBQUdBLE9BQU9BLEdBQUdBLFNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO1NBQzFDQSxJQUFJQSxjQUFjQSxHQUFHQSxRQUFRQSxJQUFJQSxJQUFJQSxHQUFHQSxhQUFhQSxHQUFHQSxRQUFRQSxDQUFDQTtTQUNqRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsV0FBV0EsR0FBR0EsZ0JBQWdCQSxHQUFHQSxjQUFjQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtTQUNoRkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDdEJBLENBQUNBO0tBRURQLGdEQUFjQSxHQUFkQSxVQUFlQSxJQUFTQSxFQUFFQSxTQUErREEsRUFBRUEsUUFBaUJBO1NBQTVHUSxpQkFzQkNBO1NBckJIQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7U0FDYkEsQ0FBQ0E7U0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDckJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLElBQVNBLElBQVlBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBQ3BHQSxDQUFDQTtTQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNqQ0EsSUFBSUEsYUFBYUEsR0FBeUJBLFFBQVFBO21CQUM3QkEsU0FBVUEsQ0FBQ0EsUUFBUUE7bUJBQ25CQSxTQUFVQSxDQUFDQSxVQUFVQSxDQUFDQTthQUMzQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDNUJBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLE1BQU1BLENBQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLElBQVNBLEVBQUVBLEdBQVdBO2lCQUNwREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQzNCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtpQkFDNURBLENBQUNBO2lCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTthQUNiQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNKQSxDQUFDQTtLQUNDQSxDQUFDQTtLQUVJUiw2Q0FBV0EsR0FBbkJBLFVBQW9CQSxNQUFXQTtTQUM5QlMsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUNuQ0EsQ0FBQ0E7S0FDRlQsOEJBQUNBO0FBQURBLEVBQUNBLElBQUE7QUF2SVksZ0NBQXVCLDBCQXVJbkM7Ozs7Ozs7QUN2TEQsYUFBWSxDQUFDOzs7Ozs7QUFLYiw4Q0FBcUUsRUFBb0IsQ0FBQztBQUMxRixvREFBOEQsRUFBaUQsQ0FBQztBQUNoSCx1REFBb0UsRUFBdUQsQ0FBQztBQUM1SCw2REFBZ0YsRUFBbUUsQ0FBQztBQVdwSjtLQUNTVSx1Q0FBeUNBO0tBRTlDQSw2QkFBb0JBLEtBQTJCQSxFQUM3QkEsRUFBcUJBLEVBQzdCQSxLQUFvQkEsRUFDcEJBLFNBQWlCQSxFQUNqQkEsUUFBcUJBLEVBQ2JBLFNBQXVFQSxFQUMvRUEsT0FBZ0JBLEVBQ2hCQSxXQUFvQkE7U0FDaENDLGtCQUFNQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQVJ4REEsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBc0JBO1NBQzdCQSxPQUFFQSxHQUFGQSxFQUFFQSxDQUFtQkE7U0FJckJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQThEQTtLQUk1RkEsQ0FBQ0E7S0FFREQseUNBQVdBLEdBQVhBLFVBQVlBLFFBQWdCQTtTQUMzQkUsSUFBSUEsUUFBUUEsR0FBY0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsSUFBZUE7YUFDL0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBO1NBQzdCQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNIQSxNQUFNQSxDQUFDQSxJQUFJQSxvREFBd0JBLENBQVlBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0tBQzlJQSxDQUFDQTtLQUNGRiwwQkFBQ0E7QUFBREEsRUFBQ0EsRUFuQlEsa0NBQWUsRUFtQnZCO0FBcEJZLDRCQUFtQixzQkFvQi9CO0FBRUQ7S0FDU0csNkNBQXdFQTtLQUU3RUEsbUNBQW9CQSxLQUEyQkEsRUFDN0JBLEVBQXFCQSxFQUM3QkEsS0FBb0JBLEVBQ3BCQSxTQUFpQkEsRUFDakJBLFFBQXFCQSxFQUM5QkEseUJBQXdEQSxFQUN2Q0EsU0FBdUVBLEVBQy9FQSxPQUFnQkEsRUFDaEJBLFdBQW9CQTtTQUNoQ0Msa0JBQU1BLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLEVBQUVBLHlCQUF5QkEsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FUbkZBLFVBQUtBLEdBQUxBLEtBQUtBLENBQXNCQTtTQUM3QkEsT0FBRUEsR0FBRkEsRUFBRUEsQ0FBbUJBO1NBS3JCQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUE4REE7S0FJNUZBLENBQUNBO0tBRURELCtDQUFXQSxHQUFYQSxVQUFZQSxRQUFnQkE7U0FDM0JFLElBQUlBLFFBQVFBLEdBQWNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFVBQUNBLElBQWVBO2FBQy9EQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQTtTQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0VBQThCQSxDQUFxQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUN2TkEsQ0FBQ0E7S0FDRkYsZ0NBQUNBO0FBQURBLEVBQUNBLEVBcEJRLDhDQUFxQixFQW9CN0I7QUFyQlksa0NBQXlCLDRCQXFCckM7Ozs7Ozs7Ozs7OztBQzdERCxLQUFZLENBQUMsdUJBQU0sQ0FBUSxDQUFDO0FBSzVCLDhDQUFxRSxFQUFxQyxDQUFDO0FBUzNHO0tBQ1NHLHlDQUF5Q0E7S0FDakRBLCtCQUFZQSxLQUFzQkEsRUFBRUEsRUFBZ0JBLEVBQUVBLEtBQW9CQSxFQUFFQSxRQUFnQkEsRUFBRUEsUUFBcUJBLEVBQ3pHQSx5QkFBMERBLEVBQ2pFQSxTQUF3RUEsRUFDeEVBLE9BQWlCQSxFQUNYQSxXQUFxQkE7U0FDN0JDLGtCQUFNQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUpwRUEsOEJBQXlCQSxHQUF6QkEseUJBQXlCQSxDQUFpQ0E7S0FLcEVBLENBQUNBO0tBRURELDhDQUFjQSxHQUFkQSxVQUFlQSxFQUFXQTtTQUExQkUsaUJBc0JDQTtTQXJCQUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkJBLElBQUlBLFVBQVVBLEdBQTRCQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO2FBQzNFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxVQUFDQSxXQUFnQkE7aUJBQ25DQSxXQUFXQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQTthQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDSEEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7U0FDbkJBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLElBQUlBLFVBQVVBLEdBQTJCQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO2FBQzFFQSxNQUFNQSxDQUFNQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxFQUFFQSxVQUFDQSxXQUEyREE7aUJBQy9GQSxJQUFJQSxRQUFhQSxDQUFDQTtpQkFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3FCQUMzQ0EsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7aUJBQ3hDQSxDQUFDQTtpQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7cUJBQ1BBLFFBQVFBLEdBQUdBLFdBQVdBLENBQUNBO2lCQUN4QkEsQ0FBQ0E7aUJBRURBLFFBQVFBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBO2lCQUVqRUEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7YUFDakJBLENBQUNBLENBQUNBLENBQUNBO1NBQ0pBLENBQUNBO0tBQ0ZBLENBQUNBO0tBQ0ZGLDRCQUFDQTtBQUFEQSxFQUFDQSxFQWhDUSxrQ0FBZSxFQWdDdkI7QUFqQ1ksOEJBQXFCLHdCQWlDakM7Ozs7Ozs7QUNoREQsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUNuQyxLQUFZLENBQUMsdUJBQU0sQ0FBUSxDQUFDO0FBRTVCLHFEQUE4RSxFQUE0QixDQUFDO0FBRWhHLG1CQUFVLEdBQVcsZ0RBQWdELENBQUM7QUFDdEUsb0JBQVcsR0FBVywwQkFBMEIsQ0FBQztBQVU1RDtLQUdJRyxrQ0FBWUEsS0FBMkJBLEVBQzdCQSxFQUFxQkEsRUFDZEEsUUFBZ0JBLEVBQ2ZBLFFBQW1CQSxFQUMzQkEsU0FBdUVBLEVBQ2hFQSxPQUFnQkEsRUFDaEJBLFdBQW9CQTtTQUpwQkMsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBUUE7U0FDZkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBV0E7U0FFcEJBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVNBO1NBQ2hCQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBU0E7U0FDdkNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLGlEQUF1QkEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7S0FDaEVBLENBQUNBO0tBRURELHNDQUFHQSxHQUFIQTtTQUFBRSxpQkFPQ0E7U0FOR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDekJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO2FBQ3ZCQSxXQUFXQSxFQUFFQSxjQUFtQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkRBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FFREYseUNBQU1BLEdBQU5BLFVBQU9BLFlBQXVCQTtTQUE5QkcsaUJBVUNBO1NBVEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2FBQ3hCQSxZQUFZQSxFQUFFQSxZQUFZQTthQUMxQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7YUFDdkJBLGNBQWNBLEVBQUVBLFVBQUNBLElBQWVBO2lCQUM1QkEsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBY0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0E7YUFDckVBLENBQUNBO2FBQ0RBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO2FBQ3JCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtVQUNoQ0EsQ0FBQ0EsQ0FBQ0E7S0FDUEEsQ0FBQ0E7S0FDTEgsK0JBQUNBO0FBQURBLEVBQUNBLElBQUE7QUFqQ1ksaUNBQXdCLDJCQWlDcEM7QUFNRCxnQ0FBK0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsMENBQWdELEtBQTJCLEVBQUUsRUFBcUI7S0FDOUZJLE1BQU1BLENBQUNBO1NBQ0hBLFdBQVdBLFlBQVlBLFFBQWdCQSxFQUFFQSxRQUFvQkEsRUFBRUEsU0FBOEVBLEVBQUVBLE9BQWlCQSxFQUFFQSxXQUFxQkE7YUFDbkxDLE1BQU1BLENBQUNBLElBQUlBLHdCQUF3QkEsQ0FBWUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FDbkhBLENBQUNBO01BQ0pELENBQUNBO0FBQ05BLEVBQUNBO0FBTmUsd0NBQStCLGtDQU05QztBQUVELFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7TUFDekIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDaEUzRCx1REFBb0UsRUFBdUQsQ0FBQztBQVM1SDtLQUNTRSxrREFBbUNBO0tBQzNDQSx3Q0FBWUEsS0FBc0JBLEVBQUVBLEVBQWdCQSxFQUFFQSxRQUFnQkEsRUFBRUEsUUFBbUJBLEVBQ2hGQSx5QkFBMERBLEVBQ2xFQSxTQUF3RUEsRUFDeEVBLE9BQWlCQSxFQUNqQkEsV0FBcUJBLEVBQ2JBLFFBQWlCQTtTQUMzQkMsa0JBQU1BLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1NBTDVEQSw4QkFBeUJBLEdBQXpCQSx5QkFBeUJBLENBQWlDQTtTQUkxREEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBU0E7S0FFNUJBLENBQUNBO0tBRURELHVEQUFjQSxHQUFkQTtTQUFBRSxpQkFjQ0E7U0FiQUEsSUFBSUEsVUFBVUEsR0FBMkJBLElBQUlBLENBQUNBLHlCQUF5QkEsRUFBRUEsQ0FBQ0E7U0FDMUVBLE1BQU1BLENBQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQVVBLEVBQUVBLFVBQUNBLFdBQWlEQTthQUNyRkEsSUFBSUEsUUFBYUEsQ0FBQ0E7YUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUMzQ0EsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7YUFDbkRBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQTthQUN4QkEsQ0FBQ0E7YUFFREEsUUFBUUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7YUFFdERBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1NBQ2pCQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNKQSxDQUFDQTtLQUNGRixxQ0FBQ0E7QUFBREEsRUFBQ0EsRUF6QlEsb0RBQXdCLEVBeUJoQztBQTFCWSx1Q0FBOEIsaUNBMEIxQzs7Ozs7OztBQ3RDRCxhQUFZLENBQUM7Ozs7QUFFYiw4QkFBYyxFQUErQixDQUFDO0FBQzlDLDhCQUFjLEVBQStCLENBQUM7Ozs7Ozs7QUNIOUMsYUFBWSxDQUFDO0FBRWIsS0FBWSxNQUFNLHVCQUFNLEVBQVEsQ0FBQztBQUdqQyx5Q0FBNEMsRUFBMkIsQ0FBQztBQUU3RCxzQkFBYSxHQUFxQjtLQUM1QyxVQUFVLFlBQUMsR0FBVztTQUNyQkcsTUFBTUEsQ0FBQ0EseUJBQVdBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7S0FDOUNBLENBQUNBO0tBQ0QsUUFBUSxZQUFDLElBQVU7U0FDbEJDLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLDRCQUFjQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtLQUN0REEsQ0FBQ0E7RUFDRCxDQUFDOzs7Ozs7O0FDZEYsY0FBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7QUNBaEQsYUFBWSxDQUFDOzs7O0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQywyQ0FBK0MsRUFBeUIsQ0FBQztBQUN6RSwwQ0FBNkMsRUFBc0IsQ0FBQztBQUVwRSwwQ0FBeUMsRUFBZ0IsQ0FBQztBQUMxRCxtREFBMEQsRUFBeUIsQ0FBQztBQUVwRiw4QkFBYyxFQUFnQixDQUFDO0FBQy9CLDhCQUFjLEVBQXlCLENBQUM7QUFFN0IsbUJBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUU3RCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQywwQkFBZ0IsRUFBRSx5QkFBYyxDQUFDLENBQUM7TUFDNUQsT0FBTyxDQUFDLDBCQUFXLEVBQUUsMEJBQVcsQ0FBQztNQUNqQyxLQUFLLENBQUMsaURBQXlCLEVBQUUsc0NBQWMsQ0FBQyxDQUFDOzs7Ozs7O0FDakJuRCxhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBQ25DLEtBQVksTUFBTSx1QkFBTSxFQUFRLENBQUM7QUFFdEIsbUJBQVUsR0FBVyxxQ0FBcUMsQ0FBQztBQUMzRCxvQkFBVyxHQUFXLGVBQWUsQ0FBQztBQUVqRDtLQUNDQyxZQUFZQSxDQUFDQTtLQUViQSw4Q0FBOENBO0tBQzlDQSxnREFBZ0RBO0tBQ2hEQSxrQ0FBa0NBO0tBQ2xDQSxJQUFJQSxhQUFhQSxHQUFRQSxNQUFNQSxDQUFDQSxDQUFDQSxnQ0FBZ0NBO0tBRWpFQSw0REFBNERBO0tBQzVEQSxtRUFBbUVBO0tBQ25FQSxxRUFBcUVBO0tBQ3JFQSxhQUFhQSxDQUFDQSx1QkFBdUJBLEdBQUdBLFVBQUNBLE1BQVdBO1NBQ25EQSxNQUFNQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtLQUNqQ0EsQ0FBQ0EsQ0FBQ0E7S0FFRkEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7QUFDdEJBLEVBQUNBO0FBaEJlLHNCQUFhLGdCQWdCNUI7QUFFRCxRQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO01BQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0FDM0J0QyxhQUFZLENBQUM7QUFFYixLQUFZLE9BQU8sdUJBQU0sQ0FBUyxDQUFDO0FBQ25DLEtBQVksTUFBTSx1QkFBTSxFQUFRLENBQUM7QUFFakMsMkNBQThCLEVBQTJCLENBQUM7QUFDMUQseUNBQStCLEVBQXFCLENBQUM7QUFFMUMsbUJBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUNsRCxvQkFBVyxHQUFXLGFBQWEsQ0FBQztBQVUvQztLQUFBQztLQWlDQUMsQ0FBQ0E7S0FoQ0FELGtDQUFZQSxHQUFaQSxVQUFhQSxLQUFhQSxFQUFFQSxLQUFhQTtTQUN4Q0UsSUFBSUEsTUFBTUEsR0FBV0EsNEJBQWNBLENBQUNBLFVBQVVBLENBQUNBO1NBRS9DQSxJQUFJQSxLQUFLQSxHQUFrQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7U0FDakRBLElBQUlBLEdBQUdBLEdBQWtCQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtTQUUvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUE7Z0JBQzVCQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN0Q0EsTUFBTUEsQ0FBQ0EsNkJBQWFBLENBQUNBLEtBQUtBLENBQUNBO1NBQzVCQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQTtnQkFDbENBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2FBQ3ZDQSxNQUFNQSxDQUFDQSw2QkFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7U0FDOUJBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLE1BQU1BLENBQUNBLDZCQUFhQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUMzQkEsQ0FBQ0E7S0FDRkEsQ0FBQ0E7S0FFREYsMkNBQXFCQSxHQUFyQkEsVUFBc0JBLFlBQW9CQTtTQUN6Q0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDeENBLENBQUNBO0tBRURILDJDQUFxQkEsR0FBckJBLFVBQXNCQSxZQUFvQkE7U0FDekNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7S0FDbEVBLENBQUNBO0tBRURKLHlDQUFtQkEsR0FBbkJBLFVBQW9CQSxZQUFvQkE7U0FDdkNLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7S0FDbEVBLENBQUNBO0tBRURMLHdDQUFrQkEsR0FBbEJBLFVBQW1CQSxZQUFvQkE7U0FDdENNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7S0FDaEVBLENBQUNBO0tBQ0ZOLGtCQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBakNZLG9CQUFXLGNBaUN2QjtBQUVVLG9CQUFXLEdBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7QUFFekQsUUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztNQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs7OztBQ3pEcEMsYUFBWSxDQUFDO0FBRWIsWUFBWSxhQUFhO0tBQ3hCTyx1REFBV0E7S0FDWEEsbURBQVNBO0tBQ1RBLGtEQUFTQTtBQUNWQSxFQUFDQSxFQUpXLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7QUFKRCxLQUFZLGFBQWEsR0FBYixxQkFJWDtBQUVELDJCQUFpQyxHQUFXO0tBQzNDQyxZQUFZQSxDQUFDQTtLQUNiQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNmQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQTtLQUM1QkEsQ0FBQ0E7S0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDcEJBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBO0tBQzlCQSxDQUFDQTtLQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUNQQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQTtLQUMzQkEsQ0FBQ0E7QUFDRkEsRUFBQ0E7QUFUZSx5QkFBZ0IsbUJBUy9COzs7Ozs7O0FDakJELGFBQVksQ0FBQztBQUdiLEtBQVksQ0FBQyx1QkFBTSxDQUFRLENBQUM7QUFDNUIsS0FBWSxNQUFNLHVCQUFNLEVBQVEsQ0FBQztBQUVqQywwQ0FLTyxFQUFzQixDQUFDO0FBRTlCLDJDQUdPLEVBQXlCLENBQUM7QUFJakMsMkNBQWdELEVBQTJCLENBQUM7QUFFakUsb0JBQVcsR0FBVyxhQUFhLENBQUM7QUE4Qi9DO0tBRUNDLHFCQUFvQkEsTUFBMkJBLEVBQVVBLElBQWtCQTtTQUY1RUMsaUJBb0pDQTtTQWxKb0JBLFdBQU1BLEdBQU5BLE1BQU1BLENBQXFCQTtTQUFVQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFjQTtTQWtCbkVBLGVBQVVBLEdBQVdBLFlBQVlBLENBQUNBO1NBakJ6Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0E7YUFDWkEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFDQSxJQUFZQSxJQUFlQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNqR0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNuREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN0REEsRUFBRUEsSUFBSUEsRUFBRUEsV0FBV0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3pEQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN4REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO1VBQ3hEQSxDQUFDQTtLQUNIQSxDQUFDQTtLQUtPRCxnQ0FBVUEsR0FBbEJBLFVBQW1CQSxJQUFhQTtTQUMvQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7S0FDL0NBLENBQUNBO0tBRURGLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTtTQUMxQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7S0FDL0JBLENBQUNBO0tBRURILDZCQUFPQSxHQUFQQSxVQUFRQSxLQUFhQSxFQUFFQSxJQUFhQTtTQUNuQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDckNBLENBQUNBO0tBRURKLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTtTQUMxRUssRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2JBLENBQUNBO1NBRURBLElBQUlBLFNBQVNBLEdBQVNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO1NBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtTQUVsREEsSUFBSUEsTUFBTUEsR0FBb0JBLEVBQUVBLENBQUNBO1NBQ2pDQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtTQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7U0FDL0RBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1NBRTFEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDbkJBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBO1NBQzVFQSxDQUFDQTtTQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2QkEsTUFBTUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE1BQU1BLENBQUNBLE1BQU1BLElBQUlBLEVBQUVBLENBQUNBO1NBQ3JCQSxDQUFDQTtTQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtLQUNmQSxDQUFDQTtLQUVETCx3Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7U0FDL0VNLElBQUlBLFlBQVlBLEdBQVdBLElBQUlBLENBQUNBLDBCQUEwQkEsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7U0FDbkZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNB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QSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTthQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7YUFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xEQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTthQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtpQkFDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2lCQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbERBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtpQkFFbEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO3FCQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7cUJBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtxQkFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVB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ZUFBQ0E7QUFBREEsRUFBQ0EsSUFBQTtBQTFCWSxpQkFBUSxXQTBCcEIiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwib3V0cHV0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NDM0ZDQ4MzIzY2ZkNDdhY2I5ZVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBiZWhhdmlvcnMgZnJvbSAnLi9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGZpbHRlcnMgZnJvbSAnLi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgc2VydmljZXMgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzL3R5cGVzLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgeyBiZWhhdmlvcnMsIGZpbHRlcnMsIHNlcnZpY2VzLCB0eXBlcyB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRiZWhhdmlvcnMubmFtZSxcclxuXHRmaWx0ZXJzLm5hbWUsXHJcblx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3V0aWxpdGllcy50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiYW5ndWxhclwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIHN0b3BFdmVudFByb3BvZ2F0aW9uIGZyb20gJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuZXhwb3J0IHsgc3RvcEV2ZW50UHJvcG9nYXRpb24gfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgYW5ndWxhci5JQXR0cmlidXRlcyB7XHJcblx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBhbmd1bGFyLklEaXJlY3RpdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdGxpbmsoc2NvcGU6IGFuZ3VsYXIuSVNjb3BlXHJcblx0XHRcdCwgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGlzRW1wdHkgZnJvbSAnLi9pc0VtcHR5L2lzRW1wdHknO1xyXG5pbXBvcnQgKiBhcyB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlL3RydW5jYXRlJztcclxuXHJcbmV4cG9ydCB7IGlzRW1wdHksIHRydW5jYXRlIH07XHJcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWVcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSXNFbXB0eUZpbHRlciB7XHJcblx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxufVxyXG5cclxuaXNFbXB0eS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IElPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbiA9PiB7XHJcblx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuICFpc0VtcHR5O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWVdKVxyXG5cdC5maWx0ZXIoc2VydmljZU5hbWUsIGlzRW1wdHkpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLFxyXG5cdG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lLFxyXG5cdElBcnJheVV0aWxpdHlcclxufSBmcm9tICcuLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXlTZXJ2aWNlTmFtZV07XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7XHJcblx0XHR9XHJcblxyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uc29tZShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG5cdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcblx0fVxyXG5cclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0dmFyIHR5cGUxOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMTtcclxuXHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodHlwZTEgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuXHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0Xy5mb3JJbihvYmoxLCAodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG5cdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKHZhbHVlLCBvYmoyW2tleV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdC8vaWYgdGhlcmUgYXJlIHN0aWxsIGtleXMgbGVmdCBpbiBrZXlzMiwgd2Uga25vdyB0aGV5IGFyZSBub3QgZXF1YWwgKG9iajIgaGFzIG1vcmUgcHJvcGVydGllcylcclxuXHRcdFx0aWYgKF8uc29tZShrZXlzMikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vaWYgdHlwZXMgYXJlIHByaW1pdGl2ZSwgZG8gYSBzaW1wbGUgY29tcGFyaXNvblxyXG5cdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBvYmplY3QgKyAnJztcclxuXHR9XHJcblxyXG5cdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiX1wiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiX1wiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXHQndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdGxhc3Q8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10pOiBURGF0YVR5cGU7XHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9O1xyXG59XHJcblxyXG5jbGFzcyBBcnJheVV0aWxpdHkgaW1wbGVtZW50cyBJQXJyYXlVdGlsaXR5IHtcclxuXHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0Xy5lYWNoKGFycmF5LCAoaXRlbTogVERhdGFUeXBlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHR2YXIgaW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybT86IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyIHtcclxuXHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0bGlzdCA9IF8ubWFwKGFycmF5LCAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyID0+IHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0fVxyXG5cclxuXHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7IChpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmcgfSlcclxuXHRcdDogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9IHtcclxuXHRcdC8vIG5lZWRzIHRvIGJlIHNlZWRlZCB3aXRoIGFuIG9iamVjdCBvciBpdCB3aWxsIGJlIHZpZXdlZCBhcyBhbiBhcnJheSB3aXRoIG5vIGl0ZW1zXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0sIGl0ZW06IFREYXRhVHlwZSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSA9PiB7XHJcblx0XHRcdGRpY3Rpb25hcnlba2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuXHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHR9LCA8YW55Pnt9KTtcclxuXHR9XHJcblxyXG5cdGxhc3Q8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10pOiBURGF0YVR5cGUge1xyXG5cdFx0aWYgKGFycmF5ICE9IG51bGwgJiYgYXJyYXkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdG1vZHVsZU5hbWUgYXMgb2JqZWN0TW9kdWxlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdChpbnB1dD86IG51bWJlciwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxufVxyXG5cclxudHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3RTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHk6IElPYmplY3RVdGlsaXR5KTogSVRydW5jYXRlRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG5cclxuXHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuXHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdG91dCArPSAnLi4uJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBvdXQ7XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWVdKVxyXG5cdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHR1cGRhdGVPcHRpb25Db3VudHM8VEl0ZW1UeXBlPihkYXRhOiBUSXRlbVR5cGVbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXIudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYXJyYXkgZnJvbSAnLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgYm9vbGVhbiBmcm9tICcuL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZGF0YUNvbnRyYWN0cyBmcm9tICcuL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBkYXRlIGZyb20gJy4vZGF0ZS9kYXRlLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tICcuL2Vycm9ySGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGZpbGVTaXplIGZyb20gJy4vZmlsZVNpemUvZmlsZVNpemUubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZ2VuZXJpY1NlYXJjaEZpbHRlciBmcm9tICcuL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZ3VpZCBmcm9tICcuL2d1aWQvZ3VpZC5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJy4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBub3RpZmljYXRpb24gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBudW1iZXJTZXJ2aWNlIGZyb20gJy4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgb2JqZWN0U2VydmljZSBmcm9tICcuL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9ic2VydmFibGUgZnJvbSAnLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHBhcmVudENoaWxkQmVoYXZpb3IgZnJvbSAnLi9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHByb21pc2UgZnJvbSAnLi9wcm9taXNlL3Byb21pc2Uuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHN0cmluZ1NlcnZpY2UgZnJvbSAnLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzeW5jaHJvbml6ZWRSZXF1ZXN0cyBmcm9tICcuL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB0ZXN0IGZyb20gJy4vdGVzdC90ZXN0Lm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHRpbWUgZnJvbSAnLi90aW1lL3RpbWUuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQge1xyXG5cdGFycmF5LFxyXG5cdGJvb2xlYW4sXHJcblx0ZGF0YUNvbnRyYWN0cyxcclxuICAgIGRhdGUsXHJcbiAgICBlcnJvckhhbmRsZXIsXHJcblx0ZmlsZVNpemUsXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlcixcclxuXHRndWlkLFxyXG5cdG1vbWVudCxcclxuXHRub3RpZmljYXRpb24sXHJcblx0bnVtYmVyU2VydmljZSBhcyBudW1iZXIsXHJcblx0b2JqZWN0U2VydmljZSBhcyBvYmplY3QsXHJcblx0b2JzZXJ2YWJsZSxcclxuXHRwYXJlbnRDaGlsZEJlaGF2aW9yLFxyXG5cdHByb21pc2UsXHJcblx0c3RyaW5nU2VydmljZSBhcyBzdHJpbmcsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMsXHJcblx0dGVzdCxcclxuXHR0aW1lLFxyXG5cdHZhbGlkYXRpb24sXHJcbn07XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdGFycmF5Lm1vZHVsZU5hbWUsXHJcblx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdGRhdGFDb250cmFjdHMubW9kdWxlTmFtZSxcclxuICAgIGRhdGUubW9kdWxlTmFtZSxcclxuICAgIGVycm9ySGFuZGxlci5tb2R1bGVOYW1lLFxyXG5cdGZpbGVTaXplLm1vZHVsZU5hbWUsXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG5cdGd1aWQubW9kdWxlTmFtZSxcclxuXHRtb21lbnQubW9kdWxlTmFtZSxcclxuXHRub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuXHRudW1iZXJTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0b2JqZWN0U2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuXHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdHN0cmluZ1NlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRzeW5jaHJvbml6ZWRSZXF1ZXN0cy5tb2R1bGVOYW1lLFxyXG5cdHRpbWUubW9kdWxlTmFtZSxcclxuXHR0ZXN0Lm1vZHVsZU5hbWUsXHJcblx0dmFsaWRhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBCb29sZWFuVXRpbGl0eSBpbXBsZW1lbnRzIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gISFvYmplY3Q7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHJlc291cmNlQnVpbGRlck1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBiYXNlRGF0YVNlcnZpY2VNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgY29udmVydGVycyBmcm9tICcuL2NvbnZlcnRlcnMvY29udmVydGVycyc7XHJcbmltcG9ydCAqIGFzIG1vY2tzIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9kYXRhU2VydmljZU1vY2tzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRhQ29udHJhY3RzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnknO1xyXG5leHBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSwgSUJhc2VEb21haW5PYmplY3QsIEJhc2VEYXRhU2VydmljZSwgZmFjdG9yeU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcsIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBmYWN0b3J5TmFtZSBhcyBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSB9IGZyb20gJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VSZXNvdXJjZUJ1aWxkZXIsIHNlcnZpY2VOYW1lIGFzIGJ1aWxkZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBjb252ZXJ0ZXJzLCBtb2NrcyB9O1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdGJhc2VEYXRhU2VydmljZU1vZHVsZU5hbWUsXHJcblx0YmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9kdWxlTmFtZSxcclxuXHRyZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnRyYWN0TGlicmFyeSwgQ29udHJhY3RMaWJyYXJ5LCBJTGlicmFyeVNlcnZpY2VzIH0gZnJvbSAnLi9jb250cmFjdExpYnJhcnknO1xyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldywgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcsIEJhc2VEYXRhU2VydmljZVZpZXcsIEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVJlc291cmNlQnVpbGRlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdiYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogVXJsIHRvIGhpdCB3aXRoIGdldExpc3QgYW5kIGNyZWF0ZVxyXG5cdCogLSBleHRlbmRlZCB3aXRoIC9pZCBmb3IgZ2V0RGV0YWlsLCB1cGRhdGUsIGFuZCBkZWxldGVcclxuXHQqL1xyXG5cdGVuZHBvaW50Pzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQqIEZsYWcgZm9yIHNwZWNpZnlpbmcgaWYgdGhlIGRhdGEgc2VydmljZSBzaG91bGQgdXNlIHRoZSBtb2NrIGRhdGEgb3IgaGl0IHRoZSBhY3R1YWwgZW5kcG9pbnRcclxuXHQqIGRlZmF1bHRzIHRvIHRydWUgaWYgZW5kcG9pbnQgaXMgbm90IGRlZmluZWRcclxuXHQqL1xyXG5cdHVzZU1vY2s/OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQqIEZsYWcgZm9yIHNwZWNpZnlpbmcgaWYgdGhlIGRhdGEgc2VydmljZSBzaG91bGQgbG9nIGFsbCByZXF1ZXN0cyBhZ2FpbnN0IHRoZSBjb250cmFjdFxyXG5cdCovXHJcblx0bG9nUmVxdWVzdHM/OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQqIE1hcHBpbmcgdG8gc3BlY2lmeSBob3cgcHJvcGVydGllcyBzaG91bGQgYmUgdHJhbnNmb3JtZWQgdG8gYW5kIGZyb20gdGhlIHNlcnZlclxyXG5cdCovXHJcblx0dHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+IGV4dGVuZHMgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRXhhbXBsZSBkYXRhIHNldCB0byBiZSB1c2VkIGZvciB0ZXN0aW5nIGFuZCBwcm90b3R5cGluZyBpbnN0ZWFkIG9mIGhpdHRpbmcgdGhlIGVuZHBvaW50XHJcblx0Ki9cclxuXHRtb2NrRGF0YT86IFREYXRhVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEZ1bmN0aW9uIHRoYXQgYnVpbGRzIGEgZGljdGlvbmFyeSBvZiBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyPzogeyAoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEV4YW1wbGUgb2JqZWN0IHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcgYW5kIHByb3RvdHlwaW5nIGluc3RlYWQgb2YgaGl0dGluZyB0aGUgZW5kcG9pbnRcclxuXHQqL1xyXG5cdG1vY2tEYXRhPzogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEZ1bmN0aW9uIHRoYXQgYnVpbGRzIGEgZGljdGlvbmFyeSBvZiBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyPzogeyAoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVJlc291cmNlQnVpbGRlciB7XHJcblx0LyoqXHJcblx0KiBBIGhlbHBlciB0byBwYXNzIGludG8gdGhlIGNvbnN0cnVjdG9yIHdoZW4gYnVpbGRpbmcgYSBuZXcgY29udHJhY3RzIGxpYnJhcnlcclxuXHQqL1xyXG5cdGdldExpYnJhcnlTZXJ2aWNlcygpOiBJTGlicmFyeVNlcnZpY2VzO1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHN0YW5kYXJkIHJlc291cmNlIHdpdGggZ2V0TGlzdCwgZ2V0RGV0YWlsLCBjcmVhdGUsIHVwZGF0ZSwgZGVsZXRlXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3RhbmRhcmQgcmVzb3VyY2Ugd2l0aCBnZXRMaXN0LCBnZXREZXRhaWwsIGNyZWF0ZSwgdXBkYXRlLCBkZWxldGVcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgdm9pZD47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgdm9pZD47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgcGFyZW50IHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc3RhbmRhcmQgd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHN0YW5kYXJkIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCB2b2lkLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB3aXRoIHN1Yi1yZXNvdXJjZXMgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB3aXRoIHN1Yi1yZXNvdXJjZXMgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgdm9pZCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIERlcHJlY2F0ZWQgLSBDcmVhdGUgYSBzaW5nbGV0b24gcmVzb3VyY2Ugd2l0aCBnZXQgYW5kIHVwZGF0ZVxyXG5cdCovXHJcblx0Y3JlYXRlU2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlPihvcHRpb25zOiBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBEZXByZWNhdGVkIC0gQ3JlYXRlIGEgcGFyZW50IHNpbmdsZXRvbiByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHNpbmdsZXRvbiB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VSZXNvdXJjZUJ1aWxkZXIgaW1wbGVtZW50cyBJQmFzZVJlc291cmNlQnVpbGRlciB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckaHR0cCcsICckcScsICckcm9vdFNjb3BlJywgYXJyYXlTZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgYXJyYXk6IElBcnJheVV0aWxpdHkpIHsgfVxyXG5cclxuXHRnZXRMaWJyYXJ5U2VydmljZXMoKTogSUxpYnJhcnlTZXJ2aWNlcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQkcTogdGhpcy4kcSxcclxuXHRcdFx0JHJvb3RTY29wZTogdGhpcy4kcm9vdFNjb3BlLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZVZpZXcodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50RGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlPihvcHRpb25zOiBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVzZU1vY2tJZk5vRW5kcG9pbnQ8VERhdGFUeXBlPihvcHRpb25zOiBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPik6IElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHRcdG9wdGlvbnMudXNlTW9jayA9IG9wdGlvbnMuZW5kcG9pbnQgPT0gbnVsbCA/IHRydWUgOiBvcHRpb25zLnVzZU1vY2s7XHJcblx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheU1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCYXNlUmVzb3VyY2VCdWlsZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsIG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lIH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZURhdGFTZXJ2aWNlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2Jhc2VEYXRhU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRG9tYWluT2JqZWN0IHtcclxuICAgIGlkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRnZXRMaXN0KHBhcmFtcz86IFRTZWFyY2hQYXJhbXMpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgIGdldERldGFpbChpZDogbnVtYmVyKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgY3JlYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICB1c2VNb2NrOiBib29sZWFuO1xyXG4gICAgbG9nUmVxdWVzdHM6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IGltcGxlbWVudHMgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIHByaXZhdGUgYmVoYXZpb3I6IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHByb3RlY3RlZCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG4gICAgICAgICAgICAsIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcbiAgICAgICAgICAgICwgcHVibGljIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBwdWJsaWMgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbUVuZHBvaW50KGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0KHBhcmFtczogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRMaXN0KHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZVtdID0+IHsgcmV0dXJuIHRoaXMubW9ja0RhdGEgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXRhaWwoaWQ6IG51bWJlcik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0SXRlbSh7XHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChpZCksXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuY3JlYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBhZGRNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRJZDogbnVtYmVyID0gXy5tYXhCeSh0aGlzLm1vY2tEYXRhLCAnaWQnKS5pZCArIDE7XHJcbiAgICAgICAgICAgICAgICBkb21haW5PYmplY3QuaWQgPSBuZXh0SWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vY2tEYXRhLnB1c2goZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5nZXRJdGVtRW5kcG9pbnQoZG9tYWluT2JqZWN0LmlkKSxcclxuICAgICAgICAgICAgdXBkYXRlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRPYmplY3Q6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG9sZE9iamVjdCA9IDxURGF0YVR5cGU+Xy5hc3NpZ24ob2xkT2JqZWN0LCBkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5kZWxldGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCksXHJcbiAgICAgICAgICAgIHJlbW92ZU1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5LnJlbW92ZSh0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VGYWN0b3J5IHtcclxuICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgLCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuKTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG59XHJcblxyXG5iYXNlRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgYXJyYXlTZXJ2aWNlTmFtZV07XHJcbmV4cG9ydCBmdW5jdGlvbiBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBhcnJheTogSUFycmF5VXRpbGl0eSk6IElCYXNlRGF0YVNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlW11cclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+KCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheU1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VEYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udmVydGVyPFREYXRhVHlwZT4ge1xyXG5cdGZyb21TZXJ2ZXIocmF3OiBhbnkpOiBURGF0YVR5cGU7XHJcbiAgICB0b1NlcnZlcihkYXRhOiBURGF0YVR5cGUpOiBhbnksXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGVuZHBvaW50OiBzdHJpbmc7XHJcbiAgICB1c2VNb2NrOiBib29sZWFuO1xyXG4gICAgbG9nUmVxdWVzdHM6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgcGFyYW1zOiBhbnk7XHJcbiAgICBnZXRNb2NrRGF0YSgpOiBURGF0YVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2V0SXRlbU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBnZXRNb2NrRGF0YSgpOiBURGF0YVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIGFkZE1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIHVwZGF0ZU1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlbGV0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIHJlbW92ZU1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4ge1xyXG5cdGdldExpc3Qob3B0aW9uczogSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgIGdldEl0ZW0ob3B0aW9uczogSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBjcmVhdGUob3B0aW9uczogSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJVXBkYXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgZGVsZXRlKG9wdGlvbnM6IElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIHRyYW5zZm9ybTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwge1tpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+fSkgeyB9XHJcblxyXG4gICAgZ2V0TGlzdChvcHRpb25zOiBJR2V0TGlzdE9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQsIHsgcGFyYW1zOiBvcHRpb25zLnBhcmFtcyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZVtdPik6IFREYXRhVHlwZVtdID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlW10pOiBURGF0YVR5cGVbXSA9PiB7XHJcblx0XHRcdGRhdGEgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKGRhdGEsIHRoaXMudHJhbnNmb3JtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0TGlzdCcsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKG9wdGlvbnM6IElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmdldE1vY2tEYXRhKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldChvcHRpb25zLmVuZHBvaW50KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZT4pOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hcHBseVRyYW5zZm9ybShkYXRhLCB0aGlzLnRyYW5zZm9ybSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2dldCcsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKG9wdGlvbnM6IElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgb3B0aW9ucy5kb21haW5PYmplY3QgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKG9wdGlvbnMuZG9tYWluT2JqZWN0LCB0aGlzLnRyYW5zZm9ybSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmFkZE1vY2tEYXRhKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAucG9zdChvcHRpb25zLmVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShvcHRpb25zLmRvbWFpbk9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZT4pOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXBwbHlUcmFuc2Zvcm0oZGF0YSwgdGhpcy50cmFuc2Zvcm0sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdjcmVhdGUnLCBkYXRhLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShvcHRpb25zOiBJVXBkYXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIG9wdGlvbnMuZG9tYWluT2JqZWN0ID0gdGhpcy5hcHBseVRyYW5zZm9ybShvcHRpb25zLmRvbWFpbk9iamVjdCwgdGhpcy50cmFuc2Zvcm0sIHRydWUpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy51cGRhdGVNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdClcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAucHV0KG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMuZG9tYWluT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmFwcGx5VHJhbnNmb3JtKGRhdGEsIHRoaXMudHJhbnNmb3JtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygndXBkYXRlJywgb3B0aW9ucy5kb21haW5PYmplY3QsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKG9wdGlvbnM6IElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmVtb3ZlTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZGVsZXRlPHZvaWQ+KG9wdGlvbnMuZW5kcG9pbnQpLnRoZW4oKCk6IHZvaWQgPT4geyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2RlbGV0ZScsIG9wdGlvbnMuZG9tYWluT2JqZWN0LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2cocmVxdWVzdE5hbWU6IHN0cmluZywgZGF0YTogYW55LCBlbmRwb2ludDogc3RyaW5nLCB1c2VNb2NrOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vY2tTdHJpbmcgPSB1c2VNb2NrID8gJ01vY2tlZCAnIDogJyc7XHJcbiAgICAgICAgbGV0IGVuZHBvaW50U3RyaW5nID0gZW5kcG9pbnQgPT0gbnVsbCA/ICd1bnNwZWNpZmllZCcgOiBlbmRwb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2NrU3RyaW5nICsgcmVxdWVzdE5hbWUgKyAnIGZvciBlbmRwb2ludCAnICsgZW5kcG9pbnRTdHJpbmcgKyAnOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VHJhbnNmb3JtKGRhdGE6IGFueSwgdHJhbnNmb3JtOiBJQ29udmVydGVyPGFueT4gfCB7W2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT59LCB0b1NlcnZlcjogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAodHJhbnNmb3JtID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKF8uaXNBcnJheShkYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gXy5tYXAoZGF0YSwgKGl0ZW06IGFueSk6IGFueSA9PiB7IHJldHVybiB0aGlzLmFwcGx5VHJhbnNmb3JtKGl0ZW0sIHRyYW5zZm9ybSwgdG9TZXJ2ZXIpOyB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pc0NvbnZlcnRlcih0cmFuc2Zvcm0pKSB7XHJcblx0XHRcdGxldCB0cmFuc2Zvcm1GdW5jOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IHRvU2VydmVyXHJcblx0XHRcdFx0PyAoPElDb252ZXJ0ZXI8YW55Pj50cmFuc2Zvcm0pLnRvU2VydmVyXHJcblx0XHRcdFx0OiAoPElDb252ZXJ0ZXI8YW55Pj50cmFuc2Zvcm0pLmZyb21TZXJ2ZXI7XHJcblx0XHRcdHJldHVybiB0cmFuc2Zvcm1GdW5jKGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGF0YSwgKHByb3A6IGFueSwga2V5OiBzdHJpbmcpOiBhbnkgPT4ge1xyXG5cdFx0XHRcdGlmIChfLmhhcyh0cmFuc2Zvcm0sIGtleSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmFwcGx5VHJhbnNmb3JtKHByb3AsIHRyYW5zZm9ybVtrZXldLCB0b1NlcnZlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBwcm9wO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0cHJpdmF0ZSBpc0NvbnZlcnRlcihvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIF8uaXNGdW5jdGlvbihvYmplY3QuZnJvbVNlcnZlcilcclxuXHRcdFx0fHwgXy5pc0Z1bmN0aW9uKG9iamVjdC50b1NlcnZlcik7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4vYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+e1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+XHJcblx0aW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIF9lbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB8IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPGFueT4gfVxyXG4gICAgICAgICAgICAsIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBhcnJheSwgX2VuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdGxldCBtb2NrRGF0YTogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0uaWQgPT09IHBhcmVudElkO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnRyYW5zZm9ybSwgdGhpcy51c2VNb2NrLCB0aGlzLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgX2VuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdFx0LCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7KCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlfVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuICAgICAgICAgICAgLCB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0bGV0IG1vY2tEYXRhOiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gcGFyZW50SWQ7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRoaXMudHJhbnNmb3JtLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMsIHBhcmVudElkKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50c1xuICoqLyIsImltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5IH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz57XHJcblx0Y2hpbGRDb250cmFjdHMoaWQ/OiBudW1iZXIpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGFycmF5OiBJQXJyYXlVdGlsaXR5LCBlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdCwgcHVibGljIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSUNvbnZlcnRlcjxURGF0YVR5cGU+IHwgeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55PiB9XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcbiAgICAgICAgLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIHtcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKGlkKSkge1xyXG5cdFx0XHRsZXQgZGljdGlvbmFyeTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIoKTtcclxuXHRcdFx0Xy5lYWNoKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZGF0YVNlcnZpY2UuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgZGF0YVNlcnZpY2UuZW5kcG9pbnQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBkaWN0aW9uYXJ5OiB7W2luZGV4OiBzdHJpbmddOiBhbnl9ID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKCk7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB8IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiA9PiB7XHJcblx0XHRcdFx0bGV0IGNvbnRyYWN0OiBhbnk7XHJcblx0XHRcdFx0aWYgKF8uaXNGdW5jdGlvbihkYXRhU2VydmljZS5Bc1NpbmdsZXRvbikpIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24oaWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQgKyBjb250cmFjdC5lbmRwb2ludDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyYWN0O1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICBnZXQoKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIHByaXZhdGUgYmVoYXZpb3I6IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBtb2NrRGF0YTogVERhdGFUeXBlXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0dGhpcy5iZWhhdmlvciA9IG5ldyBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcigkaHR0cCwgJHEsIHRyYW5zZm9ybSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KCk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0SXRlbSh7XHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZSA9PiB7IHJldHVybiB0aGlzLm1vY2tEYXRhOyB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IudXBkYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICB1cGRhdGVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2NrRGF0YSA9IDxURGF0YVR5cGU+Xy5hc3NpZ24odGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG59XHJcblxyXG5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcbmV4cG9ydCBmdW5jdGlvbiBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+KCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShmYWN0b3J5TmFtZSwgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPntcclxuXHRjaGlsZENvbnRyYWN0cygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRjb25zdHJ1Y3RvcigkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCAkcTogbmcuSVFTZXJ2aWNlLCBlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YTogVERhdGFUeXBlXHJcblx0XHQsIHByaXZhdGUgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeyAoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfVxyXG5cdFx0LCB0cmFuc2Zvcm0/OiBJQ29udmVydGVyPFREYXRhVHlwZT4gfCB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxhbnk+IH1cclxuXHRcdCwgdXNlTW9jaz86IGJvb2xlYW5cclxuXHRcdCwgbG9nUmVxdWVzdHM/OiBib29sZWFuXHJcblx0XHQsIHByaXZhdGUgcGFyZW50SWQ/OiBudW1iZXIpIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNoaWxkQ29udHJhY3RzKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIHtcclxuXHRcdGxldCBkaWN0aW9uYXJ5OiB7W2luZGV4OiBzdHJpbmddOiBhbnl9ID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKCk7XHJcblx0XHRyZXR1cm4gPGFueT5fLm1hcFZhbHVlcyhkaWN0aW9uYXJ5LCAoZGF0YVNlcnZpY2U6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgYW55Pik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB8IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBhbnk+ID0+IHtcclxuXHRcdFx0bGV0IGNvbnRyYWN0OiBhbnk7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24oZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24pKSB7XHJcblx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZS5Bc1NpbmdsZXRvbih0aGlzLnBhcmVudElkKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb250cmFjdC5lbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQgKyBjb250cmFjdC5lbmRwb2ludDtcclxuXHJcblx0XHRcdHJldHVybiBjb250cmFjdDtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlQ29udmVydGVyL2RhdGVDb252ZXJ0ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2VudW1Db252ZXJ0ZXIvZW51bUNvbnZlcnRlcic7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9jb252ZXJ0ZXJzLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBkYXRlVXRpbGl0eSwgZGVmYXVsdEZvcm1hdHMgfSBmcm9tICcuLi8uLi8uLi9kYXRlL2RhdGUubW9kdWxlJztcclxuXHJcbmV4cG9ydCBsZXQgZGF0ZUNvbnZlcnRlcjogSUNvbnZlcnRlcjxEYXRlPiA9IHtcclxuXHRmcm9tU2VydmVyKHJhdzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRyZXR1cm4gZGF0ZVV0aWxpdHkuZ2V0RGF0ZUZyb21JU09TdHJpbmcocmF3KTtcclxuXHR9LFxyXG5cdHRvU2VydmVyKGRhdGE6IERhdGUpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIG1vbWVudChkYXRhKS5mb3JtYXQoZGVmYXVsdEZvcm1hdHMuaXNvRm9ybWF0KTtcclxuXHR9LFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZGF0ZUNvbnZlcnRlci9kYXRlQ29udmVydGVyLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm1vbWVudFwiXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIG1vbWVudE1vZHVsZU5hbWUgfSBmcm9tICcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgdGltZU1vZHVsZU5hbWUgfSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRlVXRpbGl0eSwgc2VydmljZU5hbWUgfSBmcm9tICcuL2RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbW9tZW50TW9kdWxlTmFtZSwgdGltZU1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHQudmFsdWUoZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGVmYXVsdEZvcm1hdHMpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdtb21lbnRXcmFwcGVyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb21lbnRXcmFwcGVyKCk6IHZvaWQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0Ly8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG5cdC8vICBjcmVhdGVGcm9tSW5wdXRGYWxsYmFjayBkb2Vzbid0IGFwcGVhciB0byBiZVxyXG5cdC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuXHR2YXIgbW9tZW50V3JhcHBlcjogYW55ID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG5cclxuXHQvLyBTZXQgZGVmYXVsdCBtZXRob2QgZm9yIGhhbmRsaW5nIG5vbi1JU08gZGF0ZSBjb252ZXJzaW9ucy5cclxuXHQvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcblx0Ly8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcblx0bW9tZW50V3JhcHBlci5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IChjb25maWc6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0Y29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gbW9tZW50V3JhcHBlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4uL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdGNvbXBhcmVUaW1lcyh0aW1lMTogc3RyaW5nLCB0aW1lMjogc3RyaW5nKTogQ29tcGFyZVJlc3VsdDtcclxuXHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdGNvbXBhcmVUaW1lcyh0aW1lMTogc3RyaW5nLCB0aW1lMjogc3RyaW5nKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRsZXQgZm9ybWF0OiBzdHJpbmcgPSBkZWZhdWx0Rm9ybWF0cy50aW1lRm9ybWF0O1xyXG5cclxuXHRcdGxldCBzdGFydDogbW9tZW50Lk1vbWVudCA9IG1vbWVudCh0aW1lMSwgZm9ybWF0KTtcclxuXHRcdGxldCBlbmQ6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQodGltZTIsIGZvcm1hdCk7XHJcblxyXG5cdFx0aWYgKHN0YXJ0LmhvdXJzKCkgPT0gZW5kLmhvdXJzKClcclxuXHRcdFx0JiYgc3RhcnQubWludXRlcygpID09IGVuZC5taW51dGVzKCkpIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXJ0LmhvdXJzKCkgPj0gZW5kLmhvdXJzKClcclxuXHRcdFx0XHQmJiBzdGFydC5taW51dGVzKCkgPj0gZW5kLm1pbnV0ZXMoKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGxldCB0aW1lVXRpbGl0eTogSVRpbWVVdGlsaXR5ID0gbmV3IFRpbWVVdGlsaXR5KCk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBlbnVtIENvbXBhcmVSZXN1bHQge1xyXG5cdGdyZWF0ZXIgPSAxLFxyXG5cdGVxdWFsID0gMCxcclxuXHRsZXNzID0gLTEsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bTogbnVtYmVyKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdGlmIChudW0gPT09IDApIHtcclxuXHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG5cdH0gZWxzZSBpZiAobnVtID4gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgdGltZU1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgdGltZVNlcnZpY2VOYW1lLFxyXG5cdElUaW1lVXRpbGl0eSxcclxuXHR0aW1lVXRpbGl0eSxcclxufSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbW9tZW50TW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBtb21lbnRTZXJ2aWNlTmFtZSxcclxufSBmcm9tICcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmltcG9ydCB7IENvbXBhcmVSZXN1bHQsIGdldENvbXBhcmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0JztcclxuXHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHR5ZWFyczogbnVtYmVyO1xyXG5cdG1vbnRoczogbnVtYmVyO1xyXG5cdGRheXM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZTtcclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0O1xyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGU7XHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGdldE5vdygpOiBEYXRlO1xyXG5cdGZvcm1hdERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IHN0cmluZztcclxuXHRzYW1lRGF0ZShkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGUxRm9ybWF0Pzogc3RyaW5nLCBkYXRlMkZvcm1hdD86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0c2FtZURhdGVUaW1lKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbW9tZW50U2VydmljZU5hbWUsIHRpbWVTZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogSVRpbWVVdGlsaXR5KSB7XHJcblx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRtb250aDogSU1vbnRoW107XHJcblx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0fVxyXG5cclxuXHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHR2YXIgcmVzdWx0OiBJRGF0ZVZhbHVlID0gPGFueT57fTtcclxuXHRcdHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRyZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQueWVhcnMgLT0gMTtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyArPSAxMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0dmFyIG1pbGxpc2Vjb25kczogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydCwgZW5kLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRyZXR1cm4gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IENvbXBhcmVSZXN1bHQge1xyXG5cdFx0Ly8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuXHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcblx0XHRyZXR1cm4gZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuXHR9XHJcblxyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IENvbXBhcmVSZXN1bHQubGVzcykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuXHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkudG9EYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlRnJvbUlTT1N0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbWVudChkYXRlKS50b0RhdGUoKTtcclxuXHR9XHJcblxyXG5cdGlzRGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpXHJcblx0XHR7XHJcblx0XHRcdC8vbG9kYXNoIHdpbGwgcmV0dXJuIHRydWUgaWYgaXQgaXMgYSB2YWxpZCBkYXRlIG9iamVjdCwgYnV0IGhhcyBpbiBpbnZhbGlkIHZhbHVlLlxyXG5cdFx0XHQvL2NoZWNrIHRoZSB0aW1lIHZhbHVlIG9mIHRoZSBkYXRlIG9iamVjdCB0byB2ZXJpZnkgdGhhdCBpdCdzIGEgVmFsaWQgRGF0ZS5cclxuXHRcdFx0bGV0IHIgPSFpc05hTihkYXRlLmdldFRpbWUoKSk7XHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgdGhpcy5nZXRGb3JtYXQoZGF0ZUZvcm1hdCkpLmlzVmFsaWQoKTtcclxuXHR9XHJcblxyXG5cdGdldE5vdygpOiBEYXRlIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Zm9ybWF0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbWVudCh0aGlzLmdldERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCkpLmZvcm1hdCh0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEZvcm1hdChjdXN0b21Gb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gY3VzdG9tRm9ybWF0ICE9IG51bGwgPyBjdXN0b21Gb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcblx0fVxyXG5cclxuXHRzYW1lRGF0ZShkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGUxRm9ybWF0Pzogc3RyaW5nLCBkYXRlMkZvcm1hdD86IHN0cmluZykge1xyXG5cdFx0aWYgKGRhdGUxRm9ybWF0ICE9IHVuZGVmaW5lZCAmJiBkYXRlMkZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRhdGUyRm9ybWF0ID0gZGF0ZTFGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0RhdGUoZGF0ZTEsIGRhdGUxRm9ybWF0KSAmJiB0aGlzLmlzRGF0ZShkYXRlMiwgZGF0ZTJGb3JtYXQpKSB7XHJcblx0XHRcdHJldHVybiBtb21lbnQoZGF0ZTEpLmZvcm1hdChcIk1NL0REL1lZWVlcIikgPT09IG1vbWVudChkYXRlMikuZm9ybWF0KFwiTU0vREQvWVlZWVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNhbWVEYXRlVGltZShkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGUxRm9ybWF0Pzogc3RyaW5nLCBkYXRlMkZvcm1hdD86IHN0cmluZykge1xyXG5cdFx0aWYgKGRhdGUxRm9ybWF0ICE9IHVuZGVmaW5lZCAmJiBkYXRlMkZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRhdGUyRm9ybWF0ID0gZGF0ZTFGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0RhdGUoZGF0ZTEsIGRhdGUxRm9ybWF0KSAmJiB0aGlzLmlzRGF0ZShkYXRlMiwgZGF0ZTJGb3JtYXQpKSB7XHJcblx0XHRcdHJldHVybiBtb21lbnQoZGF0ZTEpLmZvcm1hdChcIk1NL0REL1lZWVkgKy1ISG1tXCIpID09PSBtb21lbnQoZGF0ZTIpLmZvcm1hdChcIk1NL0REL1lZWVkgKy1ISG1tXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkYXRlVXRpbGl0eTogSURhdGVVdGlsaXR5ID0gbmV3IERhdGVVdGlsaXR5KG1vbWVudCwgdGltZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlRm9ybWF0U3RyaW5ncyB7XHJcblx0aXNvRm9ybWF0OiBzdHJpbmc7XHJcblx0ZGF0ZVRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0dGltZUZvcm1hdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0aXNvRm9ybWF0OiAnWVlZWS1NTS1ERFRISDptbTpzcycsXHJcblx0ZGF0ZVRpbWVGb3JtYXQ6ICdNL0QvWVlZWSBoOm1tIEEnLFxyXG5cdGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcblx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tICcuLi8uLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElJdGVtTGlzdCwgSUl0ZW0gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9pdGVtTGlzdCc7XHJcblxyXG5leHBvcnQgeyBJQ29udmVydGVyIH07XHJcblxyXG5leHBvcnQgY2xhc3MgRW51bUNvbnZlcnRlcjxUSXRlbVR5cGUgZXh0ZW5kcyBJSXRlbT4gaW1wbGVtZW50cyBJQ29udmVydGVyPFRJdGVtVHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZW51bVR5cGU6IElJdGVtTGlzdDxUSXRlbVR5cGU+KSB7fVxyXG5cclxuXHRmcm9tU2VydmVyKHJhdzogbnVtYmVyKTogVEl0ZW1UeXBlIHtcclxuXHRcdHJldHVybiB0aGlzLmVudW1UeXBlLmdldChyYXcpO1xyXG5cdH1cclxuXHR0b1NlcnZlcihkYXRhOiBUSXRlbVR5cGUpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIGRhdGEgIT0gbnVsbFxyXG5cdFx0XHQ/IGRhdGEudmFsdWVcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2VudW1Db252ZXJ0ZXIvZW51bUNvbnZlcnRlci50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDcmVhdGUoKTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrQ2hpbGQobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZDtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDcmVhdGUoKTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0bW9ja0dldChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrVXBkYXRlKCk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9kYXRhU2VydmljZU1vY2tzLnRzXG4gKiovIiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElCYXNlUmVzb3VyY2VCdWlsZGVyLCBCYXNlUmVzb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlTW9jaywgSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2ssIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrIH0gZnJvbSAnLi9kYXRhU2VydmljZU1vY2tzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyYWN0TGlicmFyeSB7XHJcblx0Ly8gZXh0ZW5kIHdpdGggY3VzdG9tIGludGVyZmFjZSBzcGVjaWZ5aW5nIGNoaWxkIHJlc291cmNlc1xyXG5cclxuXHRmbHVzaCgpOiB2b2lkO1xyXG5cclxuXHRtb2NrR2V0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXRMaXN0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblxyXG5cdG1vY2tDaGlsZChwYXJlbnQ6IGFueSwgbW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZDtcclxuXHRjcmVhdGVNb2NrKHJlc291cmNlPzogYW55KTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+O1xyXG5cdGNyZWF0ZU1vY2tQYXJlbnQocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxhbnksIGFueSwgYW55PjtcclxuXHRjcmVhdGVNb2NrU2luZ2xldG9uKHJlc291cmNlPzogYW55KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGlicmFyeVNlcnZpY2VzIHtcclxuXHQkcTogbmcuSVFTZXJ2aWNlO1xyXG5cdCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJhY3RMaWJyYXJ5IGltcGxlbWVudHMgSUNvbnRyYWN0TGlicmFyeSB7XHJcblx0cHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlO1xyXG5cdHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYnVpbGRlcjogSUJhc2VSZXNvdXJjZUJ1aWxkZXIpIHtcclxuXHRcdGxldCBzZXJ2aWNlczogSUxpYnJhcnlTZXJ2aWNlcyA9ICg8QmFzZVJlc291cmNlQnVpbGRlcj5idWlsZGVyKS5nZXRMaWJyYXJ5U2VydmljZXMoKTtcclxuXHRcdHRoaXMuJHEgPSBzZXJ2aWNlcy4kcTtcclxuXHRcdHRoaXMuJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0fVxyXG5cclxuXHRmbHVzaCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblx0fVxyXG5cdG1vY2tHZXQocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXQnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tHZXRMaXN0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0TGlzdCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0dldERldGFpbChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldERldGFpbCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0NoaWxkKHBhcmVudDogYW55LCBtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkIHtcclxuXHRcdGxldCBnZXRDaGlsZHJlbjogeyhpZDogbnVtYmVyKTogYW55fSA9IHBhcmVudC5jaGlsZENvbnRyYWN0cy5iaW5kKHBhcmVudCk7XHJcblx0XHRwYXJlbnQuY2hpbGRDb250cmFjdHMgPSAoaWQ6IG51bWJlcik6IGFueSA9PiB7XHJcblx0XHRcdGxldCBjaGlsZHJlbjogYW55ID0gZ2V0Q2hpbGRyZW4oaWQpO1xyXG5cdFx0XHRtb2NrQ2FsbGJhY2soY2hpbGRyZW4pO1xyXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrKHJlc291cmNlPzogYW55KTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZU1vY2s8YW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUmVzb3VyY2U8YW55LCBhbnk+KHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXRMaXN0ID0gKGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldExpc3QnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXREZXRhaWwgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja1VwZGF0ZSA9ICgpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrU2F2ZShkYXRhU2VydmljZSwgJ3VwZGF0ZScpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0NyZWF0ZSA9ICgpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrU2F2ZShkYXRhU2VydmljZSwgJ2NyZWF0ZScpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UgPSB0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT4ge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiBhbnkgPSByZXNvdXJjZSAhPSBudWxsID8gcmVzb3VyY2UucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA6ICgpOiBhbnkgPT4geyByZXR1cm4ge307IH07XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2U8YW55LCBhbnksIGFueT4oe1xyXG5cdFx0XHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiBnZXRDaGlsZHJlbixcclxuXHRcdH0pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrQ2hpbGQgPSAobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCA9PiB7IHJldHVybiB0aGlzLm1vY2tDaGlsZChkYXRhU2VydmljZSwgbW9ja0NhbGxiYWNrKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tVcGRhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICd1cGRhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tDcmVhdGUgPSAoKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja1NhdmUoZGF0YVNlcnZpY2UsICdjcmVhdGUnKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlID0gdGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT4ge1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2Uoe30pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrVXBkYXRlID0gKCk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tTYXZlKGRhdGFTZXJ2aWNlLCAndXBkYXRlJyk7IH07XHJcblx0XHRkYXRhU2VydmljZSA9IHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2U6IGFueSwgcmVzb3VyY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKHJlc291cmNlICE9IG51bGwpIHtcclxuXHRcdFx0ZGF0YVNlcnZpY2UgPSBfLmV4dGVuZChyZXNvdXJjZSwgZGF0YVNlcnZpY2UpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBiYXNlTW9ja0dldChyZXNvdXJjZTogYW55LCBhY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdGxldCBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHRoaXMuc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kcS53aGVuKGRhdGEpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcblx0XHRyZXR1cm4gZnVuYztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tTYXZlKHJlc291cmNlOiBhbnksIGFjdGlvbk5hbWU6IHN0cmluZyk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdGxldCBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHRoaXMuc2lub24uc3B5KChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kcS53aGVuKGRhdGEpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcblx0XHRyZXR1cm4gZnVuYztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0IHNpbm9uKCk6IFNpbm9uLlNpbm9uU3RhdGljIHtcclxuXHRcdHJldHVybiBzaW5vbiB8fCA8YW55Pnsgc3B5OiAoZnVuYzogYW55KTogYW55ID0+IHsgcmV0dXJuIGZ1bmM7IH0gfTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgc2VydmljZU5hbWUgYXMgbm90aWZpY2F0aW9uU2VydmljZU5hbWUsXHJcbiAgICBtb2R1bGVOYW1lIGFzIG5vdGlmaWNhdGlvbk1vZHVsZU5hbWUsXHJcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEuc2VydmljZXMuZXJyb3JIYW5kbGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Vycm9ySGFuZGxlcic7XHJcblxyXG5leHBvcnQgZW51bSBIdHRwU3RhdHVzQ29kZSB7XHJcblx0dW5hdXRob3JpemVkID0gNDAxLFxyXG5cdGZvcmJpZGRlbiA9IDQwMyxcclxuXHRpbnZhbGlkVXJsID0gNDA0LFxyXG5cdHRpbWVvdXQgPSA0MDgsXHJcblx0aW50ZXJuYWxTZXJ2ZXJFcnJvciA9IDUwMCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVqZWN0aW9uIHtcclxuXHRzdGF0dXM6IEh0dHBTdGF0dXNDb2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvckhhbmRsZXJTZXJ2aWNlIHtcclxuXHRodHRwUmVzcG9uc2VFcnJvcihyZWplY3Rpb246IElSZWplY3Rpb24pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvck1lc3NhZ2VzIHtcclxuICAgIGZvcmJpZGRlbkVycm9yOiBzdHJpbmc7XHJcbiAgICBpbnZhbGlkVXJsRXJyb3I6IHN0cmluZztcclxuICAgIHRpbWVvdXRFcnJvcjogc3RyaW5nO1xyXG4gICAgaW50ZXJuYWxTZXJ2ZXJFcnJvcjogc3RyaW5nO1xyXG4gICAgZGVmYXVsdEVycm9yOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckhhbmRsZXJTZXJ2aWNlIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIGxvZ2luVXJsOiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcml2YXRlIGVycm9yTWVzc2FnZXM6IElFcnJvck1lc3NhZ2VzKSB7IH1cclxuXHJcblx0aHR0cFJlc3BvbnNlRXJyb3IocmVqZWN0aW9uOiBJUmVqZWN0aW9uKTogdm9pZCB7XHJcblx0XHRzd2l0Y2ggKHJlamVjdGlvbi5zdGF0dXMpIHtcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS51bmF1dGhvcml6ZWQ6XHJcblx0XHRcdFx0dGhpcy5sb2dnZWRPdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmZvcmJpZGRlbjpcclxuXHRcdFx0XHR0aGlzLmluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5pbnZhbGlkVXJsOlxyXG5cdFx0XHRcdHRoaXMuaW52YWxpZFVybEVycm9yKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUudGltZW91dDpcclxuXHRcdFx0XHR0aGlzLnRpbWVvdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmludGVybmFsU2VydmVyRXJyb3I6XHJcblx0XHRcdFx0dGhpcy5zeXN0ZW1FcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmRlZmF1bHRFcnJvcik7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignU3RhdHVzOiAnICsgcmVqZWN0aW9uLnN0YXR1cyk7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUmVzcG9uc2U6ICcgKyByZWplY3Rpb24pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBsb2dnZWRPdXRFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbiA9IDxhbnk+dGhpcy5sb2dpblVybDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5mb3JiaWRkZW5FcnJvcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGludmFsaWRVcmxFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5pbnZhbGlkVXJsRXJyb3IpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0aW1lb3V0RXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMudGltZW91dEVycm9yKTtcclxuXHRcdC8vIHJldHJ5XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN5c3RlbUVycm9yKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmludGVybmFsU2VydmVyRXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgYW5ndWxhci5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBlcnJvck1lc3NhZ2VzOiBJRXJyb3JNZXNzYWdlcztcclxuICAgICRnZXQoJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAsIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJRXJyb3JIYW5kbGVyU2VydmljZTtcclxufVxyXG5cclxuY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlczogSUVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVybCA9ICcvbG9naW4nO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgICAgICAgICAgZm9yYmlkZGVuRXJyb3I6ICdZb3UgaGF2ZSBpbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMgdG8gcGVyZm9ybSB0aGlzIGFjdGlvbicsXHJcbiAgICAgICAgICAgIGludmFsaWRVcmxFcnJvcjogJ1Jlc291cmNlIG5vdCBmb3VuZC4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQnLFxyXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3I6ICdSZXF1ZXN0IHRpbWVkIG91dC4gQ2hlY2sgeW91ciBuZXR3b3JrIGNvbm5lY3Rpb24gb3IgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IgZm9yIGlzc3VlcycsXHJcbiAgICAgICAgICAgIGludGVybmFsU2VydmVyRXJyb3I6ICdUaGUgc3lzdGVtIGhhcyBlbmNvdW50ZXJlZCBhbiBlcnJvci4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQuJyArXHJcbiAgICAgICAgICAgICcgUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBpZiB5b3UgYXJlIHVuYWJsZSB0byBjb21wbGV0ZSBjcml0aWNhbCB0YXNrcycsXHJcbiAgICAgICAgICAgIGRlZmF1bHRFcnJvcjogJ0h0dHAgc3RhdHVzIGNvZGUgbm90IGhhbmRsZWQnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy4kZ2V0LiRpbmplY3QgPSBbJyR3aW5kb3cnLCBub3RpZmljYXRpb25TZXJ2aWNlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgJGdldDogYW55ID0gKCR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSk6IElFcnJvckhhbmRsZXJTZXJ2aWNlID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9ySGFuZGxlclNlcnZpY2UoJHdpbmRvdywgbm90aWZpY2F0aW9uLCB0aGlzLmxvZ2luVXJsLCB0aGlzLmVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbm90aWZpY2F0aW9uTW9kdWxlTmFtZV0pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBuZXcgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyKCkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VOb3RpZmllciB9IGZyb20gJy4vYmFzZU5vdGlmaWVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdub3RpZmljYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5pbmZvKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIud2FybmluZyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5lcnJvcihtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLnN1Y2Nlc3MobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBhbmd1bGFyLklTZXJ2aWNlUHJvdmlkZXIge1xyXG5cdHNldE5vdGlmaWVyKG5vdGlmaWVyOiBJTm90aWZpZXIpOiB2b2lkO1xyXG5cdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgZXh0ZW5kcyBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHRub3RpZmllcjogSU5vdGlmaWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0bGV0IHByb3ZpZGVyOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgPSB7XHJcblx0XHRub3RpZmllcjogbmV3IEJhc2VOb3RpZmllcigpLFxyXG5cdFx0c2V0Tm90aWZpZXI6IChub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdH0sXHJcblx0XHQkZ2V0OiAoKTogSU5vdGlmaWNhdGlvblNlcnZpY2UgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdHJldHVybiBwcm92aWRlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTm90aWZpZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTm90aWZpZXIgaW1wbGVtZW50cyBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHdpbmRvdy5hbGVydChtZXNzYWdlKTtcclxuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBudW1iZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyIH0gZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplRmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyTW9kdWxlTmFtZV0pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHQuZmlsdGVyKHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5lbnVtIFNpZ24ge1xyXG5cdHBvc2l0aXZlID0gMSxcclxuXHRuZWdhdGl2ZSA9IC0xLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0fVxyXG5cclxuXHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG5cdH1cclxuXHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIXN0ZXApIHtcclxuXHRcdFx0cmV0dXJuIG51bTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcmVtYWluZGVyOiBudW1iZXIgPSBudW0gJSBzdGVwO1xyXG5cclxuXHRcdGlmIChyZW1haW5kZXIgPj0gc3RlcCAvIDIpIHtcclxuXHRcdFx0cmV0dXJuIG51bSArIChzdGVwIC0gcmVtYWluZGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudW0gLSByZW1haW5kZXI7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElOdW1iZXJVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBudW1iZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRkaXNwbGF5KCk6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRCWVRFU19QRVJfR0I6IG51bWJlciA9IDEwNzM3NDE4MjQ7XHJcblx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0Ynl0ZXM6IG51bWJlcjtcclxuXHJcblx0R0I6IG51bWJlcjtcclxuXHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRNQjogbnVtYmVyO1xyXG5cdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdEtCOiBudW1iZXI7XHJcblx0aXNLQjogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogSU51bWJlclV0aWxpdHksIGJ5dGVzOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0dGhpcy5pc0dCID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxufVxyXG5cclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyU2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5KTogSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBmYWN0b3J5TmFtZSwgSUZpbGVTaXplRmFjdG9yeSwgSUZpbGVTaXplIH0gZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbmV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG59XHJcblxyXG5maWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0cmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBzdHJpbmdNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIHN0cmluZ1NlcnZpY2VOYW1lLFxyXG5cdElTdHJpbmdVdGlsaXR5U2VydmljZSxcclxufSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUZpbHRlciB9IGZyb20gJy4uLy4uL2ZpbHRlcnMvZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHR0eXBlOiBzdHJpbmc7XHJcblx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdG1pblNlYXJjaExlbmd0aDogbnVtYmVyO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0bWluU2VhcmNoTGVuZ3RoOiBudW1iZXIgPSAxO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIG9iamVjdDogSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSB8fCB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDwgdGhpcy5taW5TZWFyY2hMZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdHJldHVybiBfLnNvbWUodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbn1cclxuXHJcbmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWUsIHN0cmluZ1NlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSxcclxuXHRzdHJpbmdVdGlsaXR5OiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lLCBzdHJpbmdNb2R1bGVOYW1lXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiArc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHR9XHJcblxyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmd1aWQnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZ3VpZFNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR3VpZFNlcnZpY2Uge1xyXG5cdHRpbWUoKTogc3RyaW5nO1xyXG5cdHJhbmRvbSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRTZXJ2aWNlIGltcGxlbWVudHMgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52MSgpO1xyXG5cdH1cclxuXHJcblx0cmFuZG9tKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52NCgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEd1aWRTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ3VpZC9ndWlkLnNlcnZpY2UudHNcbiAqKi8iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgcm5nO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgIHJldHVybiBfcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3JuZy1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRldmVudD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0fSlcclxuXHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHR9KS52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcblxyXG5uZy5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxuXHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdHJlc29sdmVQcm9taXNlcyhyZXNvbHZlczogYW55KTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckaW5qZWN0b3InXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7fVxyXG5cclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0fVxyXG5cclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcHJvbWlzZXM6IGFueSA9IHt9O1xyXG5cdFx0Xy5lYWNoKHJlc29sdmVzLCAodmFsdWU6IGFueSwga2V5OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkgfHwgXy5pc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmdldCh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih2YWx1ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4kcS5hbGwocHJvbWlzZXMpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN5bmNocm9uaXplZFJlcXVlc3RzJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0ZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlcjtcclxuXHRoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrO1xyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHJlcXVlc3RJZDogbnVtYmVyID0gMDtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlclxyXG5cdFx0XHQsIHB1YmxpYyBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHsgfVxyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHRcdC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcblx0XHR0aGlzLnJlcXVlc3RJZCsrO1xyXG5cdFx0bGV0IGN1cnJlbnRSZXF1ZXN0SWQ6IG51bWJlciA9IHRoaXMucmVxdWVzdElkO1xyXG5cdFx0dGhpcy4kcS53aGVuKHRoaXMuZGF0YVByb3ZpZGVyKC4uLnBhcmFtcykpLnRoZW4oKC4uLmRhdGE6IGFueVtdKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChjdXJyZW50UmVxdWVzdElkID09IHRoaXMucmVxdWVzdElkKSB7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGVSZXF1ZXN0KC4uLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RHZXR0ZXIge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0Q2FsbGJhY2sge1xyXG5cdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn1cclxuXHJcbnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxOiBhbmd1bGFyLklRU2VydmljZSk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyLCBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrKTogSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJy4vbW9jayc7XHJcbmV4cG9ydCB7IG1vY2sgfTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYW5ndWxhckZpeHR1cmUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdG1vY2subW9kdWxlTmFtZSxcclxuXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9ja1V0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0cHJvbWlzZTogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRkYXRhOiBURGF0YVR5cGU7XHJcblx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgTW9jayB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzZXJ2aWNlKSkge1xyXG5cdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdHZhciBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPiA9IHRoaXMuJHEuZGVmZXI8VERhdGFUeXBlPigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBhbmd1bGFyLklTY29wZSk6IHZvaWQge1xyXG5cdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuXHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE1vY2spO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2sudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2FuZ3VsYXItbW9ja3MnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHQ6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0ZGlyZWN0aXZlPFRDb250cm9sbGVyVHlwZT4oZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBkb206IHN0cmluZywgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG59XHJcblxyXG5jbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHR9XHJcblxyXG5cdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdHZhciAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbnkpOiBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZChzZXJ2aWNlcy4kcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdHZhciAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHR2YXIgY29tcG9uZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkgPSAkY29tcGlsZShkb20pKHNjb3BlKTtcclxuXHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0Y29udHJvbGxlcjogY29tcG9uZW50LmNvbnRyb2xsZXIoZGlyZWN0aXZlTmFtZSksXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbm90aWZpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBub3RpZmljYXRpb25TZXJ2aWNlTmFtZSxcclxuXHRJTm90aWZpY2F0aW9uU2VydmljZSxcclxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSUNvbXBvc2l0ZVZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdGlvblR5cGVzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvc2l0ZVZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3ZhbGlkYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgZXJyb3Igbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyB3YXJuaW5nIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSkgeyB9XHJcblxyXG5cdGJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZEN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBWYWxpZGF0aW9uU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciBpbXBsZW1lbnRzIElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogc3RyaW5nXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRsZXQgZXJyb3I6IHN0cmluZyA9IHRoaXMuZXJyb3JNZXNzYWdlKGhhbmRsZXIpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogbnVtYmVyID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvdW50O1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc0FjdGl2ZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZXJyb3JNZXNzYWdlKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHQ/ICg8eyAoKTogc3RyaW5nIH0+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0OiA8c3RyaW5nPmhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUNvbXBvc2l0ZVZhbGlkYXRvciwgSVNpbXBsZVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcblxyXG5pbnRlcmZhY2UgSVJlZ2lzdGVyZWRWYWxpZGF0b3IgZXh0ZW5kcyBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRrZXk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVZhbGlkYXRvciBpbXBsZW1lbnRzIElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgY2hpbGRWYWxpZGF0b3JzOiB7IFtpbmRleDogc3RyaW5nXTogSVNpbXBsZVZhbGlkYXRvciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoaGFuZGxlcjogSVNpbXBsZVZhbGlkYXRvcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAoIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKDxhbnk+dGhpcy5jaGlsZFZhbGlkYXRvcnMsIChjb3VudDogbnVtYmVyLCBoYW5kbGVyOiBJU2ltcGxlVmFsaWRhdG9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0cmV0dXJuIGNvdW50ICs9IGhhbmRsZXIuZ2V0RXJyb3JDb3VudCgpO1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3Ige1xyXG5cdFx0bGV0IHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy5jaGlsZFZhbGlkYXRvcnNbY3VycmVudEtleV0gPSB2YWxpZGF0b3I7XHJcblx0XHQoPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5ID0gY3VycmVudEtleTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvcik6IHZvaWQge1xyXG5cdFx0ZGVsZXRlIHRoaXMuY2hpbGRWYWxpZGF0b3JzWyg8SVJlZ2lzdGVyZWRWYWxpZGF0b3I+dmFsaWRhdG9yKS5rZXldO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdG9yIHtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW1wbGVWYWxpZGF0b3IgZXh0ZW5kcyBJVmFsaWRhdG9yIHtcclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2l0ZVZhbGlkYXRvciBleHRlbmRzIElWYWxpZGF0b3Ige1xyXG5cdGJ1aWxkQ2hpbGRWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHR1bnJlZ2lzdGVyQ2hpbGQodmFsaWRhdG9yOiBJU2ltcGxlVmFsaWRhdG9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHsoKTogc3RyaW5nfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyIHtcclxuXHQoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb25UeXBlcy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcGFyZVJlc3VsdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaXRlbUxpc3QnO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtIHtcclxuICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkaXNwbGF5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUl0ZW1MaXN0PFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiB7XHJcblx0Z2V0KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBUSXRlbVR5cGU7XHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbUxpc3Q8VEl0ZW1UeXBlIGV4dGVuZHMgSUl0ZW0+IHtcclxuXHRwcml2YXRlIGl0ZW1zOiBUSXRlbVR5cGVbXTtcclxuXHJcblx0c2V0SXRlbXMoaXRlbXM6IFRJdGVtVHlwZVtdKTogdm9pZCB7XHJcblx0XHR0aGlzLml0ZW1zID0gaXRlbXM7XHJcblx0fVxyXG5cclxuXHRnZXQodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IFRJdGVtVHlwZSB7XHJcblx0XHR2YXIgcHJlZGljYXRlOiB7IChpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIH07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cHJlZGljYXRlID0gKGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoaXRlbS5uYW1lID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwcmVkaWNhdGUgPSAoaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIChpdGVtLnZhbHVlID09PSB2YWx1ZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIF8uZmluZCh0aGlzLml0ZW1zLCBwcmVkaWNhdGUpO1xyXG5cdH1cclxuXHJcblx0YWxsKCk6IFRJdGVtVHlwZVtdIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9pdGVtTGlzdC50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=