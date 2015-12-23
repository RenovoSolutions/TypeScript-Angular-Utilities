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
	var types = __webpack_require__(53);
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
	var date = __webpack_require__(23);
	exports.date = date;
	var errorHandler = __webpack_require__(30);
	exports.errorHandler = errorHandler;
	var fileSize = __webpack_require__(34);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(38);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(40);
	exports.guid = guid;
	var moment = __webpack_require__(24);
	exports.moment = moment;
	var notification = __webpack_require__(31);
	exports.notification = notification;
	var numberService = __webpack_require__(35);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(43);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(44);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(45);
	exports.promise = promise;
	var stringService = __webpack_require__(39);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(46);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(47);
	exports.test = test;
	var time = __webpack_require__(26);
	exports.time = time;
	var validation = __webpack_require__(50);
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
	var mocks = __webpack_require__(21);
	exports.mocks = mocks;
	exports.moduleName = 'rl.utilities.services.dataContracts';
	__export(__webpack_require__(22));
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
	                var nextId = _.max(_this.mockData, 'id').id + 1;
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
	        return this.transform != null
	            ? this.transform.fromServer(rawData)
	            : rawData;
	    };
	    BaseDataServiceBehavior.prototype.transformToServer = function (data) {
	        return this.transform != null
	            ? this.transform.toServer(data)
	            : data;
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
/***/ function(module, exports) {

	// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
	'use strict';


/***/ },
/* 22 */
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
	        this.updateResource(dataService, resource);
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
	        this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.createMockSingleton = function (resource) {
	        var _this = this;
	        var dataService = this.builder.createSingletonResource({});
	        dataService.mockGet = function (data) { return _this.baseMockGet(dataService, 'get', data); };
	        this.updateResource(dataService, resource);
	        return dataService;
	    };
	    ContractLibrary.prototype.updateResource = function (dataService, resource) {
	        if (resource != null) {
	            _.extend(resource, dataService);
	        }
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(25);
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
/* 25 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

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
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, TimeUtility);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var moment = __webpack_require__(25);
	var time_service_1 = __webpack_require__(26);
	var moment_module_1 = __webpack_require__(24);
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
	        return _.isDate(date)
	            || this.moment(date, this.getFormat(dateFormat)).isValid();
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
	    DateUtility.prototype.sameDate = function (date1, date2) {
	        if (this.isDate(date1) && this.isDate(date2)) {
	            return moment(date1).format("MM/dd/yyyy") === moment(date2).format("MM/dd/yyyy");
	        }
	        else {
	            return false;
	        }
	    };
	    DateUtility.prototype.sameDateTime = function (date1, date2) {
	        if (this.isDate(date1) && this.isDate(date2)) {
	            return moment(date1).format("MM/dd/yyyy +-HHmm") === moment(date2).format("MM/dd/yyyy +-HHmm");
	        }
	        else {
	            return false;
	        }
	    };
	    DateUtility.$inject = [moment_module_1.serviceName, time_service_1.serviceName];
	    return DateUtility;
	})();
	exports.DateUtility = DateUtility;


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
	    dateTimeFormat: 'M/D/YYYY h:mm A',
	    dateFormat: 'M/D/YYYY',
	    timeFormat: 'h:mmA',
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var notification_service_1 = __webpack_require__(31);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(32);
	__export(__webpack_require__(33));
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
/* 32 */
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
/* 33 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(35);
	var fileSize_service_1 = __webpack_require__(36);
	var fileSizeFilter_1 = __webpack_require__(37);
	__export(__webpack_require__(36));
	__export(__webpack_require__(37));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);


/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(35);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(36);
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(39);
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
	            return _.any(values, function (value) { return _this.searchObject(value, search, caseSensitive); });
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var uuid = __webpack_require__(41);
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(42);
	
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(48);
	exports.mock = mock;
	__export(__webpack_require__(49));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);


/***/ },
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var notification_service_1 = __webpack_require__(31);
	var validator_1 = __webpack_require__(51);
	var compositeValidator_1 = __webpack_require__(52);
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var validator_1 = __webpack_require__(51);
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(28));


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU5NTE3NGRiZTg0OWI0ZmU4ZmIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL2Jhc2VOb3RpZmllci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvblR5cGVzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2d1aWQvZ3VpZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL34vdXVpZC91dWlkLmpzIiwid2VicGFjazovLy8uL34vdXVpZC9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOlsic3RvcEV2ZW50UHJvcGFnYXRpb24iLCJzdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwiaXNFbXB0eSIsIk9iamVjdFV0aWxpdHkiLCJPYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwiT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwiT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJPYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwiT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsIk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJBcnJheVV0aWxpdHkiLCJBcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJBcnJheVV0aWxpdHkuZmluZEluZGV4T2YiLCJBcnJheVV0aWxpdHkucmVtb3ZlIiwiQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJBcnJheVV0aWxpdHkuc3VtIiwiQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsIkFycmF5VXRpbGl0eS5sYXN0IiwidHJ1bmNhdGUiLCJCb29sZWFuVXRpbGl0eSIsIkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwiQm9vbGVhblV0aWxpdHkudG9Cb29sIiwiQmFzZVJlc291cmNlQnVpbGRlciIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY29uc3RydWN0b3IiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmdldExpYnJhcnlTZXJ2aWNlcyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlVmlldyIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci51c2VNb2NrSWZOb0VuZHBvaW50IiwiQmFzZURhdGFTZXJ2aWNlIiwiQmFzZURhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlLmdldEl0ZW1FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZS5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlLmdldERldGFpbCIsIkJhc2VEYXRhU2VydmljZS5jcmVhdGUiLCJCYXNlRGF0YVNlcnZpY2UudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlLmRlbGV0ZSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmdldExpc3QiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRJdGVtIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudXBkYXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZGVsZXRlIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IubG9nIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHJhbnNmb3JtRnJvbVNlcnZlciIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLnRyYW5zZm9ybVRvU2VydmVyIiwiQmFzZURhdGFTZXJ2aWNlVmlldyIsIkJhc2VEYXRhU2VydmljZVZpZXcuY29uc3RydWN0b3IiLCJCYXNlRGF0YVNlcnZpY2VWaWV3LkFzU2luZ2xldG9uIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LkFzU2luZ2xldG9uIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlLmNoaWxkQ29udHJhY3RzIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLmdldCIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS51cGRhdGUiLCJiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkNvbnRyYWN0TGlicmFyeSIsIkNvbnRyYWN0TGlicmFyeS5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeS5mbHVzaCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXRMaXN0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXREZXRhaWwiLCJDb250cmFjdExpYnJhcnkubW9ja0NoaWxkIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2siLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1BhcmVudCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrU2luZ2xldG9uIiwiQ29udHJhY3RMaWJyYXJ5LnVwZGF0ZVJlc291cmNlIiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5LnNpbm9uIiwibW9tZW50V3JhcHBlciIsIlRpbWVVdGlsaXR5IiwiVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIiwiRGF0ZVV0aWxpdHkiLCJEYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJEYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwiRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsIkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbkRheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyIsIkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsIkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwiRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nIiwiRGF0ZVV0aWxpdHkuaXNEYXRlIiwiRGF0ZVV0aWxpdHkuZ2V0Tm93IiwiRGF0ZVV0aWxpdHkuZm9ybWF0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldEZvcm1hdCIsIkRhdGVVdGlsaXR5LnNhbWVEYXRlIiwiRGF0ZVV0aWxpdHkuc2FtZURhdGVUaW1lIiwiQ29tcGFyZVJlc3VsdCIsImdldENvbXBhcmVSZXN1bHQiLCJIdHRwU3RhdHVzQ29kZSIsIkVycm9ySGFuZGxlclNlcnZpY2UiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5odHRwUmVzcG9uc2VFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UubG9nZ2VkT3V0RXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IiLCJFcnJvckhhbmRsZXJTZXJ2aWNlLmludmFsaWRVcmxFcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2UudGltZW91dEVycm9yIiwiRXJyb3JIYW5kbGVyU2VydmljZS5zeXN0ZW1FcnJvciIsIkVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciIsIkVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlci5jb25zdHJ1Y3RvciIsIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5pbmZvIiwiTm90aWZpY2F0aW9uU2VydmljZS53YXJuaW5nIiwiTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsIk5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyIsIm5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciIsIkJhc2VOb3RpZmllciIsIkJhc2VOb3RpZmllci5jb25zdHJ1Y3RvciIsIkJhc2VOb3RpZmllci5pbmZvIiwiQmFzZU5vdGlmaWVyLndhcm5pbmciLCJCYXNlTm90aWZpZXIuZXJyb3IiLCJCYXNlTm90aWZpZXIuc3VjY2VzcyIsIkJhc2VOb3RpZmllci5ub3RpZnkiLCJTaWduIiwiTnVtYmVyVXRpbGl0eSIsIk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJOdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsIk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsIk51bWJlclV0aWxpdHkucm91bmRUb1N0ZXAiLCJGaWxlU2l6ZVNlcnZpY2UiLCJGaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlU2l6ZVNlcnZpY2UuZGlzcGxheSIsImZpbGVTaXplRmFjdG9yeSIsImZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsImZpbGVTaXplRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJHZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwiZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJTdHJpbmdVdGlsaXR5U2VydmljZS50b051bWJlciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnRhaW5zIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnJlcGxhY2VBbGwiLCJHdWlkU2VydmljZSIsIkd1aWRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiR3VpZFNlcnZpY2UudGltZSIsIkd1aWRTZXJ2aWNlLnJhbmRvbSIsIk9ic2VydmFibGVTZXJ2aWNlIiwiT2JzZXJ2YWJsZVNlcnZpY2UuY29uc3RydWN0b3IiLCJPYnNlcnZhYmxlU2VydmljZS5yZWdpc3RlciIsIk9ic2VydmFibGVTZXJ2aWNlLmZpcmUiLCJPYnNlcnZhYmxlU2VydmljZS51bnJlZ2lzdGVyIiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5Iiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldEFsbENoaWxkQmVoYXZpb3JzIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucmVnaXN0ZXJDaGlsZEJlaGF2aW9yIiwiUHJvbWlzZVV0aWxpdHkiLCJQcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsIlByb21pc2VVdGlsaXR5LnJlc29sdmVQcm9taXNlcyIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5jb25zdHJ1Y3RvciIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5nZXREYXRhIiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5Iiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5LmdldEluc3RhbmNlIiwiTW9jayIsIk1vY2suY29uc3RydWN0b3IiLCJNb2NrLnNlcnZpY2UiLCJNb2NrLnByb21pc2UiLCJNb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJNb2NrLmZsdXNoIiwiQW5ndWxhckZpeHR1cmUiLCJBbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsIkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJBbmd1bGFyRml4dHVyZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzIiwiQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwiVmFsaWRhdGlvblNlcnZpY2UiLCJWYWxpZGF0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZEN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZUN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRvciIsIlZhbGlkYXRvci5jb25zdHJ1Y3RvciIsIlZhbGlkYXRvci52YWxpZGF0ZSIsIlZhbGlkYXRvci5nZXRFcnJvckNvdW50IiwiVmFsaWRhdG9yLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIiLCJWYWxpZGF0b3IudW5yZWdpc3RlciIsIlZhbGlkYXRvci5pc0FjdGl2ZSIsIlZhbGlkYXRvci5lcnJvck1lc3NhZ2UiLCJDb21wb3NpdGVWYWxpZGF0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IuY29uc3RydWN0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IudmFsaWRhdGUiLCJDb21wb3NpdGVWYWxpZGF0b3IuZ2V0RXJyb3JDb3VudCIsIkNvbXBvc2l0ZVZhbGlkYXRvci5idWlsZENoaWxkVmFsaWRhdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLnVucmVnaXN0ZXJDaGls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QUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFDQSxJQUFZQSxJQUFlQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNqR0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNuREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN0REEsRUFBRUEsSUFBSUEsRUFBRUEsV0FBV0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3pEQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN4REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO1VBQ3hEQSxDQUFDQTtLQUNIQSxDQUFDQTtLQUtPRCxnQ0FBVUEsR0FBbEJBLFVBQW1CQSxJQUFhQTtTQUMvQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7S0FDL0NBLENBQUNBO0tBRURGLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTtTQUMxQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7S0FDL0JBLENBQUNBO0tBRURILDZCQUFPQSxHQUFQQSxVQUFRQSxLQUFhQSxFQUFFQSxJQUFhQTtTQUNuQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDckNBLENBQUNBO0tBRURKLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTtTQUMxRUssRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1NBQ2JBLENBQUNBO1NBRURBLElBQUlBLFNBQVNBLEdBQVNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO1NBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtTQUVsREEsSUFBSUEsTUFBTUEsR0FBb0JBLEVBQUVBLENBQUNBO1NBQ2pDQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtTQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7U0FDL0RBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1NBRTFEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDbkJBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBO1NBQzVFQSxDQUFDQTtTQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2QkEsTUFBTUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLE1BQU1BLENBQUNBLE1BQU1BLElBQUlBLEVBQUVBLENBQUNBO1NBQ3JCQSxDQUFDQTtTQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtLQUNmQSxDQUFDQTtLQUVETCx3Q0FBa0JBLEdBQWxCQSxV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QUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtpQkFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xEQSxDQUFDQTthQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtpQkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7aUJBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtxQkFDaENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO3FCQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7cUJBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDbERBLENBQUNBO2lCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtxQkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7aUJBQ25CQSxDQUFDQTthQUNGQSxDQUFDQTtTQUNGQSxDQUFDQTtTQUVEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtLQUNyQ0EsQ0FBQ0E7S0FFREQsaUNBQU9BLEdBQVBBO1NBQ0NFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ2ZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLENBQUNBO1NBQ3hCQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJ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QUFJQSxxQkFBU0EsQ0FBQ0EsVUFBQ0EsS0FBYUE7YUFDdkRBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1NBQ3ZCQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUVIQSxJQUFJQSxVQUFVQSxHQUFXQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtTQUN0Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7U0FDZkEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0E7U0FDdEJBLFNBQVVBLENBQUNBLEdBQUdBLEdBQUdBLFVBQVVBLENBQUNBO1NBRW5EQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtLQUNsQkEsQ0FBQ0E7S0FFREosNENBQWVBLEdBQWZBLFVBQWdCQSxTQUFxQkE7U0FDcENLLE9BQU9BLElBQUlBLENBQUNBLGVBQWVBLENBQXdCQSxTQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtLQUNwRUEsQ0FBQ0E7S0FDRkwseUJBQUNBO0FBQURBLEVBQUNBLElBQUE7QUF6Q1ksMkJBQWtCLHFCQXlDOUI7Ozs7Ozs7QUMzREQsYUFBWSxDQUFDOzs7O0FBRWIsOEJBQWMsRUFBaUIsQ0FBQyIsImZpbGUiOiJ1dGlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJvdXRwdXRcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGFlOTUxNzRkYmU4NDliNGZlOGZiXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGJlaGF2aW9ycyBmcm9tICcuL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMvdHlwZXMubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7IGJlaGF2aW9ycywgZmlsdGVycywgc2VydmljZXMsIHR5cGVzIH07XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdGJlaGF2aW9ycy5uYW1lLFxyXG5cdGZpbHRlcnMubmFtZSxcclxuXHRzZXJ2aWNlcy5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdXRpbGl0aWVzLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJhbmd1bGFyXCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgc3RvcEV2ZW50UHJvcG9nYXRpb24gZnJvbSAnLi9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5leHBvcnQgeyBzdG9wRXZlbnRQcm9wb2dhdGlvbiB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0c3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5leHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBhbmd1bGFyLklBdHRyaWJ1dGVzIHtcclxuXHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IGFuZ3VsYXIuSURpcmVjdGl2ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0bGluayhzY29wZTogYW5ndWxhci5JU2NvcGVcclxuXHRcdFx0LCBlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnlcclxuXHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgaXNFbXB0eSBmcm9tICcuL2lzRW1wdHkvaXNFbXB0eSc7XHJcbmltcG9ydCAqIGFzIHRydW5jYXRlIGZyb20gJy4vdHJ1bmNhdGUvdHJ1bmNhdGUnO1xyXG5cclxuZXhwb3J0IHsgaXNFbXB0eSwgdHJ1bmNhdGUgfTtcclxuZXhwb3J0ICogZnJvbSAnLi9maWx0ZXInO1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG5cdG1vZHVsZU5hbWUgYXMgb2JqZWN0TW9kdWxlTmFtZVxyXG59IGZyb20gJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2lzRW1wdHknO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJc0VtcHR5RmlsdGVyIHtcclxuXHQoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuO1xyXG59XHJcblxyXG5pc0VtcHR5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdDogSU9iamVjdFV0aWxpdHkpOiBJSXNFbXB0eUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuID0+IHtcclxuXHRcdHZhciBpc0VtcHR5OiBib29sZWFuID0gb2JqZWN0LmlzTnVsbE9yRW1wdHkoaW5wdXQpO1xyXG5cclxuXHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gIWlzRW1wdHk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0TW9kdWxlTmFtZV0pXHJcblx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsXHJcblx0bW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUsXHJcblx0SUFycmF5VXRpbGl0eVxyXG59IGZyb20gJy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdFV0aWxpdHkge1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbjtcclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxufVxyXG5cclxuY2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFthcnJheVNlcnZpY2VOYW1lXTtcclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IElBcnJheVV0aWxpdHkpIHtcclxuXHRcdH1cclxuXHJcblx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdH1cclxuXHJcblx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdGlmIChvYmoxID09IG51bGwgJiYgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwob2JqMVtpXSwgb2JqMltpXSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdHZhciBrZXlzMjogc3RyaW5nW10gPSBfLmtleXMob2JqMik7XHJcblx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vaWYgdHlwZXMgYXJlIHByaW1pdGl2ZSwgZG8gYSBzaW1wbGUgY29tcGFyaXNvblxyXG5cdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBvYmplY3QgKyAnJztcclxuXHR9XHJcblxyXG5cdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiX1wiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiX1wiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXHQndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdGxhc3Q8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10pOiBURGF0YVR5cGU7XHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9O1xyXG59XHJcblxyXG5jbGFzcyBBcnJheVV0aWxpdHkgaW1wbGVtZW50cyBJQXJyYXlVdGlsaXR5IHtcclxuXHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0Xy5lYWNoKGFycmF5LCAoaXRlbTogVERhdGFUeXBlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHR2YXIgaW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybT86IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyIHtcclxuXHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0bGlzdCA9IF8ubWFwKGFycmF5LCAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyID0+IHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0fVxyXG5cclxuXHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7IChpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmcgfSlcclxuXHRcdDogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9IHtcclxuXHRcdC8vIG5lZWRzIHRvIGJlIHNlZWRlZCB3aXRoIGFuIG9iamVjdCBvciBpdCB3aWxsIGJlIHZpZXdlZCBhcyBhbiBhcnJheSB3aXRoIG5vIGl0ZW1zXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0sIGl0ZW06IFREYXRhVHlwZSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSA9PiB7XHJcblx0XHRcdGRpY3Rpb25hcnlba2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuXHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHR9LCA8YW55Pnt9KTtcclxuXHR9XHJcblxyXG5cdGxhc3Q8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10pOiBURGF0YVR5cGUge1xyXG5cdFx0aWYgKGFycmF5ICE9IG51bGwgJiYgYXJyYXkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG5pbXBvcnQge1xyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdG1vZHVsZU5hbWUgYXMgb2JqZWN0TW9kdWxlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdChpbnB1dD86IG51bWJlciwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxufVxyXG5cclxudHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3RTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHk6IElPYmplY3RVdGlsaXR5KTogSVRydW5jYXRlRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG5cclxuXHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuXHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdG91dCArPSAnLi4uJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBvdXQ7XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWVdKVxyXG5cdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHR1cGRhdGVPcHRpb25Db3VudHM8VEl0ZW1UeXBlPihkYXRhOiBUSXRlbVR5cGVbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXIudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYXJyYXkgZnJvbSAnLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgYm9vbGVhbiBmcm9tICcuL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZGF0YUNvbnRyYWN0cyBmcm9tICcuL2RhdGFDb250cmFjdHMvZGF0YUNvbnRyYWN0cy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBkYXRlIGZyb20gJy4vZGF0ZS9kYXRlLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tICcuL2Vycm9ySGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGZpbGVTaXplIGZyb20gJy4vZmlsZVNpemUvZmlsZVNpemUubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZ2VuZXJpY1NlYXJjaEZpbHRlciBmcm9tICcuL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZ3VpZCBmcm9tICcuL2d1aWQvZ3VpZC5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJy4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBub3RpZmljYXRpb24gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBudW1iZXJTZXJ2aWNlIGZyb20gJy4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgb2JqZWN0U2VydmljZSBmcm9tICcuL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9ic2VydmFibGUgZnJvbSAnLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHBhcmVudENoaWxkQmVoYXZpb3IgZnJvbSAnLi9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHByb21pc2UgZnJvbSAnLi9wcm9taXNlL3Byb21pc2Uuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHN0cmluZ1NlcnZpY2UgZnJvbSAnLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzeW5jaHJvbml6ZWRSZXF1ZXN0cyBmcm9tICcuL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB0ZXN0IGZyb20gJy4vdGVzdC90ZXN0Lm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHRpbWUgZnJvbSAnLi90aW1lL3RpbWUuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIHZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQge1xyXG5cdGFycmF5LFxyXG5cdGJvb2xlYW4sXHJcblx0ZGF0YUNvbnRyYWN0cyxcclxuICAgIGRhdGUsXHJcbiAgICBlcnJvckhhbmRsZXIsXHJcblx0ZmlsZVNpemUsXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlcixcclxuXHRndWlkLFxyXG5cdG1vbWVudCxcclxuXHRub3RpZmljYXRpb24sXHJcblx0bnVtYmVyU2VydmljZSBhcyBudW1iZXIsXHJcblx0b2JqZWN0U2VydmljZSBhcyBvYmplY3QsXHJcblx0b2JzZXJ2YWJsZSxcclxuXHRwYXJlbnRDaGlsZEJlaGF2aW9yLFxyXG5cdHByb21pc2UsXHJcblx0c3RyaW5nU2VydmljZSBhcyBzdHJpbmcsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMsXHJcblx0dGVzdCxcclxuXHR0aW1lLFxyXG5cdHZhbGlkYXRpb24sXHJcbn07XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdGFycmF5Lm1vZHVsZU5hbWUsXHJcblx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdGRhdGFDb250cmFjdHMubW9kdWxlTmFtZSxcclxuICAgIGRhdGUubW9kdWxlTmFtZSxcclxuICAgIGVycm9ySGFuZGxlci5tb2R1bGVOYW1lLFxyXG5cdGZpbGVTaXplLm1vZHVsZU5hbWUsXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG5cdGd1aWQubW9kdWxlTmFtZSxcclxuXHRtb21lbnQubW9kdWxlTmFtZSxcclxuXHRub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuXHRudW1iZXJTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0b2JqZWN0U2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuXHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdHN0cmluZ1NlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRzeW5jaHJvbml6ZWRSZXF1ZXN0cy5tb2R1bGVOYW1lLFxyXG5cdHRpbWUubW9kdWxlTmFtZSxcclxuXHR0ZXN0Lm1vZHVsZU5hbWUsXHJcblx0dmFsaWRhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBCb29sZWFuVXRpbGl0eSBpbXBsZW1lbnRzIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gISFvYmplY3Q7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHJlc291cmNlQnVpbGRlck1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBiYXNlRGF0YVNlcnZpY2VNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgbW9ja3MgZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGFDb250cmFjdHMnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeSc7XHJcbmV4cG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRGF0YVNlcnZpY2VGYWN0b3J5LCBJQmFzZURvbWFpbk9iamVjdCwgQmFzZURhdGFTZXJ2aWNlLCBmYWN0b3J5TmFtZSBhcyBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldywgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuZXhwb3J0ICogZnJvbSAnLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmV4cG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIGZhY3RvcnlOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnlOYW1lIH0gZnJvbSAnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZVJlc291cmNlQnVpbGRlciwgc2VydmljZU5hbWUgYXMgYnVpbGRlclNlcnZpY2VOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmV4cG9ydCB7IG1vY2tzIH07XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0YmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSxcclxuXHRiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2R1bGVOYW1lLFxyXG5cdHJlc291cmNlQnVpbGRlck1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsIG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lIH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQ29udHJhY3RMaWJyYXJ5LCBDb250cmFjdExpYnJhcnksIElMaWJyYXJ5U2VydmljZXMgfSBmcm9tICcuL2NvbnRyYWN0TGlicmFyeSc7XHJcbmltcG9ydCB7IElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3LCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldywgQmFzZURhdGFTZXJ2aWNlVmlldywgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnREYXRhU2VydmljZSwgQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBVcmwgdG8gaGl0IHdpdGggZ2V0TGlzdCBhbmQgY3JlYXRlXHJcblx0KiAtIGV4dGVuZGVkIHdpdGggL2lkIGZvciBnZXREZXRhaWwsIHVwZGF0ZSwgYW5kIGRlbGV0ZVxyXG5cdCovXHJcblx0ZW5kcG9pbnQ/OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCB1c2UgdGhlIG1vY2sgZGF0YSBvciBoaXQgdGhlIGFjdHVhbCBlbmRwb2ludFxyXG5cdCogZGVmYXVsdHMgdG8gdHJ1ZSBpZiBlbmRwb2ludCBpcyBub3QgZGVmaW5lZFxyXG5cdCovXHJcblx0dXNlTW9jaz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCBsb2cgYWxsIHJlcXVlc3RzIGFnYWluc3QgdGhlIGNvbnRyYWN0XHJcblx0Ki9cclxuXHRsb2dSZXF1ZXN0cz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogUHJvY2Vzc2VzIGRhdGEgY29taW5nIGJhY2sgZnJvbSB0aGUgc2VydmVyXHJcblx0Ki9cclxuXHR0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtPFREYXRhVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4gZXh0ZW5kcyBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBFeGFtcGxlIGRhdGEgc2V0IHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcgYW5kIHByb3RvdHlwaW5nIGluc3RlYWQgb2YgaGl0dGluZyB0aGUgZW5kcG9pbnRcclxuXHQqL1xyXG5cdG1vY2tEYXRhPzogVERhdGFUeXBlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRnVuY3Rpb24gdGhhdCBidWlsZHMgYSBkaWN0aW9uYXJ5IG9mIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI/OiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IGV4dGVuZHMgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRXhhbXBsZSBvYmplY3QgdG8gYmUgdXNlZCBmb3IgdGVzdGluZyBhbmQgcHJvdG90eXBpbmcgaW5zdGVhZCBvZiBoaXR0aW5nIHRoZSBlbmRwb2ludFxyXG5cdCovXHJcblx0bW9ja0RhdGE/OiBURGF0YVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRnVuY3Rpb24gdGhhdCBidWlsZHMgYSBkaWN0aW9uYXJ5IG9mIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI/OiB7ICgpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUmVzb3VyY2VCdWlsZGVyIHtcclxuXHQvKipcclxuXHQqIEEgaGVscGVyIHRvIHBhc3MgaW50byB0aGUgY29uc3RydWN0b3Igd2hlbiBidWlsZGluZyBhIG5ldyBjb250cmFjdHMgbGlicmFyeVxyXG5cdCovXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXM7XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3RhbmRhcmQgcmVzb3VyY2Ugd2l0aCBnZXRMaXN0LCBnZXREZXRhaWwsIGNyZWF0ZSwgdXBkYXRlLCBkZWxldGVcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBzdGFuZGFyZCByZXNvdXJjZSB3aXRoIGdldExpc3QsIGdldERldGFpbCwgY3JlYXRlLCB1cGRhdGUsIGRlbGV0ZVxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzdGFuZGFyZCB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgcGFyZW50IHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc3RhbmRhcmQgd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCB2b2lkLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogRGVwcmVjYXRlZCAtIENyZWF0ZSBhIHNpbmdsZXRvbiByZXNvdXJjZSB3aXRoIGdldCBhbmQgdXBkYXRlXHJcblx0Ki9cclxuXHRjcmVhdGVTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGU+KG9wdGlvbnM6IElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIERlcHJlY2F0ZWQgLSBDcmVhdGUgYSBwYXJlbnQgc2luZ2xldG9uIHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc2luZ2xldG9uIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50U2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVJlc291cmNlQnVpbGRlciBpbXBsZW1lbnRzIElCYXNlUmVzb3VyY2VCdWlsZGVyIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRodHRwJywgJyRxJywgJyRyb290U2NvcGUnLCBhcnJheVNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSBhcnJheTogSUFycmF5VXRpbGl0eSkgeyB9XHJcblxyXG5cdGdldExpYnJhcnlTZXJ2aWNlcygpOiBJTGlicmFyeVNlcnZpY2VzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCRxOiB0aGlzLiRxLFxyXG5cdFx0XHQkcm9vdFNjb3BlOiB0aGlzLiRyb290U2NvcGUsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlVmlldyh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnREYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGU+KG9wdGlvbnM6IElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXNlTW9ja0lmTm9FbmRwb2ludDxURGF0YVR5cGU+KG9wdGlvbnM6IElCYXNlT3B0aW9uczxURGF0YVR5cGU+KTogSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdFx0b3B0aW9ucy51c2VNb2NrID0gb3B0aW9ucy5lbmRwb2ludCA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMudXNlTW9jaztcclxuXHRcdHJldHVybiBvcHRpb25zO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJhc2VSZXNvdXJjZUJ1aWxkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgSVRyYW5zZm9ybSB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlRGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYmFzZURhdGFTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEb21haW5PYmplY3Qge1xyXG4gICAgaWQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdGdldExpc3QocGFyYW1zPzogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgZ2V0RGV0YWlsKGlkOiBudW1iZXIpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBjcmVhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBkZWxldGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgcHJpdmF0ZSBiZWhhdmlvcjogSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbUVuZHBvaW50KGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0KHBhcmFtczogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRMaXN0KHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZVtdID0+IHsgcmV0dXJuIHRoaXMubW9ja0RhdGEgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXRhaWwoaWQ6IG51bWJlcik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0SXRlbSh7XHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChpZCksXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuY3JlYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBhZGRNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRJZDogbnVtYmVyID0gXy5tYXgodGhpcy5tb2NrRGF0YSwgJ2lkJykuaWQgKyAxO1xyXG4gICAgICAgICAgICAgICAgZG9tYWluT2JqZWN0LmlkID0gbmV4dElkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2NrRGF0YS5wdXNoKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci51cGRhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCksXHJcbiAgICAgICAgICAgIHVwZGF0ZU1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkT2JqZWN0OiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBvbGRPYmplY3QgPSA8VERhdGFUeXBlPl8uYXNzaWduKG9sZE9iamVjdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZGVsZXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLFxyXG4gICAgICAgICAgICByZW1vdmVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUodGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGVbXVxyXG4gICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxufVxyXG5cclxuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHkpOiBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zZm9ybTxURGF0YVR5cGU+IHtcclxuICAgIGZyb21TZXJ2ZXIocmF3RGF0YTogYW55KTogVERhdGFUeXBlO1xyXG4gICAgdG9TZXJ2ZXIoZGF0YTogVERhdGFUeXBlKTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBlbmRwb2ludDogc3RyaW5nO1xyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIHBhcmFtczogYW55O1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICBhZGRNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICB1cGRhdGVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICByZW1vdmVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IHtcclxuXHRnZXRMaXN0KG9wdGlvbnM6IElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICBnZXRJdGVtKG9wdGlvbnM6IElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgY3JlYXRlKG9wdGlvbnM6IElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGRlbGV0ZShvcHRpb25zOiBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPikgeyB9XHJcblxyXG4gICAgZ2V0TGlzdChvcHRpb25zOiBJR2V0TGlzdE9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQsIHsgcGFyYW1zOiBvcHRpb25zLnBhcmFtcyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZVtdPik6IFREYXRhVHlwZVtdID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlW10pOiBURGF0YVR5cGVbXSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5tYXAoZGF0YSwgdGhpcy50cmFuc2Zvcm0uZnJvbVNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdnZXRMaXN0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0ob3B0aW9uczogSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUob3B0aW9uczogSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMudHJhbnNmb3JtVG9TZXJ2ZXIob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hZGRNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnBvc3Qob3B0aW9ucy5lbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kb21haW5PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnY3JlYXRlJywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMudHJhbnNmb3JtVG9TZXJ2ZXIob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy51cGRhdGVNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdClcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAucHV0KG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMuZG9tYWluT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygndXBkYXRlJywgb3B0aW9ucy5kb21haW5PYmplY3QsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKG9wdGlvbnM6IElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmVtb3ZlTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZGVsZXRlPHZvaWQ+KG9wdGlvbnMuZW5kcG9pbnQpLnRoZW4oKCk6IHZvaWQgPT4geyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2RlbGV0ZScsIG9wdGlvbnMuZG9tYWluT2JqZWN0LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2cocmVxdWVzdE5hbWU6IHN0cmluZywgZGF0YTogYW55LCBlbmRwb2ludDogc3RyaW5nLCB1c2VNb2NrOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vY2tTdHJpbmcgPSB1c2VNb2NrID8gJ01vY2tlZCAnIDogJyc7XHJcbiAgICAgICAgbGV0IGVuZHBvaW50U3RyaW5nID0gZW5kcG9pbnQgPT0gbnVsbCA/ICd1bnNwZWNpZmllZCcgOiBlbmRwb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2NrU3RyaW5nICsgcmVxdWVzdE5hbWUgKyAnIGZvciBlbmRwb2ludCAnICsgZW5kcG9pbnRTdHJpbmcgKyAnOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNmb3JtRnJvbVNlcnZlcihyYXdEYXRhOiBhbnkpOiBURGF0YVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gdGhpcy50cmFuc2Zvcm0uZnJvbVNlcnZlcihyYXdEYXRhKVxyXG4gICAgICAgICAgICA6IHJhd0RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ub1NlcnZlcihkYXRhOiBURGF0YVR5cGUpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gdGhpcy50cmFuc2Zvcm0udG9TZXJ2ZXIoZGF0YSlcclxuICAgICAgICAgICAgOiBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVRyYW5zZm9ybSB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4vYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+e1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+XHJcblx0aW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIF9lbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG4gICAgICAgICAgICAsIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBhcnJheSwgX2VuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdGxldCBtb2NrRGF0YTogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0uaWQgPT09IHBhcmVudElkO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnRyYW5zZm9ybSwgdGhpcy51c2VNb2NrLCB0aGlzLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgX2VuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdFx0LCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7KCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlfVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0bGV0IG1vY2tEYXRhOiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gcGFyZW50SWQ7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRoaXMudHJhbnNmb3JtLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMsIHBhcmVudElkKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50c1xuICoqLyIsImltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5IH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz57XHJcblx0Y2hpbGRDb250cmFjdHMoaWQ/OiBudW1iZXIpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGFycmF5OiBJQXJyYXlVdGlsaXR5LCBlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdCwgcHVibGljIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcbiAgICAgICAgLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIHtcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKGlkKSkge1xyXG5cdFx0XHRsZXQgZGljdGlvbmFyeTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIoKTtcclxuXHRcdFx0Xy5lYWNoKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZGF0YVNlcnZpY2UuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgZGF0YVNlcnZpY2UuZW5kcG9pbnQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBkaWN0aW9uYXJ5OiB7W2luZGV4OiBzdHJpbmddOiBhbnl9ID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKCk7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB8IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiA9PiB7XHJcblx0XHRcdFx0bGV0IGNvbnRyYWN0OiBhbnk7XHJcblx0XHRcdFx0aWYgKF8uaXNGdW5jdGlvbihkYXRhU2VydmljZS5Bc1NpbmdsZXRvbikpIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24oaWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQgKyBjb250cmFjdC5lbmRwb2ludDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyYWN0O1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcbiAgICBnZXQoKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIHByaXZhdGUgYmVoYXZpb3I6IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBtb2NrRGF0YTogVERhdGFUeXBlXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLmdldEl0ZW0oe1xyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgZ2V0TW9ja0RhdGE6ICgpOiBURGF0YVR5cGUgPT4geyByZXR1cm4gdGhpcy5tb2NrRGF0YTsgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW9yLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdDogZG9tYWluT2JqZWN0LFxyXG4gICAgICAgICAgICBlbmRwb2ludDogdGhpcy5lbmRwb2ludCxcclxuICAgICAgICAgICAgdXBkYXRlTW9ja0RhdGE6IChkYXRhOiBURGF0YVR5cGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9ja0RhdGEgPSA8VERhdGFUeXBlPl8uYXNzaWduKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZSwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZSwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT57XHJcblx0Y2hpbGRDb250cmFjdHMoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IGltcGxlbWVudHMgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE6IFREYXRhVHlwZVxyXG5cdFx0LCBwcml2YXRlIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcblx0XHQsIGxvZ1JlcXVlc3RzPzogYm9vbGVhblxyXG5cdFx0LCBwcml2YXRlIHBhcmVudElkPzogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRsZXQgZGljdGlvbmFyeToge1tpbmRleDogc3RyaW5nXTogYW55fSA9IHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcigpO1xyXG5cdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIGFueT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gfCBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgYW55PiA9PiB7XHJcblx0XHRcdGxldCBjb250cmFjdDogYW55O1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKSkge1xyXG5cdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24odGhpcy5wYXJlbnRJZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgY29udHJhY3QuZW5kcG9pbnQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gY29udHJhY3Q7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0bW9ja0dldExpc3QoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDaGlsZChtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdG1vY2tHZXQoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MudHNcbiAqKi8iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VSZXNvdXJjZUJ1aWxkZXIsIEJhc2VSZXNvdXJjZUJ1aWxkZXIgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VNb2NrLCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jaywgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2sgfSBmcm9tICcuL2RhdGFTZXJ2aWNlTW9ja3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJhY3RMaWJyYXJ5IHtcclxuXHQvLyBleHRlbmQgd2l0aCBjdXN0b20gaW50ZXJmYWNlIHNwZWNpZnlpbmcgY2hpbGQgcmVzb3VyY2VzXHJcblxyXG5cdGZsdXNoKCk6IHZvaWQ7XHJcblxyXG5cdG1vY2tHZXQocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldExpc3QocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHJcblx0bW9ja0NoaWxkKHBhcmVudDogYW55LCBtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkO1xyXG5cdGNyZWF0ZU1vY2socmVzb3VyY2U/OiBhbnkpOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT47XHJcblx0Y3JlYXRlTW9ja1BhcmVudChyZXNvdXJjZT86IGFueSk6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+O1xyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMaWJyYXJ5U2VydmljZXMge1xyXG5cdCRxOiBuZy5JUVNlcnZpY2U7XHJcblx0JHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cmFjdExpYnJhcnkgaW1wbGVtZW50cyBJQ29udHJhY3RMaWJyYXJ5IHtcclxuXHRwcml2YXRlICRxOiBuZy5JUVNlcnZpY2U7XHJcblx0cHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBidWlsZGVyOiBJQmFzZVJlc291cmNlQnVpbGRlcikge1xyXG5cdFx0bGV0IHNlcnZpY2VzOiBJTGlicmFyeVNlcnZpY2VzID0gKDxCYXNlUmVzb3VyY2VCdWlsZGVyPmJ1aWxkZXIpLmdldExpYnJhcnlTZXJ2aWNlcygpO1xyXG5cdFx0dGhpcy4kcSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHR9XHJcblxyXG5cdGZsdXNoKCk6IHZvaWQge1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHR9XHJcblx0bW9ja0dldChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0dldExpc3QocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXRMaXN0JywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrR2V0RGV0YWlsKHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0RGV0YWlsJywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrQ2hpbGQocGFyZW50OiBhbnksIG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiB7KGlkOiBudW1iZXIpOiBhbnl9ID0gcGFyZW50LmNoaWxkQ29udHJhY3RzLmJpbmQocGFyZW50KTtcclxuXHRcdHBhcmVudC5jaGlsZENvbnRyYWN0cyA9IChpZDogbnVtYmVyKTogYW55ID0+IHtcclxuXHRcdFx0bGV0IGNoaWxkcmVuOiBhbnkgPSBnZXRDaGlsZHJlbihpZCk7XHJcblx0XHRcdG1vY2tDYWxsYmFjayhjaGlsZHJlbik7XHJcblx0XHRcdHJldHVybiBjaGlsZHJlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2socmVzb3VyY2U/OiBhbnkpOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT4ge1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT4gPSA8YW55PnRoaXMuYnVpbGRlci5jcmVhdGVSZXNvdXJjZTxhbnksIGFueT4oe30pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHR0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT4ge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiBhbnkgPSByZXNvdXJjZSAhPSBudWxsID8gcmVzb3VyY2UucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA6ICgpOiBhbnkgPT4geyByZXR1cm4ge307IH07XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2U8YW55LCBhbnksIGFueT4oe1xyXG5cdFx0XHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiBnZXRDaGlsZHJlbixcclxuXHRcdH0pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrQ2hpbGQgPSAobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCA9PiB7IHJldHVybiB0aGlzLm1vY2tDaGlsZChkYXRhU2VydmljZSwgbW9ja0NhbGxiYWNrKTsgfTtcclxuXHRcdHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlKHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXQgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0dGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZTogYW55LCByZXNvdXJjZT86IGFueSk6IHZvaWQge1xyXG5cdFx0aWYgKHJlc291cmNlICE9IG51bGwpIHtcclxuXHRcdFx0Xy5leHRlbmQocmVzb3VyY2UsIGRhdGFTZXJ2aWNlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tHZXQocmVzb3VyY2U6IGFueSwgYWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRsZXQgZnVuYzogU2lub24uU2lub25TcHkgPSB0aGlzLnNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHEud2hlbihkYXRhKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVzb3VyY2VbYWN0aW9uTmFtZV0gPSBmdW5jO1xyXG5cdFx0cmV0dXJuIGZ1bmM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBzaW5vbigpOiBTaW5vbi5TaW5vblN0YXRpYyB7XHJcblx0XHRyZXR1cm4gc2lub24gfHwgPGFueT57IHNweTogKGZ1bmM6IGFueSk6IGFueSA9PiB7IHJldHVybiBmdW5jOyB9IH07XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lIH0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0ZVV0aWxpdHksIHNlcnZpY2VOYW1lIH0gZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudE1vZHVsZU5hbWUsIHRpbWVNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIm1vbWVudFwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9tZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVVdGlsaXR5IHtcclxuXHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIHRpbWVTZXJ2aWNlTmFtZSxcclxuXHRJVGltZVV0aWxpdHksXHJcbn0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG1vbWVudE1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgbW9tZW50U2VydmljZU5hbWUsXHJcbn0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgZGVmYXVsdEZvcm1hdHMgfSBmcm9tICcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5pbXBvcnQgeyBDb21wYXJlUmVzdWx0LCBnZXRDb21wYXJlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdCc7XHJcblxyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVWYWx1ZSB7XHJcblx0eWVhcnM6IG51bWJlcjtcclxuXHRtb250aHM6IG51bWJlcjtcclxuXHRkYXlzOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWU7XHJcblx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0c3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogQ29tcGFyZVJlc3VsdDtcclxuXHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW47XHJcblx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZTtcclxuXHRnZXREYXRlRnJvbUlTT1N0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlO1xyXG5cdGlzRGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRnZXROb3coKTogRGF0ZTtcclxuXHRmb3JtYXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0c2FtZURhdGUoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRzYW1lRGF0ZVRpbWUoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbW9tZW50U2VydmljZU5hbWUsIHRpbWVTZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogSVRpbWVVdGlsaXR5KSB7XHJcblx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRtb250aDogSU1vbnRoW107XHJcblx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0fVxyXG5cclxuXHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHR2YXIgcmVzdWx0OiBJRGF0ZVZhbHVlID0gPGFueT57fTtcclxuXHRcdHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRyZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRyZXN1bHQueWVhcnMgLT0gMTtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyArPSAxMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0dmFyIG1pbGxpc2Vjb25kczogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydCwgZW5kLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRyZXR1cm4gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IENvbXBhcmVSZXN1bHQge1xyXG5cdFx0Ly8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuXHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcblx0XHRyZXR1cm4gZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuXHR9XHJcblxyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IENvbXBhcmVSZXN1bHQubGVzcykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuXHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkudG9EYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlRnJvbUlTT1N0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbWVudChkYXRlKS50b0RhdGUoKTtcclxuXHR9XHJcblxyXG5cdGlzRGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc0RhdGUoZGF0ZSlcclxuXHRcdFx0fHwgdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCB0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSkuaXNWYWxpZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0Tm93KCk6IERhdGUge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHRoaXMuZ2V0RGF0ZShkYXRlLCBkYXRlRm9ybWF0KSkuZm9ybWF0KHRoaXMuZ2V0Rm9ybWF0KGRhdGVGb3JtYXQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Rm9ybWF0KGN1c3RvbUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBjdXN0b21Gb3JtYXQgIT0gbnVsbCA/IGN1c3RvbUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHR9XHJcblxyXG5cdHNhbWVEYXRlKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNEYXRlKGRhdGUxKSAmJiB0aGlzLmlzRGF0ZShkYXRlMikpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudChkYXRlMSkuZm9ybWF0KFwiTU0vZGQveXl5eVwiKSA9PT0gbW9tZW50KGRhdGUyKS5mb3JtYXQoXCJNTS9kZC95eXl5XCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2FtZURhdGVUaW1lKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNEYXRlKGRhdGUxKSAmJiB0aGlzLmlzRGF0ZShkYXRlMikpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudChkYXRlMSkuZm9ybWF0KFwiTU0vZGQveXl5eSArLUhIbW1cIikgPT09IG1vbWVudChkYXRlMikuZm9ybWF0KFwiTU0vZGQveXl5eSArLUhIbW1cIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0Z3JlYXRlciA9IDEsXHJcblx0ZXF1YWwgPSAwLFxyXG5cdGxlc3MgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRkYXRlVGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0ZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuXHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgc2VydmljZU5hbWUgYXMgbm90aWZpY2F0aW9uU2VydmljZU5hbWUsXHJcbiAgICBtb2R1bGVOYW1lIGFzIG5vdGlmaWNhdGlvbk1vZHVsZU5hbWUsXHJcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEuc2VydmljZXMuZXJyb3JIYW5kbGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Vycm9ySGFuZGxlcic7XHJcblxyXG5leHBvcnQgZW51bSBIdHRwU3RhdHVzQ29kZSB7XHJcblx0dW5hdXRob3JpemVkID0gNDAxLFxyXG5cdGZvcmJpZGRlbiA9IDQwMyxcclxuXHRpbnZhbGlkVXJsID0gNDA0LFxyXG5cdHRpbWVvdXQgPSA0MDgsXHJcblx0aW50ZXJuYWxTZXJ2ZXJFcnJvciA9IDUwMCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVqZWN0aW9uIHtcclxuXHRzdGF0dXM6IEh0dHBTdGF0dXNDb2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvckhhbmRsZXJTZXJ2aWNlIHtcclxuXHRodHRwUmVzcG9uc2VFcnJvcihyZWplY3Rpb246IElSZWplY3Rpb24pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvck1lc3NhZ2VzIHtcclxuICAgIGZvcmJpZGRlbkVycm9yOiBzdHJpbmc7XHJcbiAgICBpbnZhbGlkVXJsRXJyb3I6IHN0cmluZztcclxuICAgIHRpbWVvdXRFcnJvcjogc3RyaW5nO1xyXG4gICAgaW50ZXJuYWxTZXJ2ZXJFcnJvcjogc3RyaW5nO1xyXG4gICAgZGVmYXVsdEVycm9yOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckhhbmRsZXJTZXJ2aWNlIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlIGxvZ2luVXJsOiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcml2YXRlIGVycm9yTWVzc2FnZXM6IElFcnJvck1lc3NhZ2VzKSB7IH1cclxuXHJcblx0aHR0cFJlc3BvbnNlRXJyb3IocmVqZWN0aW9uOiBJUmVqZWN0aW9uKTogdm9pZCB7XHJcblx0XHRzd2l0Y2ggKHJlamVjdGlvbi5zdGF0dXMpIHtcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS51bmF1dGhvcml6ZWQ6XHJcblx0XHRcdFx0dGhpcy5sb2dnZWRPdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmZvcmJpZGRlbjpcclxuXHRcdFx0XHR0aGlzLmluc3VmZmljaWVudFBlcm1pc3Npb25zRXJyb3IoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBIdHRwU3RhdHVzQ29kZS5pbnZhbGlkVXJsOlxyXG5cdFx0XHRcdHRoaXMuaW52YWxpZFVybEVycm9yKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgSHR0cFN0YXR1c0NvZGUudGltZW91dDpcclxuXHRcdFx0XHR0aGlzLnRpbWVvdXRFcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEh0dHBTdGF0dXNDb2RlLmludGVybmFsU2VydmVyRXJyb3I6XHJcblx0XHRcdFx0dGhpcy5zeXN0ZW1FcnJvcigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmRlZmF1bHRFcnJvcik7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignU3RhdHVzOiAnICsgcmVqZWN0aW9uLnN0YXR1cyk7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUmVzcG9uc2U6ICcgKyByZWplY3Rpb24pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBsb2dnZWRPdXRFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbiA9IDxhbnk+dGhpcy5sb2dpblVybDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaW5zdWZmaWNpZW50UGVybWlzc2lvbnNFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5mb3JiaWRkZW5FcnJvcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGludmFsaWRVcmxFcnJvcigpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKHRoaXMuZXJyb3JNZXNzYWdlcy5pbnZhbGlkVXJsRXJyb3IpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0aW1lb3V0RXJyb3IoKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcih0aGlzLmVycm9yTWVzc2FnZXMudGltZW91dEVycm9yKTtcclxuXHRcdC8vIHJldHJ5XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN5c3RlbUVycm9yKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IodGhpcy5lcnJvck1lc3NhZ2VzLmludGVybmFsU2VydmVyRXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgYW5ndWxhci5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBlcnJvck1lc3NhZ2VzOiBJRXJyb3JNZXNzYWdlcztcclxuICAgICRnZXQoJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2VcclxuICAgICAgICAsIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJRXJyb3JIYW5kbGVyU2VydmljZTtcclxufVxyXG5cclxuY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyIGltcGxlbWVudHMgSUVycm9ySGFuZGxlclNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlczogSUVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVybCA9ICcvbG9naW4nO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgICAgICAgICAgZm9yYmlkZGVuRXJyb3I6ICdZb3UgaGF2ZSBpbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMgdG8gcGVyZm9ybSB0aGlzIGFjdGlvbicsXHJcbiAgICAgICAgICAgIGludmFsaWRVcmxFcnJvcjogJ1Jlc291cmNlIG5vdCBmb3VuZC4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQnLFxyXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3I6ICdSZXF1ZXN0IHRpbWVkIG91dC4gQ2hlY2sgeW91ciBuZXR3b3JrIGNvbm5lY3Rpb24gb3IgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IgZm9yIGlzc3VlcycsXHJcbiAgICAgICAgICAgIGludGVybmFsU2VydmVyRXJyb3I6ICdUaGUgc3lzdGVtIGhhcyBlbmNvdW50ZXJlZCBhbiBlcnJvci4gVGhpcyBpc3N1ZSBoYXMgYmVlbiBsb2dnZWQuJyArXHJcbiAgICAgICAgICAgICcgUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBpZiB5b3UgYXJlIHVuYWJsZSB0byBjb21wbGV0ZSBjcml0aWNhbCB0YXNrcycsXHJcbiAgICAgICAgICAgIGRlZmF1bHRFcnJvcjogJ0h0dHAgc3RhdHVzIGNvZGUgbm90IGhhbmRsZWQnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy4kZ2V0LiRpbmplY3QgPSBbJyR3aW5kb3cnLCBub3RpZmljYXRpb25TZXJ2aWNlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgJGdldDogYW55ID0gKCR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSk6IElFcnJvckhhbmRsZXJTZXJ2aWNlID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9ySGFuZGxlclNlcnZpY2UoJHdpbmRvdywgbm90aWZpY2F0aW9uLCB0aGlzLmxvZ2luVXJsLCB0aGlzLmVycm9yTWVzc2FnZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbm90aWZpY2F0aW9uTW9kdWxlTmFtZV0pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBuZXcgRXJyb3JIYW5kbGVyU2VydmljZVByb3ZpZGVyKCkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9lcnJvckhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VOb3RpZmllciB9IGZyb20gJy4vYmFzZU5vdGlmaWVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdub3RpZmljYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5pbmZvKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIud2FybmluZyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5lcnJvcihtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLnN1Y2Nlc3MobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBhbmd1bGFyLklTZXJ2aWNlUHJvdmlkZXIge1xyXG5cdHNldE5vdGlmaWVyKG5vdGlmaWVyOiBJTm90aWZpZXIpOiB2b2lkO1xyXG5cdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgZXh0ZW5kcyBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHRub3RpZmllcjogSU5vdGlmaWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0bGV0IHByb3ZpZGVyOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgPSB7XHJcblx0XHRub3RpZmllcjogbmV3IEJhc2VOb3RpZmllcigpLFxyXG5cdFx0c2V0Tm90aWZpZXI6IChub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdH0sXHJcblx0XHQkZ2V0OiAoKTogSU5vdGlmaWNhdGlvblNlcnZpY2UgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdHJldHVybiBwcm92aWRlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTm90aWZpZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTm90aWZpZXIgaW1wbGVtZW50cyBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHdpbmRvdy5hbGVydChtZXNzYWdlKTtcclxuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBudW1iZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyIH0gZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ZpbGVTaXplRmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyTW9kdWxlTmFtZV0pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHQuZmlsdGVyKHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5lbnVtIFNpZ24ge1xyXG5cdHBvc2l0aXZlID0gMSxcclxuXHRuZWdhdGl2ZSA9IC0xLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0fVxyXG5cclxuXHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG5cdH1cclxuXHJcblx0cm91bmRUb1N0ZXAobnVtOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIXN0ZXApIHtcclxuXHRcdFx0cmV0dXJuIG51bTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcmVtYWluZGVyOiBudW1iZXIgPSBudW0gJSBzdGVwO1xyXG5cclxuXHRcdGlmIChyZW1haW5kZXIgPj0gc3RlcCAvIDIpIHtcclxuXHRcdFx0cmV0dXJuIG51bSArIChzdGVwIC0gcmVtYWluZGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudW0gLSByZW1haW5kZXI7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElOdW1iZXJVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBudW1iZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRkaXNwbGF5KCk6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRCWVRFU19QRVJfR0I6IG51bWJlciA9IDEwNzM3NDE4MjQ7XHJcblx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0Ynl0ZXM6IG51bWJlcjtcclxuXHJcblx0R0I6IG51bWJlcjtcclxuXHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRNQjogbnVtYmVyO1xyXG5cdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdEtCOiBudW1iZXI7XHJcblx0aXNLQjogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogSU51bWJlclV0aWxpdHksIGJ5dGVzOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0dGhpcy5pc0dCID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxufVxyXG5cclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyU2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5KTogSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBmYWN0b3J5TmFtZSwgSUZpbGVTaXplRmFjdG9yeSwgSUZpbGVTaXplIH0gZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbmV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG59XHJcblxyXG5maWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0cmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuXHR9O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgb2JqZWN0U2VydmljZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBzdHJpbmdNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIHN0cmluZ1NlcnZpY2VOYW1lLFxyXG5cdElTdHJpbmdVdGlsaXR5U2VydmljZSxcclxufSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUZpbHRlciB9IGZyb20gJy4uLy4uL2ZpbHRlcnMvZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHR0eXBlOiBzdHJpbmc7XHJcblx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdG1pblNlYXJjaExlbmd0aDogbnVtYmVyO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0bWluU2VhcmNoTGVuZ3RoOiBudW1iZXIgPSAxO1xyXG5cdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBvYmplY3Q6IElPYmplY3RVdGlsaXR5LCBwcml2YXRlIHN0cmluZzogSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSB8fCB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDwgdGhpcy5taW5TZWFyY2hMZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdHJldHVybiBfLmFueSh2YWx1ZXMsICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7IHJldHVybiB0aGlzLnNlYXJjaE9iamVjdCh2YWx1ZSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKTsgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRpZiAoIWNhc2VTZW5zaXRpdmUpIHtcclxuXHRcdFx0XHRzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdHJpbmcuY29udGFpbnMoZGF0YVN0cmluZywgc2VhcmNoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxufVxyXG5cclxuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3RTZXJ2aWNlTmFtZSwgc3RyaW5nU2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeShvYmplY3Q6IElPYmplY3RVdGlsaXR5LFxyXG5cdHN0cmluZ1V0aWxpdHk6IElTdHJpbmdVdGlsaXR5U2VydmljZSk6IElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nVXRpbGl0eSk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWUsIHN0cmluZ01vZHVsZU5hbWVdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdzdHJpbmdVdGlsaXR5U2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZztcclxuXHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsaXR5U2VydmljZSBpbXBsZW1lbnRzIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuICtzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoc3Vic3RyaW5nKSB7XHJcblx0XHRcdHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHJpbmcpICE9PSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0Xy5lYWNoKHBhcmFtcywgKHBhcmFtOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuXHRcdFx0Zm9ybWF0U3RyaW5nID0gdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG5cdH1cclxuXHJcblx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ3VpZCc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdndWlkU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHdWlkU2VydmljZSB7XHJcblx0dGltZSgpOiBzdHJpbmc7XHJcblx0cmFuZG9tKCk6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgR3VpZFNlcnZpY2UgaW1wbGVtZW50cyBJR3VpZFNlcnZpY2Uge1xyXG5cdHRpbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB1dWlkLnYxKCk7XHJcblx0fVxyXG5cclxuXHRyYW5kb20oKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB1dWlkLnY0KCk7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgR3VpZFNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS50c1xuICoqLyIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4vLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbnZhciBfcm5nID0gcmVxdWlyZSgnLi9ybmcnKTtcblxuLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbnZhciBfYnl0ZVRvSGV4ID0gW107XG52YXIgX2hleFRvQnl0ZSA9IHt9O1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG59XG5cbi8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbmZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbnZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4vLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbnZhciBfbm9kZUlkID0gW1xuICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuXTtcblxuLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbnZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbn1cblxuLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xufVxuXG4vLyBFeHBvcnQgcHVibGljIEFQSVxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcbnV1aWQucGFyc2UgPSBwYXJzZTtcbnV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3V1aWQvdXVpZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbnZhciBybmc7XG5cbmlmIChnbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgcmV0dXJuIF9ybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBfcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3V1aWQvcm5nLWJyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXI8VFJldHVyblR5cGU+IHtcclxuXHRhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+O1xyXG5cdGV2ZW50Pzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb248VFJldHVyblR5cGU+IHtcclxuXHQoLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRyZWdpc3RlcihhY3Rpb246IElBY3Rpb248dm9pZD4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW107XHJcblx0ZmlyZShldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlU2VydmljZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXI8YW55PltdID0gW107XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcigod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcblx0XHR9KVxyXG5cdFx0Lm1hcCgod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHRcdH0pLnZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuXHJcbm5nLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3RGF0YTxUQmVoYXZpb3I+IHtcclxuXHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDaGlsZDxUQmVoYXZpb3I+IHtcclxuXHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPGFueT5cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlO1xyXG5cdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW107XHJcblx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXTtcclxuXHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0cmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuXHRcdFx0PyBjaGlsZC52aWV3RGF0YS5iZWhhdmlvclxyXG5cdFx0XHQ6IG51bGw7XHJcblx0fVxyXG5cclxuXHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj5cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdHZhciBiZWhhdmlvcjogVEJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuXHJcblx0XHRpZiAoYmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHR2YXIgYmVoYXZpb3JzOiBUQmVoYXZpb3JbXSA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuXHJcblx0XHRyZXR1cm4gXy5tYXAoYmVoYXZpb3JzLCAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0cmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoKGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciA9PiB7IHJldHVybiB0aGlzLmdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZCk7IH0pXHJcblx0XHRcdFx0XHRcdFx0LmZpbHRlcigoYmVoYXZpb3I6IFRCZWhhdmlvcik6IGJvb2xlYW4gPT4geyByZXR1cm4gYmVoYXZpb3IgIT0gbnVsbDsgfSlcclxuXHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQge1xyXG5cdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhID0geyBiZWhhdmlvcjogbnVsbCB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSA8VEJlaGF2aW9yPl8uZXh0ZW5kKGN1cnJlbnRCZWhhdmlvciwgYmVoYXZpb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwcm9taXNlVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9taXNlVXRpbGl0eSB7XHJcblx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0aXNQcm9taXNlKHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0cmVzb2x2ZVByb21pc2VzKHJlc29sdmVzOiBhbnkpOiBhbmd1bGFyLklQcm9taXNlPGFueT47XHJcbn1cclxuXHJcbmNsYXNzIFByb21pc2VVdGlsaXR5IGltcGxlbWVudHMgSVByb21pc2VVdGlsaXR5IHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRxJywgJyRpbmplY3RvciddO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UpIHt9XHJcblxyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHR9XHJcblxyXG5cdHJlc29sdmVQcm9taXNlcyhyZXNvbHZlczogYW55KTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCBwcm9taXNlczogYW55ID0ge307XHJcblx0XHRfLmVhY2gocmVzb2x2ZXMsICh2YWx1ZTogYW55LCBrZXk6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfLmlzQXJyYXkodmFsdWUpKSB7XHJcblx0XHRcdFx0cHJvbWlzZXNba2V5XSA9ICh0aGlzLiRxLndoZW4odGhpcy4kaW5qZWN0b3IuaW52b2tlKHZhbHVlKSkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XHJcblx0XHRcdFx0cHJvbWlzZXNba2V5XSA9ICh0aGlzLiRxLndoZW4odGhpcy4kaW5qZWN0b3IuZ2V0KHZhbHVlKSkpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHZhbHVlKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLiRxLmFsbChwcm9taXNlcyk7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUHJvbWlzZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3luY2hyb25pemVkUmVxdWVzdHMnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnc3luY2hyb25pemVkUmVxdWVzdHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyO1xyXG5cdGhhbmRsZVJlcXVlc3Q6IElSZXF1ZXN0Q2FsbGJhY2s7XHJcblxyXG5cdGdldERhdGEoLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2Uge1xyXG5cdHByaXZhdGUgcmVxdWVzdElkOiBudW1iZXIgPSAwO1xyXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyXHJcblx0XHRcdCwgcHVibGljIGhhbmRsZVJlcXVlc3Q6IElSZXF1ZXN0Q2FsbGJhY2tcclxuXHRcdFx0LCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSkgeyB9XHJcblxyXG5cdGdldERhdGEoLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cdFx0Ly8gaW5jcmVtZW50IHRoZSBpZCBmaXJzdCAtIHNob3VsZCBtYXRjaCBjdXJyZW50IHJlcXVlc3QgaWRcclxuXHRcdHRoaXMucmVxdWVzdElkKys7XHJcblx0XHRsZXQgY3VycmVudFJlcXVlc3RJZDogbnVtYmVyID0gdGhpcy5yZXF1ZXN0SWQ7XHJcblx0XHR0aGlzLiRxLndoZW4odGhpcy5kYXRhUHJvdmlkZXIoLi4ucGFyYW1zKSkudGhlbigoLi4uZGF0YTogYW55W10pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKGN1cnJlbnRSZXF1ZXN0SWQgPT0gdGhpcy5yZXF1ZXN0SWQpIHtcclxuXHRcdFx0XHR0aGlzLmhhbmRsZVJlcXVlc3QoLi4uZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdEdldHRlciB7XHJcblx0KC4uLnBhcmFtczogYW55W10pOiBhbmd1bGFyLklQcm9taXNlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RDYWxsYmFjayB7XHJcblx0KC4uLmRhdGE6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZShkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyLCBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrKTogSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZTtcclxufVxyXG5cclxuc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5LiRpbmplY3QgPSBbJyRxJ107XHJcbmV4cG9ydCBmdW5jdGlvbiBzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkoJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKTogSVN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEluc3RhbmNlKGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXIsIGhhbmRsZVJlcXVlc3Q6IElSZXF1ZXN0Q2FsbGJhY2spOiBJU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0LCAkcSk7XHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIG1vY2sgZnJvbSAnLi9tb2NrJztcclxuZXhwb3J0IHsgbW9jayB9O1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9hbmd1bGFyRml4dHVyZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0bW9jay5tb2R1bGVOYW1lLFxyXG5dKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L3Rlc3QubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gdXNlcyBzaW5vbiBidXQgY2FuJ3QgaW1wb3J0IGJlY2F1c2Ugc2lub24gdXNlcyBkeW5hbWljIHJlcXVpcmVzXHJcbi8vIHNpbm9uIHR5cGVzIHdpbGwgYmUgcmVzb2x2ZWQgZnJvbSB0c2QuZC50c1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QubW9jayc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdtb2NrVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb2NrIHtcclxuXHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2NrUmVxdWVzdDxURGF0YVR5cGU+IHtcclxuXHRwcm9taXNlOiBhbmd1bGFyLklEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdGRhdGE6IFREYXRhVHlwZTtcclxuXHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBNb2NrIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRxJywgJyRyb290U2NvcGUnXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cclxuXHJcblx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKHNlcnZpY2UpKSB7XHJcblx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdHZhciBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPiA9IHRoaXMuJHEuZGVmZXIoKTtcclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0dmFyIGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxURGF0YVR5cGU+ID0gdGhpcy4kcS5kZWZlcjxURGF0YVR5cGU+KCk7XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBzY29wZT86IGFuZ3VsYXIuSVNjb3BlKTogdm9pZCB7XHJcblx0XHQvLyBTYXZlIGxvY2FsIHJlZmVyZW5jZSB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB0aGVuIGNsZWFyXHJcblx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHQvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG5cdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdFxyXG5cdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG5cdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0c2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLiRyb290U2NvcGUuJGFwcGx5KCk7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTW9jayk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAnYW5ndWxhci1tb2Nrcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxuXHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZTtcclxuXHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyRml4dHVyZSB7XHJcblx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdG1vY2s6IChtb2NrczogYW55KSA9PiB2b2lkO1xyXG5cdGNvbnRyb2xsZXJXaXRoQmluZGluZ3M8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBiaW5kaW5ncz86IGFueSwgbG9jYWxzPzogYW55LCBzY29wZT86IGFueSlcclxuXHRcdDogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxuXHRkaXJlY3RpdmU8VENvbnRyb2xsZXJUeXBlPihkaXJlY3RpdmVOYW1lOiBzdHJpbmcsIGRvbTogc3RyaW5nLCBzY29wZTogYW5ndWxhci5JU2NvcGUpOiBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcbn1cclxuXHJcbmNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRpbmplY3QoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSk6IE9iamVjdCB7XHJcblx0XHQvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuXHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0Ly8gY2xvbmUgdGhlIGFycmF5IGFuZCBhZGQgYSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIG92ZXIgdGhlIG9yaWdpbmFsIGFycmF5XHJcblx0XHQvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcblx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRpbmplY3RQYXJhbWV0ZXJzLnB1c2goKC4uLmluamVjdGVkU2VydmljZXM6IGFueVtdKSA9PiB7XHJcblx0XHRcdC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuXHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdF8uZWFjaChzZXJ2aWNlTmFtZXMsIChzZXJ2aWNlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcblxyXG5cdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdH1cclxuXHJcblx0bW9jayhtb2NrczogYW55KTogdm9pZCB7XHJcblx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRfLmVhY2gobW9ja3MsICh2YWx1ZTogYW55LCBrZXk6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdCRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHQ6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29udHJvbGxlcicpO1xyXG5cdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0dmFyICRjb250cm9sbGVyOiBhbmd1bGFyLklDb250cm9sbGVyU2VydmljZSA9IHNlcnZpY2VzLiRjb250cm9sbGVyO1xyXG5cclxuXHRcdHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0bG9jYWxzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzLCBiaW5kaW5ncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZGlyZWN0aXZlPFRDb250cm9sbGVyVHlwZT4oZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBkb206IHN0cmluZywgc2NvcGU6IGFueSk6IElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb21waWxlJyk7XHJcblx0XHRzY29wZSA9IF8uZXh0ZW5kKHNlcnZpY2VzLiRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0dmFyICRjb21waWxlOiBhbmd1bGFyLklDb21waWxlU2VydmljZSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdHZhciBjb21wb25lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSA9ICRjb21waWxlKGRvbSkoc2NvcGUpO1xyXG5cdFx0c2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG5cdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHRjb250cm9sbGVyOiBjb21wb25lbnQuY29udHJvbGxlcihkaXJlY3RpdmVOYW1lKSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGFuZ3VsYXJGaXh0dXJlOiBJQW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBub3RpZmljYXRpb25Nb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG5vdGlmaWNhdGlvblNlcnZpY2VOYW1lLFxyXG5cdElOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJVmFsaWRhdG9yLCBWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIgfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcbmltcG9ydCB7IElDb21wb3NpdGVWYWxpZGF0b3IsIENvbXBvc2l0ZVZhbGlkYXRvciB9IGZyb20gJy4vY29tcG9zaXRlVmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCB7IElVbnJlZ2lzdGVyRnVuY3Rpb24sIElWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIgfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcbmV4cG9ydCB7IElDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvc2l0ZVZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uSGFuZGxlciB7XHJcblx0aXNBY3RpdmU/OiB7KCk6IGJvb2xlYW59IHwgYm9vbGVhbjtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGVycm9yTWVzc2FnZTogc3RyaW5nIHwgeygpOiBzdHJpbmd9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgZXJyb3Igbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyB3YXJuaW5nIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBhIGN1c3RvbSBoYW5kbGVyIHRvIHNob3cgZXJyb3JzXHJcblx0KlxyXG5cdCogQHBhcmFtIHNob3dFcnJvciBBIGN1c3RvbSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uIGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbm90aWZpY2F0aW9uU2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uU2VydmljZSkgeyB9XHJcblxyXG5cdGJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZEN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbk1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBWYWxpZGF0aW9uU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRpb25TZXJ2aWNlLCBJVmFsaWRhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0b3Ige1xyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXI7XHJcblx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvckhhbmRsZXIge1xyXG5cdChlcnJvcjogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciBpbXBsZW1lbnRzIElWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogc3RyaW5nXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRsZXQgZXJyb3I6IHN0cmluZyA9IHRoaXMuZXJyb3JNZXNzYWdlKGhhbmRsZXIpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogbnVtYmVyID0+IHtcclxuXHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvdW50O1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc0FjdGl2ZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZXJyb3JNZXNzYWdlKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHQ/ICg8eyAoKTogc3RyaW5nIH0+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0OiA8c3RyaW5nPmhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRpb25TZXJ2aWNlLCBJVmFsaWRhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IElWYWxpZGF0b3IsIFZhbGlkYXRvciwgSUVycm9ySGFuZGxlciwgSVVucmVnaXN0ZXJGdW5jdGlvbiB9IGZyb20gJy4vdmFsaWRhdG9yJztcclxuXHJcbmludGVyZmFjZSBJUmVnaXN0ZXJlZFZhbGlkYXRvciBleHRlbmRzIElWYWxpZGF0b3Ige1xyXG5cdGtleTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXI7XHJcblx0YnVpbGRDaGlsZFZhbGlkYXRvcigpOiBJVmFsaWRhdG9yO1xyXG5cdHVucmVnaXN0ZXJDaGlsZCh2YWxpZGF0b3I6IElWYWxpZGF0b3IpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlVmFsaWRhdG9yIGltcGxlbWVudHMgSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0cHJpdmF0ZSBjaGlsZFZhbGlkYXRvcnM6IHsgW2luZGV4OiBzdHJpbmddOiBJVmFsaWRhdG9yIH0gPSB7fTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfLmVhY2godGhpcy5jaGlsZFZhbGlkYXRvcnMsIChoYW5kbGVyOiBJVmFsaWRhdG9yKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmICghaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0fVxyXG5cclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UoPGFueT50aGlzLmNoaWxkVmFsaWRhdG9ycywgKGNvdW50OiBudW1iZXIsIGhhbmRsZXI6IElWYWxpZGF0b3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRyZXR1cm4gY291bnQgKz0gaGFuZGxlci5nZXRFcnJvckNvdW50KCk7XHJcblx0XHR9LCAwKTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ2hpbGRWYWxpZGF0b3IoKTogSVZhbGlkYXRvciB7XHJcblx0XHRsZXQgdmFsaWRhdG9yOiBJVmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLnNob3dFcnJvcihlcnJvcik7XHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHR0aGlzLmNoaWxkVmFsaWRhdG9yc1tjdXJyZW50S2V5XSA9IHZhbGlkYXRvcjtcclxuXHRcdCg8SVJlZ2lzdGVyZWRWYWxpZGF0b3I+dmFsaWRhdG9yKS5rZXkgPSBjdXJyZW50S2V5O1xyXG5cclxuXHRcdHJldHVybiB2YWxpZGF0b3I7XHJcblx0fVxyXG5cclxuXHR1bnJlZ2lzdGVyQ2hpbGQodmFsaWRhdG9yOiBJVmFsaWRhdG9yKTogdm9pZCB7XHJcblx0XHRkZWxldGUgdGhpcy5jaGlsZFZhbGlkYXRvcnNbKDxJUmVnaXN0ZXJlZFZhbGlkYXRvcj52YWxpZGF0b3IpLmtleV07XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi9jb21wb3NpdGVWYWxpZGF0b3IudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBhcmVSZXN1bHQnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=