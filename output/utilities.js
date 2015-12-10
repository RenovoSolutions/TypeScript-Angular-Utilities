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
	var types = __webpack_require__(52);
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
	var fileSize = __webpack_require__(30);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(34);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(36);
	exports.guid = guid;
	var moment = __webpack_require__(24);
	exports.moment = moment;
	var notification = __webpack_require__(39);
	exports.notification = notification;
	var numberService = __webpack_require__(31);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(42);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(43);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(44);
	exports.promise = promise;
	var stringService = __webpack_require__(35);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(45);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(46);
	exports.test = test;
	var time = __webpack_require__(26);
	exports.time = time;
	var validation = __webpack_require__(49);
	exports.validation = validation;
	exports.moduleName = 'rl.utilities.services';
	angular.module(exports.moduleName, [
	    array.moduleName,
	    boolean.moduleName,
	    dataContracts.moduleName,
	    date.moduleName,
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
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, this.endpoint, mockData, this.resourceDictionaryBuilder, this.transform, this.useMock, this.logRequests);
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
	            var dictionary = this.resourceDictionaryBuilder(this.endpoint);
	            _.each(dictionary, function (dataService) {
	                dataService.endpoint = _this.endpoint + dataService.endpoint;
	            });
	            return dictionary;
	        }
	        else {
	            var dictionary = this.resourceDictionaryBuilder(this.endpoint + '/' + id);
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
	    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, endpoint, mockData, transform, useMock, logRequests);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	    }
	    BaseParentSingletonDataService.prototype.childContracts = function () {
	        return this.resourceDictionaryBuilder(this.endpoint);
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
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(31);
	var fileSize_service_1 = __webpack_require__(32);
	var fileSizeFilter_1 = __webpack_require__(33);
	__export(__webpack_require__(32));
	__export(__webpack_require__(33));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);


