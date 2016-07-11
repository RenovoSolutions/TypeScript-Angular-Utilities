import { Provider } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import * as array from './array/array.service';
import * as boolean from './boolean/boolean.service';
import * as dataContracts from './dataContracts/dataContracts.module';
import * as date from './date/date.module';
import * as errorHandler from './errorHandler/errorHandler.service';
import * as fileSize from './fileSize/fileSize.module';
import * as genericSearchFilter from './genericSearchFilter/genericSearchFilter.service';
import * as guid from './guid/guid.service';
import * as http from './http/http.service';
import * as digestService from './digest/digest.service';
import * as logger from './logger/logger.service';
import * as notification from './notification/notification.service';
import * as numberService from './number/number.service';
import * as objectService from './object/object.service';
import * as observable from './observable/observable.service';
import * as redirect from './redirect/redirect.service';
import * as search from './search/search.service';
import * as stringService from './string/string.service';
import * as synchronizedRequests from './synchronizedRequests/synchronizedRequests.service';
import * as test from './test/test.module';
import * as time from './time/time.service';
import * as timeout from './timeout/timeout.service';
import * as timezone from './timezone/timezone.service';
import * as transform from './transform/transform.service';
import * as validation from './validation/validation.service';

import { WINDOW_PROVIDER } from './window/window.provider';

export {
	array,
	boolean,
	dataContracts,
    date,
    errorHandler,
	fileSize,
	genericSearchFilter,
	guid,
	http,
	digestService,
	logger,
	notification,
	numberService as number,
	objectService as object,
	observable,
	redirect,
	search,
	stringService as string,
	synchronizedRequests,
	test,
	time,
	timeout,
	timezone,
	transform,
	validation,
};

/**
 * Providers for utility services.
 */
export const UTILITY_PROVIDERS: (Provider | Provider[] | any)[] = [
	HTTP_PROVIDERS,

	array.ARRAY_PROVIDER,
	boolean.BOOLEAN_PROVIDER,
	dataContracts.DATA_CONTRACT_PROVIDERS,
	date.DATE_PROVIDER,
	errorHandler.ERROR_HANDLER_PROVIDER,
	genericSearchFilter.GENERIC_SEARCH_FILTER_PROVIDER,
	guid.GUID_PROVIDER,
	http.HTTP_PROVIDER,
	digestService.DIGEST_PROVIDER,
	numberService.NUMBER_PROVIDER,
	objectService.OBJECT_PROVIDER,
	search.SearchUtility,
	stringService.STRING_PROVIDER,
	synchronizedRequests.SYNCHRONIZED_REQUESTS_PROVIDER,
	time.TIME_PROVIDERS,
	timeout.TimeoutService,
	timezone.TIMEZONE_PROVIDER,
	transform.TRANSFORM_PROVIDER,

	validation.VALIDATION_PROVIDER,

	logger.LOGGER_PROVIDER,

	errorHandler.DEFAULT_ERROR_PROVIDERS,
	errorHandler.DEFAULT_LOGIN_URL_PROVIDERS,

	notification.NOTIFICATION_PROVIDER,
	redirect.REDIRECT_PROVIDER,
	WINDOW_PROVIDER,
];
