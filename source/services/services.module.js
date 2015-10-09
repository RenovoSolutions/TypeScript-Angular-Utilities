'use strict';
var angular = require('angular');
var array = require('./array/array.service');
exports.array = array;
var autosave = require('./autosave/autosave.service');
exports.autosave = autosave;
var autosaveAction = require('./autosaveAction/autosaveAction.service');
exports.autosaveAction = autosaveAction;
var boolean = require('./boolean/boolean.service');
exports.boolean = boolean;
var date = require('./date/date.module');
exports.date = date;
var fileSize = require('./fileSize/fileSize.module');
exports.fileSize = fileSize;
var genericSearchFilter = require('./genericSearchFilter/genericSearchFilter.service');
exports.genericSearchFilter = genericSearchFilter;
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
var stringService = require('./string/string.service');
exports.string = stringService;
var synchronizedRequests = require('./synchronizedRequests/synchronizedRequests.service');
exports.synchronizedRequests = synchronizedRequests;
var test = require('./test/test.module');
exports.test = test;
var time = require('./time/time.service');
exports.time = time;
var validation = require('./validation/validation.service');
exports.validation = validation;
exports.name = 'rl.utilities.services';
angular.module(exports.name, [
    array.moduleName,
    autosave.moduleName,
    autosaveAction.moduleName,
    boolean.moduleName,
    date.moduleName,
    fileSize.moduleName,
    genericSearchFilter.moduleName,
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
//# sourceMappingURL=services.module.js.map