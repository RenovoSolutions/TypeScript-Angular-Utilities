"use strict";
var http_1 = require('angular2/http');
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
var http = require('./http/http.service');
exports.http = http;
var logger = require('./logger/logger.service');
exports.logger = logger;
var notification = require('./notification/notification.service');
exports.notification = notification;
var numberService = require('./number/number.service');
exports.number = numberService;
var objectService = require('./object/object.service');
exports.object = objectService;
var observable = require('./observable/observable.service');
exports.observable = observable;
var redirect = require('./redirect/redirect.service');
exports.redirect = redirect;
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
var window_provider_1 = require('./window/window.provider');
/**
 * Providers for utility services.
 */
exports.UTILITY_PROVIDERS = [
    http_1.HTTP_PROVIDERS,
    array.ARRAY_PROVIDER,
    boolean.BOOLEAN_PROVIDER,
    dataContracts.DATA_CONTRACT_PROVIDERS,
    date.DATE_PROVIDER,
    errorHandler.ERROR_HANDLER_PROVIDER,
    genericSearchFilter.GENERIC_SEARCH_FILTER_PROVIDER,
    guid.GUID_PROVIDER,
    http.HTTP_PROVIDER,
    numberService.NUMBER_PROVIDER,
    objectService.OBJECT_PROVIDER,
    search.SEARCH_PROVIDER,
    stringService.STRING_PROVIDER,
    synchronizedRequests.SYNCHRONIZED_REQUESTS_PROVIDER,
    time.TIME_PROVIDER,
    timezone.TIMEZONE_PROVIDER,
    transform.TRANSFORM_SERVICE_PROVIDER,
    validation.VALIDATION_PROVIDER,
    logger.LOGGER_PROVIDER,
    errorHandler.DEFAULT_ERROR_PROVIDERS,
    errorHandler.DEFAULT_LOGIN_URL_PROVIDERS,
    notification.NOTIFICATION_PROVIDER,
    redirect.REDIRECT_PROVIDER,
    window_provider_1.WINDOW_PROVIDER,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFFL0MsSUFBWSxLQUFLLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQTJCOUMsYUFBSztBQTFCTixJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBMkJwRCxlQUFPO0FBMUJSLElBQVksYUFBYSxXQUFNLHNDQUFzQyxDQUFDLENBQUE7QUEyQnJFLHFCQUFhO0FBMUJkLElBQVksSUFBSSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUEyQnZDLFlBQUk7QUExQlIsSUFBWSxZQUFZLFdBQU0scUNBQXFDLENBQUMsQ0FBQTtBQTJCaEUsb0JBQVk7QUExQmhCLElBQVksUUFBUSxXQUFNLDRCQUE0QixDQUFDLENBQUE7QUEyQnRELGdCQUFRO0FBMUJULElBQVksbUJBQW1CLFdBQU0sbURBQW1ELENBQUMsQ0FBQTtBQTJCeEYsMkJBQW1CO0FBMUJwQixJQUFZLElBQUksV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBMkIzQyxZQUFJO0FBMUJMLElBQVksSUFBSSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUEyQjNDLFlBQUk7QUExQkwsSUFBWSxNQUFNLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQTJCakQsY0FBTTtBQTFCUCxJQUFZLFlBQVksV0FBTSxxQ0FBcUMsQ0FBQyxDQUFBO0FBMkJuRSxvQkFBWTtBQTFCYixJQUFZLGFBQWEsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBMkJ2QyxjQUFNO0FBMUJ4QixJQUFZLGFBQWEsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBMkJ2QyxjQUFNO0FBMUJ4QixJQUFZLFVBQVUsV0FBTSxpQ0FBaUMsQ0FBQyxDQUFBO0FBMkI3RCxrQkFBVTtBQTFCWCxJQUFZLFFBQVEsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBMkJ2RCxnQkFBUTtBQTFCVCxJQUFZLE1BQU0sV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBMkJqRCxjQUFNO0FBMUJQLElBQVksYUFBYSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUEyQnZDLGNBQU07QUExQnhCLElBQVksb0JBQW9CLFdBQU0scURBQXFELENBQUMsQ0FBQTtBQTJCM0YsNEJBQW9CO0FBMUJyQixJQUFZLElBQUksV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBMkIxQyxZQUFJO0FBMUJMLElBQVksSUFBSSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUEyQjNDLFlBQUk7QUExQkwsSUFBWSxRQUFRLFdBQU0sNkJBQTZCLENBQUMsQ0FBQTtBQTJCdkQsZ0JBQVE7QUExQlQsSUFBWSxTQUFTLFdBQU0sK0JBQStCLENBQUMsQ0FBQTtBQTJCMUQsaUJBQVM7QUExQlYsSUFBWSxVQUFVLFdBQU0saUNBQWlDLENBQUMsQ0FBQTtBQTJCN0Qsa0JBQVU7QUF6QlgsZ0NBQWdDLDBCQUEwQixDQUFDLENBQUE7QUE0QjNEOztHQUVHO0FBQ1UseUJBQWlCLEdBQThCO0lBQzNELHFCQUFjO0lBRWQsS0FBSyxDQUFDLGNBQWM7SUFDcEIsT0FBTyxDQUFDLGdCQUFnQjtJQUN4QixhQUFhLENBQUMsdUJBQXVCO0lBQ3JDLElBQUksQ0FBQyxhQUFhO0lBQ2xCLFlBQVksQ0FBQyxzQkFBc0I7SUFDbkMsbUJBQW1CLENBQUMsOEJBQThCO0lBQ2xELElBQUksQ0FBQyxhQUFhO0lBQ2xCLElBQUksQ0FBQyxhQUFhO0lBQ2xCLGFBQWEsQ0FBQyxlQUFlO0lBQzdCLGFBQWEsQ0FBQyxlQUFlO0lBQzdCLE1BQU0sQ0FBQyxlQUFlO0lBQ3RCLGFBQWEsQ0FBQyxlQUFlO0lBQzdCLG9CQUFvQixDQUFDLDhCQUE4QjtJQUNuRCxJQUFJLENBQUMsYUFBYTtJQUNsQixRQUFRLENBQUMsaUJBQWlCO0lBQzFCLFNBQVMsQ0FBQywwQkFBMEI7SUFFcEMsVUFBVSxDQUFDLG1CQUFtQjtJQUU5QixNQUFNLENBQUMsZUFBZTtJQUV0QixZQUFZLENBQUMsdUJBQXVCO0lBQ3BDLFlBQVksQ0FBQywyQkFBMkI7SUFFeEMsWUFBWSxDQUFDLHFCQUFxQjtJQUNsQyxRQUFRLENBQUMsaUJBQWlCO0lBQzFCLGlDQUFlO0NBQ2YsQ0FBQyJ9