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
	        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.map, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createResourceView = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseDataServiceView_1.BaseDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.map, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.map, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentResourceView = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseDataServiceView_1.BaseParentDataServiceView(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.map, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.map, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
	        options = this.useMockIfNoEndpoint(options);
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.map, options.useMock, options.logRequests);
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
	    function BaseDataService($http, $q, array, endpoint, mockData, transform, map, useMock, logRequests) {
	        this.array = array;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform, map);
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
	        getInstance: function (endpoint, mockData, transform, map, useMock, logRequests) {
	            return new BaseDataService($http, $q, array, endpoint, mockData, transform, map, useMock, logRequests);
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
	    function BaseDataServiceBehavior($http, $q, transform, map) {
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	        this.map = map;
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
	            if (_this.transform != null) {
	                data = _.map(data, _this.transform.fromServer);
	            }
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
	            data = _this.transformFromServer(data);
	            if (options.logRequests) {
	                _this.log('get', data, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.create = function (options) {
	        var _this = this;
	        var promise;
	        options.domainObject = this.transformToServer(options.domainObject);
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
	            data = _this.transformFromServer(data);
	            if (options.logRequests) {
	                _this.log('create', data, options.endpoint, options.useMock);
	            }
	            return data;
	        });
	    };
	    BaseDataServiceBehavior.prototype.update = function (options) {
	        var _this = this;
	        var promise;
	        options.domainObject = this.transformToServer(options.domainObject);
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
	            data = _this.transformFromServer(data);
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
	    BaseDataServiceBehavior.prototype.transformFromServer = function (rawData) {
	        var _this = this;
	        if (this.transform != null) {
	            return this.transform.fromServer(rawData);
	        }
	        else if (this.map != null) {
	            return _.mapValues(rawData, function (prop, key) {
	                if (_.has(_this.map, key)) {
	                    return _this.map[key].fromServer(prop);
	                }
	                return prop;
	            });
	        }
	        return rawData;
	    };
	    BaseDataServiceBehavior.prototype.transformToServer = function (data) {
	        var _this = this;
	        if (this.transform != null) {
	            return this.transform.toServer(data);
	        }
	        else if (this.map != null) {
	            return _.mapValues(data, function (prop, key) {
	                if (_.has(_this.map, key)) {
	                    return _this.map[key].toServer(prop);
	                }
	                return prop;
	            });
	        }
	        return data;
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
	    function BaseDataServiceView($http, $q, array, _endpoint, mockData, transform, map, useMock, logRequests) {
	        _super.call(this, $http, $q, array, _endpoint, mockData, transform, map, useMock, logRequests);
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	        this.map = map;
	    }
	    BaseDataServiceView.prototype.AsSingleton = function (parentId) {
	        var mockData = _.find(this.mockData, function (item) {
	            return item.id === parentId;
	        });
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.transform, this.map, this.useMock, this.logRequests);
	    };
	    return BaseDataServiceView;
	})(baseData_service_1.BaseDataService);
	exports.BaseDataServiceView = BaseDataServiceView;
	var BaseParentDataServiceView = (function (_super) {
	    __extends(BaseParentDataServiceView, _super);
	    function BaseParentDataServiceView($http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, map, useMock, logRequests) {
	        _super.call(this, $http, $q, array, _endpoint, mockData, resourceDictionaryBuilder, transform, map, useMock, logRequests);
	        this.$http = $http;
	        this.$q = $q;
	        this.transform = transform;
	        this.map = map;
	    }
	    BaseParentDataServiceView.prototype.AsSingleton = function (parentId) {
	        var mockData = _.find(this.mockData, function (item) {
	            return item.id === parentId;
	        });
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.map, this.useMock, this.logRequests, parentId);
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
	    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, map, useMock, logRequests) {
	        _super.call(this, $http, $q, array, endpoint, mockData, transform, map, useMock, logRequests);
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
	    function BaseSingletonDataService($http, $q, endpoint, mockData, transform, map, useMock, logRequests) {
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	        this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior($http, $q, transform, map);
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
	        getInstance: function (endpoint, mockData, transform, map, useMock, logRequests) {
	            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, map, useMock, logRequests);
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
	    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, map, useMock, logRequests, parentId) {
	        _super.call(this, $http, $q, endpoint, mockData, transform, map, useMock, logRequests);
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
	var date_service_1 = __webpack_require__(27);
	var dateTimeFormatStrings_1 = __webpack_require__(29);
	__export(__webpack_require__(27));
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
	exports.moduleName = 'rl.utilities.services.time';
	exports.serviceName = 'timeUtility';
	var TimeUtility = (function () {
	    function TimeUtility() {
	    }
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var moment = __webpack_require__(23);
	var time_service_1 = __webpack_require__(26);
	var moment_module_1 = __webpack_require__(25);
	var compareResult_1 = __webpack_require__(28);
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
/* 28 */
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
	        dataService = this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.createMockSingleton = function (resource) {
	        var _this = this;
	        var dataService = this.builder.createSingletonResource({});
	        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
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
	__export(__webpack_require__(28));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODhjOWM0NTFmMjdmNGJlZTJhYmMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2NvbnZlcnRlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvY29udmVydGVycy9kYXRlQ29udmVydGVyL2RhdGVDb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3V1aWQvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvaXRlbUxpc3QudHMiXSwibmFtZXMiOlsic3RvcEV2ZW50UHJvcGFnYXRpb24iLCJzdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwiaXNFbXB0eSIsIk9iamVjdFV0aWxpdHkiLCJPYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwiT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwiT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJPYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwiT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsIk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJBcnJheVV0aWxpdHkiLCJBcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJBcnJheVV0aWxpdHkuZmluZEluZGV4T2YiLCJBcnJheVV0aWxpdHkucmVtb3ZlIiwiQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJBcnJheVV0aWxpdHkuc3VtIiwiQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsIkFycmF5VXRpbGl0eS5sYXN0IiwidHJ1bmNhdGUiLCJCb29sZWFuVXRpbGl0eSIsIkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwiQm9vbGVhblV0aWxpdHkudG9Cb29sIiwiQmFzZVJlc291cmNlQnVpbGRlciIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY29uc3RydWN0b3IiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmdldExpYnJhcnlTZXJ2aWNlcyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci51c2VNb2NrSWZOb0VuZHBvaW50IiwiQmFzZURhdGFTZXJ2aWNlIiwiQmFzZURhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlLmdldEl0ZW1FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZS5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlLmdldERldGFpbCIsIkJhc2VEYXRhU2VydmljZS5jcmVhdGUiLCJCYXNlRGF0YVNlcnZpY2UudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlLmRlbGV0ZSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmdldExpc3QiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRJdGVtIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZGVsZXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IubG9nIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHJhbnNmb3JtRnJvbVNlcnZlciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLnRyYW5zZm9ybVRvU2VydmVyIiwiQmFzZURhdGFTZXJ2aWNlVmlldyIsIkJhc2VEYXRhU2VydmljZVZpZXcuY29uc3RydWN0b3IiLCJCYXNlRGF0YVNlcnZpY2VWaWV3LkFzU2luZ2xldG9uIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LkFzU2luZ2xldG9uIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlLmNoaWxkQ29udHJhY3RzIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLmdldCIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS51cGRhdGUiLCJiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsImZyb21TZXJ2ZXIiLCJ0b1NlcnZlciIsIm1vbWVudFdyYXBwZXIiLCJUaW1lVXRpbGl0eSIsIlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsIkRhdGVVdGlsaXR5IiwiRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJEYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwiRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsIkRhdGVVdGlsaXR5LmdldERheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMiLCJEYXRlVXRpbGl0eS5jb21wYXJlRGF0ZXMiLCJEYXRlVXRpbGl0eS5kYXRlSW5SYW5nZSIsIkRhdGVVdGlsaXR5LmdldERhdGUiLCJEYXRlVXRpbGl0eS5nZXREYXRlRnJvbUlTT1N0cmluZyIsIkRhdGVVdGlsaXR5LmlzRGF0ZSIsIkRhdGVVdGlsaXR5LmdldE5vdyIsIkRhdGVVdGlsaXR5LmZvcm1hdERhdGUiLCJEYXRlVXRpbGl0eS5nZXRGb3JtYXQiLCJEYXRlVXRpbGl0eS5zYW1lRGF0ZSIsIkRhdGVVdGlsaXR5LnNhbWVEYXRlVGltZSIsIkNvbXBhcmVSZXN1bHQiLCJnZXRDb21wYXJlUmVzdWx0IiwiRW51bUNvbnZlcnRlciIsIkVudW1Db252ZXJ0ZXIuY29uc3RydWN0b3IiLCJFbnVtQ29udmVydGVyLmZyb21TZXJ2ZXIiLCJFbnVtQ29udmVydGVyLnRvU2VydmVyIiwiQ29udHJhY3RMaWJyYXJ5IiwiQ29udHJhY3RMaWJyYXJ5LmNvbnN0cnVjdG9yIiwiQ29udHJhY3RMaWJyYXJ5LmZsdXNoIiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXQiLCJDb250cmFjdExpYnJhcnkubW9ja0dldExpc3QiLCJDb250cmFjdExpYnJhcnkubW9ja0dldERldGFpbCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrQ2hpbGQiLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9jayIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrUGFyZW50IiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2tTaW5nbGV0b24iLCJDb250cmFjdExpYnJhcnkudXBkYXRlUmVzb3VyY2UiLCJDb250cmFjdExpYnJhcnkuYmFzZU1vY2tHZXQiLCJDb250cmFjdExpYnJhcnkuc2lub24iLCJIdHRwU3RhdHVzQ29kZSIsIkVycm9ySGFuZGxlclNlcnZpY2UiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5odHRwUmVzcG9uc2VFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UubG9nZ2VkT3V0RXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmludmFsaWRVcmxFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UudGltZW91dEVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5zeXN0ZW1FcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciIsIkVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlci5jb25zdHJ1Y3RvciIsIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5pbmZvIiwiTm90aWZpY2F0aW9uU2VydmljZS53YXJuaW5nIiwiTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsIk5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyIsIm5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciIsIkJhc2VOb3RpZmllciIsIkJhc2VOb3RpZmllci5jb25zdHJ1Y3RvciIsIkJhc2VOb3RpZmllci5pbmZvIiwiQmFzZU5vdGlmaWVyLndhcm5pbmciLCJCYXNlTm90aWZpZXIuZXJyb3IiLCJCYXNlTm90aWZpZXIuc3VjY2VzcyIsIkJhc2VOb3RpZmllci5ub3RpZnkiLCJTaWduIiwiTnVtYmVyVXRpbGl0eSIsIk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJOdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsIk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsIk51bWJlclV0aWxpdHkucm91bmRUb1N0ZXAiLCJGaWxlU2l6ZVNlcnZpY2UiLCJGaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlU2l6ZVNlcnZpY2UuZGlzcGxheSIsImZpbGVTaXplRmFjdG9yeSIsImZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsImZpbGVTaXplRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJHZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwiZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJTdHJpbmdVdGlsaXR5U2VydmljZS50b051bWJlciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnRhaW5zIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnJlcGxhY2VBbGwiLCJHdWlkU2VydmljZSIsIkd1aWRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiR3VpZFNlcnZpY2UudGltZSIsIkd1aWRTZXJ2aWNlLnJhbmRvbSIsIk9ic2VydmFibGVTZXJ2aWNlIiwiT2JzZXJ2YWJsZVNlcnZpY2UuY29uc3RydWN0b3IiLCJPYnNlcnZhYmxlU2VydmljZS5yZWdpc3RlciIsIk9ic2VydmFibGVTZXJ2aWNlLmZpcmUiLCJPYnNlcnZhYmxlU2VydmljZS51bnJlZ2lzdGVyIiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5Iiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldEFsbENoaWxkQmVoYXZpb3JzIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucmVnaXN0ZXJDaGlsZEJlaGF2aW9yIiwiUHJvbWlzZVV0aWxpdHkiLCJQcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsIlByb21pc2VVdGlsaXR5LnJlc29sdmVQcm9taXNlcyIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5jb25zdHJ1Y3RvciIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5nZXREYXRhIiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5Iiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5LmdldEluc3RhbmNlIiwiTW9jayIsIk1vY2suY29uc3RydWN0b3IiLCJNb2NrLnNlcnZpY2UiLCJNb2NrLnByb21pc2UiLCJNb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJNb2NrLmZsdXNoIiwiQW5ndWxhckZpeHR1cmUiLCJBbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsIkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJBbmd1bGFyRml4dHVyZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzIiwiQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwiVmFsaWRhdGlvblNlcnZpY2UiLCJWYWxpZGF0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZEN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZUN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRvciIsIlZhbGlkYXRvci5jb25zdHJ1Y3RvciIsIlZhbGlkYXRvci52YWxpZGF0ZSIsIlZhbGlkYXRvci5nZXRFcnJvckNvdW50IiwiVmFsaWRhdG9yLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIiLCJWYWxpZGF0b3IudW5yZWdpc3RlciIsIlZhbGlkYXRvci5pc0FjdGl2ZSIsIlZhbGlkYXRvci5lcnJvck1lc3NhZ2UiLCJDb21wb3NpdGVWYWxpZGF0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IuY29uc3RydWN0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IudmFsaWRhdGUiLCJDb21wb3NpdGVWYWxpZGF0b3IuZ2V0RXJyb3JDb3VudCIsIkNvbXBvc2l0ZVZhbGlkYXRvci5idWlsZENoaWxkVmFsaWRhdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLnVucmVnaXN0ZXJDaGlsZCIsIkl0ZW1MaXN0IiwiSXRlbUxpc3QuY29uc3RydWN0b3IiLCJJdGVtTGlzdC5zZXRJdGVtcyIsIkl0ZW1MaXN0LmdldCIsIkl0ZW1MaXN0LmFsbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFbkMsS0FBWSxTQUFTLHVCQUFNLENBQThCLENBQUM7QUFLakQsa0JBQVM7QUFKbEIsS0FBWSxPQUFPLHVCQUFNLENBQTBCLENBQUM7QUFJaEMsZ0JBQU87QUFIM0IsS0FBWSxRQUFRLHVCQUFNLEVBQTRCLENBQUM7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R0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBYUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDM0NBLENBQUNBO1NBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQ2hCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7U0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDUEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7U0FDYkEsQ0FBQ0E7S0FDRkEsQ0FBQ0E7S0FFREgsOEJBQU9BLEdBQVBBLFVBQW1CQSxLQUFrQkEsRUFBRUEsT0FBa0JBLEVBQUVBLE9BQWtCQTtTQUM1RUksSUFBSUEsS0FBS0EsR0FBV0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FFOUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQ2hCQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUNqQ0EsQ0FBQ0E7S0FDRkEsQ0FBQ0E7S0FFREosMEJBQUdBLEdBQUhBLFVBQWVBLEtBQWtCQSxFQUFFQSxTQUF5Q0E7U0FDM0VLLElBQUlBLElBQWNBLENBQUNBO1NBRW5CQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2QkEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBQ0EsSUFBZUEsSUFBZUEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDL0VBLENBQUNBO1NBQUNBLElB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SUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7aUJBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtpQkFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xEQSxDQUFDQTthQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtpQkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7aUJBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtxQkFDaENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO3FCQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7cUJBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDbERBLENBQUNBO2lCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtxQkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7aUJBQ25CQSxDQUFDQTthQUNGQSxDQUFDQTtTQUNGQSxDQUFDQTtTQUVEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtLQUNyQ0EsQ0FBQ0E7S0FFREQsaUNBQU9BLEdBQVBBO1NBQ0NFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ2ZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdB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QXlDQSxDQUFDQTtTQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsS0FBS0EsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLFNBQVNBLEdBQUdBLFVBQUNBLElBQWVBO2lCQUMzQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDOUJBLENBQUNBLENBQUNBO1NBQ0hBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ1BBLFNBQVNBLEdBQUdBLFVBQUNBLElBQWVBO2lCQUMzQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7YUFDL0JBLENBQUNBLENBQUNBO1NBQ0hBLENBQUNBO1NBRURBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO0tBQ3RDQSxDQUFDQTtLQUVESCxzQkFBR0EsR0FBSEE7U0FDQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7S0FDbkJBLENBQUNBO0tBQ0ZKLGVBQUNBO0FBQURBLEVBQUNBLElBQUE7QUExQlksaUJBQVEsV0EwQnBCIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIm91dHB1dFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODhjOWM0NTFmMjdmNGJlZTJhYmNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYmVoYXZpb3JzIGZyb20gJy4vYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9maWx0ZXJzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvc2VydmljZXMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcy90eXBlcy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHsgYmVoYXZpb3JzLCBmaWx0ZXJzLCBzZXJ2aWNlcywgdHlwZXMgfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0YmVoYXZpb3JzLm5hbWUsXHJcblx0ZmlsdGVycy5uYW1lLFxyXG5cdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS91dGlsaXRpZXMudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImFuZ3VsYXJcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBzdG9wRXZlbnRQcm9wb2dhdGlvbiBmcm9tICcuL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcbmV4cG9ydCB7IHN0b3BFdmVudFByb3BvZ2F0aW9uIH07XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcbmV4cG9ydCB2YXIgZGlyZWN0aXZlTmFtZTogc3RyaW5nID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIGFuZ3VsYXIuSUF0dHJpYnV0ZXMge1xyXG5cdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKTogYW5ndWxhci5JRGlyZWN0aXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRsaW5rKHNjb3BlOiBhbmd1bGFyLklTY29wZVxyXG5cdFx0XHQsIGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHQsIGF0dHJzOiBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyk6IHZvaWQge1xyXG5cdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBpc0VtcHR5IGZyb20gJy4vaXNFbXB0eS9pc0VtcHR5JztcclxuaW1wb3J0ICogYXMgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZS90cnVuY2F0ZSc7XHJcblxyXG5leHBvcnQgeyBpc0VtcHR5LCB0cnVuY2F0ZSB9O1xyXG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0aXNFbXB0eS5tb2R1bGVOYW1lLFxyXG5cdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7XHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnaXNFbXB0eSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW47XHJcbn1cclxuXHJcbmlzRW1wdHkuJGluamVjdCA9IFtvYmplY3RTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSk6IElJc0VtcHR5RmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0dmFyIGlzRW1wdHk6IGJvb2xlYW4gPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcblxyXG5cdFx0aWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0c2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSxcclxuXHRJQXJyYXlVdGlsaXR5XHJcbn0gZnJvbSAnLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ29iamVjdFV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nO1xyXG5cdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55O1xyXG59XHJcblxyXG5jbGFzcyBPYmplY3RVdGlsaXR5IGltcGxlbWVudHMgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5U2VydmljZU5hbWVdO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogSUFycmF5VXRpbGl0eSkge1xyXG5cdFx0fVxyXG5cclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRpZiAob2JqZWN0ID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKF8uaXNBcnJheShvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiBfLnNvbWUob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdH1cclxuXHJcblx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdGlmIChvYmoxID09IG51bGwgJiYgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwob2JqMVtpXSwgb2JqMltpXSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdHZhciBrZXlzMjogc3RyaW5nW10gPSBfLmtleXMob2JqMik7XHJcblx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdGlmIChfLnNvbWUoa2V5czIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0fVxyXG5cclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIl9cIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlx0J3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlO1xyXG5cdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdH1cclxuXHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIH0pXHJcblx0XHQ6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSB7XHJcblx0XHQvLyBuZWVkcyB0byBiZSBzZWVkZWQgd2l0aCBhbiBvYmplY3Qgb3IgaXQgd2lsbCBiZSB2aWV3ZWQgYXMgYW4gYXJyYXkgd2l0aCBubyBpdGVtc1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9LCBpdGVtOiBURGF0YVR5cGUpOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0gPT4ge1xyXG5cdFx0XHRkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSwgPGFueT57fSk7XHJcblx0fVxyXG5cclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlIHtcclxuXHRcdGlmIChhcnJheSAhPSBudWxsICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcbn1cclxuXHJcbnRydW5jYXRlLiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGFycmF5IGZyb20gJy4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGJvb2xlYW4gZnJvbSAnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGRhdGFDb250cmFjdHMgZnJvbSAnLi9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZGF0ZSBmcm9tICcuL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSAnLi9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBmaWxlU2l6ZSBmcm9tICcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGdlbmVyaWNTZWFyY2hGaWx0ZXIgZnJvbSAnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGd1aWQgZnJvbSAnLi9ndWlkL2d1aWQuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICcuL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuaW1wb3J0ICogYXMgbm90aWZpY2F0aW9uIGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbnVtYmVyU2VydmljZSBmcm9tICcuL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9iamVjdFNlcnZpY2UgZnJvbSAnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlIGZyb20gJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwYXJlbnRDaGlsZEJlaGF2aW9yIGZyb20gJy4vcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwcm9taXNlIGZyb20gJy4vcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzdHJpbmdTZXJ2aWNlIGZyb20gJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgc3luY2hyb25pemVkUmVxdWVzdHMgZnJvbSAnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgdGVzdCBmcm9tICcuL3Rlc3QvdGVzdC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0aW1lIGZyb20gJy4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhcnJheSxcclxuXHRib29sZWFuLFxyXG5cdGRhdGFDb250cmFjdHMsXHJcbiAgICBkYXRlLFxyXG4gICAgZXJyb3JIYW5kbGVyLFxyXG5cdGZpbGVTaXplLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIsXHJcblx0Z3VpZCxcclxuXHRtb21lbnQsXHJcblx0bm90aWZpY2F0aW9uLFxyXG5cdG51bWJlclNlcnZpY2UgYXMgbnVtYmVyLFxyXG5cdG9iamVjdFNlcnZpY2UgYXMgb2JqZWN0LFxyXG5cdG9ic2VydmFibGUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvcixcclxuXHRwcm9taXNlLFxyXG5cdHN0cmluZ1NlcnZpY2UgYXMgc3RyaW5nLFxyXG5cdHN5bmNocm9uaXplZFJlcXVlc3RzLFxyXG5cdHRlc3QsXHJcblx0dGltZSxcclxuXHR2YWxpZGF0aW9uLFxyXG59O1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuXHRkYXRhQ29udHJhY3RzLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRlLm1vZHVsZU5hbWUsXHJcbiAgICBlcnJvckhhbmRsZXIubW9kdWxlTmFtZSxcclxuXHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuXHRndWlkLm1vZHVsZU5hbWUsXHJcblx0bW9tZW50Lm1vZHVsZU5hbWUsXHJcblx0bm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0bnVtYmVyU2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRzdHJpbmdTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMubW9kdWxlTmFtZSxcclxuXHR0aW1lLm1vZHVsZU5hbWUsXHJcblx0dGVzdC5tb2R1bGVOYW1lLFxyXG5cdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyByZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIGNvbnZlcnRlcnMgZnJvbSAnLi9jb252ZXJ0ZXJzL2NvbnZlcnRlcnMnO1xyXG5pbXBvcnQgKiBhcyBtb2NrcyBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0YUNvbnRyYWN0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvY29udHJhY3RMaWJyYXJ5JztcclxuZXhwb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgSUJhc2VEYXRhU2VydmljZUZhY3RvcnksIElCYXNlRG9tYWluT2JqZWN0LCBCYXNlRGF0YVNlcnZpY2UsIGZhY3RvcnlOYW1lIGFzIGJhc2VEYXRhU2VydmljZUZhY3RvcnlOYW1lIH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3LCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnksIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgZmFjdG9yeU5hbWUgYXMgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlUmVzb3VyY2VCdWlsZGVyLCBzZXJ2aWNlTmFtZSBhcyBidWlsZGVyU2VydmljZU5hbWUgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuZXhwb3J0IHsgY29udmVydGVycywgbW9ja3MgfTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRiYXNlRGF0YVNlcnZpY2VNb2R1bGVOYW1lLFxyXG5cdGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUsXHJcblx0cmVzb3VyY2VCdWlsZGVyTW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElDb250cmFjdExpYnJhcnksIENvbnRyYWN0TGlicmFyeSwgSUxpYnJhcnlTZXJ2aWNlcyB9IGZyb20gJy4vY29udHJhY3RMaWJyYXJ5JztcclxuaW1wb3J0IHsgSUNvbnZlcnRlciwgSVRyYW5zZm9ybSB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcsIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LCBCYXNlRGF0YVNlcnZpY2VWaWV3LCBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlLCBCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYmFzZVJlc291cmNlQnVpbGRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIFVybCB0byBoaXQgd2l0aCBnZXRMaXN0IGFuZCBjcmVhdGVcclxuXHQqIC0gZXh0ZW5kZWQgd2l0aCAvaWQgZm9yIGdldERldGFpbCwgdXBkYXRlLCBhbmQgZGVsZXRlXHJcblx0Ki9cclxuXHRlbmRwb2ludD86IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0KiBGbGFnIGZvciBzcGVjaWZ5aW5nIGlmIHRoZSBkYXRhIHNlcnZpY2Ugc2hvdWxkIHVzZSB0aGUgbW9jayBkYXRhIG9yIGhpdCB0aGUgYWN0dWFsIGVuZHBvaW50XHJcblx0KiBkZWZhdWx0cyB0byB0cnVlIGlmIGVuZHBvaW50IGlzIG5vdCBkZWZpbmVkXHJcblx0Ki9cclxuXHR1c2VNb2NrPzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0KiBGbGFnIGZvciBzcGVjaWZ5aW5nIGlmIHRoZSBkYXRhIHNlcnZpY2Ugc2hvdWxkIGxvZyBhbGwgcmVxdWVzdHMgYWdhaW5zdCB0aGUgY29udHJhY3RcclxuXHQqL1xyXG5cdGxvZ1JlcXVlc3RzPzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0KiBNYXBwaW5nIHRvIHNwZWNpZnkgaG93IHByb3BlcnRpZXMgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIHRvIGFuZCBmcm9tIHRoZSBzZXJ2ZXJcclxuXHQqL1xyXG5cdG1hcD86IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfTtcclxuXHJcblx0LyoqXHJcblx0KiBQcm9jZXNzZXMgZGF0YSBjb21pbmcgYmFjayBmcm9tIHRoZSBzZXJ2ZXJcclxuXHQqL1xyXG5cdHRyYW5zZm9ybT86IElUcmFuc2Zvcm08VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PiBleHRlbmRzIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEV4YW1wbGUgZGF0YSBzZXQgdG8gYmUgdXNlZCBmb3IgdGVzdGluZyBhbmQgcHJvdG90eXBpbmcgaW5zdGVhZCBvZiBoaXR0aW5nIHRoZSBlbmRwb2ludFxyXG5cdCovXHJcblx0bW9ja0RhdGE/OiBURGF0YVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBFeGFtcGxlIG9iamVjdCB0byBiZSB1c2VkIGZvciB0ZXN0aW5nIGFuZCBwcm90b3R5cGluZyBpbnN0ZWFkIG9mIGhpdHRpbmcgdGhlIGVuZHBvaW50XHJcblx0Ki9cclxuXHRtb2NrRGF0YT86IFREYXRhVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VSZXNvdXJjZUJ1aWxkZXIge1xyXG5cdC8qKlxyXG5cdCogQSBoZWxwZXIgdG8gcGFzcyBpbnRvIHRoZSBjb25zdHJ1Y3RvciB3aGVuIGJ1aWxkaW5nIGEgbmV3IGNvbnRyYWN0cyBsaWJyYXJ5XHJcblx0Ki9cclxuXHRnZXRMaWJyYXJ5U2VydmljZXMoKTogSUxpYnJhcnlTZXJ2aWNlcztcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBzdGFuZGFyZCByZXNvdXJjZSB3aXRoIGdldExpc3QsIGdldERldGFpbCwgY3JlYXRlLCB1cGRhdGUsIGRlbGV0ZVxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHN0YW5kYXJkIHJlc291cmNlIHdpdGggZ2V0TGlzdCwgZ2V0RGV0YWlsLCBjcmVhdGUsIHVwZGF0ZSwgZGVsZXRlXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQ+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIHZvaWQ+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHN0YW5kYXJkIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzdGFuZGFyZCB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgdm9pZCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2Ugd2l0aCBzdWItcmVzb3VyY2VzIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2Ugd2l0aCBzdWItcmVzb3VyY2VzIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBEZXByZWNhdGVkIC0gQ3JlYXRlIGEgc2luZ2xldG9uIHJlc291cmNlIHdpdGggZ2V0IGFuZCB1cGRhdGVcclxuXHQqL1xyXG5cdGNyZWF0ZVNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZT4ob3B0aW9uczogSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogRGVwcmVjYXRlZCAtIENyZWF0ZSBhIHBhcmVudCBzaW5nbGV0b24gcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzaW5nbGV0b24gd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVzb3VyY2VCdWlsZGVyIGltcGxlbWVudHMgSUJhc2VSZXNvdXJjZUJ1aWxkZXIge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJGh0dHAnLCAnJHEnLCAnJHJvb3RTY29wZScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7IH1cclxuXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0JHE6IHRoaXMuJHEsXHJcblx0XHRcdCRyb290U2NvcGU6IHRoaXMuJHJvb3RTY29wZSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy5tYXAsIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlVmlldyh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy5tYXAsIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50RGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy5tYXAsIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy5tYXAsIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGU+KG9wdGlvbnM6IElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy5tYXAsIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMubWFwLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1c2VNb2NrSWZOb0VuZHBvaW50PFREYXRhVHlwZT4ob3B0aW9uczogSUJhc2VPcHRpb25zPFREYXRhVHlwZT4pOiBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0XHRvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG5cdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQmFzZVJlc291cmNlQnVpbGRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBJQ29udmVydGVyLCBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VEYXRhU2VydmljZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdiYXNlRGF0YVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURvbWFpbk9iamVjdCB7XHJcbiAgICBpZD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0Z2V0TGlzdChwYXJhbXM/OiBUU2VhcmNoUGFyYW1zKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICBnZXREZXRhaWwoaWQ6IG51bWJlcik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGRlbGV0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcblxyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBpbXBsZW1lbnRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcbiAgICBwcml2YXRlIGJlaGF2aW9yOiBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIHByb3RlY3RlZCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG5cdFx0XHQsIG1hcDogeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9XHJcbiAgICAgICAgICAgICwgcHVibGljIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBwdWJsaWMgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0sIG1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtRW5kcG9pbnQoaWQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExpc3QocGFyYW1zOiBUU2VhcmNoUGFyYW1zKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldExpc3Qoe1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlW10gPT4geyByZXR1cm4gdGhpcy5tb2NrRGF0YSB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERldGFpbChpZDogbnVtYmVyKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRJdGVtKHtcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGlkKSxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5jcmVhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIGFkZE1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dElkOiBudW1iZXIgPSBfLm1heEJ5KHRoaXMubW9ja0RhdGEsICdpZCcpLmlkICsgMTtcclxuICAgICAgICAgICAgICAgIGRvbWFpbk9iamVjdC5pZCA9IG5leHRJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9ja0RhdGEucHVzaChkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IudXBkYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLFxyXG4gICAgICAgICAgICB1cGRhdGVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9sZE9iamVjdDogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgb2xkT2JqZWN0ID0gPFREYXRhVHlwZT5fLmFzc2lnbihvbGRPYmplY3QsIGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmRlbGV0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5nZXRJdGVtRW5kcG9pbnQoZG9tYWluT2JqZWN0LmlkKSxcclxuICAgICAgICAgICAgcmVtb3ZlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXkucmVtb3ZlKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlW11cclxuICAgICAgICAsIHRyYW5zZm9ybT86IElUcmFuc2Zvcm08VERhdGFUeXBlPiwgbWFwPzogeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxufVxyXG5cclxuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHkpOiBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCBtYXA/OiB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+KCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCBtYXAsIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShmYWN0b3J5TmFtZSwgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb252ZXJ0ZXI8VERhdGFUeXBlPiB7XHJcblx0ZnJvbVNlcnZlcihyYXc6IGFueSk6IFREYXRhVHlwZTtcclxuICAgIHRvU2VydmVyKGRhdGE6IFREYXRhVHlwZSk6IGFueSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNmb3JtPFREYXRhVHlwZT4gZXh0ZW5kcyBJQ29udmVydGVyPFREYXRhVHlwZT4ge31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIGVuZHBvaW50OiBzdHJpbmc7XHJcbiAgICB1c2VNb2NrOiBib29sZWFuO1xyXG4gICAgbG9nUmVxdWVzdHM6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgcGFyYW1zOiBhbnk7XHJcbiAgICBnZXRNb2NrRGF0YSgpOiBURGF0YVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2V0SXRlbU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBnZXRNb2NrRGF0YSgpOiBURGF0YVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIGFkZE1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIHVwZGF0ZU1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlbGV0ZU9wdGlvbnM8VERhdGFUeXBlPiBleHRlbmRzIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBkb21haW5PYmplY3Q6IFREYXRhVHlwZTtcclxuICAgIHJlbW92ZU1vY2tEYXRhKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4ge1xyXG5cdGdldExpc3Qob3B0aW9uczogSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgIGdldEl0ZW0ob3B0aW9uczogSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBjcmVhdGUob3B0aW9uczogSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJVXBkYXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgZGVsZXRlKG9wdGlvbnM6IElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIHRyYW5zZm9ybTogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHRcdCwgcHJpdmF0ZSBtYXA6IHtbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8YW55Pn0pIHsgfVxyXG5cclxuICAgIGdldExpc3Qob3B0aW9uczogSUdldExpc3RPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmdldE1vY2tEYXRhKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldChvcHRpb25zLmVuZHBvaW50LCB7IHBhcmFtczogb3B0aW9ucy5wYXJhbXMgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGVbXT4pOiBURGF0YVR5cGVbXSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlW10gPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF8ubWFwKGRhdGEsIHRoaXMudHJhbnNmb3JtLmZyb21TZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0TGlzdCcsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKG9wdGlvbnM6IElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmdldE1vY2tEYXRhKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldChvcHRpb25zLmVuZHBvaW50KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZT4pOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy50cmFuc2Zvcm1Gcm9tU2VydmVyKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2dldCcsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKG9wdGlvbnM6IElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgb3B0aW9ucy5kb21haW5PYmplY3QgPSB0aGlzLnRyYW5zZm9ybVRvU2VydmVyKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYWRkTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wb3N0KG9wdGlvbnMuZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZG9tYWluT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy50cmFuc2Zvcm1Gcm9tU2VydmVyKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2NyZWF0ZScsIGRhdGEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgb3B0aW9ucy5kb21haW5PYmplY3QgPSB0aGlzLnRyYW5zZm9ybVRvU2VydmVyKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudXBkYXRlTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpXHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnB1dChvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLmRvbWFpbk9iamVjdClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy50cmFuc2Zvcm1Gcm9tU2VydmVyKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3VwZGF0ZScsIG9wdGlvbnMuZG9tYWluT2JqZWN0LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShvcHRpb25zOiBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnJlbW92ZU1vY2tEYXRhKG9wdGlvbnMuZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmRlbGV0ZTx2b2lkPihvcHRpb25zLmVuZHBvaW50KS50aGVuKCgpOiB2b2lkID0+IHsgcmV0dXJuIG51bGw7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdkZWxldGUnLCBvcHRpb25zLmRvbWFpbk9iamVjdCwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nKHJlcXVlc3ROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZywgdXNlTW9jazogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb2NrU3RyaW5nID0gdXNlTW9jayA/ICdNb2NrZWQgJyA6ICcnO1xyXG4gICAgICAgIGxldCBlbmRwb2ludFN0cmluZyA9IGVuZHBvaW50ID09IG51bGwgPyAndW5zcGVjaWZpZWQnIDogZW5kcG9pbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9ja1N0cmluZyArIHJlcXVlc3ROYW1lICsgJyBmb3IgZW5kcG9pbnQgJyArIGVuZHBvaW50U3RyaW5nICsgJzonKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybUZyb21TZXJ2ZXIocmF3RGF0YTogYW55KTogVERhdGFUeXBlIHtcclxuXHRcdGlmICh0aGlzLnRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRyYW5zZm9ybS5mcm9tU2VydmVyKHJhd0RhdGEpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLm1hcCAhPSBudWxsKSB7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKHJhd0RhdGEsIChwcm9wOiBhbnksIGtleTogc3RyaW5nKTogYW55ID0+IHtcclxuXHRcdFx0XHRpZiAoXy5oYXModGhpcy5tYXAsIGtleSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLm1hcFtrZXldLmZyb21TZXJ2ZXIocHJvcCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBwcm9wO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmF3RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybVRvU2VydmVyKGRhdGE6IFREYXRhVHlwZSk6IGFueSB7XHJcblx0XHRpZiAodGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50cmFuc2Zvcm0udG9TZXJ2ZXIoZGF0YSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMubWFwICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGF0YSwgKHByb3A6IGFueSwga2V5OiBzdHJpbmcpOiBhbnkgPT4ge1xyXG5cdFx0XHRcdGlmIChfLmhhcyh0aGlzLm1hcCwga2V5KSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubWFwW2tleV0udG9TZXJ2ZXIocHJvcCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBwcm9wO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF0YTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElDb252ZXJ0ZXIsIElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlLCBCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPntcclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+XHJcblx0ZXh0ZW5kcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPlxyXG5cdGltcGxlbWVudHMgSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBfZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuXHRcdFx0LCBwcml2YXRlIG1hcDogeyBbaW5kZXg6IHN0cmluZ106IElDb252ZXJ0ZXI8VERhdGFUeXBlPiB9XHJcbiAgICAgICAgICAgICwgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIG1hcCwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0XHRsZXQgbW9ja0RhdGE6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09PSBwYXJlbnRJZDtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPih0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmVuZHBvaW50LCBtb2NrRGF0YSwgdGhpcy50cmFuc2Zvcm0sIHRoaXMubWFwLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0aW1wbGVtZW50cyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgYXJyYXk6IElBcnJheVV0aWxpdHlcclxuICAgICAgICAgICAgLCBfZW5kcG9pbnQ6IHN0cmluZ1xyXG4gICAgICAgICAgICAsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG5cdFx0XHQsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGV9XHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG5cdFx0XHQsIHByaXZhdGUgbWFwOiB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH1cclxuICAgICAgICAgICAgLCB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgbWFwLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRsZXQgbW9ja0RhdGE6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09PSBwYXJlbnRJZDtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4odGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5lbmRwb2ludCwgbW9ja0RhdGEsIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgdGhpcy50cmFuc2Zvcm0sIHRoaXMubWFwLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMsIHBhcmVudElkKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50c1xuICoqLyIsImltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5IH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyLCBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz57XHJcblx0Y2hpbGRDb250cmFjdHMoaWQ/OiBudW1iZXIpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGFycmF5OiBJQXJyYXlVdGlsaXR5LCBlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdCwgcHVibGljIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHQsIG1hcD86IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfVxyXG5cdFx0LCB1c2VNb2NrPzogYm9vbGVhblxyXG4gICAgICAgICwgbG9nUmVxdWVzdHM/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgbWFwLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIHtcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKGlkKSkge1xyXG5cdFx0XHRsZXQgZGljdGlvbmFyeTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIoKTtcclxuXHRcdFx0Xy5lYWNoKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZGF0YVNlcnZpY2UuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgZGF0YVNlcnZpY2UuZW5kcG9pbnQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBkaWN0aW9uYXJ5OiB7W2luZGV4OiBzdHJpbmddOiBhbnl9ID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKCk7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB8IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiA9PiB7XHJcblx0XHRcdFx0bGV0IGNvbnRyYWN0OiBhbnk7XHJcblx0XHRcdFx0aWYgKF8uaXNGdW5jdGlvbihkYXRhU2VydmljZS5Bc1NpbmdsZXRvbikpIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24oaWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQgKyBjb250cmFjdC5lbmRwb2ludDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyYWN0O1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIElDb252ZXJ0ZXIsIElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICBnZXQoKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIHByaXZhdGUgYmVoYXZpb3I6IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBtb2NrRGF0YTogVERhdGFUeXBlXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuXHRcdFx0LCBtYXA6IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfVxyXG4gICAgICAgICAgICAsIHB1YmxpYyB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgcHVibGljIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLmJlaGF2aW9yID0gbmV3IEJhc2VEYXRhU2VydmljZUJlaGF2aW9yKCRodHRwLCAkcSwgdHJhbnNmb3JtLCBtYXApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldEl0ZW0oe1xyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGUgPT4geyByZXR1cm4gdGhpcy5tb2NrRGF0YTsgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgdXBkYXRlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9ja0RhdGEgPSA8VERhdGFUeXBlPl8uYXNzaWduKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZSwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCBtYXA/OiB7IFtpbmRleDogc3RyaW5nXTogSUNvbnZlcnRlcjxURGF0YVR5cGU+IH0sIHVzZU1vY2s/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG59XHJcblxyXG5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcbmV4cG9ydCBmdW5jdGlvbiBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtPFREYXRhVHlwZT4sIG1hcD86IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfSwgdXNlTW9jaz86IGJvb2xlYW4sIGxvZ1JlcXVlc3RzPzogYm9vbGVhbik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4oJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgbWFwLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJQ29udmVydGVyLCBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT57XHJcblx0Y2hpbGRDb250cmFjdHMoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE6IFREYXRhVHlwZVxyXG5cdFx0LCBwcml2YXRlIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHQsIG1hcD86IHsgW2luZGV4OiBzdHJpbmddOiBJQ29udmVydGVyPFREYXRhVHlwZT4gfVxyXG5cdFx0LCB1c2VNb2NrPzogYm9vbGVhblxyXG5cdFx0LCBsb2dSZXF1ZXN0cz86IGJvb2xlYW5cclxuXHRcdCwgcHJpdmF0ZSBwYXJlbnRJZD86IG51bWJlcikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgbWFwLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRsZXQgZGljdGlvbmFyeToge1tpbmRleDogc3RyaW5nXTogYW55fSA9IHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcigpO1xyXG5cdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIGFueT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gfCBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgYW55PiA9PiB7XHJcblx0XHRcdGxldCBjb250cmFjdDogYW55O1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKSkge1xyXG5cdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24odGhpcy5wYXJlbnRJZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgY29udHJhY3QuZW5kcG9pbnQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gY29udHJhY3Q7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZUNvbnZlcnRlci9kYXRlQ29udmVydGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnVtQ29udmVydGVyL2VudW1Db252ZXJ0ZXInO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvY29udmVydGVycy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgZGF0ZVV0aWxpdHksIGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi4vLi4vLi4vZGF0ZS9kYXRlLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgbGV0IGRhdGVDb252ZXJ0ZXI6IElDb252ZXJ0ZXI8RGF0ZT4gPSB7XHJcblx0ZnJvbVNlcnZlcihyYXc6IHN0cmluZyk6IERhdGUge1xyXG5cdFx0cmV0dXJuIGRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nKHJhdyk7XHJcblx0fSxcclxuXHR0b1NlcnZlcihkYXRhOiBEYXRlKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBtb21lbnQoZGF0YSkuZm9ybWF0KGRlZmF1bHRGb3JtYXRzLmlzb0Zvcm1hdCk7XHJcblx0fSxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9jb252ZXJ0ZXJzL2RhdGVDb252ZXJ0ZXIvZGF0ZUNvbnZlcnRlci50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibW9tZW50XCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtb21lbnRcIlxuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lIH0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0ZVV0aWxpdHksIHNlcnZpY2VOYW1lIH0gZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudE1vZHVsZU5hbWUsIHRpbWVNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHRpbWVVdGlsaXR5OiBJVGltZVV0aWxpdHkgPSBuZXcgVGltZVV0aWxpdHkoKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyB0aW1lTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyB0aW1lU2VydmljZU5hbWUsXHJcblx0SVRpbWVVdGlsaXR5LFxyXG5cdHRpbWVVdGlsaXR5LFxyXG59IGZyb20gJy4uL3RpbWUvdGltZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG1vbWVudFNlcnZpY2VOYW1lLFxyXG59IGZyb20gJy4uL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCwgZ2V0Q29tcGFyZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnO1xyXG5cclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlVmFsdWUge1xyXG5cdHllYXJzOiBudW1iZXI7XHJcblx0bW9udGhzOiBudW1iZXI7XHJcblx0ZGF5czogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nO1xyXG5cdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlO1xyXG5cdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdHN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IENvbXBhcmVSZXN1bHQ7XHJcblx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuO1xyXG5cdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGU7XHJcblx0Z2V0RGF0ZUZyb21JU09TdHJpbmcoZGF0ZTogc3RyaW5nKTogRGF0ZTtcclxuXHRpc0RhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0Z2V0Tm93KCk6IERhdGU7XHJcblx0Zm9ybWF0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nO1xyXG5cdHNhbWVEYXRlKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRzYW1lRGF0ZVRpbWUoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlMUZvcm1hdD86IHN0cmluZywgZGF0ZTJGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFttb21lbnRTZXJ2aWNlTmFtZSwgdGltZVNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbWVudDogbW9tZW50Lk1vbWVudFN0YXRpYywgcHJpdmF0ZSB0aW1lOiBJVGltZVV0aWxpdHkpIHtcclxuXHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XTtcclxuXHR9XHJcblxyXG5cdG1vbnRoOiBJTW9udGhbXTtcclxuXHRwcml2YXRlIGJhc2VGb3JtYXQ6IHN0cmluZyA9ICdNTS1ERC1ZWVlZJztcclxuXHJcblx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHR9XHJcblxyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0cmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblx0XHRyZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgLT0gMTtcclxuXHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRyZXN1bHQubW9udGhzICs9IDEyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHR2YXIgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0cmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHJldHVybiBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblx0fVxyXG5cclxuXHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHQvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG5cdFx0dmFyIGRpZmZlcmVuY2U6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiBnZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdH1cclxuXHJcblx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBDb21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG5cdFx0XHRyZXR1cm4gPERhdGU+ZGF0ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKS50b0RhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGUge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KGRhdGUpLnRvRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzRGF0ZShkYXRlKSlcclxuXHRcdHtcclxuXHRcdFx0Ly9sb2Rhc2ggd2lsbCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBhIHZhbGlkIGRhdGUgb2JqZWN0LCBidXQgaGFzIGluIGludmFsaWQgdmFsdWUuXHJcblx0XHRcdC8vY2hlY2sgdGhlIHRpbWUgdmFsdWUgb2YgdGhlIGRhdGUgb2JqZWN0IHRvIHZlcmlmeSB0aGF0IGl0J3MgYSBWYWxpZCBEYXRlLlxyXG5cdFx0XHRsZXQgciA9IWlzTmFOKGRhdGUuZ2V0VGltZSgpKTtcclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkuaXNWYWxpZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0Tm93KCk6IERhdGUge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHRoaXMuZ2V0RGF0ZShkYXRlLCBkYXRlRm9ybWF0KSkuZm9ybWF0KHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Rm9ybWF0KGN1c3RvbUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBjdXN0b21Gb3JtYXQgIT0gbnVsbCA/IGN1c3RvbUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHR9XHJcblxyXG5cdHNhbWVEYXRlKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKSB7XHJcblx0XHRpZiAoZGF0ZTFGb3JtYXQgIT0gdW5kZWZpbmVkICYmIGRhdGUyRm9ybWF0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGF0ZTJGb3JtYXQgPSBkYXRlMUZvcm1hdDtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRGF0ZShkYXRlMSwgZGF0ZTFGb3JtYXQpICYmIHRoaXMuaXNEYXRlKGRhdGUyLCBkYXRlMkZvcm1hdCkpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudChkYXRlMSkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSA9PT0gbW9tZW50KGRhdGUyKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2FtZURhdGVUaW1lKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZTFGb3JtYXQ/OiBzdHJpbmcsIGRhdGUyRm9ybWF0Pzogc3RyaW5nKSB7XHJcblx0XHRpZiAoZGF0ZTFGb3JtYXQgIT0gdW5kZWZpbmVkICYmIGRhdGUyRm9ybWF0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGF0ZTJGb3JtYXQgPSBkYXRlMUZvcm1hdDtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRGF0ZShkYXRlMSwgZGF0ZTFGb3JtYXQpICYmIHRoaXMuaXNEYXRlKGRhdGUyLCBkYXRlMkZvcm1hdCkpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudChkYXRlMSkuZm9ybWF0KFwiTU0vREQvWVlZWSArLUhIbW1cIikgPT09IG1vbWVudChkYXRlMikuZm9ybWF0KFwiTU0vREQvWVlZWSArLUhIbW1cIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGRhdGVVdGlsaXR5OiBJRGF0ZVV0aWxpdHkgPSBuZXcgRGF0ZVV0aWxpdHkobW9tZW50LCB0aW1lVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0Z3JlYXRlciA9IDEsXHJcblx0ZXF1YWwgPSAwLFxyXG5cdGxlc3MgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRpc29Gb3JtYXQ6IHN0cmluZztcclxuXHRkYXRlVGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRpc29Gb3JtYXQ6ICdZWVlZLU1NLUREVEhIOm1tOnNzJyxcclxuXHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0ZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuXHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUl0ZW1MaXN0LCBJSXRlbSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2l0ZW1MaXN0JztcclxuXHJcbmV4cG9ydCB7IElDb252ZXJ0ZXIgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnVtQ29udmVydGVyPFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiBpbXBsZW1lbnRzIElDb252ZXJ0ZXI8VEl0ZW1UeXBlPiB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbnVtVHlwZTogSUl0ZW1MaXN0PFRJdGVtVHlwZT4pIHt9XHJcblxyXG5cdGZyb21TZXJ2ZXIocmF3OiBudW1iZXIpOiBUSXRlbVR5cGUge1xyXG5cdFx0cmV0dXJuIHRoaXMuZW51bVR5cGUuZ2V0KHJhdyk7XHJcblx0fVxyXG5cdHRvU2VydmVyKGRhdGE6IFRJdGVtVHlwZSk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gZGF0YSAhPSBudWxsXHJcblx0XHRcdD8gZGF0YS52YWx1ZVxyXG5cdFx0XHQ6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2NvbnZlcnRlcnMvZW51bUNvbnZlcnRlci9lbnVtQ29udmVydGVyLnRzXG4gKiovIiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0bW9ja0dldExpc3QoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRtb2NrR2V0TGlzdChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0NoaWxkKG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0bW9ja0dldChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZVJlc291cmNlQnVpbGRlciwgQmFzZVJlc291cmNlQnVpbGRlciB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZU1vY2ssIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jayB9IGZyb20gJy4vZGF0YVNlcnZpY2VNb2Nrcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250cmFjdExpYnJhcnkge1xyXG5cdC8vIGV4dGVuZCB3aXRoIGN1c3RvbSBpbnRlcmZhY2Ugc3BlY2lmeWluZyBjaGlsZCByZXNvdXJjZXNcclxuXHJcblx0Zmx1c2goKTogdm9pZDtcclxuXHJcblx0bW9ja0dldChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRtb2NrQ2hpbGQocGFyZW50OiBhbnksIG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PjtcclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT47XHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxpYnJhcnlTZXJ2aWNlcyB7XHJcblx0JHE6IG5nLklRU2VydmljZTtcclxuXHQkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyYWN0TGlicmFyeSBpbXBsZW1lbnRzIElDb250cmFjdExpYnJhcnkge1xyXG5cdHByaXZhdGUgJHE6IG5nLklRU2VydmljZTtcclxuXHRwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkZXI6IElCYXNlUmVzb3VyY2VCdWlsZGVyKSB7XHJcblx0XHRsZXQgc2VydmljZXM6IElMaWJyYXJ5U2VydmljZXMgPSAoPEJhc2VSZXNvdXJjZUJ1aWxkZXI+YnVpbGRlcikuZ2V0TGlicmFyeVNlcnZpY2VzKCk7XHJcblx0XHR0aGlzLiRxID0gc2VydmljZXMuJHE7XHJcblx0XHR0aGlzLiRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdH1cclxuXHJcblx0Zmx1c2goKTogdm9pZCB7XHJcblx0XHR0aGlzLiRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdH1cclxuXHRtb2NrR2V0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0JywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldExpc3QnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tHZXREZXRhaWwocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXREZXRhaWwnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tDaGlsZChwYXJlbnQ6IGFueSwgbW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCB7XHJcblx0XHRsZXQgZ2V0Q2hpbGRyZW46IHsoaWQ6IG51bWJlcik6IGFueX0gPSBwYXJlbnQuY2hpbGRDb250cmFjdHMuYmluZChwYXJlbnQpO1xyXG5cdFx0cGFyZW50LmNoaWxkQ29udHJhY3RzID0gKGlkOiBudW1iZXIpOiBhbnkgPT4ge1xyXG5cdFx0XHRsZXQgY2hpbGRyZW46IGFueSA9IGdldENoaWxkcmVuKGlkKTtcclxuXHRcdFx0bW9ja0NhbGxiYWNrKGNoaWxkcmVuKTtcclxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiB7XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVJlc291cmNlPGFueSwgYW55Pih7fSk7XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0TGlzdCA9IChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXRMaXN0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0RGV0YWlsID0gKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXQnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlID0gdGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9ja1BhcmVudChyZXNvdXJjZT86IGFueSk6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+IHtcclxuXHRcdGxldCBnZXRDaGlsZHJlbjogYW55ID0gcmVzb3VyY2UgIT0gbnVsbCA/IHJlc291cmNlLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIgOiAoKTogYW55ID0+IHsgcmV0dXJuIHt9OyB9O1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxhbnksIGFueSwgYW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlPGFueSwgYW55LCBhbnk+KHtcclxuXHRcdFx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogZ2V0Q2hpbGRyZW4sXHJcblx0XHR9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXRMaXN0ID0gKGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldExpc3QnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXREZXRhaWwgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0NoaWxkID0gKG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQgPT4geyByZXR1cm4gdGhpcy5tb2NrQ2hpbGQoZGF0YVNlcnZpY2UsIG1vY2tDYWxsYmFjayk7IH07XHJcblx0XHRkYXRhU2VydmljZSA9IHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlKHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXQgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UgPSB0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlOiBhbnksIHJlc291cmNlPzogYW55KTogYW55IHtcclxuXHRcdGlmIChyZXNvdXJjZSAhPSBudWxsKSB7XHJcblx0XHRcdGRhdGFTZXJ2aWNlID0gXy5leHRlbmQocmVzb3VyY2UsIGRhdGFTZXJ2aWNlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tHZXQocmVzb3VyY2U6IGFueSwgYWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRsZXQgZnVuYzogU2lub24uU2lub25TcHkgPSB0aGlzLnNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHEud2hlbihkYXRhKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVzb3VyY2VbYWN0aW9uTmFtZV0gPSBmdW5jO1xyXG5cdFx0cmV0dXJuIGZ1bmM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBzaW5vbigpOiBTaW5vbi5TaW5vblN0YXRpYyB7XHJcblx0XHRyZXR1cm4gc2lub24gfHwgPGFueT57IHNweTogKGZ1bmM6IGFueSk6IGFueSA9PiB7IHJldHVybiBmdW5jOyB9IH07XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgIHNlcnZpY2VOYW1lIGFzIG5vdGlmaWNhdGlvblNlcnZpY2VOYW1lLFxyXG4gICAgbW9kdWxlTmFtZSBhcyBub3RpZmljYXRpb25Nb2R1bGVOYW1lLFxyXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnNlcnZpY2VzLmVycm9ySGFuZGxlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdlcnJvckhhbmRsZXInO1xyXG5cclxuZXhwb3J0IGVudW0gSHR0cFN0YXR1c0NvZGUge1xyXG5cdHVuYXV0aG9yaXplZCA9IDQwMSxcclxuXHRmb3JiaWRkZW4gPSA0MDMsXHJcblx0aW52YWxpZFVybCA9IDQwNCxcclxuXHR0aW1lb3V0ID0gNDA4LFxyXG5cdGludGVybmFsU2VydmVyRXJyb3IgPSA1MDAsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlamVjdGlvbiB7XHJcblx0c3RhdHVzOiBIdHRwU3RhdHVzQ29kZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyU2VydmljZSB7XHJcblx0aHR0cFJlc3BvbnNlRXJyb3IocmVqZWN0aW9uOiBJUmVqZWN0aW9uKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JNZXNzYWdlcyB7XHJcbiAgICBmb3JiaWRkZW5FcnJvcjogc3RyaW5nO1xyXG4gICAgaW52YWxpZFVybEVycm9yOiBzdHJpbmc7XHJcbiAgICB0aW1lb3V0RXJyb3I6IHN0cmluZztcclxuICAgIGludGVybmFsU2VydmVyRXJyb3I6IHN0cmluZztcclxuICAgIGRlZmF1bHRFcnJvcjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZSBpbXBsZW1lbnRzIElFcnJvckhhbmRsZXJTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25TZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBsb2dpblVybDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBlcnJvck1lc3NhZ2VzOiBJRXJyb3JNZXNzYWdlcykgeyB9XHJcblxyXG5cdGh0dHBSZXNwb25zZUVycm9yKHJlamVjdGlvbjogSVJlamVjdGlvbik6IHZvaWQge1xyXG5cdFx0c3dpdGNoIChyZWplY3Rpb24uc3RhdHVzKSB7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUudW5hdXRob3JpemVkOlxyXG5cdFx0XHRcdHRoaXMubG9nZ2VkT3V0RXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5mb3JiaWRkZW46XHJcblx0XHRcdFx0dGhpcy5pbnN1ZmZpY2llbnRQZXJtaXNzaW9uc0Vycm9yKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUuaW52YWxpZFVybDpcclxuXHRcdFx0XHR0aGlzLmludmFsaWRVcmxFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLnRpbWVvdXQ6XHJcblx0XHRcdFx0dGhpcy50aW1lb3V0RXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5pbnRlcm5hbFNlcnZlckVycm9yOlxyXG5cdFx0XHRcdHRoaXMuc3lzdGVtRXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5kZWZhdWx0RXJyb3IpO1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1N0YXR1czogJyArIHJlamVjdGlvbi5zdGF0dXMpO1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Jlc3BvbnNlOiAnICsgcmVqZWN0aW9uKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbG9nZ2VkT3V0RXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLiR3aW5kb3cubG9jYXRpb24gPSA8YW55PnRoaXMubG9naW5Vcmw7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMuZm9yYmlkZGVuRXJyb3IpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpbnZhbGlkVXJsRXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMuaW52YWxpZFVybEVycm9yKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdGltZW91dEVycm9yKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLnRpbWVvdXRFcnJvcik7XHJcblx0XHQvLyByZXRyeVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzeXN0ZW1FcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5pbnRlcm5hbFNlcnZlckVycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciBleHRlbmRzIGFuZ3VsYXIuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlczogSUVycm9yTWVzc2FnZXM7XHJcbiAgICAkZ2V0KCR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgLCBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25TZXJ2aWNlKTogSUVycm9ySGFuZGxlclNlcnZpY2U7XHJcbn1cclxuXHJcbmNsYXNzIEVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciBpbXBsZW1lbnRzIElFcnJvckhhbmRsZXJTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIGVycm9yTWVzc2FnZXM6IElFcnJvck1lc3NhZ2VzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9naW5VcmwgPSAnL2xvZ2luJztcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSB7XHJcbiAgICAgICAgICAgIGZvcmJpZGRlbkVycm9yOiAnWW91IGhhdmUgaW5zdWZmaWNpZW50IHBlcm1pc3Npb25zIHRvIHBlcmZvcm0gdGhpcyBhY3Rpb24nLFxyXG4gICAgICAgICAgICBpbnZhbGlkVXJsRXJyb3I6ICdSZXNvdXJjZSBub3QgZm91bmQuIFRoaXMgaXNzdWUgaGFzIGJlZW4gbG9nZ2VkJyxcclxuICAgICAgICAgICAgdGltZW91dEVycm9yOiAnUmVxdWVzdCB0aW1lZCBvdXQuIENoZWNrIHlvdXIgbmV0d29yayBjb25uZWN0aW9uIG9yIGNvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yIGZvciBpc3N1ZXMnLFxyXG4gICAgICAgICAgICBpbnRlcm5hbFNlcnZlckVycm9yOiAnVGhlIHN5c3RlbSBoYXMgZW5jb3VudGVyZWQgYW4gZXJyb3IuIFRoaXMgaXNzdWUgaGFzIGJlZW4gbG9nZ2VkLicgK1xyXG4gICAgICAgICAgICAnIFBsZWFzZSBjb250YWN0IHN1cHBvcnQgaWYgeW91IGFyZSB1bmFibGUgdG8gY29tcGxldGUgY3JpdGljYWwgdGFza3MnLFxyXG4gICAgICAgICAgICBkZWZhdWx0RXJyb3I6ICdIdHRwIHN0YXR1cyBjb2RlIG5vdCBoYW5kbGVkJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuJGdldC4kaW5qZWN0ID0gWyckd2luZG93Jywgbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgICRnZXQ6IGFueSA9ICgkd2luZG93OiBuZy5JV2luZG93U2VydmljZVxyXG4gICAgICAgICAgICAsIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJRXJyb3JIYW5kbGVyU2VydmljZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXJTZXJ2aWNlKCR3aW5kb3csIG5vdGlmaWNhdGlvbiwgdGhpcy5sb2dpblVybCwgdGhpcy5lcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5wcm92aWRlcihzZXJ2aWNlTmFtZSwgbmV3IEVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlcigpKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZXJyb3JIYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElOb3RpZmllciB9IGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBCYXNlTm90aWZpZXIgfSBmcm9tICcuL2Jhc2VOb3RpZmllcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24nO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpZXI6IElOb3RpZmllcikge31cclxuXHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgYW5ndWxhci5JU2VydmljZVByb3ZpZGVyIHtcclxuXHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHQkZ2V0KCk6IElOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlckludGVybmFsIGV4dGVuZHMgSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciB7XHJcblx0bm90aWZpZXI6IElOb3RpZmllcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcigpOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGxldCBwcm92aWRlcjogSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlckludGVybmFsID0ge1xyXG5cdFx0bm90aWZpZXI6IG5ldyBCYXNlTm90aWZpZXIoKSxcclxuXHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XHJcblx0XHR9LFxyXG5cdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0cmV0dXJuIG5ldyBOb3RpZmljYXRpb25TZXJ2aWNlKHRoaXMubm90aWZpZXIpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gcHJvdmlkZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5wcm92aWRlcihzZXJ2aWNlTmFtZSwgbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBub3RpZnkobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR3aW5kb3cuYWxlcnQobWVzc2FnZSk7XHJcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL2Jhc2VOb3RpZmllci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWVyIHtcclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvblR5cGVzLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgbnVtYmVyTW9kdWxlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkgfSBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlciB9IGZyb20gJy4vZmlsZVNpemVGaWx0ZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW251bWJlck1vZHVsZU5hbWVdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkpXHJcblx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuZW51bSBTaWduIHtcclxuXHRwb3NpdGl2ZSA9IDEsXHJcblx0bmVnYXRpdmUgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdH1cclxuXHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHR9XHJcblxyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCFzdGVwKSB7XHJcblx0XHRcdHJldHVybiBudW07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlbWFpbmRlcjogbnVtYmVyID0gbnVtICUgc3RlcDtcclxuXHJcblx0XHRpZiAocmVtYWluZGVyID49IHN0ZXAgLyAyKSB7XHJcblx0XHRcdHJldHVybiBudW0gKyAoc3RlcCAtIHJlbWFpbmRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVtIC0gcmVtYWluZGVyO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTnVtYmVyVXRpbGl0eSwgc2VydmljZU5hbWUgYXMgbnVtYmVyU2VydmljZU5hbWUgfSBmcm9tICcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZSB7XHJcblx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEZpbGVTaXplU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU2l6ZSB7XHJcblx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRCWVRFU19QRVJfS0I6IG51bWJlciA9IDEwMjQ7XHJcblxyXG5cdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdEdCOiBudW1iZXI7XHJcblx0aXNHQjogYm9vbGVhbjtcclxuXHJcblx0TUI6IG51bWJlcjtcclxuXHRpc01COiBib29sZWFuO1xyXG5cclxuXHRLQjogbnVtYmVyO1xyXG5cdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHR0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0dGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5pc0dCKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemU7XHJcbn1cclxuXHJcbmZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlclNlcnZpY2VOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBJTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIElGaWxlU2l6ZUZhY3RvcnksIElGaWxlU2l6ZSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcblxyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG5leHBvcnQgdmFyIHNpbXBsZUZpbHRlck5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdChieXRlcz86IG51bWJlcik6IHN0cmluZztcclxufVxyXG5cclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3RvcnkpOiBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdHZhciBmaWxlU2l6ZTogSUZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuXHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG59IGZyb20gJy4uL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgc3RyaW5nTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBzdHJpbmdTZXJ2aWNlTmFtZSxcclxuXHRJU3RyaW5nVXRpbGl0eVNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElGaWx0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXJzL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRtaW5TZWFyY2hMZW5ndGg6IG51bWJlcjtcclxuXHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoRmlsdGVyIGltcGxlbWVudHMgSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZyA9IGZpbHRlck5hbWU7XHJcblx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdG1pblNlYXJjaExlbmd0aDogbnVtYmVyID0gMTtcclxuXHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvYmplY3Q6IElPYmplY3RVdGlsaXR5LCBwcml2YXRlIHN0cmluZzogSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkgfHwgdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA8IHRoaXMubWluU2VhcmNoTGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNlYXJjaE9iamVjdDxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSwgc2VhcmNoOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdHZhciB2YWx1ZXM6IGFueSA9IF8udmFsdWVzKGl0ZW0pO1xyXG5cdFx0XHRyZXR1cm4gXy5zb21lKHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuXHJcblx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG59XHJcblxyXG5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lLCBzdHJpbmdTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdDogSU9iamVjdFV0aWxpdHksXHJcblx0c3RyaW5nVXRpbGl0eTogSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0TW9kdWxlTmFtZSwgc3RyaW5nTW9kdWxlTmFtZV0pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlcjtcclxuXHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxpdHlTZXJ2aWNlIGltcGxlbWVudHMgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gK3N0cmluZztcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcblx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ndWlkJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2d1aWRTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZztcclxuXHRyYW5kb20oKTogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBHdWlkU2VydmljZSBpbXBsZW1lbnRzIElHdWlkU2VydmljZSB7XHJcblx0dGltZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHV1aWQudjEoKTtcclxuXHR9XHJcblxyXG5cdHJhbmRvbSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHV1aWQudjQoKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBHdWlkU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2d1aWQvZ3VpZC5zZXJ2aWNlLnRzXG4gKiovIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbi8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4vLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxudmFyIF9ybmcgPSByZXF1aXJlKCcuL3JuZycpO1xuXG4vLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxudmFyIF9ieXRlVG9IZXggPSBbXTtcbnZhciBfaGV4VG9CeXRlID0ge307XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbn1cblxuLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG5mdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgYnVmID0gYnVmIHx8IFtdO1xuICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICBidWZbaSArIGlpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4vLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxudmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xufVxuXG4vLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG59XG5cbi8vIEV4cG9ydCBwdWJsaWMgQVBJXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xudXVpZC5wYXJzZSA9IHBhcnNlO1xudXVpZC51bnBhcnNlID0gdW5wYXJzZTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXVpZC91dWlkLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxudmFyIHJuZztcblxuaWYgKGdsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICByZXR1cm4gX3JuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXVpZC9ybmctYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0ZXZlbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHdhdGNoZXJzOiBJV2F0Y2hlcjxhbnk+W10gPSBbXTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0aWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0cmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdH0pXHJcblx0XHQubWFwKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0fSkudmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5cclxubmcubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdGJlaGF2aW9yOiBUQmVoYXZpb3I7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdHZpZXdEYXRhPzogSVZpZXdEYXRhPFRCZWhhdmlvcj47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yO1xyXG5cdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGU7XHJcblx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdO1xyXG5cdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciB7XHJcblx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdDogbnVsbDtcclxuXHR9XHJcblxyXG5cdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPlxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGUge1xyXG5cdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdHJldHVybiBfLm1hcChiZWhhdmlvcnMsIChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXSB7XHJcblx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChiZWhhdmlvcjogVEJlaGF2aW9yKTogYm9vbGVhbiA9PiB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZCB7XHJcblx0XHRpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRCZWhhdmlvcjogVEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2VVdGlsaXR5IHtcclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbjtcclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgUHJvbWlzZVV0aWxpdHkgaW1wbGVtZW50cyBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHEnLCAnJGluamVjdG9yJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSkge31cclxuXHJcblx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIF8uaXNPYmplY3QocHJvbWlzZSkgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UudGhlbikgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UuY2F0Y2gpO1xyXG5cdH1cclxuXHJcblx0cmVzb2x2ZVByb21pc2VzKHJlc29sdmVzOiBhbnkpOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHByb21pc2VzOiBhbnkgPSB7fTtcclxuXHRcdF8uZWFjaChyZXNvbHZlcywgKHZhbHVlOiBhbnksIGtleTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24odmFsdWUpIHx8IF8uaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih0aGlzLiRpbmplY3Rvci5pbnZva2UodmFsdWUpKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih0aGlzLiRpbmplY3Rvci5nZXQodmFsdWUpKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJvbWlzZXNba2V5XSA9ICh0aGlzLiRxLndoZW4odmFsdWUpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuJHEuYWxsKHByb21pc2VzKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdzeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2Uge1xyXG5cdGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXI7XHJcblx0aGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjaztcclxuXHJcblx0Z2V0RGF0YSguLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0cHJpdmF0ZSByZXF1ZXN0SWQ6IG51bWJlciA9IDA7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXJcclxuXHRcdFx0LCBwdWJsaWMgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFja1xyXG5cdFx0XHQsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7IH1cclxuXHJcblx0Z2V0RGF0YSguLi5wYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblx0XHQvLyBpbmNyZW1lbnQgdGhlIGlkIGZpcnN0IC0gc2hvdWxkIG1hdGNoIGN1cnJlbnQgcmVxdWVzdCBpZFxyXG5cdFx0dGhpcy5yZXF1ZXN0SWQrKztcclxuXHRcdGxldCBjdXJyZW50UmVxdWVzdElkOiBudW1iZXIgPSB0aGlzLnJlcXVlc3RJZDtcclxuXHRcdHRoaXMuJHEud2hlbih0aGlzLmRhdGFQcm92aWRlciguLi5wYXJhbXMpKS50aGVuKCguLi5kYXRhOiBhbnlbXSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoY3VycmVudFJlcXVlc3RJZCA9PSB0aGlzLnJlcXVlc3RJZCkge1xyXG5cdFx0XHRcdHRoaXMuaGFuZGxlUmVxdWVzdCguLi5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0R2V0dGVyIHtcclxuXHQoLi4ucGFyYW1zOiBhbnlbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdENhbGxiYWNrIHtcclxuXHQoLi4uZGF0YTogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXIsIGhhbmRsZVJlcXVlc3Q6IElSZXF1ZXN0Q2FsbGJhY2spOiBJU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlO1xyXG59XHJcblxyXG5zeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuJGluamVjdCA9IFsnJHEnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSgkcTogYW5ndWxhci5JUVNlcnZpY2UpOiBJU3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2Uge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZShkYXRhUHJvdmlkZXIsIGhhbmRsZVJlcXVlc3QsICRxKTtcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgbW9jayBmcm9tICcuL21vY2snO1xyXG5leHBvcnQgeyBtb2NrIH07XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2FuZ3VsYXJGaXh0dXJlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRtb2NrLm1vZHVsZU5hbWUsXHJcbl0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyB1c2VzIHNpbm9uIGJ1dCBjYW4ndCBpbXBvcnQgYmVjYXVzZSBzaW5vbiB1c2VzIGR5bmFtaWMgcmVxdWlyZXNcclxuLy8gc2lub24gdHlwZXMgd2lsbCBiZSByZXNvbHZlZCBmcm9tIHRzZC5kLnRzXHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5tb2NrJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vY2tVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueTtcclxuXHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdHByb21pc2U6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT47XHJcblx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNsYXNzIE1vY2sge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHEnLCAnJHJvb3RTY29wZSddO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuXHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc2VydmljZSkpIHtcclxuXHRcdFx0c2VydmljZSA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0cmV0dXJuIHNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0dmFyIGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxURGF0YVR5cGU+ID0gdGhpcy4kcS5kZWZlcigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKC4uLnBhcmFtczogYW55W10pOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyPFREYXRhVHlwZT4oKTtcclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogYW5ndWxhci5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzOiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPltdID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcblx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHQvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0XHJcblx0XHQvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG5cdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBNb2NrKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICdhbmd1bGFyLW1vY2tzJztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRpbmplY3Q6ICguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbmd1bGFyLklTY29wZSk6IElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxufVxyXG5cclxuY2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG5cdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuXHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0Ly8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG5cdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0YW5ndWxhci5tb2NrLmluamVjdChpbmplY3RQYXJhbWV0ZXJzKTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0fVxyXG5cclxuXHRtb2NrKG1vY2tzOiBhbnkpOiB2b2lkIHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBhbmd1bGFyLmF1dG8uSVByb3ZpZGVTZXJ2aWNlKSA9PiB7XHJcblx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0JHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnRyb2xsZXJXaXRoQmluZGluZ3M8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBiaW5kaW5ncz86IGFueSwgbG9jYWxzPzogYW55LCBzY29wZT86IGFueSlcclxuXHRcdDogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHR2YXIgJGNvbnRyb2xsZXI6IGFuZ3VsYXIuSUNvbnRyb2xsZXJTZXJ2aWNlID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2NvcGU6IHNjb3BlLFxyXG5cdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGJpbmRpbmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRkaXJlY3RpdmU8VENvbnRyb2xsZXJUeXBlPihkaXJlY3RpdmVOYW1lOiBzdHJpbmcsIGRvbTogc3RyaW5nLCBzY29wZTogYW55KTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuXHRcdHNjb3BlID0gXy5leHRlbmQoc2VydmljZXMuJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHR2YXIgJGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0dmFyIGNvbXBvbmVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5ID0gJGNvbXBpbGUoZG9tKShzY29wZSk7XHJcblx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcblx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdGNvbnRyb2xsZXI6IGNvbXBvbmVudC5jb250cm9sbGVyKGRpcmVjdGl2ZU5hbWUpLFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgYW5ndWxhckZpeHR1cmU6IElBbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG5vdGlmaWNhdGlvbk1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgbm90aWZpY2F0aW9uU2VydmljZU5hbWUsXHJcblx0SU5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElWYWxpZGF0b3IsIElTaW1wbGVWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIsIElDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRpb25UeXBlcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQ29tcG9zaXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9jb21wb3NpdGVWYWxpZGF0b3InO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndmFsaWRhdGlvbkZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCB1c2VzIHdhcm5pbmcgbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgYSBjdXN0b20gaGFuZGxlciB0byBzaG93IGVycm9yc1xyXG5cdCpcclxuXHQqIEBwYXJhbSBzaG93RXJyb3IgQSBjdXN0b20gaGFuZGxlciBmb3IgdmFsaWRhdGlvbiBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElTaW1wbGVWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCBncm91cHMgY2hpbGQgdmFsaWRhdG9yc1xyXG5cdCogYW5kIHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBlcnJvciBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCBncm91cHMgY2hpbGQgdmFsaWRhdG9yc1xyXG5cdCogYW5kIHVzZXMgYSBjdXN0b20gaGFuZGxlciB0byBzaG93IGVycm9yc1xyXG5cdCpcclxuXHQqIEBwYXJhbSBzaG93RXJyb3IgQSBjdXN0b20gaGFuZGxlciBmb3IgdmFsaWRhdGlvbiBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElDb21wb3NpdGVWYWxpZGF0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW25vdGlmaWNhdGlvblNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpIHsgfVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVNpbXBsZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVNpbXBsZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBDb21wb3NpdGVWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24ud2FybmluZyhlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBDb21wb3NpdGVWYWxpZGF0b3Ioc2hvd0Vycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtub3RpZmljYXRpb25Nb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVmFsaWRhdGlvblNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElTaW1wbGVWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIsIElVbnJlZ2lzdGVyRnVuY3Rpb24sIElWYWxpZGF0aW9uSGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3IgaW1wbGVtZW50cyBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIHZhbGlkYXRpb25IYW5kbGVyczogeyBbaW5kZXg6IHN0cmluZ106IElWYWxpZGF0aW9uSGFuZGxlciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHZhciBpc0FjdGl2ZTogYm9vbGVhbiA9IHRoaXMuaXNBY3RpdmUoaGFuZGxlcik7XHJcblxyXG5cdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0bGV0IGVycm9yOiBzdHJpbmcgPSB0aGlzLmVycm9yTWVzc2FnZShoYW5kbGVyKTtcclxuXHRcdFx0XHR0aGlzLnNob3dFcnJvcihlcnJvcik7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0fVxyXG5cclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UoPGFueT50aGlzLnZhbGlkYXRpb25IYW5kbGVycywgKGNvdW50OiBudW1iZXIsIGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IG51bWJlciA9PiB7XHJcblx0XHRcdHZhciBpc0FjdGl2ZTogYm9vbGVhbiA9IHRoaXMuaXNBY3RpdmUoaGFuZGxlcik7XHJcblxyXG5cdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGNvdW50Kys7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjb3VudDtcclxuXHRcdH0sIDApO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2N1cnJlbnRLZXldID0gaGFuZGxlcjtcclxuXHJcblx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaXNBY3RpdmUoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiAoPHsoKTogYm9vbGVhbn0+aGFuZGxlci5pc0FjdGl2ZSkoKSlcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PSBudWxsXHJcblx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT09IHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGVycm9yTWVzc2FnZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIF8uaXNGdW5jdGlvbihoYW5kbGVyLmVycm9yTWVzc2FnZSlcclxuXHRcdFx0PyAoPHsgKCk6IHN0cmluZyB9PmhhbmRsZXIuZXJyb3JNZXNzYWdlKSgpXHJcblx0XHRcdDogPHN0cmluZz5oYW5kbGVyLmVycm9yTWVzc2FnZTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRvci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElDb21wb3NpdGVWYWxpZGF0b3IsIElTaW1wbGVWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIsIElVbnJlZ2lzdGVyRnVuY3Rpb24sIElWYWxpZGF0aW9uSGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdGlvblR5cGVzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5cclxuaW50ZXJmYWNlIElSZWdpc3RlcmVkVmFsaWRhdG9yIGV4dGVuZHMgSVNpbXBsZVZhbGlkYXRvciB7XHJcblx0a2V5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVWYWxpZGF0b3IgaW1wbGVtZW50cyBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIGNoaWxkVmFsaWRhdG9yczogeyBbaW5kZXg6IHN0cmluZ106IElTaW1wbGVWYWxpZGF0b3IgfSA9IHt9O1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpIHt9XHJcblxyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdF8uZWFjaCh0aGlzLmNoaWxkVmFsaWRhdG9ycywgKGhhbmRsZXI6IElTaW1wbGVWYWxpZGF0b3IpOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKCFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVNpbXBsZVZhbGlkYXRvcik6IG51bWJlciA9PiB7XHJcblx0XHRcdHJldHVybiBjb3VudCArPSBoYW5kbGVyLmdldEVycm9yQ291bnQoKTtcclxuXHRcdH0sIDApO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDaGlsZFZhbGlkYXRvcigpOiBJU2ltcGxlVmFsaWRhdG9yIHtcclxuXHRcdGxldCB2YWxpZGF0b3I6IElTaW1wbGVWYWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMuY2hpbGRWYWxpZGF0b3JzW2N1cnJlbnRLZXldID0gdmFsaWRhdG9yO1xyXG5cdFx0KDxJUmVnaXN0ZXJlZFZhbGlkYXRvcj52YWxpZGF0b3IpLmtleSA9IGN1cnJlbnRLZXk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbGlkYXRvcjtcclxuXHR9XHJcblxyXG5cdHVucmVnaXN0ZXJDaGlsZCh2YWxpZGF0b3I6IElTaW1wbGVWYWxpZGF0b3IpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkVmFsaWRhdG9yc1soPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5XTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRvciB7XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2ltcGxlVmFsaWRhdG9yIGV4dGVuZHMgSVZhbGlkYXRvciB7XHJcblx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb3NpdGVWYWxpZGF0b3IgZXh0ZW5kcyBJVmFsaWRhdG9yIHtcclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElTaW1wbGVWYWxpZGF0b3I7XHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVNpbXBsZVZhbGlkYXRvcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25IYW5kbGVyIHtcclxuXHRpc0FjdGl2ZT86IHsoKTogYm9vbGVhbn0gfCBib29sZWFuO1xyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0ZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCB7KCk6IHN0cmluZ307XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9ySGFuZGxlciB7XHJcblx0KGVycm9yOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdCgpOiB2b2lkO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uVHlwZXMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBhcmVSZXN1bHQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2l0ZW1MaXN0JztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdHlwZXMvdHlwZXMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSXRlbSB7XHJcbiAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGlzcGxheTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtTGlzdDxUSXRlbVR5cGUgZXh0ZW5kcyBJSXRlbT4ge1xyXG5cdGdldCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogVEl0ZW1UeXBlO1xyXG5cdGFsbCgpOiBUSXRlbVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1MaXN0PFRJdGVtVHlwZSBleHRlbmRzIElJdGVtPiB7XHJcblx0cHJpdmF0ZSBpdGVtczogVEl0ZW1UeXBlW107XHJcblxyXG5cdHNldEl0ZW1zKGl0ZW1zOiBUSXRlbVR5cGVbXSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0Z2V0KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBUSXRlbVR5cGUge1xyXG5cdFx0dmFyIHByZWRpY2F0ZTogeyAoaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiB9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHByZWRpY2F0ZSA9IChpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gKGl0ZW0ubmFtZSA9PT0gdmFsdWUpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cHJlZGljYXRlID0gKGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoaXRlbS52YWx1ZSA9PT0gdmFsdWUpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBfLmZpbmQodGhpcy5pdGVtcywgcHJlZGljYXRlKTtcclxuXHR9XHJcblxyXG5cdGFsbCgpOiBUSXRlbVR5cGVbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pdGVtcztcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdHlwZXMvaXRlbUxpc3QudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9