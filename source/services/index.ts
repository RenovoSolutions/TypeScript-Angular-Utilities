import { Provider } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import * as array from './array/array.service';
import * as boolean from './boolean/boolean.service';
import * as dataContracts from './dataContracts/index';
import * as date from './date/index';
import * as errorHandler from './errorHandler/errorHandler.service';
import * as fileSize from './fileSize/index';
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
import * as test from './test/index';
import * as time from './time/time.service';
import * as timeout from './timeout/timeout.service';
import * as timezone from './timezone/timezone.service';
import * as transform from './transform/transform.service';
import * as validation from './validation/validation.service';
import * as window from './window/window.provider';


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
	window,
};

/**
 * Providers for utility services.
 */
export const UTILITY_PROVIDERS: (Provider | Provider[] | any)[] = [
	HTTP_PROVIDERS,

	array.ArrayUtility,
	boolean.BooleanUtility,
	dataContracts.DATA_CONTRACT_PROVIDERS,
	date.DateUtility,
	errorHandler.ErrorHandlerService,
	genericSearchFilter.GenericSearchFilterFactory,
	guid.GuidService,
	http.HttpUtility,
	digestService.DigestService,
	numberService.NumberUtility,
	objectService.ObjectUtility,
	search.SearchUtility,
	stringService.StringUtility,
	synchronizedRequests.SynchronizedRequestsFactory,
	time.TimeUtility,
	timeout.TimeoutService,
	timezone.TimezoneService,
	transform.TransformService,

	validation.ValidationService,

	logger.Logger,

	errorHandler.DefaultErrors,
	errorHandler.DefaultLoginUrlSettings,

	notification.NotificationService,
	redirect.RedirectService,
	window.WINDOW_PROVIDER,
];
