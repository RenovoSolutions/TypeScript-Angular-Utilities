import { UpgradeAdapter } from 'angular2/upgrade';

import * as angular from 'angular';

import { ARRAY_PROVIDER } from './services/array/array.service';
import { BOOLEAN_PROVIDER } from './services/boolean/boolean.service';
import { RESOURCE_BUILDER_PROVIDER } from './services/dataContracts/resourceBuilder/resourcebuilder.service';
import { DATE_PROVIDER } from './services/date/date.service';
import { ERROR_HANDLER_PROVIDER, DEFAULT_ERROR_PROVIDERS, DEFAULT_LOGIN_URL_PROVIDERS } from './services/errorHandler/errorHandler.service';
import { GENERIC_SEARCH_FILTER_PROVIDER } from './services/genericSearchFilter/genericSearchFilter.service';
import { GUID_PROVIDER } from './services/guid/guid.service';
import { LOGGER_PROVIDER } from './services/logger/logger.service';
import { NOTIFICATION_PROVIDER } from './services/notification/notification.service';
import { NUMBER_PROVIDER } from './services/number/number.service';
import { OBJECT_PROVIDER } from './services/object/object.service';
import { OBSERVABLE_PROVIDER } from './services/observable/observable.service';
import { PROMISE_PROVIDER } from './services/promise/promise.service';
import { REDIRECT_PROVIDER } from './services/redirect/redirect.service';
import { STRING_PROVIDER } from './services/string/string.service';
import { SYNCHRONIZED_REQUESTS_PROVIDER } from './services/synchronizedRequests/synchronizedRequests.service';
import { TIME_PROVIDER } from './services/time/time.service';
import { TIMEZONE_PROVIDER } from './services/timezone/timezone.service';
import { VALIDATION_PROVIDER } from './services/validation/validation.service';
import { WINDOW_PROVIDER } from './services/window/window.provider';

export const arrayServiceName: string = 'rlArrayService';
export const booleanServiceName: string = 'rlBooleanService';
export const resourceBuilderServiceName: string = 'rlResourceBuilderService';
export const dateServiceName: string = 'rlDateService';
export const errorHandlerServiceName: string = 'rlErrorHandlerService';
export const genericSearchFilterServiceName: string = 'rlGenericSearchFilterService';
export const guidServiceName: string = 'rlGuidService';
export const httpServiceName: string = 'rlHttpService';
export const notificationServiceName: string = 'rlNotificationService';
export const numberServiceName: string = 'rlNumberService';
export const objectServiceName: string = 'rlObjectService';
export const observableServiceName: string = 'rlObservableService';
export const promiseServiceName: string = 'rlPromiseService';
export const stringServiceName: string = 'rlStringService';
export const synchronizedRequestsServiceName: string = 'rlSynchronizedRequestsService';
export const timeServiceName: string = 'rlTimeService';
export const timezoneServiceName: string = 'rlTimezoneService';
export const validationServiceName: string = 'rlValidationService';

export const moduleName: string = 'rl.utilities';

const utilitiesModule = angular.module(moduleName, []);

export function downgradeUtilitiesToAngular1(upgradeAdapter: UpgradeAdapter) {
	upgradeAdapter.addProvider(ARRAY_PROVIDER);
	upgradeAdapter.addProvider(BOOLEAN_PROVIDER);
	upgradeAdapter.addProvider(RESOURCE_BUILDER_PROVIDER);
	upgradeAdapter.addProvider(DATE_PROVIDER);
	upgradeAdapter.addProvider(ERROR_HANDLER_PROVIDER);
	upgradeAdapter.addProvider(DEFAULT_ERROR_PROVIDERS);
	upgradeAdapter.addProvider(DEFAULT_LOGIN_URL_PROVIDERS);
	upgradeAdapter.addProvider(GENERIC_SEARCH_FILTER_PROVIDER);
	upgradeAdapter.addProvider(GUID_PROVIDER);
	upgradeAdapter.addProvider(LOGGER_PROVIDER);
	upgradeAdapter.addProvider(NOTIFICATION_PROVIDER);
	upgradeAdapter.addProvider(NUMBER_PROVIDER);
	upgradeAdapter.addProvider(OBJECT_PROVIDER);
	upgradeAdapter.addProvider(OBSERVABLE_PROVIDER);
	upgradeAdapter.addProvider(PROMISE_PROVIDER);
	upgradeAdapter.addProvider(REDIRECT_PROVIDER);
	upgradeAdapter.addProvider(STRING_PROVIDER);
	upgradeAdapter.addProvider(SYNCHRONIZED_REQUESTS_PROVIDER);
	upgradeAdapter.addProvider(TIME_PROVIDER);
	upgradeAdapter.addProvider(TIMEZONE_PROVIDER);
	upgradeAdapter.addProvider(VALIDATION_PROVIDER);
	upgradeAdapter.addProvider(WINDOW_PROVIDER);

	utilitiesModule.service(arrayServiceName, upgradeAdapter.downgradeNg2Provider(ARRAY_PROVIDER));
	utilitiesModule.service(booleanServiceName, upgradeAdapter.downgradeNg2Provider(BOOLEAN_PROVIDER));
	utilitiesModule.service(resourceBuilderServiceName, upgradeAdapter.downgradeNg2Provider(RESOURCE_BUILDER_PROVIDER));
	utilitiesModule.service(dateServiceName, upgradeAdapter.downgradeNg2Provider(DATE_PROVIDER));
	utilitiesModule.service(errorHandlerServiceName, upgradeAdapter.downgradeNg2Provider(ERROR_HANDLER_PROVIDER));
	utilitiesModule.service(genericSearchFilterServiceName, upgradeAdapter.downgradeNg2Provider(GENERIC_SEARCH_FILTER_PROVIDER));
	utilitiesModule.service(guidServiceName, upgradeAdapter.downgradeNg2Provider(GUID_PROVIDER));
	utilitiesModule.service(notificationServiceName, upgradeAdapter.downgradeNg2Provider(NOTIFICATION_PROVIDER));
	utilitiesModule.service(numberServiceName, upgradeAdapter.downgradeNg2Provider(NUMBER_PROVIDER));
	utilitiesModule.service(objectServiceName, upgradeAdapter.downgradeNg2Provider(OBJECT_PROVIDER));
	utilitiesModule.service(observableServiceName, upgradeAdapter.downgradeNg2Provider(OBSERVABLE_PROVIDER));
	utilitiesModule.service(promiseServiceName, upgradeAdapter.downgradeNg2Provider(PROMISE_PROVIDER));
	utilitiesModule.service(stringServiceName, upgradeAdapter.downgradeNg2Provider(STRING_PROVIDER));
	utilitiesModule.service(synchronizedRequestsServiceName, upgradeAdapter.downgradeNg2Provider(SYNCHRONIZED_REQUESTS_PROVIDER));
	utilitiesModule.service(timeServiceName, upgradeAdapter.downgradeNg2Provider(TIME_PROVIDER));
	utilitiesModule.service(timezoneServiceName, upgradeAdapter.downgradeNg2Provider(TIMEZONE_PROVIDER));
	utilitiesModule.service(validationServiceName, upgradeAdapter.downgradeNg2Provider(VALIDATION_PROVIDER));
}
