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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksS0FBSyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUF3QjlDLGFBQUs7QUF2Qk4sSUFBWSxPQUFPLFdBQU0sMkJBQTJCLENBQUMsQ0FBQTtBQXdCcEQsZUFBTztBQXZCUixJQUFZLGFBQWEsV0FBTSxzQ0FBc0MsQ0FBQyxDQUFBO0FBd0JyRSxxQkFBYTtBQXZCZCxJQUFZLElBQUksV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBd0J2QyxZQUFJO0FBdkJSLElBQVksWUFBWSxXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUF3QmhFLG9CQUFZO0FBdkJoQixJQUFZLFFBQVEsV0FBTSw0QkFBNEIsQ0FBQyxDQUFBO0FBd0J0RCxnQkFBUTtBQXZCVCxJQUFZLG1CQUFtQixXQUFNLG1EQUFtRCxDQUFDLENBQUE7QUF3QnhGLDJCQUFtQjtBQXZCcEIsSUFBWSxJQUFJLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQXdCM0MsWUFBSTtBQXZCTCxJQUFZLE1BQU0sV0FBTSx3QkFBd0IsQ0FBQyxDQUFBO0FBd0JoRCxjQUFNO0FBdkJQLElBQVksWUFBWSxXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUF3Qm5FLG9CQUFZO0FBdkJiLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF3QnZDLGNBQU07QUF2QnhCLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF3QnZDLGNBQU07QUF2QnhCLElBQVksVUFBVSxXQUFNLGlDQUFpQyxDQUFDLENBQUE7QUF3QjdELGtCQUFVO0FBdkJYLElBQVksbUJBQW1CLFdBQU0sbURBQW1ELENBQUMsQ0FBQTtBQXdCeEYsMkJBQW1CO0FBdkJwQixJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBd0JwRCxlQUFPO0FBdkJSLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF3QnZDLGNBQU07QUF2QnhCLElBQVksb0JBQW9CLFdBQU0scURBQXFELENBQUMsQ0FBQTtBQXdCM0YsNEJBQW9CO0FBdkJyQixJQUFZLElBQUksV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBd0IxQyxZQUFJO0FBdkJMLElBQVksSUFBSSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUF3QjNDLFlBQUk7QUF2QkwsSUFBWSxRQUFRLFdBQU0sNkJBQTZCLENBQUMsQ0FBQTtBQXdCdkQsZ0JBQVE7QUF2QlQsSUFBWSxTQUFTLFdBQU0sK0JBQStCLENBQUMsQ0FBQTtBQXdCMUQsaUJBQVM7QUF2QlYsSUFBWSxVQUFVLFdBQU0saUNBQWlDLENBQUMsQ0FBQTtBQXdCN0Qsa0JBQVU7QUFHQSxrQkFBVSxHQUFXLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQixLQUFLLENBQUMsVUFBVTtJQUNoQixPQUFPLENBQUMsVUFBVTtJQUNsQixhQUFhLENBQUMsVUFBVTtJQUNyQixJQUFJLENBQUMsVUFBVTtJQUNmLFlBQVksQ0FBQyxVQUFVO0lBQzFCLFFBQVEsQ0FBQyxVQUFVO0lBQ25CLG1CQUFtQixDQUFDLFVBQVU7SUFDOUIsSUFBSSxDQUFDLFVBQVU7SUFDZixNQUFNLENBQUMsVUFBVTtJQUNqQixZQUFZLENBQUMsVUFBVTtJQUN2QixhQUFhLENBQUMsVUFBVTtJQUN4QixhQUFhLENBQUMsVUFBVTtJQUN4QixVQUFVLENBQUMsVUFBVTtJQUNyQixtQkFBbUIsQ0FBQyxVQUFVO0lBQzlCLE9BQU8sQ0FBQyxVQUFVO0lBQ2xCLGFBQWEsQ0FBQyxVQUFVO0lBQ3hCLG9CQUFvQixDQUFDLFVBQVU7SUFDL0IsSUFBSSxDQUFDLFVBQVU7SUFDZixJQUFJLENBQUMsVUFBVTtJQUNmLFNBQVMsQ0FBQyxVQUFVO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVO0NBQ3JCLENBQUMsQ0FBQyJ9