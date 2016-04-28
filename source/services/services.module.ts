import { Provider } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import * as _ from 'lodash';

import * as array from './array/array.service';
import * as boolean from './boolean/boolean.service';
import * as dataContracts from './dataContracts/dataContracts.module';
import * as date from './date/date.module';
import * as errorHandler from './errorHandler/errorHandler.service';
import * as fileSize from './fileSize/fileSize.module';
import * as genericSearchFilter from './genericSearchFilter/genericSearchFilter.service';
import * as guid from './guid/guid.service';
import * as http from './http/http.service';
import * as logger from './logger/logger.service';
import * as notification from './notification/notification.service';
import * as numberService from './number/number.service';
import * as objectService from './object/object.service';
import * as observable from './observable/observable.service';
import * as promise from './promise/promise.service';
import * as search from './search/search.service';
import * as stringService from './string/string.service';
import * as synchronizedRequests from './synchronizedRequests/synchronizedRequests.service';
import * as test from './test/test.module';
import * as time from './time/time.service';
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
	logger,
	notification,
	numberService as number,
	objectService as object,
	observable,
	promise,
	search,
	stringService as string,
	synchronizedRequests,
	test,
	time,
	timezone,
	transform,
	validation,
};

/**
 * Providers for utility services.
 */
export const UTILITY_PROVIDERS: Provider[] = [
	HTTP_PROVIDERS,

	array.ARRAY_PROVIDER,
	boolean.BOOLEAN_PROVIDER,
	date.DATE_PROVIDER,
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

];

/**
 * Providers that are often overridden by child applications.
 */
export const DEFAULT_UTILITY_PROVIDERS: Provider[] = [
WINDOW_PROVIDER,
];
