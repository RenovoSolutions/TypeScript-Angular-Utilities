'use strict';

import * as array from './array/array.service';
import * as boolean from './boolean/boolean.service';
import * as dataContracts from './dataContracts/dataContracts.module';
import * as date from './date/date.module';
import * as errorHandler from './errorHandler/errorHandler.service';
import * as fileSize from './fileSize/fileSize.module';
import * as genericSearchFilter from './genericSearchFilter/genericSearchFilter.service';
import * as guid from './guid/guid.service';
import * as notification from './notification/notification.service';
import * as numberService from './number/number.service';
import * as objectService from './object/object.service';
import * as observable from './observable/observable.service';
import * as parentChildBehavior from './parentChildBehavior/parentChildBehavior.service';
import * as promise from './promise/promise.service';
import * as search from './search/search.service';
import * as stringService from './string/string.service';
import * as synchronizedRequests from './synchronizedRequests/synchronizedRequests.service';
import * as test from './test/test.module';
import * as time from './time/time.service';
import * as timezone from './timezone/timezone.service';
import * as transform from './transform/transform.service';
import * as validation from './validation/validation.service';

export {
	array,
	boolean,
	dataContracts,
    date,
    errorHandler,
	fileSize,
	genericSearchFilter,
	guid,
	moment,
	notification,
	numberService as number,
	objectService as object,
	observable,
	parentChildBehavior,
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
