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
	var types = __webpack_require__(51);
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
	var date = __webpack_require__(22);
	exports.date = date;
	var fileSize = __webpack_require__(29);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(33);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(35);
	exports.guid = guid;
	var moment = __webpack_require__(23);
	exports.moment = moment;
	var notification = __webpack_require__(38);
	exports.notification = notification;
	var numberService = __webpack_require__(30);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(41);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(42);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(43);
	exports.promise = promise;
	var stringService = __webpack_require__(34);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(44);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(45);
	exports.test = test;
	var time = __webpack_require__(25);
	exports.time = time;
	var validation = __webpack_require__(48);
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
	var baseSingletonData_service_1 = __webpack_require__(18);
	var mocks = __webpack_require__(20);
	exports.mocks = mocks;
	exports.moduleName = 'rl.utilities.services.dataContracts';
	__export(__webpack_require__(21));
	var baseData_service_2 = __webpack_require__(15);
	exports.BaseDataService = baseData_service_2.BaseDataService;
	exports.baseDataServiceFactoryName = baseData_service_2.factoryName;
	__export(__webpack_require__(17));
	var baseSingletonData_service_2 = __webpack_require__(18);
	exports.BaseSingletonDataService = baseSingletonData_service_2.BaseSingletonDataService;
	exports.baseSingletonDataServiceFactoryName = baseSingletonData_service_2.factoryName;
	__export(__webpack_require__(19));
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
	var baseDataServiceView_1 = __webpack_require__(16);
	var baseParentData_service_1 = __webpack_require__(17);
	var baseSingletonData_service_1 = __webpack_require__(18);
	var baseParentSingletonData_service_1 = __webpack_require__(19);
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
	exports.moduleName = 'rl.utilities.services.baseDataService';
	exports.factoryName = 'baseDataService';
	var BaseDataService = (function () {
	    function BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests) {
	        this.$http = $http;
	        this.$q = $q;
	        this.array = array;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	    }
	    BaseDataService.prototype.getItemEndpoint = function (id) {
	        return this.endpoint + '/' + id.toString();
	    };
	    BaseDataService.prototype.getList = function (params) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(this.mockData);
	        }
	        else {
	            promise = this.$http.get(this.endpoint, { params: params })
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _.map(data, _this.transform);
	            }
	            if (_this.logRequests) {
	                _this.log('getList', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.getDetail = function (id) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(_.find(this.mockData, function (item) {
	                return item.id === id;
	            }));
	        }
	        else {
	            promise = this.$http.get(this.getItemEndpoint(id))
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _this.transform(data);
	            }
	            if (_this.logRequests) {
	                _this.log('getDetail', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.create = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            var nextId = _.max(this.mockData, 'id').id + 1;
	            domainObject.id = nextId;
	            this.mockData.push(domainObject);
	            promise = this.$q.when(domainObject);
	        }
	        else {
	            promise = this.$http.post(this.endpoint, JSON.stringify(domainObject))
	                .then(function (result) {
	                return result.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.logRequests) {
	                _this.log('create', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            var oldObject = _.find(this.mockData, _.find(this.mockData, function (item) {
	                return item.id === domainObject.id;
	            }));
	            oldObject = _.assign(oldObject, domainObject);
	            promise = this.$q.when(oldObject);
	        }
	        else {
	            promise = this.$http.put(this.getItemEndpoint(domainObject.id), domainObject);
	        }
	        return promise.then(function (data) {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.delete = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            this.array.remove(this.mockData, domainObject);
	            promise = this.$q.when();
	        }
	        else {
	            promise = this.$http.delete(this.getItemEndpoint(domainObject.id)).then(function () { return null; });
	        }
	        return promise.then(function () {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	        });
	    };
	    BaseDataService.prototype.log = function (requestName, data) {
	        var mockString = this.useMock ? 'Mocked ' : '';
	        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
	        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
	        console.log(data);
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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseData_service_1 = __webpack_require__(15);
	var baseParentData_service_1 = __webpack_require__(17);
	var baseSingletonData_service_1 = __webpack_require__(18);
	var baseParentSingletonData_service_1 = __webpack_require__(19);
	var BaseDataServiceView = (function (_super) {
	    __extends(BaseDataServiceView, _super);
	    function BaseDataServiceView($http, $q, array, _endpoint, mockData, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, array, _endpoint, mockData, transform, useMock, logRequests);
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
	exports.factoryName = 'baseSingletonDataService';
	var BaseSingletonDataService = (function () {
	    function BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests) {
	        this.$http = $http;
	        this.$q = $q;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	    }
	    BaseSingletonDataService.prototype.get = function () {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(this.mockData);
	        }
	        else {
	            promise = this.$http.get(this.endpoint)
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _this.transform(data);
	            }
	            if (_this.logRequests) {
	                _this.log('get', data);
	            }
	            return data;
	        });
	    };
	    BaseSingletonDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            this.mockData = _.assign(this.mockData, domainObject);
	            promise = this.$q.when(this.mockData);
	        }
	        else {
	            promise = this.$http.put(this.endpoint, domainObject);
	        }
	        return promise.then(function (data) {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	            return data;
	        });
	    };
	    BaseSingletonDataService.prototype.log = function (requestName, data) {
	        var mockString = this.useMock ? 'Mocked ' : '';
	        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
	        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
	        console.log(data);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseSingletonData_service_1 = __webpack_require__(18);
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
/* 20 */
/***/ function(module, exports) {

	// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
	'use strict';


/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(23);
	var time_service_1 = __webpack_require__(25);
	var date_service_1 = __webpack_require__(26);
	var dateTimeFormatStrings_1 = __webpack_require__(28);
	__export(__webpack_require__(26));
	__export(__webpack_require__(28));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var time_service_1 = __webpack_require__(25);
	var moment_module_1 = __webpack_require__(23);
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
	            return this.moment(date, this.format(dateFormat)).toDate();
	        }
	    };
	    DateUtility.prototype.getDateFromISOString = function (date) {
	        return this.moment(date).toDate();
	    };
	    DateUtility.prototype.isDate = function (date, dateFormat) {
	        return _.isDate(date)
	            || this.moment(date, this.format(dateFormat)).isValid();
	    };
	    DateUtility.prototype.getNow = function () {
	        return new Date();
	    };
	    DateUtility.prototype.format = function (customFormat) {
	        return customFormat != null ? customFormat : this.baseFormat;
	    };
	    DateUtility.$inject = [moment_module_1.serviceName, time_service_1.serviceName];
	    return DateUtility;
	})();
	exports.DateUtility = DateUtility;


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
/***/ function(module, exports) {

	'use strict';
	exports.dateTimeFormatServiceName = 'dateTimeFormatStrings';
	exports.defaultFormats = {
	    dateTimeFormat: 'M/D/YYYY h:mm A',
	    dateFormat: 'M/D/YYYY',
	    timeFormat: 'h:mmA',
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(30);
	var fileSize_service_1 = __webpack_require__(31);
	var fileSizeFilter_1 = __webpack_require__(32);
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);


/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(30);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(31);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(34);
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var uuid = __webpack_require__(36);
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(37);
	
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
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(39);
	__export(__webpack_require__(40));
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
/* 39 */
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
/* 40 */
/***/ function(module, exports) {

	'use strict';


/***/ },
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(46);
	exports.mock = mock;
	__export(__webpack_require__(47));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);


/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var notification_service_1 = __webpack_require__(38);
	var validator_1 = __webpack_require__(49);
	var compositeValidator_1 = __webpack_require__(50);
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var validator_1 = __webpack_require__(49);
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(27));


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2JlMmEyYzFhMDkwMWVkN2FmMjkiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2RhdGFTZXJ2aWNlTW9ja3MudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2d1aWQvZ3VpZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL34vdXVpZC91dWlkLmpzIiwid2VicGFjazovLy8uL34vdXVpZC9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvdHlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbInN0b3BFdmVudFByb3BhZ2F0aW9uIiwic3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayIsImlzRW1wdHkiLCJPYmplY3RVdGlsaXR5IiwiT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsIk9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSIsIk9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlIiwiT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsIk9iamVjdFV0aWxpdHkudG9TdHJpbmciLCJPYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0IiwiQXJyYXlVdGlsaXR5IiwiQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwiQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwiQXJyYXlVdGlsaXR5LnJlbW92ZSIsIkFycmF5VXRpbGl0eS5yZXBsYWNlIiwiQXJyYXlVdGlsaXR5LnN1bSIsIkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJBcnJheVV0aWxpdHkubGFzdCIsInRydW5jYXRlIiwiQm9vbGVhblV0aWxpdHkiLCJCb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNvbnN0cnVjdG9yIiwiQmFzZVJlc291cmNlQnVpbGRlci5nZXRMaWJyYXJ5U2VydmljZXMiLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVSZXNvdXJjZVZpZXciLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVBhcmVudFJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXciLCJCYXNlUmVzb3VyY2VCdWlsZGVyLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlIiwiQmFzZVJlc291cmNlQnVpbGRlci5jcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZSIsIkJhc2VSZXNvdXJjZUJ1aWxkZXIudXNlTW9ja0lmTm9FbmRwb2ludCIsIkJhc2VEYXRhU2VydmljZSIsIkJhc2VEYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZS5nZXRJdGVtRW5kcG9pbnQiLCJCYXNlRGF0YVNlcnZpY2UuZ2V0TGlzdCIsIkJhc2VEYXRhU2VydmljZS5nZXREZXRhaWwiLCJCYXNlRGF0YVNlcnZpY2UuY3JlYXRlIiwiQmFzZURhdGFTZXJ2aWNlLnVwZGF0ZSIsIkJhc2VEYXRhU2VydmljZS5kZWxldGUiLCJCYXNlRGF0YVNlcnZpY2UubG9nIiwiYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSIsImJhc2VEYXRhU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJCYXNlRGF0YVNlcnZpY2VWaWV3IiwiQmFzZURhdGFTZXJ2aWNlVmlldy5jb25zdHJ1Y3RvciIsIkJhc2VEYXRhU2VydmljZVZpZXcuQXNTaW5nbGV0b24iLCJCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IiwiQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldy5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcuQXNTaW5nbGV0b24iLCJCYXNlUGFyZW50RGF0YVNlcnZpY2UiLCJCYXNlUGFyZW50RGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlUGFyZW50RGF0YVNlcnZpY2UuY2hpbGRDb250cmFjdHMiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UuY29uc3RydWN0b3IiLCJCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UuZ2V0IiwiQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLnVwZGF0ZSIsIkJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5sb2ciLCJiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5IiwiYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jb25zdHJ1Y3RvciIsIkJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5jaGlsZENvbnRyYWN0cyIsIkNvbnRyYWN0TGlicmFyeSIsIkNvbnRyYWN0TGlicmFyeS5jb25zdHJ1Y3RvciIsIkNvbnRyYWN0TGlicmFyeS5mbHVzaCIsIkNvbnRyYWN0TGlicmFyeS5tb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXRMaXN0IiwiQ29udHJhY3RMaWJyYXJ5Lm1vY2tHZXREZXRhaWwiLCJDb250cmFjdExpYnJhcnkubW9ja0NoaWxkIiwiQ29udHJhY3RMaWJyYXJ5LmNyZWF0ZU1vY2siLCJDb250cmFjdExpYnJhcnkuY3JlYXRlTW9ja1BhcmVudCIsIkNvbnRyYWN0TGlicmFyeS5jcmVhdGVNb2NrU2luZ2xldG9uIiwiQ29udHJhY3RMaWJyYXJ5LnVwZGF0ZVJlc291cmNlIiwiQ29udHJhY3RMaWJyYXJ5LmJhc2VNb2NrR2V0IiwiQ29udHJhY3RMaWJyYXJ5LnNpbm9uIiwibW9tZW50V3JhcHBlciIsIlRpbWVVdGlsaXR5IiwiVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJUaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwiVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIiwiRGF0ZVV0aWxpdHkiLCJEYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsIkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJEYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwiRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsIkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbkRheXMiLCJEYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyIsIkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsIkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwiRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsIkRhdGVVdGlsaXR5LmdldERhdGVGcm9tSVNPU3RyaW5nIiwiRGF0ZVV0aWxpdHkuaXNEYXRlIiwiRGF0ZVV0aWxpdHkuZ2V0Tm93IiwiRGF0ZVV0aWxpdHkuZm9ybWF0IiwiQ29tcGFyZVJlc3VsdCIsImdldENvbXBhcmVSZXN1bHQiLCJTaWduIiwiTnVtYmVyVXRpbGl0eSIsIk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJOdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsIk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsIk51bWJlclV0aWxpdHkucm91bmRUb1N0ZXAiLCJGaWxlU2l6ZVNlcnZpY2UiLCJGaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlU2l6ZVNlcnZpY2UuZGlzcGxheSIsImZpbGVTaXplRmFjdG9yeSIsImZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsImZpbGVTaXplRmlsdGVyIiwiR2VuZXJpY1NlYXJjaEZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJHZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsIkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwiZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJTdHJpbmdVdGlsaXR5U2VydmljZS50b051bWJlciIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnRhaW5zIiwiU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsIlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnJlcGxhY2VBbGwiLCJHdWlkU2VydmljZSIsIkd1aWRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiR3VpZFNlcnZpY2UudGltZSIsIkd1aWRTZXJ2aWNlLnJhbmRvbSIsIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJOb3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiTm90aWZpY2F0aW9uU2VydmljZS5pbmZvIiwiTm90aWZpY2F0aW9uU2VydmljZS53YXJuaW5nIiwiTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsIk5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyIsIm5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciIsIkJhc2VOb3RpZmllciIsIkJhc2VOb3RpZmllci5jb25zdHJ1Y3RvciIsIkJhc2VOb3RpZmllci5pbmZvIiwiQmFzZU5vdGlmaWVyLndhcm5pbmciLCJCYXNlTm90aWZpZXIuZXJyb3IiLCJCYXNlTm90aWZpZXIuc3VjY2VzcyIsIkJhc2VOb3RpZmllci5ub3RpZnkiLCJPYnNlcnZhYmxlU2VydmljZSIsIk9ic2VydmFibGVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiT2JzZXJ2YWJsZVNlcnZpY2UucmVnaXN0ZXIiLCJPYnNlcnZhYmxlU2VydmljZS5maXJlIiwiT2JzZXJ2YWJsZVNlcnZpY2UudW5yZWdpc3RlciIsIm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSIsIm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwiUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsIlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsIlByb21pc2VVdGlsaXR5IiwiUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJQcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJQcm9taXNlVXRpbGl0eS5yZXNvbHZlUHJvbWlzZXMiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UuZ2V0RGF0YSIsInN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSIsInN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS5nZXRJbnN0YW5jZSIsIk1vY2siLCJNb2NrLmNvbnN0cnVjdG9yIiwiTW9jay5zZXJ2aWNlIiwiTW9jay5wcm9taXNlIiwiTW9jay5wcm9taXNlV2l0aENhbGxiYWNrIiwiTW9jay5mbHVzaCIsIkFuZ3VsYXJGaXh0dXJlIiwiQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJBbmd1bGFyRml4dHVyZS5pbmplY3QiLCJBbmd1bGFyRml4dHVyZS5tb2NrIiwiQW5ndWxhckZpeHR1cmUuY29udHJvbGxlcldpdGhCaW5kaW5ncyIsIkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsIlZhbGlkYXRpb25TZXJ2aWNlIiwiVmFsaWRhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZE5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDdXN0b21WYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IiLCJWYWxpZGF0aW9uU2VydmljZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yIiwiVmFsaWRhdGlvblNlcnZpY2UuYnVpbGRDb21wb3NpdGVDdXN0b21WYWxpZGF0b3IiLCJWYWxpZGF0b3IiLCJWYWxpZGF0b3IuY29uc3RydWN0b3IiLCJWYWxpZGF0b3IudmFsaWRhdGUiLCJWYWxpZGF0b3IuZ2V0RXJyb3JDb3VudCIsIlZhbGlkYXRvci5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyIiwiVmFsaWRhdG9yLnVucmVnaXN0ZXIiLCJWYWxpZGF0b3IuaXNBY3RpdmUiLCJWYWxpZGF0b3IuZXJyb3JNZXNzYWdlIiwiQ29tcG9zaXRlVmFsaWRhdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLmNvbnN0cnVjdG9yIiwiQ29tcG9zaXRlVmFsaWRhdG9yLnZhbGlkYXRlIiwiQ29tcG9zaXRlVmFsaWRhdG9yLmdldEVycm9yQ291bnQiLCJDb21wb3NpdGVWYWxpZGF0b3IuYnVpbGRDaGlsZFZhbGlkYXRvciIsIkNvbXBvc2l0ZVZhbGlkYXRvci51bnJlZ2lzdGVy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SUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDekNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1NBQ2RBLENBQUNBO1NBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2FBQ3JCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtTQUNkQSxDQUFDQTtTQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsS0FBS0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2pDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTthQUNkQSxDQUFDQTthQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtpQkFDOUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO3FCQUMvQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7aUJBQ2RBLENBQUNBO2FBQ0ZBLENBQUNBO1NBQ0ZBLENBQUNBO1NBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2FBQy9CQSx3Q0FBd0NBO2FBQ3hDQSxJQUFJQSxLQUFLQSxHQUFhQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNuQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFB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LENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBLHlCQUF5QkEsRUFBRUEsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FDdk1BLENBQUNBO0tBRUROLHFEQUF1QkEsR0FBdkJBLFVBQW1DQSxPQUE0Q0E7U0FDOUVPLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDNUNBLE1BQU1BLENBQUNBLElBQUlBLG9EQUF3QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FDdkpBLENBQUNBO0tBRURQLDJEQUE2QkEsR0FBN0JBLFVBQ0VBLE9BQTJFQTtTQUM1RVEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtTQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0VBQThCQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSx5QkFBeUJBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENB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LEdBQUdBO2FBQ1pBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN2REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBQ0EsSUFBWUEsSUFBZUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDakdBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNyREEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTthQUN6REEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO2FBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7YUFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTtVQUN4REEsQ0FBQ0E7S0FDSEEsQ0FBQ0E7S0FLT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7U0FDL0JFLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0tBQy9DQSxDQUFDQTtLQUVERixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7U0FDMUJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBO0tBQy9CQSxDQUFDQTtLQUVESCw2QkFBT0EsR0FBUEEsVUFBUUEsS0FBYUEsRUFBRUEsSUFBYUE7U0FDbkNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0tBQ3JDQSxDQUFDQTtLQUVESixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7U0FDMUVLLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNiQSxDQUFDQTtTQUVEQSxJQUFJQSxTQUFTQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtTQUN0REEsSUFBSUEsT0FBT0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7U0FFbERBLElBQUlBLE1BQU1BLEdBQW9CQSxFQUFFQSxDQUFDQTtTQUNqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7U0FDdERBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLFdBQVdBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1NBQy9EQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtTQUUxREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDckJBLE1BQU1BLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO2FBQ25CQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtTQUM1RUEsQ0FBQ0E7U0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENB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QSxJQUFJQSxRQUFRQSxHQUFRQSxFQUFFQSxDQUFDQTtTQUN2QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsS0FBVUEsRUFBRUEsR0FBUUE7YUFDckNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUM3Q0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDOURBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2lCQUM5QkEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDM0RBLENBQUNBO2FBQUNBLElBQUlBLENBQUNBLENBQUNBO2lCQUNQQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN2Q0EsQ0FBQ0E7U0FDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7S0FDOUJBLENBQUNBO0tBcEJNSCxzQkFBT0EsR0FBYUEsQ0FB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LENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO1NBQ3pDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNQQSxDQUFDQTtLQUVESCxnREFBbUJBLEdBQW5CQTtTQUFBSSxpQkFXQ0E7U0FWQUEsSUFBSUEsU0FBU0EsR0FBZUEsSUFBSUEscUJBQVNBLENBQUNBLFVBQUNBLEtBQWFBO2FBQ3ZEQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtTQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFSEEsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7U0FDdENBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1NBQ2ZBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO1NBQ3RCQSxTQUFVQSxDQUFDQSxHQUFHQSxHQUFHQSxVQUFVQSxDQUFDQTtTQUVuREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7S0FDbEJBLENBQUNBO0tBRURKLDRDQUFlQSxHQUFmQSxVQUFnQkEsU0FBcUJBO1NBQ3BDSyxPQUFPQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUF3QkEsU0FBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7S0FDcEVBLENBQUNBO0tBQ0ZMLHlCQUFDQTtBQUFEQSxFQUFDQSxJQUFBO0FBekNZLDJCQUFrQixxQkF5QzlCOzs7Ozs7O0FDM0RELGFBQVksQ0FBQzs7OztBQUViLDhCQUFjLEVBQWlCLENBQUMiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwib3V0cHV0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3YmUyYTJjMWEwOTAxZWQ3YWYyOVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBiZWhhdmlvcnMgZnJvbSAnLi9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGZpbHRlcnMgZnJvbSAnLi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgc2VydmljZXMgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzL3R5cGVzLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgeyBiZWhhdmlvcnMsIGZpbHRlcnMsIHNlcnZpY2VzLCB0eXBlcyB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRiZWhhdmlvcnMubmFtZSxcclxuXHRmaWx0ZXJzLm5hbWUsXHJcblx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3V0aWxpdGllcy50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiYW5ndWxhclwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIHN0b3BFdmVudFByb3BvZ2F0aW9uIGZyb20gJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuZXhwb3J0IHsgc3RvcEV2ZW50UHJvcG9nYXRpb24gfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgYW5ndWxhci5JQXR0cmlidXRlcyB7XHJcblx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBhbmd1bGFyLklEaXJlY3RpdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdGxpbmsoc2NvcGU6IGFuZ3VsYXIuSVNjb3BlXHJcblx0XHRcdCwgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGlzRW1wdHkgZnJvbSAnLi9pc0VtcHR5L2lzRW1wdHknO1xyXG5pbXBvcnQgKiBhcyB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlL3RydW5jYXRlJztcclxuXHJcbmV4cG9ydCB7IGlzRW1wdHksIHRydW5jYXRlIH07XHJcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyJztcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRJT2JqZWN0VXRpbGl0eSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWVcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSXNFbXB0eUZpbHRlciB7XHJcblx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxufVxyXG5cclxuaXNFbXB0eS4kaW5qZWN0ID0gW29iamVjdFNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IElPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbiA9PiB7XHJcblx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuICFpc0VtcHR5O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0fTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdE1vZHVsZU5hbWVdKVxyXG5cdC5maWx0ZXIoc2VydmljZU5hbWUsIGlzRW1wdHkpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLFxyXG5cdG1vZHVsZU5hbWUgYXMgYXJyYXlNb2R1bGVOYW1lLFxyXG5cdElBcnJheVV0aWxpdHlcclxufSBmcm9tICcuLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXlTZXJ2aWNlTmFtZV07XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7XHJcblx0XHR9XHJcblxyXG5cdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHR9XHJcblxyXG5cdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0dmFyIHR5cGUyOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMjtcclxuXHJcblx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG5cdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcblx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRpZiAoXy5hbnkoa2V5czIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0fVxyXG5cclxuXHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5TW9kdWxlTmFtZV0pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIl9cIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlx0J3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlO1xyXG5cdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdH1cclxuXHJcblx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIH0pXHJcblx0XHQ6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSB7XHJcblx0XHQvLyBuZWVkcyB0byBiZSBzZWVkZWQgd2l0aCBhbiBvYmplY3Qgb3IgaXQgd2lsbCBiZSB2aWV3ZWQgYXMgYW4gYXJyYXkgd2l0aCBubyBpdGVtc1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9LCBpdGVtOiBURGF0YVR5cGUpOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0gPT4ge1xyXG5cdFx0XHRkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0fSwgPGFueT57fSk7XHJcblx0fVxyXG5cclxuXHRsYXN0PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlIHtcclxuXHRcdGlmIChhcnJheSAhPSBudWxsICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuaW1wb3J0IHtcclxuXHRzZXJ2aWNlTmFtZSBhcyBvYmplY3RTZXJ2aWNlTmFtZSxcclxuXHRtb2R1bGVOYW1lIGFzIG9iamVjdE1vZHVsZU5hbWUsXHJcblx0SU9iamVjdFV0aWxpdHksXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcbn1cclxuXHJcbnRydW5jYXRlLiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lXSlcclxuXHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGFycmF5IGZyb20gJy4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGJvb2xlYW4gZnJvbSAnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGRhdGFDb250cmFjdHMgZnJvbSAnLi9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZGF0ZSBmcm9tICcuL2RhdGUvZGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWxlU2l6ZSBmcm9tICcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGdlbmVyaWNTZWFyY2hGaWx0ZXIgZnJvbSAnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGd1aWQgZnJvbSAnLi9ndWlkL2d1aWQuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICcuL21vbWVudC9tb21lbnQubW9kdWxlJztcclxuaW1wb3J0ICogYXMgbm90aWZpY2F0aW9uIGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgbnVtYmVyU2VydmljZSBmcm9tICcuL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIG9iamVjdFNlcnZpY2UgZnJvbSAnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlIGZyb20gJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwYXJlbnRDaGlsZEJlaGF2aW9yIGZyb20gJy4vcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBwcm9taXNlIGZyb20gJy4vcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBzdHJpbmdTZXJ2aWNlIGZyb20gJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgc3luY2hyb25pemVkUmVxdWVzdHMgZnJvbSAnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgdGVzdCBmcm9tICcuL3Rlc3QvdGVzdC5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0aW1lIGZyb20gJy4vdGltZS90aW1lLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhcnJheSxcclxuXHRib29sZWFuLFxyXG5cdGRhdGFDb250cmFjdHMsXHJcblx0ZGF0ZSxcclxuXHRmaWxlU2l6ZSxcclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyLFxyXG5cdGd1aWQsXHJcblx0bW9tZW50LFxyXG5cdG5vdGlmaWNhdGlvbixcclxuXHRudW1iZXJTZXJ2aWNlIGFzIG51bWJlcixcclxuXHRvYmplY3RTZXJ2aWNlIGFzIG9iamVjdCxcclxuXHRvYnNlcnZhYmxlLFxyXG5cdHBhcmVudENoaWxkQmVoYXZpb3IsXHJcblx0cHJvbWlzZSxcclxuXHRzdHJpbmdTZXJ2aWNlIGFzIHN0cmluZyxcclxuXHRzeW5jaHJvbml6ZWRSZXF1ZXN0cyxcclxuXHR0ZXN0LFxyXG5cdHRpbWUsXHJcblx0dmFsaWRhdGlvbixcclxufTtcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0ZGF0YUNvbnRyYWN0cy5tb2R1bGVOYW1lLFxyXG5cdGRhdGUubW9kdWxlTmFtZSxcclxuXHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuXHRndWlkLm1vZHVsZU5hbWUsXHJcblx0bW9tZW50Lm1vZHVsZU5hbWUsXHJcblx0bm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0bnVtYmVyU2VydmljZS5tb2R1bGVOYW1lLFxyXG5cdG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuXHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRzdHJpbmdTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcblx0c3luY2hyb25pemVkUmVxdWVzdHMubW9kdWxlTmFtZSxcclxuXHR0aW1lLm1vZHVsZU5hbWUsXHJcblx0dGVzdC5tb2R1bGVOYW1lLFxyXG5cdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgbW9kdWxlTmFtZSBhcyByZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lIH0gZnJvbSAnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlTW9kdWxlTmFtZSB9IGZyb20gJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vZHVsZU5hbWUgfSBmcm9tICcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIG1vY2tzIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9kYXRhU2VydmljZU1vY2tzJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRhQ29udHJhY3RzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnknO1xyXG5leHBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSwgSUJhc2VEb21haW5PYmplY3QsIEJhc2VEYXRhU2VydmljZSwgZmFjdG9yeU5hbWUgYXMgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgfSBmcm9tICcuL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VEYXRhU2VydmljZVZpZXcsIElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBmYWN0b3J5TmFtZSBhcyBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSB9IGZyb20gJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuZXhwb3J0IHsgSUJhc2VSZXNvdXJjZUJ1aWxkZXIsIHNlcnZpY2VOYW1lIGFzIGJ1aWxkZXJTZXJ2aWNlTmFtZSB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBtb2NrcyB9O1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdGJhc2VEYXRhU2VydmljZU1vZHVsZU5hbWUsXHJcblx0YmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9kdWxlTmFtZSxcclxuXHRyZXNvdXJjZUJ1aWxkZXJNb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSUNvbnRyYWN0TGlicmFyeSwgQ29udHJhY3RMaWJyYXJ5LCBJTGlicmFyeVNlcnZpY2VzIH0gZnJvbSAnLi9jb250cmFjdExpYnJhcnknO1xyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0LCBJVHJhbnNmb3JtRnVuY3Rpb24gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3LCBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldywgQmFzZURhdGFTZXJ2aWNlVmlldywgQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldyB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YVNlcnZpY2VWaWV3JztcclxuaW1wb3J0IHsgSUJhc2VQYXJlbnREYXRhU2VydmljZSwgQmFzZVBhcmVudERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBVcmwgdG8gaGl0IHdpdGggZ2V0TGlzdCBhbmQgY3JlYXRlXHJcblx0KiAtIGV4dGVuZGVkIHdpdGggL2lkIGZvciBnZXREZXRhaWwsIHVwZGF0ZSwgYW5kIGRlbGV0ZVxyXG5cdCovXHJcblx0ZW5kcG9pbnQ/OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCB1c2UgdGhlIG1vY2sgZGF0YSBvciBoaXQgdGhlIGFjdHVhbCBlbmRwb2ludFxyXG5cdCogZGVmYXVsdHMgdG8gdHJ1ZSBpZiBlbmRwb2ludCBpcyBub3QgZGVmaW5lZFxyXG5cdCovXHJcblx0dXNlTW9jaz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogRmxhZyBmb3Igc3BlY2lmeWluZyBpZiB0aGUgZGF0YSBzZXJ2aWNlIHNob3VsZCBsb2cgYWxsIHJlcXVlc3RzIGFnYWluc3QgdGhlIGNvbnRyYWN0XHJcblx0Ki9cclxuXHRsb2dSZXF1ZXN0cz86IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCogUHJvY2Vzc2VzIGRhdGEgY29taW5nIGJhY2sgZnJvbSB0aGUgc2VydmVyXHJcblx0Ki9cclxuXHR0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtRnVuY3Rpb248VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PiBleHRlbmRzIElCYXNlT3B0aW9uczxURGF0YVR5cGU+IHtcclxuXHQvKipcclxuXHQqIEV4YW1wbGUgZGF0YSBzZXQgdG8gYmUgdXNlZCBmb3IgdGVzdGluZyBhbmQgcHJvdG90eXBpbmcgaW5zdGVhZCBvZiBoaXR0aW5nIHRoZSBlbmRwb2ludFxyXG5cdCovXHJcblx0bW9ja0RhdGE/OiBURGF0YVR5cGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50UmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiBleHRlbmRzIElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4gZXh0ZW5kcyBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBFeGFtcGxlIG9iamVjdCB0byBiZSB1c2VkIGZvciB0ZXN0aW5nIGFuZCBwcm90b3R5cGluZyBpbnN0ZWFkIG9mIGhpdHRpbmcgdGhlIGVuZHBvaW50XHJcblx0Ki9cclxuXHRtb2NrRGF0YT86IFREYXRhVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJU2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPiB7XHJcblx0LyoqXHJcblx0KiBGdW5jdGlvbiB0aGF0IGJ1aWxkcyBhIGRpY3Rpb25hcnkgb2YgY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0cmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcj86IHsgKGJhc2VFbmRwb2ludDogc3RyaW5nKTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVJlc291cmNlQnVpbGRlciB7XHJcblx0LyoqXHJcblx0KiBBIGhlbHBlciB0byBwYXNzIGludG8gdGhlIGNvbnN0cnVjdG9yIHdoZW4gYnVpbGRpbmcgYSBuZXcgY29udHJhY3RzIGxpYnJhcnlcclxuXHQqL1xyXG5cdGdldExpYnJhcnlTZXJ2aWNlcygpOiBJTGlicmFyeVNlcnZpY2VzO1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHN0YW5kYXJkIHJlc291cmNlIHdpdGggZ2V0TGlzdCwgZ2V0RGV0YWlsLCBjcmVhdGUsIHVwZGF0ZSwgZGVsZXRlXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+O1xyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3RhbmRhcmQgcmVzb3VyY2Ugd2l0aCBnZXRMaXN0LCBnZXREZXRhaWwsIGNyZWF0ZSwgdXBkYXRlLCBkZWxldGVcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0PihvcHRpb25zOiBJQmFzZVJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgdm9pZD47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHZpZXcgb2YgYSBwYXJlbnQgcmVzb3VyY2UgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3Q+KG9wdGlvbnM6IElCYXNlUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlPik6IElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgdm9pZD47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgcGFyZW50IHJlc291cmNlIHRoYXQgZXh0ZW5kcyB0aGUgc3RhbmRhcmQgd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHBhcmVudCByZXNvdXJjZSB0aGF0IGV4dGVuZHMgdGhlIHN0YW5kYXJkIHdpdGggY2hpbGQgcmVzb3VyY2VzIGF2YWlsYWJsZSB0aHJvdWdoIGNoaWxkQ29udHJhY3RzKGlkKVxyXG5cdCovXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCB2b2lkLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgdmlldyBvZiBhIHBhcmVudCByZXNvdXJjZSB3aXRoIHN1Yi1yZXNvdXJjZXMgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgcmVzb3VyY2Ugb3JcclxuXHQqIGFzIGEgc2luZ2xldG9uIGlmIGEgcGFyZW50IGlzIHNlbGVjdGVkXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcblx0LyoqXHJcblx0KiBDcmVhdGUgYSB2aWV3IG9mIGEgcGFyZW50IHJlc291cmNlIHdpdGggc3ViLXJlc291cmNlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSByZXNvdXJjZSBvclxyXG5cdCogYXMgYSBzaW5nbGV0b24gaWYgYSBwYXJlbnQgaXMgc2VsZWN0ZWRcclxuXHQqL1xyXG5cdGNyZWF0ZVBhcmVudFJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0XHQob3B0aW9uczogSVBhcmVudFJlc291cmNlUGFyYW1zPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+KTogSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIHZvaWQsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPjtcclxuXHJcblx0LyoqXHJcblx0KiBEZXByZWNhdGVkIC0gQ3JlYXRlIGEgc2luZ2xldG9uIHJlc291cmNlIHdpdGggZ2V0IGFuZCB1cGRhdGVcclxuXHQqL1xyXG5cdGNyZWF0ZVNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZT4ob3B0aW9uczogSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcblxyXG5cdC8qKlxyXG5cdCogRGVwcmVjYXRlZCAtIENyZWF0ZSBhIHBhcmVudCBzaW5nbGV0b24gcmVzb3VyY2UgdGhhdCBleHRlbmRzIHRoZSBzaW5nbGV0b24gd2l0aCBjaGlsZCByZXNvdXJjZXMgYXZhaWxhYmxlIHRocm91Z2ggY2hpbGRDb250cmFjdHMoaWQpXHJcblx0Ki9cclxuXHRjcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRTaW5nbGV0b25SZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVzb3VyY2VCdWlsZGVyIGltcGxlbWVudHMgSUJhc2VSZXNvdXJjZUJ1aWxkZXIge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJGh0dHAnLCAnJHEnLCAnJHJvb3RTY29wZScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIGFycmF5OiBJQXJyYXlVdGlsaXR5KSB7IH1cclxuXHJcblx0Z2V0TGlicmFyeVNlcnZpY2VzKCk6IElMaWJyYXJ5U2VydmljZXMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0JHE6IHRoaXMuJHEsXHJcblx0XHRcdCRyb290U2NvcGU6IHRoaXMuJHJvb3RTY29wZSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZXNvdXJjZTxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVJlc291cmNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz4ob3B0aW9uczogSUJhc2VSZXNvdXJjZVBhcmFtczxURGF0YVR5cGU+KTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0XHRvcHRpb25zID0gdGhpcy51c2VNb2NrSWZOb0VuZHBvaW50KG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2VWaWV3KHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50UmVzb3VyY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVBhcmVudERhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVQYXJlbnRSZXNvdXJjZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdFx0KG9wdGlvbnM6IElQYXJlbnRSZXNvdXJjZVBhcmFtczxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPik6IElCYXNlUGFyZW50RGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXcodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVNpbmdsZXRvblJlc291cmNlPFREYXRhVHlwZT4ob3B0aW9uczogSVNpbmdsZXRvblJlc291cmNlUGFyYW1zPFREYXRhVHlwZT4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdFx0b3B0aW9ucyA9IHRoaXMudXNlTW9ja0lmTm9FbmRwb2ludChvcHRpb25zKTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlUGFyZW50U2luZ2xldG9uUmVzb3VyY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRcdChvcHRpb25zOiBJUGFyZW50U2luZ2xldG9uUmVzb3VyY2VQYXJhbXM8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4pOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdG9wdGlvbnMgPSB0aGlzLnVzZU1vY2tJZk5vRW5kcG9pbnQob3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1c2VNb2NrSWZOb0VuZHBvaW50PFREYXRhVHlwZT4ob3B0aW9uczogSUJhc2VPcHRpb25zPFREYXRhVHlwZT4pOiBJQmFzZU9wdGlvbnM8VERhdGFUeXBlPiB7XHJcblx0XHRvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG5cdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXlNb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQmFzZVJlc291cmNlQnVpbGRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5LCBzZXJ2aWNlTmFtZSBhcyBhcnJheVNlcnZpY2VOYW1lLCBtb2R1bGVOYW1lIGFzIGFycmF5TW9kdWxlTmFtZSB9IGZyb20gJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VEYXRhU2VydmljZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdiYXNlRGF0YVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZURvbWFpbk9iamVjdCB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+IHtcclxuXHQocmF3RGF0YTogYW55KTogVERhdGFUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IHtcclxuXHRnZXRMaXN0KHBhcmFtcz86IFRTZWFyY2hQYXJhbXMpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgIGdldERldGFpbChpZDogbnVtYmVyKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgY3JlYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICB1c2VNb2NrOiBib29sZWFuO1xyXG4gICAgbG9nUmVxdWVzdHM6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+IGltcGxlbWVudHMgSUJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgcHVibGljIGVuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBwcm90ZWN0ZWQgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgcHJvdGVjdGVkIHRyYW5zZm9ybTogSVRyYW5zZm9ybUZ1bmN0aW9uPFREYXRhVHlwZT5cclxuICAgICAgICAgICAgLCBwdWJsaWMgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIHB1YmxpYyBsb2dSZXF1ZXN0czogYm9vbGVhbikgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtRW5kcG9pbnQoaWQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExpc3QocGFyYW1zOiBUU2VhcmNoUGFyYW1zKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGVbXT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZVtdPjtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4odGhpcy5tb2NrRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KHRoaXMuZW5kcG9pbnQsIHsgcGFyYW1zOiBwYXJhbXMgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGVbXT4pOiBURGF0YVR5cGVbXSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGRhdGE6IFREYXRhVHlwZVtdKTogVERhdGFUeXBlW10gPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF8ubWFwKGRhdGEsIHRoaXMudHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2dldExpc3QnLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldERldGFpbChpZDogbnVtYmVyKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGlkO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KHRoaXMuZ2V0SXRlbUVuZHBvaW50KGlkKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxURGF0YVR5cGU+KTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zZm9ybShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2dldERldGFpbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0SWQ6IG51bWJlciA9IF8ubWF4KHRoaXMubW9ja0RhdGEsICdpZCcpLmlkICsgMTtcclxuICAgICAgICAgICAgZG9tYWluT2JqZWN0LmlkID0gbmV4dElkO1xyXG4gICAgICAgICAgICB0aGlzLm1vY2tEYXRhLnB1c2goZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihkb21haW5PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnBvc3QodGhpcy5lbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZG9tYWluT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8VERhdGFUeXBlPik6IFREYXRhVHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2NyZWF0ZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkb21haW5PYmplY3Q6IFREYXRhVHlwZSk6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8VERhdGFUeXBlPjtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRPYmplY3Q6IFREYXRhVHlwZSA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGRvbWFpbk9iamVjdC5pZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBvbGRPYmplY3QgPSA8VERhdGFUeXBlPl8uYXNzaWduKG9sZE9iamVjdCwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihvbGRPYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnB1dDx2b2lkPih0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3VwZGF0ZScsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U6IGFuZ3VsYXIuSVByb21pc2U8dm9pZD47XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5LnJlbW92ZSh0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZGVsZXRlPHZvaWQ+KHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCkpLnRoZW4oKCk6IHZvaWQgPT4geyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3VwZGF0ZScsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZyhyZXF1ZXN0TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbW9ja1N0cmluZyA9IHRoaXMudXNlTW9jayA/ICdNb2NrZWQgJyA6ICcnO1xyXG4gICAgICAgIGxldCBlbmRwb2ludFN0cmluZyA9IHRoaXMuZW5kcG9pbnQgPT0gbnVsbCA/ICd1bnNwZWNpZmllZCcgOiB0aGlzLmVuZHBvaW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vY2tTdHJpbmcgKyByZXF1ZXN0TmFtZSArICcgZm9yIGVuZHBvaW50ICcgKyBlbmRwb2ludFN0cmluZyArICc6Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VEYXRhU2VydmljZUZhY3Rvcnkge1xyXG4gICAgZ2V0SW5zdGFuY2U8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXM+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlW11cclxuICAgICAgICAsIHRyYW5zZm9ybT86IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbik6IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPjtcclxufVxyXG5cclxuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5U2VydmljZU5hbWVdO1xyXG5leHBvcnQgZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsICRxOiBhbmd1bGFyLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHkpOiBJQmFzZURhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPihlbmRwb2ludDogc3RyaW5nLCBtb2NrRGF0YT86IFREYXRhVHlwZVtdXHJcbiAgICAgICAgICAgICwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybUZ1bmN0aW9uPFREYXRhVHlwZT4sIHVzZU1vY2s/OiBib29sZWFuLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pOiBJQmFzZURhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+KCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheU1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VEYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSUFycmF5VXRpbGl0eSwgc2VydmljZU5hbWUgYXMgYXJyYXlTZXJ2aWNlTmFtZSwgbW9kdWxlTmFtZSBhcyBhcnJheU1vZHVsZU5hbWUgfSBmcm9tICcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2UsIEJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QsIElUcmFuc2Zvcm1GdW5jdGlvbiB9IGZyb20gJy4vYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UsIEJhc2VQYXJlbnREYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZSwgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VWaWV3PFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0QXNTaW5nbGV0b24ocGFyZW50SWQ6IG51bWJlcik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+e1xyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUgZXh0ZW5kcyBJQmFzZURvbWFpbk9iamVjdCwgVFNlYXJjaFBhcmFtcz5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+XHJcblx0aW1wbGVtZW50cyBJQmFzZURhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IHtcclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZVxyXG4gICAgICAgICAgICAsICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIGFycmF5OiBJQXJyYXlVdGlsaXR5XHJcbiAgICAgICAgICAgICwgX2VuZHBvaW50OiBzdHJpbmdcclxuICAgICAgICAgICAgLCBtb2NrRGF0YTogVERhdGFUeXBlW11cclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+XHJcbiAgICAgICAgICAgICwgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG5cdFx0bGV0IG1vY2tEYXRhOiBURGF0YVR5cGUgPSBfLmZpbmQodGhpcy5tb2NrRGF0YSwgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gcGFyZW50SWQ7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4odGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5lbmRwb2ludCwgbW9ja0RhdGEsIHRoaXMudHJhbnNmb3JtLCB0aGlzLnVzZU1vY2ssIHRoaXMubG9nUmVxdWVzdHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYXJlbnREYXRhU2VydmljZVZpZXc8VERhdGFUeXBlIGV4dGVuZHMgSUJhc2VEb21haW5PYmplY3QsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0aW1wbGVtZW50cyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlVmlldzxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCAkcTogYW5ndWxhci5JUVNlcnZpY2VcclxuICAgICAgICAgICAgLCBhcnJheTogSUFycmF5VXRpbGl0eVxyXG4gICAgICAgICAgICAsIF9lbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgbW9ja0RhdGE6IFREYXRhVHlwZVtdXHJcblx0XHRcdCwgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZX1cclxuICAgICAgICAgICAgLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+XHJcbiAgICAgICAgICAgICwgdXNlTW9jazogYm9vbGVhblxyXG4gICAgICAgICAgICAsIGxvZ1JlcXVlc3RzOiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcblxyXG5cdEFzU2luZ2xldG9uKHBhcmVudElkOiBudW1iZXIpOiBJQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRcdGxldCBtb2NrRGF0YTogVERhdGFUeXBlID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuID0+IHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0uaWQgPT09IHBhcmVudElkO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3IEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPih0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmVuZHBvaW50LCBtb2NrRGF0YSwgdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0aGlzLnRyYW5zZm9ybSwgdGhpcy51c2VNb2NrLCB0aGlzLmxvZ1JlcXVlc3RzKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGFTZXJ2aWNlVmlldy50c1xuICoqLyIsImltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQXJyYXlVdGlsaXR5IH0gZnJvbSAnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZURhdGFTZXJ2aWNlLCBCYXNlRGF0YVNlcnZpY2UsIElCYXNlRG9tYWluT2JqZWN0LCBJVHJhbnNmb3JtRnVuY3Rpb24gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlRGF0YVNlcnZpY2VWaWV3IH0gZnJvbSAnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhU2VydmljZVZpZXcnO1xyXG5pbXBvcnQgeyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPntcclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT5cclxuXHRleHRlbmRzIEJhc2VEYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXM+IGltcGxlbWVudHMgSUJhc2VQYXJlbnREYXRhU2VydmljZTxURGF0YVR5cGUsIFRTZWFyY2hQYXJhbXMsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPiB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSwgYXJyYXk6IElBcnJheVV0aWxpdHksIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVbXVxyXG5cdFx0LCBwdWJsaWMgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjogeyAoYmFzZUVuZHBvaW50OiBzdHJpbmcpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB9XHJcblx0XHQsIHRyYW5zZm9ybT86IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+XHJcblx0XHQsIHVzZU1vY2s/OiBib29sZWFuXHJcbiAgICAgICAgLCBsb2dSZXF1ZXN0cz86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cyhpZD86IG51bWJlcik6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIHtcclxuXHRcdGlmIChfLmlzVW5kZWZpbmVkKGlkKSkge1xyXG5cdFx0XHRsZXQgZGljdGlvbmFyeTogVFJlc291cmNlRGljdGlvbmFyeVR5cGUgPSB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIodGhpcy5lbmRwb2ludCk7XHJcblx0XHRcdF8uZWFjaChkaWN0aW9uYXJ5LCAoZGF0YVNlcnZpY2U6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGRhdGFTZXJ2aWNlLmVuZHBvaW50ID0gdGhpcy5lbmRwb2ludCArIGRhdGFTZXJ2aWNlLmVuZHBvaW50O1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBkaWN0aW9uYXJ5OiB7W2luZGV4OiBzdHJpbmddOiBhbnl9ID0gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZCk7XHJcblx0XHRcdHJldHVybiA8YW55Pl8ubWFwVmFsdWVzKGRpY3Rpb25hcnksIChkYXRhU2VydmljZTogSUJhc2VEYXRhU2VydmljZVZpZXc8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPik6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB8IElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiA9PiB7XHJcblx0XHRcdFx0bGV0IGNvbnRyYWN0OiBhbnk7XHJcblx0XHRcdFx0aWYgKF8uaXNGdW5jdGlvbihkYXRhU2VydmljZS5Bc1NpbmdsZXRvbikpIHtcclxuXHRcdFx0XHRcdGNvbnRyYWN0ID0gZGF0YVNlcnZpY2UuQXNTaW5nbGV0b24oaWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb250cmFjdCA9IGRhdGFTZXJ2aWNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29udHJhY3QuZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQgKyBjb250cmFjdC5lbmRwb2ludDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyYWN0O1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElUcmFuc2Zvcm1GdW5jdGlvbiB9IGZyb20gJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICB1cGRhdGUoZG9tYWluT2JqZWN0OiBURGF0YVR5cGUpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcblxyXG4gICAgdXNlTW9jazogYm9vbGVhbjtcclxuICAgIGxvZ1JlcXVlc3RzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4gaW1wbGVtZW50cyBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2VcclxuICAgICAgICAgICAgLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZVxyXG4gICAgICAgICAgICAsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSBtb2NrRGF0YTogVERhdGFUeXBlXHJcbiAgICAgICAgICAgICwgcHJpdmF0ZSB0cmFuc2Zvcm06IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+XHJcbiAgICAgICAgICAgICwgcHVibGljIHVzZU1vY2s6IGJvb2xlYW5cclxuICAgICAgICAgICAgLCBwdWJsaWMgbG9nUmVxdWVzdHM6IGJvb2xlYW4pIHsgfVxyXG5cclxuICAgIGdldCgpOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFREYXRhVHlwZT47XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKHRoaXMubW9ja0RhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldCh0aGlzLmVuZHBvaW50KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPFREYXRhVHlwZT4pOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChkYXRhOiBURGF0YVR5cGUpOiBURGF0YVR5cGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMudHJhbnNmb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnZ2V0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRvbWFpbk9iamVjdDogVERhdGFUeXBlKTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxURGF0YVR5cGU+O1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrRGF0YSA9IDxURGF0YVR5cGU+Xy5hc3NpZ24odGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbih0aGlzLm1vY2tEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wdXQ8dm9pZD4odGhpcy5lbmRwb2ludCwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoZGF0YTogVERhdGFUeXBlKTogVERhdGFUeXBlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCd1cGRhdGUnLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nKHJlcXVlc3ROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb2NrU3RyaW5nID0gdGhpcy51c2VNb2NrID8gJ01vY2tlZCAnIDogJyc7XHJcbiAgICAgICAgbGV0IGVuZHBvaW50U3RyaW5nID0gdGhpcy5lbmRwb2ludCA9PSBudWxsID8gJ3Vuc3BlY2lmaWVkJyA6IHRoaXMuZW5kcG9pbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9ja1N0cmluZyArIHJlcXVlc3ROYW1lICsgJyBmb3IgZW5kcG9pbnQgJyArIGVuZHBvaW50U3RyaW5nICsgJzonKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICBnZXRJbnN0YW5jZTxURGF0YVR5cGU+KGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhPzogVERhdGFUeXBlLCB0cmFuc2Zvcm0/OiBJVHJhbnNmb3JtRnVuY3Rpb248VERhdGFUeXBlPiwgdXNlTW9jaz86IGJvb2xlYW4pOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZT47XHJcbn1cclxuXHJcbmJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkoJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCAkcTogYW5ndWxhci5JUVNlcnZpY2UpOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlPFREYXRhVHlwZT4oZW5kcG9pbnQ6IHN0cmluZywgbW9ja0RhdGE/OiBURGF0YVR5cGUsIHRyYW5zZm9ybT86IElUcmFuc2Zvcm1GdW5jdGlvbjxURGF0YVR5cGU+LCB1c2VNb2NrPzogYm9vbGVhbiwgbG9nUmVxdWVzdHM/OiBib29sZWFuKTogSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZmFjdG9yeU5hbWUsIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJVHJhbnNmb3JtRnVuY3Rpb24gfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UsIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSB9IGZyb20gJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGUsIFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlPlxyXG5cdGV4dGVuZHMgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZTxURGF0YVR5cGU+e1xyXG5cdGNoaWxkQ29udHJhY3RzKCk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+XHJcblx0ZXh0ZW5kcyBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiBpbXBsZW1lbnRzIElCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4ge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UsIGVuZHBvaW50OiBzdHJpbmcsIG1vY2tEYXRhOiBURGF0YVR5cGVcclxuXHRcdCwgcHJpdmF0ZSByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyOiB7IChiYXNlRW5kcG9pbnQ6IHN0cmluZyk6IFRSZXNvdXJjZURpY3Rpb25hcnlUeXBlIH1cclxuXHRcdCwgdHJhbnNmb3JtPzogSVRyYW5zZm9ybUZ1bmN0aW9uPFREYXRhVHlwZT5cclxuXHRcdCwgdXNlTW9jaz86IGJvb2xlYW5cclxuXHRcdCwgbG9nUmVxdWVzdHM/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcigkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcblx0fVxyXG5cclxuXHRjaGlsZENvbnRyYWN0cygpOiBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyKHRoaXMuZW5kcG9pbnQpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLnRzXG4gKiovIiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZSwgSUJhc2VEb21haW5PYmplY3QgfSBmcm9tICcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlUGFyZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlRGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zPiBleHRlbmRzIElCYXNlRGF0YVNlcnZpY2U8VERhdGFUeXBlLCBUU2VhcmNoUGFyYW1zPiB7XHJcblx0bW9ja0dldExpc3QoZGF0YTogYW55W10pOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrPFREYXRhVHlwZSBleHRlbmRzIElCYXNlRG9tYWluT2JqZWN0LCBUU2VhcmNoUGFyYW1zLCBUUmVzb3VyY2VEaWN0aW9uYXJ5VHlwZT4gZXh0ZW5kcyBJQmFzZVBhcmVudERhdGFTZXJ2aWNlPFREYXRhVHlwZSwgVFNlYXJjaFBhcmFtcywgVFJlc291cmNlRGljdGlvbmFyeVR5cGU+IHtcclxuXHRtb2NrR2V0TGlzdChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdG1vY2tHZXREZXRhaWwoZGF0YTogYW55KTogU2lub24uU2lub25TcHk7XHJcblx0bW9ja0NoaWxkKG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTaW5nbGV0b25EYXRhU2VydmljZU1vY2s8VERhdGFUeXBlPiBleHRlbmRzIElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U8VERhdGFUeXBlPiB7XHJcblx0bW9ja0dldChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvZGF0YVNlcnZpY2VNb2Nrcy50c1xuICoqLyIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBJQmFzZVJlc291cmNlQnVpbGRlciwgQmFzZVJlc291cmNlQnVpbGRlciB9IGZyb20gJy4vYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhc2VEYXRhU2VydmljZU1vY2ssIElCYXNlUGFyZW50RGF0YVNlcnZpY2VNb2NrLCBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jayB9IGZyb20gJy4vZGF0YVNlcnZpY2VNb2Nrcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250cmFjdExpYnJhcnkge1xyXG5cdC8vIGV4dGVuZCB3aXRoIGN1c3RvbSBpbnRlcmZhY2Ugc3BlY2lmeWluZyBjaGlsZCByZXNvdXJjZXNcclxuXHJcblx0Zmx1c2goKTogdm9pZDtcclxuXHJcblx0bW9ja0dldChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweTtcclxuXHRtb2NrR2V0RGV0YWlsKHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRtb2NrQ2hpbGQocGFyZW50OiBhbnksIG1vY2tDYWxsYmFjazogeyAoY2hpbGRyZW46IGFueSk6IHZvaWQgfSk6IHZvaWQ7XHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PjtcclxuXHRjcmVhdGVNb2NrUGFyZW50KHJlc291cmNlPzogYW55KTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT47XHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxpYnJhcnlTZXJ2aWNlcyB7XHJcblx0JHE6IG5nLklRU2VydmljZTtcclxuXHQkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyYWN0TGlicmFyeSBpbXBsZW1lbnRzIElDb250cmFjdExpYnJhcnkge1xyXG5cdHByaXZhdGUgJHE6IG5nLklRU2VydmljZTtcclxuXHRwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkZXI6IElCYXNlUmVzb3VyY2VCdWlsZGVyKSB7XHJcblx0XHRsZXQgc2VydmljZXM6IElMaWJyYXJ5U2VydmljZXMgPSAoPEJhc2VSZXNvdXJjZUJ1aWxkZXI+YnVpbGRlcikuZ2V0TGlicmFyeVNlcnZpY2VzKCk7XHJcblx0XHR0aGlzLiRxID0gc2VydmljZXMuJHE7XHJcblx0XHR0aGlzLiRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdH1cclxuXHJcblx0Zmx1c2goKTogdm9pZCB7XHJcblx0XHR0aGlzLiRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdH1cclxuXHRtb2NrR2V0KHJlc291cmNlOiBhbnksIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KHJlc291cmNlLCAnZ2V0JywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRtb2NrR2V0TGlzdChyZXNvdXJjZTogYW55LCBkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSB7XHJcblx0XHRyZXR1cm4gdGhpcy5iYXNlTW9ja0dldChyZXNvdXJjZSwgJ2dldExpc3QnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tHZXREZXRhaWwocmVzb3VyY2U6IGFueSwgZGF0YTogYW55KTogU2lub24uU2lub25TcHkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXREZXRhaWwnLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG1vY2tDaGlsZChwYXJlbnQ6IGFueSwgbW9ja0NhbGxiYWNrOiB7IChjaGlsZHJlbjogYW55KTogdm9pZCB9KTogdm9pZCB7XHJcblx0XHRsZXQgZ2V0Q2hpbGRyZW46IHsoaWQ6IG51bWJlcik6IGFueX0gPSBwYXJlbnQuY2hpbGRDb250cmFjdHMuYmluZChwYXJlbnQpO1xyXG5cdFx0cGFyZW50LmNoaWxkQ29udHJhY3RzID0gKGlkOiBudW1iZXIpOiBhbnkgPT4ge1xyXG5cdFx0XHRsZXQgY2hpbGRyZW46IGFueSA9IGdldENoaWxkcmVuKGlkKTtcclxuXHRcdFx0bW9ja0NhbGxiYWNrKGNoaWxkcmVuKTtcclxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9jayhyZXNvdXJjZT86IGFueSk6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiB7XHJcblx0XHRsZXQgZGF0YVNlcnZpY2U6IElCYXNlRGF0YVNlcnZpY2VNb2NrPGFueSwgYW55PiA9IDxhbnk+dGhpcy5idWlsZGVyLmNyZWF0ZVJlc291cmNlPGFueSwgYW55Pih7fSk7XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0TGlzdCA9IChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXRMaXN0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0RGV0YWlsID0gKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXQnLCBkYXRhKTsgfTtcclxuXHRcdHRoaXMudXBkYXRlUmVzb3VyY2UoZGF0YVNlcnZpY2UsIHJlc291cmNlKTtcclxuXHRcdHJldHVybiBkYXRhU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU1vY2tQYXJlbnQocmVzb3VyY2U/OiBhbnkpOiBJQmFzZVBhcmVudERhdGFTZXJ2aWNlTW9jazxhbnksIGFueSwgYW55PiB7XHJcblx0XHRsZXQgZ2V0Q2hpbGRyZW46IGFueSA9IHJlc291cmNlICE9IG51bGwgPyByZXNvdXJjZS5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyIDogKCk6IGFueSA9PiB7IHJldHVybiB7fTsgfTtcclxuXHRcdGxldCBkYXRhU2VydmljZTogSUJhc2VQYXJlbnREYXRhU2VydmljZU1vY2s8YW55LCBhbnksIGFueT4gPSA8YW55PnRoaXMuYnVpbGRlci5jcmVhdGVQYXJlbnRSZXNvdXJjZTxhbnksIGFueSwgYW55Pih7XHJcblx0XHRcdHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI6IGdldENoaWxkcmVuLFxyXG5cdFx0fSk7XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0TGlzdCA9IChkYXRhOiBhbnlbXSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXRMaXN0JywgZGF0YSk7IH07XHJcblx0XHRkYXRhU2VydmljZS5tb2NrR2V0RGV0YWlsID0gKGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5ID0+IHsgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQoZGF0YVNlcnZpY2UsICdnZXQnLCBkYXRhKTsgfTtcclxuXHRcdGRhdGFTZXJ2aWNlLm1vY2tDaGlsZCA9IChtb2NrQ2FsbGJhY2s6IHsgKGNoaWxkcmVuOiBhbnkpOiB2b2lkIH0pOiB2b2lkID0+IHsgcmV0dXJuIHRoaXMubW9ja0NoaWxkKGRhdGFTZXJ2aWNlLCBtb2NrQ2FsbGJhY2spOyB9O1xyXG5cdFx0dGhpcy51cGRhdGVSZXNvdXJjZShkYXRhU2VydmljZSwgcmVzb3VyY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTW9ja1NpbmdsZXRvbihyZXNvdXJjZT86IGFueSk6IElCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VNb2NrPGFueT4ge1xyXG5cdFx0bGV0IGRhdGFTZXJ2aWNlOiBJQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlTW9jazxhbnk+ID0gPGFueT50aGlzLmJ1aWxkZXIuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2Uoe30pO1xyXG5cdFx0ZGF0YVNlcnZpY2UubW9ja0dldCA9IChkYXRhOiBhbnkpOiBTaW5vbi5TaW5vblNweSA9PiB7IHJldHVybiB0aGlzLmJhc2VNb2NrR2V0KGRhdGFTZXJ2aWNlLCAnZ2V0JywgZGF0YSk7IH07XHJcblx0XHR0aGlzLnVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlLCByZXNvdXJjZSk7XHJcblx0XHRyZXR1cm4gZGF0YVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZVJlc291cmNlKGRhdGFTZXJ2aWNlOiBhbnksIHJlc291cmNlPzogYW55KTogdm9pZCB7XHJcblx0XHRpZiAocmVzb3VyY2UgIT0gbnVsbCkge1xyXG5cdFx0XHRfLmV4dGVuZChyZXNvdXJjZSwgZGF0YVNlcnZpY2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBiYXNlTW9ja0dldChyZXNvdXJjZTogYW55LCBhY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IFNpbm9uLlNpbm9uU3B5IHtcclxuXHRcdGxldCBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHRoaXMuc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kcS53aGVuKGRhdGEpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcblx0XHRyZXR1cm4gZnVuYztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0IHNpbm9uKCk6IFNpbm9uLlNpbm9uU3RhdGljIHtcclxuXHRcdHJldHVybiBzaW5vbiB8fCA8YW55Pnsgc3B5OiAoZnVuYzogYW55KTogYW55ID0+IHsgcmV0dXJuIGZ1bmM7IH0gfTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIGFzIG1vbWVudE1vZHVsZU5hbWUgfSBmcm9tICcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgdGltZU1vZHVsZU5hbWUgfSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRlVXRpbGl0eSwgc2VydmljZU5hbWUgfSBmcm9tICcuL2RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzIH0gZnJvbSAnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbW9tZW50TW9kdWxlTmFtZSwgdGltZU1vZHVsZU5hbWVdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHQudmFsdWUoZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGVmYXVsdEZvcm1hdHMpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdtb21lbnRXcmFwcGVyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb21lbnRXcmFwcGVyKCk6IHZvaWQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0Ly8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG5cdC8vICBjcmVhdGVGcm9tSW5wdXRGYWxsYmFjayBkb2Vzbid0IGFwcGVhciB0byBiZVxyXG5cdC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuXHR2YXIgbW9tZW50V3JhcHBlcjogYW55ID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG5cclxuXHQvLyBTZXQgZGVmYXVsdCBtZXRob2QgZm9yIGhhbmRsaW5nIG5vbi1JU08gZGF0ZSBjb252ZXJzaW9ucy5cclxuXHQvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcblx0Ly8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcblx0bW9tZW50V3JhcHBlci5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IChjb25maWc6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0Y29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gbW9tZW50V3JhcHBlcjtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibW9tZW50XCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtb21lbnRcIlxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdH1cclxuXHJcblx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0fVxyXG5cclxuXHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0fVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgdGltZU1vZHVsZU5hbWUsXHJcblx0c2VydmljZU5hbWUgYXMgdGltZVNlcnZpY2VOYW1lLFxyXG5cdElUaW1lVXRpbGl0eSxcclxufSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbW9tZW50TW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBtb21lbnRTZXJ2aWNlTmFtZSxcclxufSBmcm9tICcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0cyB9IGZyb20gJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcbmltcG9ydCB7IENvbXBhcmVSZXN1bHQsIGdldENvbXBhcmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0JztcclxuXHJcbmV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHR5ZWFyczogbnVtYmVyO1xyXG5cdG1vbnRoczogbnVtYmVyO1xyXG5cdGRheXM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZTtcclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRzdWJ0cmFjdERhdGVJbk1pbGxpc2Vjb25kcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBDb21wYXJlUmVzdWx0O1xyXG5cdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGU7XHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdGdldE5vdygpOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFttb21lbnRTZXJ2aWNlTmFtZSwgdGltZVNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbWVudDogbW9tZW50Lk1vbWVudFN0YXRpYywgcHJpdmF0ZSB0aW1lOiBJVGltZVV0aWxpdHkpIHtcclxuXHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XTtcclxuXHR9XHJcblxyXG5cdG1vbnRoOiBJTW9udGhbXTtcclxuXHRwcml2YXRlIGJhc2VGb3JtYXQ6IHN0cmluZyA9ICdNTS1ERC1ZWVlZJztcclxuXHJcblx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHR9XHJcblxyXG5cdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0cmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblx0XHRyZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgLT0gMTtcclxuXHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcblx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRyZXN1bHQubW9udGhzICs9IDEyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHR2YXIgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0cmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0RGF0ZUluTWlsbGlzZWNvbmRzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdHJldHVybiBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblx0fVxyXG5cclxuXHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHQvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG5cdFx0dmFyIGRpZmZlcmVuY2U6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5NaWxsaXNlY29uZHMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuXHRcdHJldHVybiBnZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdH1cclxuXHJcblx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBDb21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG5cdFx0XHRyZXR1cm4gPERhdGU+ZGF0ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIHRoaXMuZm9ybWF0KGRhdGVGb3JtYXQpKS50b0RhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldERhdGVGcm9tSVNPU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGUge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KGRhdGUpLnRvRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0aXNEYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBfLmlzRGF0ZShkYXRlKVxyXG5cdFx0XHR8fCB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIHRoaXMuZm9ybWF0KGRhdGVGb3JtYXQpKS5pc1ZhbGlkKCk7XHJcblx0fVxyXG5cclxuXHRnZXROb3coKTogRGF0ZSB7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZm9ybWF0KGN1c3RvbUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBjdXN0b21Gb3JtYXQgIT0gbnVsbCA/IGN1c3RvbUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZW51bSBDb21wYXJlUmVzdWx0IHtcclxuXHRncmVhdGVyID0gMSxcclxuXHRlcXVhbCA9IDAsXHJcblx0bGVzcyA9IC0xLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGFyZVJlc3VsdChudW06IG51bWJlcik6IENvbXBhcmVSZXN1bHQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRpZiAobnVtID09PSAwKSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5lcXVhbDtcclxuXHR9IGVsc2UgaWYgKG51bSA+IDApIHtcclxuXHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgdmFyIGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdFN0cmluZ3Mge1xyXG5cdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0ZGF0ZUZvcm1hdDogc3RyaW5nO1xyXG5cdHRpbWVGb3JtYXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHZhciBkZWZhdWx0Rm9ybWF0czogSURhdGVGb3JtYXRTdHJpbmdzID0ge1xyXG5cdGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuXHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdHRpbWVGb3JtYXQ6ICdoOm1tQScsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgYXMgbnVtYmVyTW9kdWxlTmFtZSB9IGZyb20gJy4uL251bWJlci9udW1iZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkgfSBmcm9tICcuL2ZpbGVTaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlciB9IGZyb20gJy4vZmlsZVNpemVGaWx0ZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9maWxlU2l6ZUZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW251bWJlck1vZHVsZU5hbWVdKVxyXG5cdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkpXHJcblx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuZW51bSBTaWduIHtcclxuXHRwb3NpdGl2ZSA9IDEsXHJcblx0bmVnYXRpdmUgPSAtMSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdH1cclxuXHJcblx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHR9XHJcblxyXG5cdHJvdW5kVG9TdGVwKG51bTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCFzdGVwKSB7XHJcblx0XHRcdHJldHVybiBudW07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlbWFpbmRlcjogbnVtYmVyID0gbnVtICUgc3RlcDtcclxuXHJcblx0XHRpZiAocmVtYWluZGVyID49IHN0ZXAgLyAyKSB7XHJcblx0XHRcdHJldHVybiBudW0gKyAoc3RlcCAtIHJlbWFpbmRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVtIC0gcmVtYWluZGVyO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTnVtYmVyVXRpbGl0eSwgc2VydmljZU5hbWUgYXMgbnVtYmVyU2VydmljZU5hbWUgfSBmcm9tICcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZSB7XHJcblx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEZpbGVTaXplU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU2l6ZSB7XHJcblx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRCWVRFU19QRVJfS0I6IG51bWJlciA9IDEwMjQ7XHJcblxyXG5cdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdEdCOiBudW1iZXI7XHJcblx0aXNHQjogYm9vbGVhbjtcclxuXHJcblx0TUI6IG51bWJlcjtcclxuXHRpc01COiBib29sZWFuO1xyXG5cclxuXHRLQjogbnVtYmVyO1xyXG5cdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcblx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHR0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0dGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5pc0dCKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemU7XHJcbn1cclxuXHJcbmZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlclNlcnZpY2VOYW1lXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBJTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgZmFjdG9yeU5hbWUsIElGaWxlU2l6ZUZhY3RvcnksIElGaWxlU2l6ZSB9IGZyb20gJy4vZmlsZVNpemUuc2VydmljZSc7XHJcblxyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG5leHBvcnQgdmFyIHNpbXBsZUZpbHRlck5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdChieXRlcz86IG51bWJlcik6IHN0cmluZztcclxufVxyXG5cclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3RvcnkpOiBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdHZhciBmaWxlU2l6ZTogSUZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuXHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0fTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7XHJcblx0bW9kdWxlTmFtZSBhcyBvYmplY3RNb2R1bGVOYW1lLFxyXG5cdHNlcnZpY2VOYW1lIGFzIG9iamVjdFNlcnZpY2VOYW1lLFxyXG5cdElPYmplY3RVdGlsaXR5LFxyXG59IGZyb20gJy4uL29iamVjdC9vYmplY3Quc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgc3RyaW5nTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBzdHJpbmdTZXJ2aWNlTmFtZSxcclxuXHRJU3RyaW5nVXRpbGl0eVNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElGaWx0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXJzL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcbmV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRtaW5TZWFyY2hMZW5ndGg6IG51bWJlcjtcclxuXHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoRmlsdGVyIGltcGxlbWVudHMgSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdHR5cGU6IHN0cmluZyA9IGZpbHRlck5hbWU7XHJcblx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdG1pblNlYXJjaExlbmd0aDogbnVtYmVyID0gMTtcclxuXHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBJT2JqZWN0VXRpbGl0eSwgcHJpdmF0ZSBzdHJpbmc6IElTdHJpbmdVdGlsaXR5U2VydmljZSkge31cclxuXHJcblx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkgfHwgdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA8IHRoaXMubWluU2VhcmNoTGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNlYXJjaE9iamVjdDxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSwgc2VhcmNoOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdHZhciB2YWx1ZXM6IGFueSA9IF8udmFsdWVzKGl0ZW0pO1xyXG5cdFx0XHRyZXR1cm4gXy5hbnkodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbn1cclxuXHJcbmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0U2VydmljZU5hbWUsIHN0cmluZ1NlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBJT2JqZWN0VXRpbGl0eSxcclxuXHRzdHJpbmdVdGlsaXR5OiBJU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3RNb2R1bGVOYW1lLCBzdHJpbmdNb2R1bGVOYW1lXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiArc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHR9XHJcblxyXG5cdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmd1aWQnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZ3VpZFNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR3VpZFNlcnZpY2Uge1xyXG5cdHRpbWUoKTogc3RyaW5nO1xyXG5cdHJhbmRvbSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRTZXJ2aWNlIGltcGxlbWVudHMgSUd1aWRTZXJ2aWNlIHtcclxuXHR0aW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52MSgpO1xyXG5cdH1cclxuXHJcblx0cmFuZG9tKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdXVpZC52NCgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEd1aWRTZXJ2aWNlKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ3VpZC9ndWlkLnNlcnZpY2UudHNcbiAqKi8iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgcm5nO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgIHJldHVybiBfcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3JuZy1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgeyBJTm90aWZpZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvblR5cGVzJztcclxuaW1wb3J0IHsgQmFzZU5vdGlmaWVyIH0gZnJvbSAnLi9iYXNlTm90aWZpZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9ub3RpZmljYXRpb25UeXBlcyc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ25vdGlmaWNhdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuXHRpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSBpbXBsZW1lbnRzIElOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWVyOiBJTm90aWZpZXIpIHt9XHJcblxyXG5cdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLmluZm8obWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZmllci53YXJuaW5nKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmaWVyLmVycm9yKG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZpZXIuc3VjY2VzcyhtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciBleHRlbmRzIGFuZ3VsYXIuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0c2V0Tm90aWZpZXIobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQ7XHJcblx0JGdldCgpOiBJTm90aWZpY2F0aW9uU2VydmljZTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJJbnRlcm5hbCBleHRlbmRzIElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdG5vdGlmaWVyOiBJTm90aWZpZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKTogSU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRsZXQgcHJvdmlkZXI6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJJbnRlcm5hbCA9IHtcclxuXHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRzZXROb3RpZmllcjogKG5vdGlmaWVyOiBJTm90aWZpZXIpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xyXG5cdFx0fSxcclxuXHRcdCRnZXQ6ICgpOiBJTm90aWZpY2F0aW9uU2VydmljZSA9PiB7XHJcblx0XHRcdHJldHVybiBuZXcgTm90aWZpY2F0aW9uU2VydmljZSh0aGlzLm5vdGlmaWVyKTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHByb3ZpZGVyO1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElOb3RpZmllciB9IGZyb20gJy4vbm90aWZpY2F0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VOb3RpZmllciBpbXBsZW1lbnRzIElOb3RpZmllciB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbm90aWZ5KG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0Y29uc29sZS5sb2cobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZmllciB7XHJcblx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRldmVudD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0fSlcclxuXHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHR9KS52YWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcblxyXG5uZy5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0OiBudWxsO1xyXG5cdH1cclxuXHJcblx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdGlzUHJvbWlzZShwcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdHJlc29sdmVQcm9taXNlcyhyZXNvbHZlczogYW55KTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckaW5qZWN0b3InXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7fVxyXG5cclxuXHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0fVxyXG5cclxuXHRyZXNvbHZlUHJvbWlzZXMocmVzb2x2ZXM6IGFueSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcHJvbWlzZXM6IGFueSA9IHt9O1xyXG5cdFx0Xy5lYWNoKHJlc29sdmVzLCAodmFsdWU6IGFueSwga2V5OiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkgfHwgXy5pc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHRcdHByb21pc2VzW2tleV0gPSAodGhpcy4kcS53aGVuKHRoaXMuJGluamVjdG9yLmdldCh2YWx1ZSkpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlc1trZXldID0gKHRoaXMuJHEud2hlbih2YWx1ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4kcS5hbGwocHJvbWlzZXMpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN5bmNocm9uaXplZFJlcXVlc3RzJztcclxuZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0ZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlcjtcclxuXHRoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrO1xyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHJlcXVlc3RJZDogbnVtYmVyID0gMDtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlclxyXG5cdFx0XHQsIHB1YmxpYyBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrXHJcblx0XHRcdCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHsgfVxyXG5cclxuXHRnZXREYXRhKC4uLnBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHRcdC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcblx0XHR0aGlzLnJlcXVlc3RJZCsrO1xyXG5cdFx0bGV0IGN1cnJlbnRSZXF1ZXN0SWQ6IG51bWJlciA9IHRoaXMucmVxdWVzdElkO1xyXG5cdFx0dGhpcy4kcS53aGVuKHRoaXMuZGF0YVByb3ZpZGVyKC4uLnBhcmFtcykpLnRoZW4oKC4uLmRhdGE6IGFueVtdKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChjdXJyZW50UmVxdWVzdElkID09IHRoaXMucmVxdWVzdElkKSB7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGVSZXF1ZXN0KC4uLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RHZXR0ZXIge1xyXG5cdCguLi5wYXJhbXM6IGFueVtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0Q2FsbGJhY2sge1xyXG5cdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSB7XHJcblx0Z2V0SW5zdGFuY2UoZGF0YVByb3ZpZGVyOiBJUmVxdWVzdEdldHRlciwgaGFuZGxlUmVxdWVzdDogSVJlcXVlc3RDYWxsYmFjayk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn1cclxuXHJcbnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5leHBvcnQgZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxOiBhbmd1bGFyLklRU2VydmljZSk6IElTeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnkge1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRJbnN0YW5jZShkYXRhUHJvdmlkZXI6IElSZXF1ZXN0R2V0dGVyLCBoYW5kbGVSZXF1ZXN0OiBJUmVxdWVzdENhbGxiYWNrKTogSVN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSB7XHJcblx0XHRcdHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS50c1xuICoqLyIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJy4vbW9jayc7XHJcbmV4cG9ydCB7IG1vY2sgfTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYW5ndWxhckZpeHR1cmUnO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdG1vY2subW9kdWxlTmFtZSxcclxuXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9ja1V0aWxpdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0cHJvbWlzZTogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRkYXRhOiBURGF0YVR5cGU7XHJcblx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgTW9jayB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG5cdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzZXJ2aWNlKSkge1xyXG5cdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRyZXR1cm4gc2VydmljZTtcclxuXHR9XHJcblxyXG5cdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFREYXRhVHlwZT4gPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdHZhciBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VERhdGFUeXBlPiA9IHRoaXMuJHEuZGVmZXI8VERhdGFUeXBlPigpO1xyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBhbmd1bGFyLklTY29wZSk6IHZvaWQge1xyXG5cdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuXHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cdH1cclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE1vY2spO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2sudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2FuZ3VsYXItbW9ja3MnO1xyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHQ6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0ZGlyZWN0aXZlPFRDb250cm9sbGVyVHlwZT4oZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBkb206IHN0cmluZywgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKTogSURpcmVjdGl2ZVJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG59XHJcblxyXG5jbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHR9XHJcblxyXG5cdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29udHJvbGxlcldpdGhCaW5kaW5nczxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIHNjb3BlPzogYW55KVxyXG5cdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdHZhciAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGRpcmVjdGl2ZTxUQ29udHJvbGxlclR5cGU+KGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgZG9tOiBzdHJpbmcsIHNjb3BlOiBhbnkpOiBJRGlyZWN0aXZlUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0c2NvcGUgPSBfLmV4dGVuZChzZXJ2aWNlcy4kcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdHZhciAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHR2YXIgY29tcG9uZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkgPSAkY29tcGlsZShkb20pKHNjb3BlKTtcclxuXHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0Y29udHJvbGxlcjogY29tcG9uZW50LmNvbnRyb2xsZXIoZGlyZWN0aXZlTmFtZSksXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge1xyXG5cdG1vZHVsZU5hbWUgYXMgbm90aWZpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRzZXJ2aWNlTmFtZSBhcyBub3RpZmljYXRpb25TZXJ2aWNlTmFtZSxcclxuXHRJTm90aWZpY2F0aW9uU2VydmljZSxcclxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSVZhbGlkYXRvciwgVmFsaWRhdG9yLCBJRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBJQ29tcG9zaXRlVmFsaWRhdG9yLCBDb21wb3NpdGVWYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvc2l0ZVZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgeyBJVW5yZWdpc3RlckZ1bmN0aW9uLCBJVmFsaWRhdG9yLCBJRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0b3InO1xyXG5leHBvcnQgeyBJQ29tcG9zaXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9jb21wb3NpdGVWYWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5leHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndmFsaWRhdGlvbkZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHsoKTogc3RyaW5nfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCB1c2VzIHdhcm5pbmcgbm90aWZpY2F0aW9ucyB0byBzaG93IGVycm9yc1xyXG5cdCovXHJcblx0YnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCB1c2VzIGVycm9yIG5vdGlmaWNhdGlvbnMgdG8gc2hvdyBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IHVzZXMgYSBjdXN0b20gaGFuZGxlciB0byBzaG93IGVycm9yc1xyXG5cdCpcclxuXHQqIEBwYXJhbSBzaG93RXJyb3IgQSBjdXN0b20gaGFuZGxlciBmb3IgdmFsaWRhdGlvbiBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCBncm91cHMgY2hpbGQgdmFsaWRhdG9yc1xyXG5cdCogYW5kIHVzZXMgd2FybmluZyBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvcjtcclxuXHJcblx0LyoqXHJcblx0KiBCdWlsZCBhIHZhbGlkYXRvciB0aGF0IGdyb3VwcyBjaGlsZCB2YWxpZGF0b3JzXHJcblx0KiBhbmQgdXNlcyBlcnJvciBub3RpZmljYXRpb25zIHRvIHNob3cgZXJyb3JzXHJcblx0Ki9cclxuXHRidWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCogQnVpbGQgYSB2YWxpZGF0b3IgdGhhdCBncm91cHMgY2hpbGQgdmFsaWRhdG9yc1xyXG5cdCogYW5kIHVzZXMgYSBjdXN0b20gaGFuZGxlciB0byBzaG93IGVycm9yc1xyXG5cdCpcclxuXHQqIEBwYXJhbSBzaG93RXJyb3IgQSBjdXN0b20gaGFuZGxlciBmb3IgdmFsaWRhdGlvbiBlcnJvcnNcclxuXHQqL1xyXG5cdGJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElDb21wb3NpdGVWYWxpZGF0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW25vdGlmaWNhdGlvblNlcnZpY2VOYW1lXTtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvblNlcnZpY2UpIHsgfVxyXG5cclxuXHRidWlsZE5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IoKTogSVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvcigpOiBJVmFsaWRhdG9yIHtcclxuXHRcdHJldHVybiBuZXcgVmFsaWRhdG9yKChlcnJvcjogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDdXN0b21WYWxpZGF0b3Ioc2hvd0Vycm9yOiBJRXJyb3JIYW5kbGVyKTogSVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG5cdH1cclxuXHJcblx0YnVpbGRDb21wb3NpdGVOb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yKCk6IElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBDb21wb3NpdGVWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb24ud2FybmluZyhlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ29tcG9zaXRlTm90aWZpY2F0aW9uRXJyb3JWYWxpZGF0b3IoKTogSUNvbXBvc2l0ZVZhbGlkYXRvciB7XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvc2l0ZVZhbGlkYXRvcigoZXJyb3I6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yKHNob3dFcnJvcjogSUVycm9ySGFuZGxlcik6IElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdFx0cmV0dXJuIG5ldyBDb21wb3NpdGVWYWxpZGF0b3Ioc2hvd0Vycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtub3RpZmljYXRpb25Nb2R1bGVOYW1lXSlcclxuXHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVmFsaWRhdGlvblNlcnZpY2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElWYWxpZGF0aW9uU2VydmljZSwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdG9yIHtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyO1xyXG5cdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JIYW5kbGVyIHtcclxuXHQoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3IgaW1wbGVtZW50cyBJVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIHZhbGlkYXRpb25IYW5kbGVyczogeyBbaW5kZXg6IHN0cmluZ106IElWYWxpZGF0aW9uSGFuZGxlciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHZhciBpc0FjdGl2ZTogYm9vbGVhbiA9IHRoaXMuaXNBY3RpdmUoaGFuZGxlcik7XHJcblxyXG5cdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0bGV0IGVycm9yOiBzdHJpbmcgPSB0aGlzLmVycm9yTWVzc2FnZShoYW5kbGVyKTtcclxuXHRcdFx0XHR0aGlzLnNob3dFcnJvcihlcnJvcik7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0fVxyXG5cclxuXHRnZXRFcnJvckNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gXy5yZWR1Y2UoPGFueT50aGlzLnZhbGlkYXRpb25IYW5kbGVycywgKGNvdW50OiBudW1iZXIsIGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IG51bWJlciA9PiB7XHJcblx0XHRcdHZhciBpc0FjdGl2ZTogYm9vbGVhbiA9IHRoaXMuaXNBY3RpdmUoaGFuZGxlcik7XHJcblxyXG5cdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGNvdW50Kys7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjb3VudDtcclxuXHRcdH0sIDApO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2N1cnJlbnRLZXldID0gaGFuZGxlcjtcclxuXHJcblx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaXNBY3RpdmUoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiAoPHsoKTogYm9vbGVhbn0+aGFuZGxlci5pc0FjdGl2ZSkoKSlcclxuXHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PSBudWxsXHJcblx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT09IHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGVycm9yTWVzc2FnZShoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIF8uaXNGdW5jdGlvbihoYW5kbGVyLmVycm9yTWVzc2FnZSlcclxuXHRcdFx0PyAoPHsgKCk6IHN0cmluZyB9PmhhbmRsZXIuZXJyb3JNZXNzYWdlKSgpXHJcblx0XHRcdDogPHN0cmluZz5oYW5kbGVyLmVycm9yTWVzc2FnZTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRvci50c1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IElWYWxpZGF0aW9uU2VydmljZSwgSVZhbGlkYXRpb25IYW5kbGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJVmFsaWRhdG9yLCBWYWxpZGF0b3IsIElFcnJvckhhbmRsZXIsIElVbnJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuL3ZhbGlkYXRvcic7XHJcblxyXG5pbnRlcmZhY2UgSVJlZ2lzdGVyZWRWYWxpZGF0b3IgZXh0ZW5kcyBJVmFsaWRhdG9yIHtcclxuXHRrZXk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9zaXRlVmFsaWRhdG9yIHtcclxuXHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdGdldEVycm9yQ291bnQoKTogbnVtYmVyO1xyXG5cdGJ1aWxkQ2hpbGRWYWxpZGF0b3IoKTogSVZhbGlkYXRvcjtcclxuXHR1bnJlZ2lzdGVyQ2hpbGQodmFsaWRhdG9yOiBJVmFsaWRhdG9yKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVZhbGlkYXRvciBpbXBsZW1lbnRzIElDb21wb3NpdGVWYWxpZGF0b3Ige1xyXG5cdHByaXZhdGUgY2hpbGRWYWxpZGF0b3JzOiB7IFtpbmRleDogc3RyaW5nXTogSVZhbGlkYXRvciB9ID0ge307XHJcblx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dFcnJvcjogSUVycm9ySGFuZGxlcikge31cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0Xy5lYWNoKHRoaXMuY2hpbGRWYWxpZGF0b3JzLCAoaGFuZGxlcjogSVZhbGlkYXRvcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAoIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0RXJyb3JDb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIF8ucmVkdWNlKDxhbnk+dGhpcy5jaGlsZFZhbGlkYXRvcnMsIChjb3VudDogbnVtYmVyLCBoYW5kbGVyOiBJVmFsaWRhdG9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0cmV0dXJuIGNvdW50ICs9IGhhbmRsZXIuZ2V0RXJyb3JDb3VudCgpO1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG5cclxuXHRidWlsZENoaWxkVmFsaWRhdG9yKCk6IElWYWxpZGF0b3Ige1xyXG5cdFx0bGV0IHZhbGlkYXRvcjogSVZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKGVycm9yOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRcdFx0dGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0dGhpcy5jaGlsZFZhbGlkYXRvcnNbY3VycmVudEtleV0gPSB2YWxpZGF0b3I7XHJcblx0XHQoPElSZWdpc3RlcmVkVmFsaWRhdG9yPnZhbGlkYXRvcikua2V5ID0gY3VycmVudEtleTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dW5yZWdpc3RlckNoaWxkKHZhbGlkYXRvcjogSVZhbGlkYXRvcik6IHZvaWQge1xyXG5cdFx0ZGVsZXRlIHRoaXMuY2hpbGRWYWxpZGF0b3JzWyg8SVJlZ2lzdGVyZWRWYWxpZGF0b3I+dmFsaWRhdG9yKS5rZXldO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLnRzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wYXJlUmVzdWx0JztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9