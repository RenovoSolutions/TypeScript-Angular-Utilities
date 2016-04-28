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
var promise = require('./promise/promise.service');
exports.promise = promise;
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
    numberService.NUMBER_UTILITY_PROVIDER,
    objectService.OBJECT_PROVIDER,
    promise.PROMISE_PROVIDER,
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
    notification.NOTIFICATION_SERVICE_PROVIDER,
    redirect.REDIRECT_PROVIDER,
    window_provider_1.WINDOW_PROVIDER,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFFL0MsSUFBWSxLQUFLLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQTRCOUMsYUFBSztBQTNCTixJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBNEJwRCxlQUFPO0FBM0JSLElBQVksYUFBYSxXQUFNLHNDQUFzQyxDQUFDLENBQUE7QUE0QnJFLHFCQUFhO0FBM0JkLElBQVksSUFBSSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUE0QnZDLFlBQUk7QUEzQlIsSUFBWSxZQUFZLFdBQU0scUNBQXFDLENBQUMsQ0FBQTtBQTRCaEUsb0JBQVk7QUEzQmhCLElBQVksUUFBUSxXQUFNLDRCQUE0QixDQUFDLENBQUE7QUE0QnRELGdCQUFRO0FBM0JULElBQVksbUJBQW1CLFdBQU0sbURBQW1ELENBQUMsQ0FBQTtBQTRCeEYsMkJBQW1CO0FBM0JwQixJQUFZLElBQUksV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBNEIzQyxZQUFJO0FBM0JMLElBQVksSUFBSSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUE0QjNDLFlBQUk7QUEzQkwsSUFBWSxNQUFNLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQTRCakQsY0FBTTtBQTNCUCxJQUFZLFlBQVksV0FBTSxxQ0FBcUMsQ0FBQyxDQUFBO0FBNEJuRSxvQkFBWTtBQTNCYixJQUFZLGFBQWEsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBNEJ2QyxjQUFNO0FBM0J4QixJQUFZLGFBQWEsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBNEJ2QyxjQUFNO0FBM0J4QixJQUFZLFVBQVUsV0FBTSxpQ0FBaUMsQ0FBQyxDQUFBO0FBNEI3RCxrQkFBVTtBQTNCWCxJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBNEJwRCxlQUFPO0FBM0JSLElBQVksUUFBUSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUE0QnZELGdCQUFRO0FBM0JULElBQVksTUFBTSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUE0QmpELGNBQU07QUEzQlAsSUFBWSxhQUFhLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQTRCdkMsY0FBTTtBQTNCeEIsSUFBWSxvQkFBb0IsV0FBTSxxREFBcUQsQ0FBQyxDQUFBO0FBNEIzRiw0QkFBb0I7QUEzQnJCLElBQVksSUFBSSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUE0QjFDLFlBQUk7QUEzQkwsSUFBWSxJQUFJLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQTRCM0MsWUFBSTtBQTNCTCxJQUFZLFFBQVEsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBNEJ2RCxnQkFBUTtBQTNCVCxJQUFZLFNBQVMsV0FBTSwrQkFBK0IsQ0FBQyxDQUFBO0FBNEIxRCxpQkFBUztBQTNCVixJQUFZLFVBQVUsV0FBTSxpQ0FBaUMsQ0FBQyxDQUFBO0FBNEI3RCxrQkFBVTtBQTFCWCxnQ0FBZ0MsMEJBQTBCLENBQUMsQ0FBQTtBQTZCM0Q7O0dBRUc7QUFDVSx5QkFBaUIsR0FBOEI7SUFDM0QscUJBQWM7SUFFZCxLQUFLLENBQUMsY0FBYztJQUNwQixPQUFPLENBQUMsZ0JBQWdCO0lBQ3hCLGFBQWEsQ0FBQyx1QkFBdUI7SUFDckMsSUFBSSxDQUFDLGFBQWE7SUFDbEIsWUFBWSxDQUFDLHNCQUFzQjtJQUNuQyxtQkFBbUIsQ0FBQyw4QkFBOEI7SUFDbEQsSUFBSSxDQUFDLGFBQWE7SUFDbEIsSUFBSSxDQUFDLGFBQWE7SUFDbEIsYUFBYSxDQUFDLHVCQUF1QjtJQUNyQyxhQUFhLENBQUMsZUFBZTtJQUM3QixPQUFPLENBQUMsZ0JBQWdCO0lBQ3hCLE1BQU0sQ0FBQyxlQUFlO0lBQ3RCLGFBQWEsQ0FBQyxlQUFlO0lBQzdCLG9CQUFvQixDQUFDLDhCQUE4QjtJQUNuRCxJQUFJLENBQUMsYUFBYTtJQUNsQixRQUFRLENBQUMsaUJBQWlCO0lBQzFCLFNBQVMsQ0FBQywwQkFBMEI7SUFDcEMsVUFBVSxDQUFDLG1CQUFtQjtJQUU5QixNQUFNLENBQUMsZUFBZTtJQUV0QixZQUFZLENBQUMsdUJBQXVCO0lBQ3BDLFlBQVksQ0FBQywyQkFBMkI7SUFFeEMsWUFBWSxDQUFDLDZCQUE2QjtJQUMxQyxRQUFRLENBQUMsaUJBQWlCO0lBQzFCLGlDQUFlO0NBQ2YsQ0FBQyJ9