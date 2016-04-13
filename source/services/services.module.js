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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksS0FBSyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUF5QjlDLGFBQUs7QUF4Qk4sSUFBWSxPQUFPLFdBQU0sMkJBQTJCLENBQUMsQ0FBQTtBQXlCcEQsZUFBTztBQXhCUixJQUFZLGFBQWEsV0FBTSxzQ0FBc0MsQ0FBQyxDQUFBO0FBeUJyRSxxQkFBYTtBQXhCZCxJQUFZLElBQUksV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBeUJ2QyxZQUFJO0FBeEJSLElBQVksWUFBWSxXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUF5QmhFLG9CQUFZO0FBeEJoQixJQUFZLFFBQVEsV0FBTSw0QkFBNEIsQ0FBQyxDQUFBO0FBeUJ0RCxnQkFBUTtBQXhCVCxJQUFZLG1CQUFtQixXQUFNLG1EQUFtRCxDQUFDLENBQUE7QUF5QnhGLDJCQUFtQjtBQXhCcEIsSUFBWSxJQUFJLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQXlCM0MsWUFBSTtBQXhCTCxJQUFZLE1BQU0sV0FBTSx3QkFBd0IsQ0FBQyxDQUFBO0FBeUJoRCxjQUFNO0FBeEJQLElBQVksWUFBWSxXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUF5Qm5FLG9CQUFZO0FBeEJiLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF5QnZDLGNBQU07QUF4QnhCLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF5QnZDLGNBQU07QUF4QnhCLElBQVksVUFBVSxXQUFNLGlDQUFpQyxDQUFDLENBQUE7QUF5QjdELGtCQUFVO0FBeEJYLElBQVksbUJBQW1CLFdBQU0sbURBQW1ELENBQUMsQ0FBQTtBQXlCeEYsMkJBQW1CO0FBeEJwQixJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBeUJwRCxlQUFPO0FBeEJSLElBQVksTUFBTSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF5QmpELGNBQU07QUF4QlAsSUFBWSxhQUFhLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQXlCdkMsY0FBTTtBQXhCeEIsSUFBWSxvQkFBb0IsV0FBTSxxREFBcUQsQ0FBQyxDQUFBO0FBeUIzRiw0QkFBb0I7QUF4QnJCLElBQVksSUFBSSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUF5QjFDLFlBQUk7QUF4QkwsSUFBWSxJQUFJLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQXlCM0MsWUFBSTtBQXhCTCxJQUFZLFFBQVEsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBeUJ2RCxnQkFBUTtBQXhCVCxJQUFZLFNBQVMsV0FBTSwrQkFBK0IsQ0FBQyxDQUFBO0FBeUIxRCxpQkFBUztBQXhCVixJQUFZLFVBQVUsV0FBTSxpQ0FBaUMsQ0FBQyxDQUFBO0FBeUI3RCxrQkFBVTtBQUdBLGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLE9BQU8sQ0FBQyxVQUFVO0lBQ2xCLGFBQWEsQ0FBQyxVQUFVO0lBQ3JCLElBQUksQ0FBQyxVQUFVO0lBQ2YsWUFBWSxDQUFDLFVBQVU7SUFDMUIsUUFBUSxDQUFDLFVBQVU7SUFDbkIsbUJBQW1CLENBQUMsVUFBVTtJQUM5QixJQUFJLENBQUMsVUFBVTtJQUNmLE1BQU0sQ0FBQyxVQUFVO0lBQ2pCLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLGFBQWEsQ0FBQyxVQUFVO0lBQ3hCLGFBQWEsQ0FBQyxVQUFVO0lBQ3hCLFVBQVUsQ0FBQyxVQUFVO0lBQ3JCLG1CQUFtQixDQUFDLFVBQVU7SUFDOUIsT0FBTyxDQUFDLFVBQVU7SUFDbEIsYUFBYSxDQUFDLFVBQVU7SUFDeEIsb0JBQW9CLENBQUMsVUFBVTtJQUMvQixJQUFJLENBQUMsVUFBVTtJQUNmLElBQUksQ0FBQyxVQUFVO0lBQ2YsU0FBUyxDQUFDLFVBQVU7SUFDcEIsVUFBVSxDQUFDLFVBQVU7Q0FDckIsQ0FBQyxDQUFDIn0=