'use strict';
var angular = require('angular');
var array = require('./array/array.service');
exports.array = array;
var boolean = require('./boolean/boolean.service');
exports.boolean = boolean;
var dataContracts = require('./dataContracts/dataContracts.module');
exports.dataContracts = dataContracts;
var date = require('./date/date.module');
exports.date = date;
var errorHandler = require('./errorHandler/errorHandler.service');
exports.errorHandler = errorHandler;
var fileSize = require('./fileSize/fileSize.module');
exports.fileSize = fileSize;
var genericSearchFilter = require('./genericSearchFilter/genericSearchFilter.service');
exports.genericSearchFilter = genericSearchFilter;
var guid = require('./guid/guid.service');
exports.guid = guid;
var moment = require('./moment/moment.module');
exports.moment = moment;
var notification = require('./notification/notification.service');
exports.notification = notification;
var numberService = require('./number/number.service');
exports.number = numberService;
var objectService = require('./object/object.service');
exports.object = objectService;
var observable = require('./observable/observable.service');
exports.observable = observable;
var parentChildBehavior = require('./parentChildBehavior/parentChildBehavior.service');
exports.parentChildBehavior = parentChildBehavior;
var promise = require('./promise/promise.service');
exports.promise = promise;
var search = require('./search/search.service');
exports.search = search;
var stringService = require('./string/string.service');
exports.string = stringService;
var synchronizedRequests = require('./synchronizedRequests/synchronizedRequests.service');
exports.synchronizedRequests = synchronizedRequests;
var test = require('./test/test.module');
exports.test = test;
var time = require('./time/time.service');
exports.time = time;
var timezone = require('./timezone/timezone.service');
exports.timezone = timezone;
var transform = require('./transform/transform.service');
exports.transform = transform;
var validation = require('./validation/validation.service');
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
    transform.moduleName,
    validation.moduleName,
]);
//# sourceMappingURL=services.module.js.map