/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(31);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(32);
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(35);
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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var uuid = __webpack_require__(37);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(38);
	
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
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(40);
	__export(__webpack_require__(41));
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
/* 40 */
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
/* 41 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(47);
	exports.mock = mock;
	__export(__webpack_require__(48));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);


/***/ },
/* 47 */
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var notification_service_1 = __webpack_require__(39);
	var validator_1 = __webpack_require__(50);
	var compositeValidator_1 = __webpack_require__(51);
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var validator_1 = __webpack_require__(50);
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(28));


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTQ3Zjg5M2QxODVjODY4YzRjMjUiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2d1aWQvZ3VpZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL34vdXVpZC91dWlkLmpzIiwid2VicGFjazovLy8uL34vdXVpZC9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvdHlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbInN0b3BFdmVudFByb3BhZ2F0aW9uIiwic3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayIsImlzRW1wdHkiLCJPYmplY3RVdGlsaXR5IiwiT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsIk9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSIsIk9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlIiwiT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsIk9iamVjdFV0aWxpdHkudG9TdHJpbmciLCJPYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0IiwiQXJyYXlVdGlsaXR5IiwiQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwiQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwiQXJyYXlVdGlsaXR5LnJlbW92ZSIsIkFycmF5VXRpbGl0eS5yZXBsYWNlIiwiQXJyYXlVdGlsaXR5LnN1bSIsIkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJBcnJheVV0aWxpdHkubGFzdCIsInRydW5jYXRlIiwiQm9vbGVhblV0aWxpdHkiLCJCb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNvbnN0cnVjdG9yIiwiQmFzZVJlc291cmNlQnVpbGRlci5nZXRMaWJyYXJ5U2VydmljZXMiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVSZXNvdXJjZVZpZXciLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXciLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZSIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIudXNlTW9ja0lmTm9FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZSIsIkJhc2VEYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZS5nZXRJdGVtRW5kcG9pbnQiLCJCYXNlRGF0YVNlcnZpY2UuZ2V0TGlzdCIsIkJhc2VEYXRhU2VydmljZS5nZXREZXRhaWwiLCJCYXNlRGF0YVNlcnZpY2UuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlLnVwZGF0ZSIsIkJhc2VEYXRhU2VydmljZS5kZWxldGUiLCJiYXNlRGF0YVNlcnZpY2VGYWN0b3J5IiwiYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yIiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuY29uc3RydWN0b3IiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci5nZXRMaXN0IiwiQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IuZ2V0SXRlbSIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmNyZWF0ZSIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLnVwZGF0ZSIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmRlbGV0ZSIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLmxvZyIsIkJhc2VEYXRhU2VydmljZUJlaGF2aW9yLnRyYW5zZm9ybUZyb21TZXJ2ZXIiLCJCYXNlRGF0YVNlcnZpY2VCZWhhdmlvci50cmFuc2Zvcm1Ub1NlcnZlciIsIkJhc2VEYXRhU2VydmljZVZpZXciLCJCYXNlRGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZURhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXciLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3LmNvbnN0cnVjdG9yIiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldy5Bc1NpbmdsZXRvbiIsIkJhc2VQYXJlbnREYXRhU2VydmljZSIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnREYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5nZXQiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UudXBkYXRlIiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSIsImJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UuY2hpbGRDb250cmFjdHMiLCJDb250cmFjdExpYnJhcnkiLCJDb250cmFjdExpYnJhcnkuY29uc3RydWN0b3IiLCJDb250cmFjdExpYnJhcnkuZmx1c2giLCJDb250cmFjdExpYnJhcnkubW9ja0dldCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0TGlzdCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0RGV0YWlsIiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tDaGlsZCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2tQYXJlbnQiLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1NpbmdsZXRvbiIsIkNvbnRyYWN0TGlicmFyeS51cGRhdGVSZXNvdXJjZSIsIkNvbnRyYWN0TGlicmFyeS5iYXNlTW9ja0dldCIsIkNvbnRyYWN0TGlicmFyeS5zaW5vbiIsIm1vbWVudFdyYXBwZXIiLCJUaW1lVXRpbGl0eSIsIlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsIlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsIkRhdGVVdGlsaXR5IiwiRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJEYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwiRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsIkRhdGVVdGlsaXR5LmdldERheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwiRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMiLCJEYXRlVXRpbGl0eS5jb21wYXJlRGF0ZXMiLCJEYXRlVXRpbGl0eS5kYXRlSW5SYW5nZSIsIkRhdGVVdGlsaXR5LmdldERhdGUiLCJEYXRlVXRpbGl0eS5nZXREYXRlRnJvbUlTT1N0cmluZyIsIkRhdGVVdGlsaXR5LmlzRGF0ZSIsIkRhdGVVdGlsaXR5LmdldE5vdyIsIkRhdGVVdGlsaXR5LmZvcm1hdERhdGUiLCJEYXRlVXRpbGl0eS5nZXRGb3JtYXQiLCJDb21wYXJlUmVzdWx0IiwiZ2V0Q29tcGFyZVJlc3VsdCIsIlNpZ24iLCJOdW1iZXJVdGlsaXR5IiwiTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsIk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwiTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwiTnVtYmVyVXRpbGl0eS5yb3VuZFRvU3RlcCIsIkZpbGVTaXplU2VydmljZSIsIkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsIkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwiZmlsZVNpemVGYWN0b3J5IiwiZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwiZmlsZVNpemVGaWx0ZXIiLCJHZW5lcmljU2VhcmNoRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5jb25zdHJ1Y3RvciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hPYmplY3QiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSIsImdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LmdldEluc3RhbmNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5jb25zdHJ1Y3RvciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29udGFpbnMiLCJTdHJpbmdVdGlsaXR5U2VydmljZS5zdWJzdGl0dXRlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsIkd1aWRTZXJ2aWNlIiwiR3VpZFNlcnZpY2UuY29uc3RydWN0b3IiLCJHdWlkU2VydmljZS50aW1lIiwiR3VpZFNlcnZpY2UucmFuZG9tIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIk5vdGlmaWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJOb3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmciLCJOb3RpZmljYXRpb25TZXJ2aWNlLmVycm9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwibm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIiwiQmFzZU5vdGlmaWVyIiwiQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwiQmFzZU5vdGlmaWVyLmluZm8iLCJCYXNlTm90aWZpZXIud2FybmluZyIsIkJhc2VOb3RpZmllci5lcnJvciIsIkJhc2VOb3RpZmllci5zdWNjZXNzIiwiQmFzZU5vdGlmaWVyLm5vdGlmeSIsIk9ic2VydmFibGVTZXJ2aWNlIiwiT2JzZXJ2YWJsZVNlcnZpY2UuY29uc3RydWN0b3IiLCJPYnNlcnZhYmxlU2VydmljZS5yZWdpc3RlciIsIk9ic2VydmFibGVTZXJ2aWNlLmZpcmUiLCJPYnNlcnZhYmxlU2VydmljZS51bnJlZ2lzdGVyIiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5Iiwib2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldEFsbENoaWxkQmVoYXZpb3JzIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucmVnaXN0ZXJDaGlsZEJlaGF2aW9yIiwiUHJvbWlzZVV0aWxpdHkiLCJQcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsIlByb21pc2VVdGlsaXR5LnJlc29sdmVQcm9taXNlcyIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5jb25zdHJ1Y3RvciIsIlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5nZXREYXRhIiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5Iiwic3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5LmdldEluc3RhbmNlIiwiTW9jayIsIk1vY2suY29uc3RydWN0b3IiLCJNb2NrLnNlcnZpY2UiLCJNb2NrLnByb21pc2UiLCJNb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJNb2NrLmZsdXNoIiwiQW5ndWxhckZpeHR1cmUiLCJBbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsIkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJBbmd1bGFyRml4dHVyZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzIiwiQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwiVmFsaWRhdGlvblNlcnZpY2UiLCJWYWxpZGF0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZEN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvciIsIlZhbGlkYXRpb25TZXJ2aWNlLmJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZUN1c3RvbVZhbGlkYXRvciIsIlZhbGlkYXRvciIsIlZhbGlkYXRvci5jb25zdHJ1Y3RvciIsIlZhbGlkYXRvci52YWxpZGF0ZSIsIlZhbGlkYXRvci5nZXRFcnJvckNvdW50IiwiVmFsaWRhdG9yLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIiLCJWYWxpZGF0b3IudW5yZWdpc3RlciIsIlZhbGlkYXRvci5pc0FjdGl2ZSIsIlZhbGlkYXRvci5lcnJvck1lc3NhZ2UiLCJDb21wb3NpdGVWYWxpZGF0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IuY29uc3RydWN0b3IiLCJDb21wb3NpdGVWYWxpZGF0b3IudmFsaWRhdGUiLCJDb21wb3NpdGVWYWxpZGF0b3IuZ2V0RXJyb3JDb3VudCIsIkNvbXBvc2l0ZVZhbGlkYXRvci5idWlsZENoaWxkVmFsaWRhdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLnVucmVnaXN0ZXJDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFbkMsS0FBWSxTQUFTLHVCQUFNLENBQThCLENBQUM7QUFLakQsa0JBQVM7QUFKbEIsS0FBWSxPQUFPLHVCQUFNLENBQTBCLENBQUM7QUFJaEMsZ0JBQU87QUFIM0IsS0FBWSxRQUFRLHVCQUFNLEVBQTRCLENBQUM7QUFHMUIsaUJBQVE7QUFGckMsS0FBWSxLQUFLLHVCQUFNLEVBQXNCLENBQUM7QUFFUCxjQUFLO0FBRWpDLGFBQUksR0FBVyxjQUFjLENBQUM7QUFFekMsUUFBTyxDQUFDLE1BQU0sQ0FBQyxZQUFJLEVBQUU7S0FDcEIsU0FBUyxDQUFDLElBQUk7S0FDZCxPQUFP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Q0EsUUFBUUEsRUFBRUEsVUFBQ0EsS0FBVUEsRUFBRUEsR0FBUUE7YUFDckNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUM3Q0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDOURBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUM5QkEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDM0RBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2Q0EsQ0FBQ0E7U0FDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7S0FDOUJBLENBQUNBO0tBcEJNSCxzQkFBT0EsR0FBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FxQmhEQSxxQkFBQ0E7QUFBREEsRUFBQ0Es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QTtLQUNQQSxDQUFDQTtLQUVESCxnREFBbUJBLEdBQW5CQTtTQUFBSSxpQkFXQ0E7U0FWQUEsSUFBSUEsU0FBU0EsR0FBZUEsSUFBSUEscUJBQVNBLENBQUNBLFVBQUNBLEtBQWFBO2FBQ3ZEQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtTQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFSEEsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7U0FDdENBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1NBQ2ZBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO1NBQ3RCQSxTQUFVQSxDQUFDQSxHQUFHQSxHQUFHQSxVQUFVQSxDQUFDQTtTQUVuREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7S0FDbEJBLENBQUNBO0tBRURKLDRDQUFlQSxHQUFmQSxVQUFnQkEsU0FBcUJBO1NBQ3BDSyxPQUFPQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUF3QkEsU0FBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7S0FDcEVBLENBQUNBO0tBQ0ZMLHlCQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBekNZLDJCQUFrQixxQkF5QzlCOzs7Ozs7O0FDM0RELGFBQVksQ0FBQzs7OztBQUViLDhCQUFjLEVBQWlCLENBQUMiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwib3V0cHV0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlNDdmODkzZDE4NWM4NjhjNGMyNVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBiZWhhdmlvcnMgZnJvbSAnLi9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGZpbHRlcnMgZnJvbSAnLi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgc2VydmljZXMgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzL3R5cGVzLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgeyBiZWhhdmlvcnMsIGZpbHRlcnMsIHNlcnZpY2VzLCB0eXBlcyB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRiZWhhdmlvcnMubmFtZSxcclxuXHRmaWx0ZXJzLm5hbWUsXHJcblx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3V0aWxpdGllcy50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiYW5ndWxhclwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIHN0b3BFdmVudFByb3BvZ2F0aW9uIGZyb20gJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuZXhwb3J0IHsgc3RvcEV2ZW50UHJvcG9nYXRpb24gfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgYW5ndWxhci5JQXR0cmlidXRlcyB7XHJcblx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBhbmd1bGFyLklEaXJlY3RpdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdGxpbmsoc2NvcGU6IGFuZ3VsYXIuSVNjb3BlXHJcblx0XHRcdCwgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGlzRW1wdHkgZnJvbSAnLi9pc0VtcHR5L2lzRW1wdHknO1xyXG5pbXBvcnQgKiBhcyB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlL3RydW5jYXRlJztcclxuXHJcbmV4cG9ydCB7IGlzRW1wdHksIHRydW5jYXRlIH07XHJcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWVcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSXNFbXB0eUZpbHRlciB7XHJcblx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxufVxyXG5cclxuaXNFbXB0eS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IElPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbiA9PiB7XHJcblx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuICFpc0VtcHR5O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWVdKVxyXG5cdC5maWx0ZXIoc2VydmljZU5hbWUsIGlzRW1wdHkpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLFxyXG5cdG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lLFxyXG5cdElBcnJheVV0aWxpdHlcclxufSBmcm9tICcuLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXlTZXJ2aWNlTmFtZV07XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7XHJcblx0XHR9XHJcblxyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHR9XHJcblxyXG5cdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0dmFyIHR5cGUyOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMjtcclxuXHJcblx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG5cdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcblx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRpZiAoXy5hbnkoa2V5czIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0fVxyXG5cclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIl9cIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlx0J3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlO1xyXG5cdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdH1cclxuXHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIH0pXHJcblx0XHQ6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSB7XHJcblx0XHQvLyBuZWVkcyB0byBiZSBzZWVkZWQgd2l0aCBhbiBvYmplY3Qgb3IgaXQgd2lsbCBiZSB2aWV3ZWQgYXMgYW4gYXJyYXkgd2l0aCBubyBpdGVtc1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9LCBpdGVtOiBURGF0YVR5cGUpOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0gPT4ge1xyXG5cdFx0XHRkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSwgPGFueT57fSk7XHJcblx0fVxyXG5cclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlIHtcclxuXHRcdGlmIChhcnJheSAhPSBudWxsICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcbn1cclxuXHJcbnRydW5jYXRlLiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGFycmF5IGZyb20gJy4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGJvb2xlYW4gZnJvbSAnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGRhdGFDb250cmFjdHMgZnJvbSAnLi9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZGF0ZSBmcm9tICcuL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWxlU2l6ZSBmcm9tICcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGdlbmVyaWNTZWFyY2hGaWx0ZXIgZnJvbSAnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGd1aWQgZnJvbSAnLi9ndWlkL2d1aWQuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICcuL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuaW1wb3J0ICogYXMgbm90aWZpY2F0aW9uIGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbnVtYmVyU2VydmljZSBmcm9tICcuL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9iamVjdFNlcnZpY2UgZnJvbSAnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlIGZyb20gJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwYXJlbnRDaGlsZEJlaGF2aW9yIGZyb20gJy4vcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwcm9taXNlIGZyb20gJy4vcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzdHJpbmdTZXJ2aWNlIGZyb20gJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgc3luY2hyb25pemVkUmVxdWVzdHMgZnJvbSAnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgdGVzdCBmcm9tICcuL3Rlc3QvdGVzdC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0aW1lIGZyb20gJy4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhcnJheSxcclxuXHRib29sZWFuLFxyXG5cdGRhdGFDb250cmFjdHMsXHJcblx0ZGF0ZSxcclxuXHRmaWxlU2l6ZSxcclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyLFxyXG5cdGd1aWQsXHJcblx0bW9tZW50LFxyXG5cdG5vdGlmaWNhdGlvbixcclxuXHRudW1iZXJTZXJ2aWNlIGFzIG51bWJlcixcclxuXHRvYmplY3RTZXJ2aWNlIGFzIG9iamVjdCxcclxuXHRvYnNlcnZhYmxlLFxyXG5cdHBhcmVudENoaWxkQmVoYXZpb3IsXHJcblx0cHJvbWlzZSxcclxuXHRzdHJpbmdTZXJ2aWNlIGFzIHN0cmluZyxcclxuXHRzeW5jaHJvbml6ZWRSZXF1ZXN0cyxcclxuXHR0ZXN0LFxyXG5cdHRpbWUsXHJcblx0dmFsaWRhdGlvbixcclxufTtcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0ZGF0YUNvbnRyYWN0cy5tb2R1bGVOYW1lLFxyXG5cdGRhdGUubW9kdWxlTmFtZSxcclxuXHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuXHRndWlkLm1vZHVsZU5hbWUsXHJcblx0bW9tZW50Lm1vZHVsZU5hbWUsXHJcblx0bm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0bnVtYmVyU2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRzdHJpbmdTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMubW9kdWxlTmFtZSxcclxuXHR0aW1lLm1vZHVsZU5hbWUsXHJcblx0dGVzdC5tb2R1bGVOYW1lLFxyXG5cdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyByZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIG1vY2tzIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9kYXRhU2VydmljZU1vY2tzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRhQ29udHJhY3RzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnknO1xyXG5leHBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSwgSUJhc2VEb21haW5PYmplY3QsIEJhc2VEYXRhU2VydmljZSwgZmFjdG9yeU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcsIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBmYWN0b3J5TmFtZSBhcyBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSB9IGZyb20gJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VSZXNvdXJjZUJ1aWxkZXIsIHNlcnZpY2VOYW1lIGFzIGJ1aWxkZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBtb2NrcyB9O1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdGJhc2VEYXRhU2VydmljZU1vZHVsZU5hbWUsXHJcblx0YmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9kdWxlTmFtZSxcclxuXHRyZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnRyYWN0TGlicmFyeSwgQ29udHJhY3RMaWJyYXJ5LCBJTGlicmFyeVNlcnZpY2VzIH0gZnJvbSAnLi9jb250cmFjdExpYnJhcnknO1xyXG5pbXBvcnQgeyBJVHJhbnNmb3JtIH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3InO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlVmlldywgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcsIEJhc2VEYXRhU2VydmljZVZpZXcsIEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVJlc291cmNlQnVpbGRlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdiYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogVXJsIHRvIGhpdCB3aXRoIGdldExpc3QgYW5kIGNyZWF0ZVxyXG5cdCogLSBleHRlbmRlZCB3aXRoIC9pZCBmb3IgZ2V0RGV0YWlsLCB1cGRhdGUsIGFuZCBkZWxldGVcclxuXHQqL1xyXG5cdGVuZHBvaW50Pzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQqIEZsYWcgZm9yIHNwZWNpZnlpbmcgaWYgdGhlIGRhdGEgc2VydmljZSBzaG91bGQgdXNlIHRoZSBtb2NrIGRhdGEgb3IgaGl0IHRoZSBhY3R1YWwgZW5kcG9pbnRcclxuXHQqIGRlZmF1bHRzIHRvIHRydWUgaWYgZW5kcG9pbnQgaXMgbm90IGRlZmluZWRcclxuXHQqL1xyXG5cdHVzZU1vY2s/OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQqIEZsYWcgZm9yIHNwZWNpZnlpbmcgaWYgdGhlIGRhdGEgc2VydmljZSBzaG91bGQgbG9nIGFsbCByZXF1ZXN0cyBhZ2FpbnN0IHRoZSBjb250cmFjdFxyXG5cdCovXHJcblx0bG9nUmVxdWVzdHM/OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQqIFByb2Nlc3NlcyBkYXRhIGNvbWluZyBiYWNrIGZyb20gdGhlIHNlcnZlclxyXG5cdCovXHJcblx0dHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+IGV4dGVuZHMgSUJhc2VPcHRpb25zPFREYXRhVHlwZT4ge1xyXG5cdC8qKlxyXG5cdCogRXhhbXBsZSBkYXRhIHNldCB0byBiZSB1c2VkIGZvciB0ZXN0aW5nIGFuZCBwcm90b3R5cGluZyBpbnN0ZWFkIG9mIGhpdHRpbmcgdGhlIGVuZHBvaW50XHJcblx0Ki9cclxuXHRtb2NrRGF0YT86IFREYXRhVHlwZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEZ1bmN0aW9uIHRoYXQgYnVpbGRzIGEgZGljdGlvbmFyeSBvZiBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyPzogeyAoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEV4YW1wbGUgb2JqZWN0IHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcgYW5kIHByb3RvdHlwaW5nIGluc3RlYWQgb2YgaGl0dGluZyB0aGUgZW5kcG9pbnRcclxuXHQqL1xyXG5cdG1vY2tEYXRhPzogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEZ1bmN0aW9uIHRoYXQgYnVpbGRzIGEgZGljdGlvbmFyeSBvZiBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyPzogeyAoYmFzZUVuZHBvaW50OiBzdHJpbmcpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUmVzb3VyY2VCdWlsZGVyIHtcclxuXHQvKipcclxuXHQqIEEgaGVscGVyIHRvIHBhc3MgaW50byB0aGUgY29uc3RydWN0b3Igd2hlbiBidWlsZGluZyBhIG5ldyBjb250cmFjdHMgbGlicmFyeVxyXG5cdCovXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXM7XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3RhbmRhcmQgcmVzb3VyY2Ugd2l0aCBnZXRMaXN0LCBnZXREZXRhaWwsIGNyZWF0ZSwgdXBkYXRlLCBkZWxldGVcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBzdGFuZGFyZCByZXNvdXJjZSB3aXRoIGdldExpc3QsIGdldERldGFpbCwgY3JlYXRlLCB1cGRhdGUsIGRlbGV0ZVxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdD4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCB2b2lkPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzdGFuZGFyZCB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgcGFyZW50IHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc3RhbmRhcmQgd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2Ugd2l0aCBzdWItcmVzb3VyY2VzIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBiYXNlIHJlc291cmNlIG9yXHJcblx0KiBhcyBhIHNpbmdsZXRvbiBpZiBhIHBhcmVudCBpcyBzZWxlY3RlZFxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgdm9pZCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG5cclxuXHQvKipcclxuXHQqIERlcHJlY2F0ZWQgLSBDcmVhdGUgYSBzaW5nbGV0b24gcmVzb3VyY2Ugd2l0aCBnZXQgYW5kIHVwZGF0ZVxyXG5cdCovXHJcblx0Y3JlYXRlU2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlPihvcHRpb25zOiBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBEZXByZWNhdGVkIC0gQ3JlYXRlIGEgcGFyZW50IHNpbmdsZXRvbiByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHNpbmdsZXRvbiB3aXRoIGNoaWxkIHJlc291cmNlcyBhdmFpbGFibGUgdGhyb3VnaCBjaGlsZENvbnRyYWN0cyhpZClcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VSZXNvdXJjZUJ1aWxkZXIgaW1wbGVtZW50cyBJQmFzZVJlc291cmNlQnVpbGRlciB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckaHR0cCcsICckcScsICckcm9vdFNjb3BlJywgYXJyYXlTZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZVxyXG5cdFx0XHQsIHByaXZhdGUgYXJyYXk6IElBcnJheVV0aWxpdHkpIHsgfVxyXG5cclxuXHRnZXRMaWJyYXJ5U2VydmljZXMoKTogSUxpYnJhcnlTZXJ2aWNlcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQkcTogdGhpcy4kcSxcclxuXHRcdFx0JHJvb3RTY29wZTogdGhpcy4kcm9vdFNjb3BlLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUmVzb3VyY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZVZpZXcodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlUGFyZW50RGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlPihvcHRpb25zOiBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVzZU1vY2tJZk5vRW5kcG9pbnQ8VERhdGFUeXBlPihvcHRpb25zOiBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPik6IElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHRcdG9wdGlvbnMudXNlTW9jayA9IG9wdGlvbnMuZW5kcG9pbnQgPT0gbnVsbCA/IHRydWUgOiBvcHRpb25zLnVzZU1vY2s7XHJcblx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheU1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCYXNlUmVzb3VyY2VCdWlsZGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIGFycmF5U2VydmljZU5hbWUsIG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lIH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IsIElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZURhdGFTZXJ2aWNlJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2Jhc2VEYXRhU2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRG9tYWluT2JqZWN0IHtcclxuICAgIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdGdldExpc3QocGFyYW1zPzogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+O1xyXG4gICAgZ2V0RGV0YWlsKGlkOiBudW1iZXIpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBjcmVhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICBkZWxldGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIHVzZU1vY2s6IGJvb2xlYW47XHJcbiAgICBsb2dSZXF1ZXN0czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgcHJpdmF0ZSBiZWhhdmlvcjogSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYmVoYXZpb3IgPSBuZXcgQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IoJGh0dHAsICRxLCB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbUVuZHBvaW50KGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0KHBhcmFtczogVFNlYXJjaFBhcmFtcyk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci5nZXRMaXN0KHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZVtdID0+IHsgcmV0dXJuIHRoaXMubW9ja0RhdGEgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXRhaWwoaWQ6IG51bWJlcik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0SXRlbSh7XHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChpZCksXHJcbiAgICAgICAgICAgIGdldE1vY2tEYXRhOiAoKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuY3JlYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBhZGRNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRJZDogbnVtYmVyID0gXy5tYXgodGhpcy5tb2NrRGF0YSwgJ2lkJykuaWQgKyAxO1xyXG4gICAgICAgICAgICAgICAgZG9tYWluT2JqZWN0LmlkID0gbmV4dElkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2NrRGF0YS5wdXNoKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvci51cGRhdGUoe1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3Q6IGRvbWFpbk9iamVjdCxcclxuICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCksXHJcbiAgICAgICAgICAgIHVwZGF0ZU1vY2tEYXRhOiAoZGF0YTogVERhdGFUeXBlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkT2JqZWN0OiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBvbGRPYmplY3QgPSA8VERhdGFUeXBlPl8uYXNzaWduKG9sZE9iamVjdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZU1vY2s6IHRoaXMudXNlTW9jayxcclxuICAgICAgICAgICAgbG9nUmVxdWVzdHM6IHRoaXMubG9nUmVxdWVzdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZGVsZXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLFxyXG4gICAgICAgICAgICByZW1vdmVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUodGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGVbXVxyXG4gICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxufVxyXG5cclxuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHkpOiBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zZm9ybTxURGF0YVR5cGU+IHtcclxuICAgIGZyb21TZXJ2ZXIocmF3RGF0YTogYW55KTogVERhdGFUeXBlO1xyXG4gICAgdG9TZXJ2ZXIoZGF0YTogVERhdGFUeXBlKTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICBlbmRwb2ludDogc3RyaW5nO1xyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+IGV4dGVuZHMgSVJlcXVlc3RPcHRpb25zIHtcclxuICAgIHBhcmFtczogYW55O1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZ2V0TW9ja0RhdGEoKTogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICBhZGRNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVcGRhdGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICB1cGRhdGVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4gZXh0ZW5kcyBJUmVxdWVzdE9wdGlvbnMge1xyXG4gICAgZG9tYWluT2JqZWN0OiBURGF0YVR5cGU7XHJcbiAgICByZW1vdmVNb2NrRGF0YShkYXRhOiBURGF0YVR5cGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcjxURGF0YVR5cGU+IHtcclxuXHRnZXRMaXN0KG9wdGlvbnM6IElHZXRMaXN0T3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICBnZXRJdGVtKG9wdGlvbnM6IElHZXRJdGVtT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgY3JlYXRlKG9wdGlvbnM6IElDcmVhdGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgIGRlbGV0ZShvcHRpb25zOiBJRGVsZXRlT3B0aW9uczxURGF0YVR5cGU+KTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlQmVoYXZpb3I8VERhdGFUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPikgeyB9XHJcblxyXG4gICAgZ2V0TGlzdChvcHRpb25zOiBJR2V0TGlzdE9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlW10+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQsIHsgcGFyYW1zOiBvcHRpb25zLnBhcmFtcyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZVtdPik6IFREYXRhVHlwZVtdID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlW10pOiBURGF0YVR5cGVbXSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5tYXAoZGF0YSwgdGhpcy50cmFuc2Zvcm0uZnJvbVNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdnZXRMaXN0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0ob3B0aW9uczogSUdldEl0ZW1PcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKG9wdGlvbnMuZ2V0TW9ja0RhdGEoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KG9wdGlvbnMuZW5kcG9pbnQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0JywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUob3B0aW9uczogSUNyZWF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMudHJhbnNmb3JtVG9TZXJ2ZXIob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hZGRNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4ob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnBvc3Qob3B0aW9ucy5lbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kb21haW5PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnY3JlYXRlJywgZGF0YSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy51c2VNb2NrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUob3B0aW9uczogSVVwZGF0ZU9wdGlvbnM8VERhdGFUeXBlPik6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBvcHRpb25zLmRvbWFpbk9iamVjdCA9IHRoaXMudHJhbnNmb3JtVG9TZXJ2ZXIob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgb3B0aW9ucy51cGRhdGVNb2NrRGF0YShvcHRpb25zLmRvbWFpbk9iamVjdClcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvcHRpb25zLmRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAucHV0KG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMuZG9tYWluT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZSk6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybUZyb21TZXJ2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygndXBkYXRlJywgb3B0aW9ucy5kb21haW5PYmplY3QsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMudXNlTW9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKG9wdGlvbnM6IElEZWxldGVPcHRpb25zPFREYXRhVHlwZT4pOiBhbmd1bGFyLklQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBpZiAob3B0aW9ucy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmVtb3ZlTW9ja0RhdGEob3B0aW9ucy5kb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZGVsZXRlPHZvaWQ+KG9wdGlvbnMuZW5kcG9pbnQpLnRoZW4oKCk6IHZvaWQgPT4geyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2RlbGV0ZScsIG9wdGlvbnMuZG9tYWluT2JqZWN0LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnVzZU1vY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2cocmVxdWVzdE5hbWU6IHN0cmluZywgZGF0YTogYW55LCBlbmRwb2ludDogc3RyaW5nLCB1c2VNb2NrOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vY2tTdHJpbmcgPSB1c2VNb2NrID8gJ01vY2tlZCAnIDogJyc7XHJcbiAgICAgICAgbGV0IGVuZHBvaW50U3RyaW5nID0gZW5kcG9pbnQgPT0gbnVsbCA/ICd1bnNwZWNpZmllZCcgOiBlbmRwb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2NrU3RyaW5nICsgcmVxdWVzdE5hbWUgKyAnIGZvciBlbmRwb2ludCAnICsgZW5kcG9pbnRTdHJpbmcgKyAnOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNmb3JtRnJvbVNlcnZlcihyYXdEYXRhOiBhbnkpOiBURGF0YVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gdGhpcy50cmFuc2Zvcm0uZnJvbVNlcnZlcihyYXdEYXRhKVxyXG4gICAgICAgICAgICA6IHJhd0RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ub1NlcnZlcihkYXRhOiBURGF0YVR5cGUpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gdGhpcy50cmFuc2Zvcm0udG9TZXJ2ZXIoZGF0YSlcclxuICAgICAgICAgICAgOiBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlQmVoYXZpb3IudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVRyYW5zZm9ybSB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURvbWFpbk9iamVjdCB9IGZyb20gJy4vYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+e1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+XHJcblx0aW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIF9lbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG4gICAgICAgICAgICAsIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBsb2dSZXF1ZXN0czogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBhcnJheSwgX2VuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRBc1NpbmdsZXRvbihwYXJlbnRJZDogbnVtYmVyKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuXHRcdGxldCBtb2NrRGF0YTogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0uaWQgPT09IHBhcmVudElkO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnRyYW5zZm9ybSwgdGhpcy51c2VNb2NrLCB0aGlzLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgX2VuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuXHRcdFx0LCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7KCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlfVxyXG4gICAgICAgICAgICAsIHByaXZhdGUgdHJhbnNmb3JtOiBJVHJhbnNmb3JtPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0bGV0IG1vY2tEYXRhOiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gcGFyZW50SWQ7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuZW5kcG9pbnQsIG1vY2tEYXRhLCB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRoaXMudHJhbnNmb3JtLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElBcnJheVV0aWxpdHkgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPntcclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHksIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG5cdFx0LCBwdWJsaWMgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeyAoYmFzZUVuZHBvaW50OiBzdHJpbmcpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9XHJcblx0XHQsIHRyYW5zZm9ybT86IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG5cdFx0LCB1c2VNb2NrPzogYm9vbGVhblxyXG4gICAgICAgICwgbG9nUmVxdWVzdHM/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y2hpbGRDb250cmFjdHMoaWQ/OiBudW1iZXIpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChpZCkpIHtcclxuXHRcdFx0bGV0IGRpY3Rpb25hcnk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKHRoaXMuZW5kcG9pbnQpO1xyXG5cdFx0XHRfLmVhY2goZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRkYXRhU2VydmljZS5lbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQgKyBkYXRhU2VydmljZS5lbmRwb2ludDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGRpY3Rpb25hcnk6IHtbaW5kZXg6IHN0cmluZ106IGFueX0gPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIodGhpcy5lbmRwb2ludCArICcvJyArIGlkKTtcclxuXHRcdFx0cmV0dXJuIDxhbnk+Xy5tYXBWYWx1ZXMoZGljdGlvbmFyeSwgKGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+KTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHwgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+ID0+IHtcclxuXHRcdFx0XHRsZXQgY29udHJhY3Q6IGFueTtcclxuXHRcdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGRhdGFTZXJ2aWNlLkFzU2luZ2xldG9uKSkge1xyXG5cdFx0XHRcdFx0Y29udHJhY3QgPSBkYXRhU2VydmljZS5Bc1NpbmdsZXRvbihpZCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb250cmFjdC5lbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZCArIGNvbnRyYWN0LmVuZHBvaW50O1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gY29udHJhY3Q7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yLCBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvciwgSVRyYW5zZm9ybSB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZUJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcblxyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgcHJpdmF0ZSBiZWhhdmlvcjogSUJhc2VEYXRhU2VydmljZUJlaGF2aW9yPFREYXRhVHlwZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcml2YXRlIG1vY2tEYXRhOiBURGF0YVR5cGVcclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm08VERhdGFUeXBlPlxyXG4gICAgICAgICAgICAsIHB1YmxpYyB1c2VNb2NrOiBib29sZWFuXHJcbiAgICAgICAgICAgICwgcHVibGljIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5iZWhhdmlvciA9IG5ldyBCYXNlRGF0YVNlcnZpY2VCZWhhdmlvcigkaHR0cCwgJHEsIHRyYW5zZm9ybSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KCk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IuZ2V0SXRlbSh7XHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICBnZXRNb2NrRGF0YTogKCk6IFREYXRhVHlwZSA9PiB7IHJldHVybiB0aGlzLm1vY2tEYXRhOyB9LFxyXG4gICAgICAgICAgICB1c2VNb2NrOiB0aGlzLnVzZU1vY2ssXHJcbiAgICAgICAgICAgIGxvZ1JlcXVlc3RzOiB0aGlzLmxvZ1JlcXVlc3RzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3IudXBkYXRlKHtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0OiBkb21haW5PYmplY3QsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LFxyXG4gICAgICAgICAgICB1cGRhdGVNb2NrRGF0YTogKGRhdGE6IFREYXRhVHlwZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2NrRGF0YSA9IDxURGF0YVR5cGU+Xy5hc3NpZ24odGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlTW9jazogdGhpcy51c2VNb2NrLFxyXG4gICAgICAgICAgICBsb2dSZXF1ZXN0czogdGhpcy5sb2dSZXF1ZXN0cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtPFREYXRhVHlwZT4sIHVzZU1vY2s/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+O1xyXG59XHJcblxyXG5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcbmV4cG9ydCBmdW5jdGlvbiBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtPFREYXRhVHlwZT4sIHVzZU1vY2s/OiBib29sZWFuLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+KCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShmYWN0b3J5TmFtZSwgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElUcmFuc2Zvcm0gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2VCZWhhdmlvcic7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+e1xyXG5cdGNoaWxkQ29udHJhY3RzKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVcclxuXHRcdCwgcHJpdmF0ZSByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7IChiYXNlRW5kcG9pbnQ6IHN0cmluZyk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybTxURGF0YVR5cGU+XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcblx0XHQsIGxvZ1JlcXVlc3RzPzogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y2hpbGRDb250cmFjdHMoKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcih0aGlzLmVuZHBvaW50KTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4gZXh0ZW5kcyBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG5cdG1vY2tHZXRMaXN0KGRhdGE6IGFueVtdKTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IGV4dGVuZHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0bW9ja0dldExpc3QoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tDaGlsZChtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdG1vY2tHZXQoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MudHNcbiAqKi8iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VSZXNvdXJjZUJ1aWxkZXIsIEJhc2VSZXNvdXJjZUJ1aWxkZXIgfSBmcm9tICcuL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VNb2NrLCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jaywgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2sgfSBmcm9tICcuL2RhdGFTZXJ2aWNlTW9ja3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJhY3RMaWJyYXJ5IHtcclxuXHQvLyBleHRlbmQgd2l0aCBjdXN0b20gaW50ZXJmYWNlIHNwZWNpZnlpbmcgY2hpbGQgcmVzb3VyY2VzXHJcblxyXG5cdGZsdXNoKCk6IHZvaWQ7XHJcblxyXG5cdG1vY2tHZXQocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldExpc3QocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0dldERldGFpbChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHJcblx0bW9ja0NoaWxkKHBhcmVudDogYW55LCBtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkO1xyXG5cdGNyZWF0ZU1vY2socmVzb3VyY2U/OiBhbnkpOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT47XHJcblx0Y3JlYXRlTW9ja1BhcmVudChyZXNvdXJjZT86IGFueSk6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+O1xyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMaWJyYXJ5U2VydmljZXMge1xyXG5cdCRxOiBuZy5JUVNlcnZpY2U7XHJcblx0JHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cmFjdExpYnJhcnkgaW1wbGVtZW50cyBJQ29udHJhY3RMaWJyYXJ5IHtcclxuXHRwcml2YXRlICRxOiBuZy5JUVNlcnZpY2U7XHJcblx0cHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBidWlsZGVyOiBJQmFzZVJlc291cmNlQnVpbGRlcikge1xyXG5cdFx0bGV0IHNlcnZpY2VzOiBJTGlicmFyeVNlcnZpY2VzID0gKDxCYXNlUmVzb3VyY2VCdWlsZGVyPmJ1aWxkZXIpLmdldExpYnJhcnlTZXJ2aWNlcygpO1xyXG5cdFx0dGhpcy4kcSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHR9XHJcblxyXG5cdGZsdXNoKCk6IHZvaWQge1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHR9XHJcblx0bW9ja0dldChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldCcsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bW9ja0dldExpc3QocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXRMaXN0JywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrR2V0RGV0YWlsKHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0RGV0YWlsJywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrQ2hpbGQocGFyZW50OiBhbnksIG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiB7KGlkOiBudW1iZXIpOiBhbnl9ID0gcGFyZW50LmNoaWxkQ29udHJhY3RzLmJpbmQocGFyZW50KTtcclxuXHRcdHBhcmVudC5jaGlsZENvbnRyYWN0cyA9IChpZDogbnVtYmVyKTogYW55ID0+IHtcclxuXHRcdFx0bGV0IGNoaWxkcmVuOiBhbnkgPSBnZXRDaGlsZHJlbihpZCk7XHJcblx0XHRcdG1vY2tDYWxsYmFjayhjaGlsZHJlbik7XHJcblx0XHRcdHJldHVybiBjaGlsZHJlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2socmVzb3VyY2U/OiBhbnkpOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT4ge1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZURhdGFTZXJ2aWNlTW9jazxhbnksIGFueT4gPSA8YW55PnRoaXMuYnVpbGRlci5jcmVhdGVSZXNvdXJjZTxhbnksIGFueT4oe30pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHR0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT4ge1xyXG5cdFx0bGV0IGdldENoaWxkcmVuOiBhbnkgPSByZXNvdXJjZSAhPSBudWxsID8gcmVzb3VyY2UucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA6ICgpOiBhbnkgPT4geyByZXR1cm4ge307IH07XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPGFueSwgYW55LCBhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlUGFyZW50UmVzb3VyY2U8YW55LCBhbnksIGFueT4oe1xyXG5cdFx0XHRyZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiBnZXRDaGlsZHJlbixcclxuXHRcdH0pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldExpc3QgPSAoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0TGlzdCcsIGRhdGEpOyB9O1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldERldGFpbCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrQ2hpbGQgPSAobW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCA9PiB7IHJldHVybiB0aGlzLm1vY2tDaGlsZChkYXRhU2VydmljZSwgbW9ja0NhbGxiYWNrKTsgfTtcclxuXHRcdHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2tTaW5nbGV0b24ocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+IHtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8YW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlKHt9KTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tHZXQgPSAoZGF0YTogYW55KTogU2lub24uU2lub25TcHkgPT4geyByZXR1cm4gdGhpcy5iYXNlTW9ja0dldChkYXRhU2VydmljZSwgJ2dldCcsIGRhdGEpOyB9O1xyXG5cdFx0dGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZTogYW55LCByZXNvdXJjZT86IGFueSk6IHZvaWQge1xyXG5cdFx0aWYgKHJlc291cmNlICE9IG51bGwpIHtcclxuXHRcdFx0Xy5leHRlbmQocmVzb3VyY2UsIGRhdGFTZXJ2aWNlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYmFzZU1vY2tHZXQocmVzb3VyY2U6IGFueSwgYWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRsZXQgZnVuYzogU2lub24uU2lub25TcHkgPSB0aGlzLnNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHEud2hlbihkYXRhKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVzb3VyY2VbYWN0aW9uTmFtZV0gPSBmdW5jO1xyXG5cdFx0cmV0dXJuIGZ1bmM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBzaW5vbigpOiBTaW5vbi5TaW5vblN0YXRpYyB7XHJcblx0XHRyZXR1cm4gc2lub24gfHwgPGFueT57IHNweTogKGZ1bmM6IGFueSk6IGFueSA9PiB7IHJldHVybiBmdW5jOyB9IH07XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyBtb21lbnRNb2R1bGVOYW1lIH0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lIH0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0ZVV0aWxpdHksIHNlcnZpY2VOYW1lIH0gZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudE1vZHVsZU5hbWUsIHRpbWVNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIm1vbWVudFwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9tZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVVdGlsaXR5IHtcclxuXHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHR9XHJcblxyXG5cdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIHRpbWVNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIHRpbWVTZXJ2aWNlTmFtZSxcclxuXHRJVGltZVV0aWxpdHksXHJcbn0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG1vbWVudE1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgbW9tZW50U2VydmljZU5hbWUsXHJcbn0gZnJvbSAnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgZGVmYXVsdEZvcm1hdHMgfSBmcm9tICcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5pbXBvcnQgeyBDb21wYXJlUmVzdWx0LCBnZXRDb21wYXJlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdCc7XHJcblxyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVWYWx1ZSB7XHJcblx0eWVhcnM6IG51bWJlcjtcclxuXHRtb250aHM6IG51bWJlcjtcclxuXHRkYXlzOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWU7XHJcblx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0c3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogQ29tcGFyZVJlc3VsdDtcclxuXHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW47XHJcblx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZTtcclxuXHRnZXREYXRlRnJvbUlTT1N0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlO1xyXG5cdGlzRGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRnZXROb3coKTogRGF0ZTtcclxuXHRmb3JtYXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlVXRpbGl0eSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW21vbWVudFNlcnZpY2VOYW1lLCB0aW1lU2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbW9tZW50OiBtb21lbnQuTW9tZW50U3RhdGljLCBwcml2YXRlIHRpbWU6IElUaW1lVXRpbGl0eSkge1xyXG5cdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiAoeWVhcjogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdNYXknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0F1Z3VzdCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdOb3ZlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRdO1xyXG5cdH1cclxuXHJcblx0bW9udGg6IElNb250aFtdO1xyXG5cdHByaXZhdGUgYmFzZUZvcm1hdDogc3RyaW5nID0gJ01NLURELVlZWVknO1xyXG5cclxuXHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG5cdH1cclxuXHJcblx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG5cdH1cclxuXHJcblx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZSB7XHJcblx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0dmFyIHJlc3VsdDogSURhdGVWYWx1ZSA9IDxhbnk+e307XHJcblx0XHRyZXN1bHQuZGF5cyA9IGVuZERhdGUuZ2V0RGF0ZSgpIC0gc3RhcnREYXRlLmdldERhdGUoKTtcclxuXHRcdHJlc3VsdC55ZWFycyA9IGVuZERhdGUuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0cmVzdWx0Lm1vbnRocyA9IGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuXHRcdGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyAtPSAxO1xyXG5cdFx0XHRyZXN1bHQuZGF5cyArPSB0aGlzLmdldERheXMoc3RhcnREYXRlLmdldE1vbnRoKCksIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVzdWx0Lm1vbnRocyA8IDApIHtcclxuXHRcdFx0cmVzdWx0LnllYXJzIC09IDE7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgKz0gMTI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdHZhciBtaWxsaXNlY29uZHM6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoc3RhcnQsIGVuZCwgZGF0ZUZvcm1hdCk7XHJcblx0XHRyZXR1cm4gdGhpcy50aW1lLm1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHMpO1xyXG5cdH1cclxuXHJcblx0c3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0cmV0dXJuIGVuZERhdGUuZ2V0VGltZSgpIC0gc3RhcnREYXRlLmdldFRpbWUoKTtcclxuXHR9XHJcblxyXG5cdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0IHtcclxuXHRcdC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcblx0XHR2YXIgZGlmZmVyZW5jZTogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG5cdFx0cmV0dXJuIGdldENvbXBhcmVSZXN1bHQoZGlmZmVyZW5jZSk7XHJcblx0fVxyXG5cclxuXHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlU3RhcnQpID09PSBDb21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZUVuZCkgPT09IENvbXBhcmVSZXN1bHQuZ3JlYXRlcikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGUge1xyXG5cdFx0aWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcblx0XHRcdHJldHVybiA8RGF0ZT5kYXRlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgdGhpcy5nZXRGb3JtYXQoZGF0ZUZvcm1hdCkpLnRvRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0ZUZyb21JU09TdHJpbmcoZGF0ZTogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSkudG9EYXRlKCk7XHJcblx0fVxyXG5cclxuXHRpc0RhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIF8uaXNEYXRlKGRhdGUpXHJcblx0XHRcdHx8IHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgdGhpcy5nZXRGb3JtYXQoZGF0ZUZvcm1hdCkpLmlzVmFsaWQoKTtcclxuXHR9XHJcblxyXG5cdGdldE5vdygpOiBEYXRlIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Zm9ybWF0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLm1vbWVudCh0aGlzLmdldERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCkpLmZvcm1hdCh0aGlzLmdldEZvcm1hdChkYXRlRm9ybWF0KSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEZvcm1hdChjdXN0b21Gb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gY3VzdG9tRm9ybWF0ICE9IG51bGwgPyBjdXN0b21Gb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0Z3JlYXRlciA9IDEsXHJcblx0ZXF1YWwgPSAwLFxyXG5cdGxlc3MgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRkYXRlVGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0ZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuXHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIG51bWJlck1vZHVsZU5hbWUgfSBmcm9tICcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5IH0gZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIgfSBmcm9tICcuL2ZpbGVTaXplRmlsdGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZmlsZVNpemVGaWx0ZXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtudW1iZXJNb2R1bGVOYW1lXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5KVxyXG5cdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdudW1iZXJVdGlsaXR5JztcclxuXHJcbmVudW0gU2lnbiB7XHJcblx0cG9zaXRpdmUgPSAxLFxyXG5cdG5lZ2F0aXZlID0gLTEsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlcjtcclxuXHRyb3VuZFRvU3RlcChudW06IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHR9XHJcblxyXG5cdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0fVxyXG5cclxuXHRyb3VuZFRvU3RlcChudW06IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmICghc3RlcCkge1xyXG5cdFx0XHRyZXR1cm4gbnVtO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByZW1haW5kZXI6IG51bWJlciA9IG51bSAlIHN0ZXA7XHJcblxyXG5cdFx0aWYgKHJlbWFpbmRlciA+PSBzdGVwIC8gMikge1xyXG5cdFx0XHRyZXR1cm4gbnVtICsgKHN0ZXAgLSByZW1haW5kZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bSAtIHJlbWFpbmRlcjtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU51bWJlclV0aWxpdHksIHNlcnZpY2VOYW1lIGFzIG51bWJlclNlcnZpY2VOYW1lIH0gZnJvbSAnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZUZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemUge1xyXG5cdGRpc3BsYXkoKTogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBGaWxlU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVNpemUge1xyXG5cdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRCWVRFU19QRVJfTUI6IG51bWJlciA9IDEwNDg1NzY7XHJcblx0QllURVNfUEVSX0tCOiBudW1iZXIgPSAxMDI0O1xyXG5cclxuXHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRHQjogbnVtYmVyO1xyXG5cdGlzR0I6IGJvb2xlYW47XHJcblxyXG5cdE1COiBudW1iZXI7XHJcblx0aXNNQjogYm9vbGVhbjtcclxuXHJcblx0S0I6IG51bWJlcjtcclxuXHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihudW1iZXJVdGlsaXR5OiBJTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0dGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG5cclxuXHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG5cdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuXHRcdFx0dGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5pc0dCID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuXHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG5cdFx0XHRcdHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzTUIgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5LQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfS0I7XHJcblx0XHRcdFx0XHR0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNLQiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuaXNHQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmlzTUIpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLktCICsgJyBLQic7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplO1xyXG59XHJcblxyXG5maWxlU2l6ZUZhY3RvcnkuJGluamVjdCA9IFtudW1iZXJTZXJ2aWNlTmFtZV07XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZhY3RvcnkobnVtYmVyVXRpbGl0eTogSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEZpbGVTaXplU2VydmljZShudW1iZXJVdGlsaXR5LCBieXRlcyk7XHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IGZhY3RvcnlOYW1lLCBJRmlsZVNpemVGYWN0b3J5LCBJRmlsZVNpemUgfSBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5cclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuZXhwb3J0IHZhciBzaW1wbGVGaWx0ZXJOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemUnO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmlsdGVyIHtcclxuXHQoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmZpbGVTaXplRmlsdGVyLiRpbmplY3QgPSBbZmFjdG9yeU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5OiBJRmlsZVNpemVGYWN0b3J5KTogSUZpbGVTaXplRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0cmV0dXJuIChieXRlcz86IG51bWJlcik6IHN0cmluZyA9PiB7XHJcblx0XHR2YXIgZmlsZVNpemU6IElGaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcblx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdH07XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgb2JqZWN0TW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxufSBmcm9tICcuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIHN0cmluZ01vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgc3RyaW5nU2VydmljZU5hbWUsXHJcblx0SVN0cmluZ1V0aWxpdHlTZXJ2aWNlLFxyXG59IGZyb20gJy4uL3N0cmluZy9zdHJpbmcuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJRmlsdGVyIH0gZnJvbSAnLi4vLi4vZmlsdGVycy9maWx0ZXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnknO1xyXG5leHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9ICdzZWFyY2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIElGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0bWluU2VhcmNoTGVuZ3RoOiBudW1iZXI7XHJcblx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VuZXJpY1NlYXJjaEZpbHRlciBpbXBsZW1lbnRzIElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRtaW5TZWFyY2hMZW5ndGg6IG51bWJlciA9IDE7XHJcblx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdDogSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpIHx8IHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPCB0aGlzLm1pblNlYXJjaExlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QoaXRlbSwgdGhpcy5zZWFyY2hUZXh0LCB0aGlzLmNhc2VTZW5zaXRpdmUpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG5cdFx0XHR2YXIgdmFsdWVzOiBhbnkgPSBfLnZhbHVlcyhpdGVtKTtcclxuXHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuXHJcblx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG59XHJcblxyXG5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lLCBzdHJpbmdTZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdDogSU9iamVjdFV0aWxpdHksXHJcblx0c3RyaW5nVXRpbGl0eTogSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0TW9kdWxlTmFtZSwgc3RyaW5nTW9kdWxlTmFtZV0pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlcjtcclxuXHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxpdHlTZXJ2aWNlIGltcGxlbWVudHMgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gK3N0cmluZztcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcblx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ndWlkJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2d1aWRTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZztcclxuXHRyYW5kb20oKTogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBHdWlkU2VydmljZSBpbXBsZW1lbnRzIElHdWlkU2VydmljZSB7XHJcblx0dGltZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHV1aWQudjEoKTtcclxuXHR9XHJcblxyXG5cdHJhbmRvbSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHV1aWQudjQoKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBHdWlkU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2d1aWQvZ3VpZC5zZXJ2aWNlLnRzXG4gKiovIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbi8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4vLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxudmFyIF9ybmcgPSByZXF1aXJlKCcuL3JuZycpO1xuXG4vLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxudmFyIF9ieXRlVG9IZXggPSBbXTtcbnZhciBfaGV4VG9CeXRlID0ge307XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbn1cblxuLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG5mdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgYnVmID0gYnVmIHx8IFtdO1xuICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICBidWZbaSArIGlpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4vLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxudmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xufVxuXG4vLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG59XG5cbi8vIEV4cG9ydCBwdWJsaWMgQVBJXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xudXVpZC5wYXJzZSA9IHBhcnNlO1xudXVpZC51bnBhcnNlID0gdW5wYXJzZTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXVpZC91dWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxudmFyIHJuZztcblxuaWYgKGdsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICByZXR1cm4gX3JuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXVpZC9ybmctYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgSU5vdGlmaWVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VOb3RpZmllciB9IGZyb20gJy4vYmFzZU5vdGlmaWVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdub3RpZmljYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJTm90aWZpY2F0aW9uU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5pbmZvKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIud2FybmluZyhtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci5lcnJvcihtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLnN1Y2Nlc3MobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBhbmd1bGFyLklTZXJ2aWNlUHJvdmlkZXIge1xyXG5cdHNldE5vdGlmaWVyKG5vdGlmaWVyOiBJTm90aWZpZXIpOiB2b2lkO1xyXG5cdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgZXh0ZW5kcyBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIHtcclxuXHRub3RpZmllcjogSU5vdGlmaWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0bGV0IHByb3ZpZGVyOiBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVySW50ZXJuYWwgPSB7XHJcblx0XHRub3RpZmllcjogbmV3IEJhc2VOb3RpZmllcigpLFxyXG5cdFx0c2V0Tm90aWZpZXI6IChub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdH0sXHJcblx0XHQkZ2V0OiAoKTogSU5vdGlmaWNhdGlvblNlcnZpY2UgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdHJldHVybiBwcm92aWRlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnByb3ZpZGVyKHNlcnZpY2VOYW1lLCBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTm90aWZpZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTm90aWZpZXIgaW1wbGVtZW50cyBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHdpbmRvdy5hbGVydChtZXNzYWdlKTtcclxuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZyBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0ZXZlbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHdhdGNoZXJzOiBJV2F0Y2hlcjxhbnk+W10gPSBbXTtcclxuXHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0aWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0cmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdH0pXHJcblx0XHQubWFwKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0fSkudmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5cclxubmcubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdGJlaGF2aW9yOiBUQmVoYXZpb3I7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdHZpZXdEYXRhPzogSVZpZXdEYXRhPFRCZWhhdmlvcj47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yO1xyXG5cdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGU7XHJcblx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdO1xyXG5cdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciB7XHJcblx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdDogbnVsbDtcclxuXHR9XHJcblxyXG5cdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPlxyXG5cdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGUge1xyXG5cdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdHJldHVybiBfLm1hcChiZWhhdmlvcnMsIChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXSB7XHJcblx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChiZWhhdmlvcjogVEJlaGF2aW9yKTogYm9vbGVhbiA9PiB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZCB7XHJcblx0XHRpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRCZWhhdmlvcjogVEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2VVdGlsaXR5IHtcclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbjtcclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgUHJvbWlzZVV0aWxpdHkgaW1wbGVtZW50cyBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHEnLCAnJGluamVjdG9yJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSkge31cclxuXHJcblx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIF8uaXNPYmplY3QocHJvbWlzZSkgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UudGhlbikgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UuY2F0Y2gpO1xyXG5cdH1cclxuXHJcblx0cmVzb2x2ZVByb21pc2VzKHJlc29sdmVzOiBhbnkpOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHByb21pc2VzOiBhbnkgPSB7fTtcclxuXHRcdF8uZWFjaChyZXNvbHZlcywgKHZhbHVlOiBhbnksIGtleTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24odmFsdWUpIHx8IF8uaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih0aGlzLiRpbmplY3Rvci5pbnZva2UodmFsdWUpKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih0aGlzLiRpbmplY3Rvci5nZXQodmFsdWUpKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJvbWlzZXNba2V5XSA9ICh0aGlzLiRxLndoZW4odmFsdWUpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuJHEuYWxsKHByb21pc2VzKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdzeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2Uge1xyXG5cdGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXI7XHJcblx0aGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjaztcclxuXHJcblx0Z2V0RGF0YSguLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0cHJpdmF0ZSByZXF1ZXN0SWQ6IG51bWJlciA9IDA7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXJcclxuXHRcdFx0LCBwdWJsaWMgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFja1xyXG5cdFx0XHQsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7IH1cclxuXHJcblx0Z2V0RGF0YSguLi5wYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblx0XHQvLyBpbmNyZW1lbnQgdGhlIGlkIGZpcnN0IC0gc2hvdWxkIG1hdGNoIGN1cnJlbnQgcmVxdWVzdCBpZFxyXG5cdFx0dGhpcy5yZXF1ZXN0SWQrKztcclxuXHRcdGxldCBjdXJyZW50UmVxdWVzdElkOiBudW1iZXIgPSB0aGlzLnJlcXVlc3RJZDtcclxuXHRcdHRoaXMuJHEud2hlbih0aGlzLmRhdGFQcm92aWRlciguLi5wYXJhbXMpKS50aGVuKCguLi5kYXRhOiBhbnlbXSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoY3VycmVudFJlcXVlc3RJZCA9PSB0aGlzLnJlcXVlc3RJZCkge1xyXG5cdFx0XHRcdHRoaXMuaGFuZGxlUmVxdWVzdCguLi5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0R2V0dGVyIHtcclxuXHQoLi4ucGFyYW1zOiBhbnlbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdENhbGxiYWNrIHtcclxuXHQoLi4uZGF0YTogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKGRhdGFQcm92aWRlcjogSVJlcXVlc3RHZXR0ZXIsIGhhbmRsZVJlcXVlc3Q6IElSZXF1ZXN0Q2FsbGJhY2spOiBJU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlO1xyXG59XHJcblxyXG5zeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuJGluamVjdCA9IFsnJHEnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSgkcTogYW5ndWxhci5JUVNlcnZpY2UpOiBJU3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2Uge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZShkYXRhUHJvdmlkZXIsIGhhbmRsZVJlcXVlc3QsICRxKTtcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgbW9jayBmcm9tICcuL21vY2snO1xyXG5leHBvcnQgeyBtb2NrIH07XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2FuZ3VsYXJGaXh0dXJlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRtb2NrLm1vZHVsZU5hbWUsXHJcbl0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyB1c2VzIHNpbm9uIGJ1dCBjYW4ndCBpbXBvcnQgYmVjYXVzZSBzaW5vbiB1c2VzIGR5bmFtaWMgcmVxdWlyZXNcclxuLy8gc2lub24gdHlwZXMgd2lsbCBiZSByZXNvbHZlZCBmcm9tIHRzZC5kLnRzXHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5tb2NrJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vY2tVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueTtcclxuXHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdHByb21pc2U6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT47XHJcblx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNsYXNzIE1vY2sge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHEnLCAnJHJvb3RTY29wZSddO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuXHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc2VydmljZSkpIHtcclxuXHRcdFx0c2VydmljZSA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0cmV0dXJuIHNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0dmFyIGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxURGF0YVR5cGU+ID0gdGhpcy4kcS5kZWZlcigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKC4uLnBhcmFtczogYW55W10pOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyPFREYXRhVHlwZT4oKTtcclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogYW5ndWxhci5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzOiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPltdID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcblx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHQvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0XHJcblx0XHQvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG5cdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBNb2NrKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICdhbmd1bGFyLW1vY2tzJztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRpbmplY3Q6ICguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbmd1bGFyLklTY29wZSk6IElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxufVxyXG5cclxuY2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG5cdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuXHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0Ly8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG5cdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0YW5ndWxhci5tb2NrLmluamVjdChpbmplY3RQYXJhbWV0ZXJzKTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0fVxyXG5cclxuXHRtb2NrKG1vY2tzOiBhbnkpOiB2b2lkIHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBhbmd1bGFyLmF1dG8uSVByb3ZpZGVTZXJ2aWNlKSA9PiB7XHJcblx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0JHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnRyb2xsZXJXaXRoQmluZGluZ3M8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBiaW5kaW5ncz86IGFueSwgbG9jYWxzPzogYW55LCBzY29wZT86IGFueSlcclxuXHRcdDogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHR2YXIgJGNvbnRyb2xsZXI6IGFuZ3VsYXIuSUNvbnRyb2xsZXJTZXJ2aWNlID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2NvcGU6IHNjb3BlLFxyXG5cdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGJpbmRpbmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRkaXJlY3RpdmU8VENvbnRyb2xsZXJUeXBlPihkaXJlY3RpdmVOYW1lOiBzdHJpbmcsIGRvbTogc3RyaW5nLCBzY29wZTogYW55KTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuXHRcdHNjb3BlID0gXy5leHRlbmQoc2VydmljZXMuJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHR2YXIgJGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0dmFyIGNvbXBvbmVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5ID0gJGNvbXBpbGUoZG9tKShzY29wZSk7XHJcblx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcblx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdGNvbnRyb2xsZXI6IGNvbXBvbmVudC5jb250cm9sbGVyKGRpcmVjdGl2ZU5hbWUpLFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgYW5ndWxhckZpeHR1cmU6IElBbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRtb2R1bGVOYW1lIGFzIG5vdGlmaWNhdGlvbk1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgbm90aWZpY2F0aW9uU2VydmljZU5hbWUsXHJcblx0SU5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElWYWxpZGF0b3IsIFZhbGlkYXRvciwgSUVycm9ySGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdG9yJztcclxuaW1wb3J0IHsgSUNvbXBvc2l0ZVZhbGlkYXRvciwgQ29tcG9zaXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9jb21wb3NpdGVWYWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IHsgSVVucmVnaXN0ZXJGdW5jdGlvbiwgSVZhbGlkYXRvciwgSUVycm9ySGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdG9yJztcclxuZXhwb3J0IHsgSUNvbXBvc2l0ZVZhbGlkYXRvciB9IGZyb20gJy4vY29tcG9zaXRlVmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3ZhbGlkYXRpb25GYWN0b3J5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25IYW5kbGVyIHtcclxuXHRpc0FjdGl2ZT86IHsoKTogYm9vbGVhbn0gfCBib29sZWFuO1xyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0ZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCB7KCk6IHN0cmluZ307XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyB3YXJuaW5nIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgdXNlcyBlcnJvciBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCB1c2VzIGEgY3VzdG9tIGhhbmRsZXIgdG8gc2hvdyBlcnJvcnNcclxuXHQqXHJcblx0KiBAcGFyYW0gc2hvd0Vycm9yIEEgY3VzdG9tIGhhbmRsZXIgZm9yIHZhbGlkYXRpb24gZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZEN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIHdhcm5pbmcgbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCBncm91cHMgY2hpbGQgdmFsaWRhdG9yc1xyXG5cdCogYW5kIHVzZXMgZXJyb3Igbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG5cclxuXHQvKipcclxuXHQqIEJ1aWxkIGEgdmFsaWRhdG9yIHRoYXQgZ3JvdXBzIGNoaWxkIHZhbGlkYXRvcnNcclxuXHQqIGFuZCB1c2VzIGEgY3VzdG9tIGhhbmRsZXIgdG8gc2hvdyBlcnJvcnNcclxuXHQqXHJcblx0KiBAcGFyYW0gc2hvd0Vycm9yIEEgY3VzdG9tIGhhbmRsZXIgZm9yIHZhbGlkYXRpb24gZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZENvbXBvc2l0ZUN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFtub3RpZmljYXRpb25TZXJ2aWNlTmFtZV07XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25TZXJ2aWNlKSB7IH1cclxuXHJcblx0YnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24ud2FybmluZyhlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0b3Ioc2hvd0Vycm9yKTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uV2FybmluZ1ZhbGlkYXRvcigpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBDb21wb3NpdGVWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRidWlsZENvbXBvc2l0ZUN1c3RvbVZhbGlkYXRvcihzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpOiBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgQ29tcG9zaXRlVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbm90aWZpY2F0aW9uTW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFZhbGlkYXRpb25TZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJVmFsaWRhdGlvblNlcnZpY2UsIElWYWxpZGF0aW9uSGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRvciB7XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlcjtcclxuXHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9ySGFuZGxlciB7XHJcblx0KGVycm9yOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yIGltcGxlbWVudHMgSVZhbGlkYXRvciB7XHJcblx0cHJpdmF0ZSB2YWxpZGF0aW9uSGFuZGxlcnM6IHsgW2luZGV4OiBzdHJpbmddOiBJVmFsaWRhdGlvbkhhbmRsZXIgfSA9IHt9O1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpIHt9XHJcblxyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdF8uZWFjaCh0aGlzLnZhbGlkYXRpb25IYW5kbGVycywgKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNBY3RpdmU6IGJvb2xlYW4gPSB0aGlzLmlzQWN0aXZlKGhhbmRsZXIpO1xyXG5cclxuXHRcdFx0aWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGxldCBlcnJvcjogc3RyaW5nID0gdGhpcy5lcnJvck1lc3NhZ2UoaGFuZGxlcik7XHJcblx0XHRcdFx0dGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKDxhbnk+dGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChjb3VudDogbnVtYmVyLCBoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHR2YXIgaXNBY3RpdmU6IGJvb2xlYW4gPSB0aGlzLmlzQWN0aXZlKGhhbmRsZXIpO1xyXG5cclxuXHRcdFx0aWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuXHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gY291bnQ7XHJcblx0XHR9LCAwKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHR0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0ZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzQWN0aXZlKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIChfLmlzRnVuY3Rpb24oaGFuZGxlci5pc0FjdGl2ZSkgJiYgKDx7KCk6IGJvb2xlYW59PmhhbmRsZXIuaXNBY3RpdmUpKCkpXHJcblx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG5cdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBlcnJvck1lc3NhZ2UoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBfLmlzRnVuY3Rpb24oaGFuZGxlci5lcnJvck1lc3NhZ2UpXHJcblx0XHRcdD8gKDx7ICgpOiBzdHJpbmcgfT5oYW5kbGVyLmVycm9yTWVzc2FnZSkoKVxyXG5cdFx0XHQ6IDxzdHJpbmc+aGFuZGxlci5lcnJvck1lc3NhZ2U7XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0b3IudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJVmFsaWRhdGlvblNlcnZpY2UsIElWYWxpZGF0aW9uSGFuZGxlciB9IGZyb20gJy4vdmFsaWRhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVZhbGlkYXRvciwgVmFsaWRhdG9yLCBJRXJyb3JIYW5kbGVyLCBJVW5yZWdpc3RlckZ1bmN0aW9uIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5cclxuaW50ZXJmYWNlIElSZWdpc3RlcmVkVmFsaWRhdG9yIGV4dGVuZHMgSVZhbGlkYXRvciB7XHJcblx0a2V5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlcjtcclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElWYWxpZGF0b3I7XHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVZhbGlkYXRvcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVWYWxpZGF0b3IgaW1wbGVtZW50cyBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIGNoaWxkVmFsaWRhdG9yczogeyBbaW5kZXg6IHN0cmluZ106IElWYWxpZGF0b3IgfSA9IHt9O1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzaG93RXJyb3I6IElFcnJvckhhbmRsZXIpIHt9XHJcblxyXG5cdHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdF8uZWFjaCh0aGlzLmNoaWxkVmFsaWRhdG9ycywgKGhhbmRsZXI6IElWYWxpZGF0b3IpOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKCFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBfLnJlZHVjZSg8YW55PnRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoY291bnQ6IG51bWJlciwgaGFuZGxlcjogSVZhbGlkYXRvcik6IG51bWJlciA9PiB7XHJcblx0XHRcdHJldHVybiBjb3VudCArPSBoYW5kbGVyLmdldEVycm9yQ291bnQoKTtcclxuXHRcdH0sIDApO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDaGlsZFZhbGlkYXRvcigpOiBJVmFsaWRhdG9yIHtcclxuXHRcdGxldCB2YWxpZGF0b3I6IElWYWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMuc2hvd0Vycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMuY2hpbGRWYWxpZGF0b3JzW2N1cnJlbnRLZXldID0gdmFsaWRhdG9yO1xyXG5cdFx0KDxJUmVnaXN0ZXJlZFZhbGlkYXRvcj52YWxpZGF0b3IpLmtleSA9IGN1cnJlbnRLZXk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbGlkYXRvcjtcclxuXHR9XHJcblxyXG5cdHVucmVnaXN0ZXJDaGlsZCh2YWxpZGF0b3I6IElWYWxpZGF0b3IpOiB2b2lkIHtcclxuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkVmFsaWRhdG9yc1soPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5XTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcGFyZVJlc3VsdCc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdHlwZXMvdHlwZXMubW9kdWxlLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==