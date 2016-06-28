import { Provider, provide, ExceptionHandler, PipeTransform } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { IsEmptyPipe } from './filters/isEmpty/isEmpty';
import { TruncatePipe } from './filters/truncate/truncate';

import { ARRAY_PROVIDER, arrayToken } from './services/array/array.service';
import { BOOLEAN_PROVIDER, booleanToken } from './services/boolean/boolean.service';
import { RESOURCE_BUILDER_PROVIDER, resourceBuilderToken } from './services/dataContracts/resourceBuilder/resourceBuilder.service';
import { DATE_PROVIDER, dateToken } from './services/date/date.service';
import { ERROR_HANDLER_PROVIDER, DEFAULT_ERROR_PROVIDERS, DEFAULT_LOGIN_URL_PROVIDERS, errorHandlerToken } from './services/errorHandler/errorHandler.service';
import { GENERIC_SEARCH_FILTER_PROVIDER, genericSearchFilterToken } from './services/genericSearchFilter/genericSearchFilter.service';
import { GUID_PROVIDER, guidToken } from './services/guid/guid.service';
import { HTTP_PROVIDER, httpToken } from './services/http/http.service';
import { HTTP_DIGEST_PROVIDER, httpDigestToken } from './services/http/httpDigest.service';
import { LOGGER_PROVIDER, loggerToken } from './services/logger/logger.service';
import { NOTIFICATION_PROVIDER, notificationToken } from './services/notification/notification.service';
import { NUMBER_PROVIDER, numberToken } from './services/number/number.service';
import { OBJECT_PROVIDER, objectUtility, objectToken } from './services/object/object.service';
import { observableToken, ObservableService, IObservableService } from './services/observable/observable.service';
import { REDIRECT_PROVIDER, redirectToken } from './services/redirect/redirect.service';
import { STRING_PROVIDER, stringToken } from './services/string/string.service';
import { SYNCHRONIZED_REQUESTS_PROVIDER, synchronizedRequestsToken } from './services/synchronizedRequests/synchronizedRequests.service';
import { TIME_PROVIDERS, TimeUtility } from './services/time/time.service';
import { TimeoutService } from './services/timeout/timeout.service';
import { TIMEZONE_PROVIDER, timezoneToken } from './services/timezone/timezone.service';
import { TRANSFORM_PROVIDER, transformToken } from './services/transform/transform.service';
import { VALIDATION_PROVIDER, validationToken } from './services/validation/validation.service';
import { WINDOW_PROVIDER, windowToken } from './services/window/window.provider';

export const isEmptyFilterName: string = 'isEmpty';
export const truncateFilterName: string = 'truncate';

export const arrayServiceName: string = 'rlArrayService';
export const booleanServiceName: string = 'rlBooleanService';
export const resourceBuilderServiceName: string = 'rlResourceBuilderService';
export const dateServiceName: string = 'rlDateService';
export const errorHandlerServiceName: string = 'rlErrorHandlerService';
export const httpDigestServiceName: string = 'rlHttpDigestService';
export const genericSearchFilterServiceName: string = 'rlGenericSearchFilterService';
export const guidServiceName: string = 'rlGuidService';
export const httpServiceName: string = 'rlHttpService';
export const notificationServiceName: string = 'rlNotificationService';
export const numberServiceName: string = 'rlNumberService';
export const objectServiceName: string = 'rlObjectService';
export const observableServiceName: string = 'rlObservableService';
export const stringServiceName: string = 'rlStringService';
export const synchronizedRequestsServiceName: string = 'rlSynchronizedRequestsService';
export const timeServiceName: string = 'rlTimeService';
export const timeoutServiceName: string = 'rlTimeoutService';
export const timezoneServiceName: string = 'rlTimezoneService';
export const transformServiceName: string = 'rlTransformService';
export const validationServiceName: string = 'rlValidationService';

export const moduleName: string = 'rl.utilities';

const utilitiesModule = angular.module(moduleName, []);

export interface IObservableFactory {
	getInstance(): IObservableService;
}

export function PipeDowngrader(pipe: PipeTransform) {
	// factory that returns a filter
	return () => (value: any, ...args: any[]): any => {
		return pipe.transform(value, ...args);
	};
}

export function downgradeUtilitiesToAngular1(upgradeAdapter: UpgradeAdapter) {
	const observableFactoryProvider: Provider = new Provider(observableToken, {
		useValue: {
			deps: [ExceptionHandler],
			getInstance: (exceptionHandler: ExceptionHandler): IObservableService => new ObservableService(exceptionHandler),
		},
	})

	// angular's http (distinct from ours below)
	upgradeAdapter.addProvider(HTTP_PROVIDERS);

	upgradeAdapter.addProvider(ARRAY_PROVIDER);
	upgradeAdapter.addProvider(BOOLEAN_PROVIDER);
	upgradeAdapter.addProvider(RESOURCE_BUILDER_PROVIDER);
	upgradeAdapter.addProvider(DATE_PROVIDER);
	upgradeAdapter.addProvider(DEFAULT_ERROR_PROVIDERS);
	upgradeAdapter.addProvider(DEFAULT_LOGIN_URL_PROVIDERS);
	upgradeAdapter.addProvider(ERROR_HANDLER_PROVIDER);
	upgradeAdapter.addProvider(HTTP_DIGEST_PROVIDER);
	upgradeAdapter.addProvider(GENERIC_SEARCH_FILTER_PROVIDER);
	upgradeAdapter.addProvider(GUID_PROVIDER);
	upgradeAdapter.addProvider(HTTP_PROVIDER);
	upgradeAdapter.addProvider(LOGGER_PROVIDER);
	upgradeAdapter.addProvider(NOTIFICATION_PROVIDER);
	upgradeAdapter.addProvider(NUMBER_PROVIDER);
	upgradeAdapter.addProvider(OBJECT_PROVIDER);
	upgradeAdapter.addProvider(observableFactoryProvider);
	upgradeAdapter.addProvider(REDIRECT_PROVIDER);
	upgradeAdapter.addProvider(STRING_PROVIDER);
	upgradeAdapter.addProvider(SYNCHRONIZED_REQUESTS_PROVIDER);
	upgradeAdapter.addProvider(TIME_PROVIDERS);
	upgradeAdapter.addProvider(TimeoutService);
	upgradeAdapter.addProvider(TIMEZONE_PROVIDER);
	upgradeAdapter.addProvider(TRANSFORM_PROVIDER);
	upgradeAdapter.addProvider(VALIDATION_PROVIDER);
	upgradeAdapter.addProvider(WINDOW_PROVIDER);

	utilitiesModule.filter(isEmptyFilterName, PipeDowngrader(new IsEmptyPipe(objectUtility)));
	utilitiesModule.filter(truncateFilterName, PipeDowngrader(new TruncatePipe(objectUtility)));

	utilitiesModule.factory(arrayServiceName, upgradeAdapter.downgradeNg2Provider(arrayToken));
	utilitiesModule.factory(booleanServiceName, upgradeAdapter.downgradeNg2Provider(booleanToken));
	utilitiesModule.factory(resourceBuilderServiceName, upgradeAdapter.downgradeNg2Provider(resourceBuilderToken));
	utilitiesModule.factory(dateServiceName, upgradeAdapter.downgradeNg2Provider(dateToken));
	utilitiesModule.factory(errorHandlerServiceName, upgradeAdapter.downgradeNg2Provider(errorHandlerToken));
	utilitiesModule.factory(httpDigestServiceName, upgradeAdapter.downgradeNg2Provider(httpDigestToken));
	utilitiesModule.factory(genericSearchFilterServiceName, upgradeAdapter.downgradeNg2Provider(genericSearchFilterToken));
	utilitiesModule.factory(guidServiceName, upgradeAdapter.downgradeNg2Provider(guidToken));
	utilitiesModule.factory(httpServiceName, upgradeAdapter.downgradeNg2Provider(httpToken));
	utilitiesModule.factory(notificationServiceName, upgradeAdapter.downgradeNg2Provider(notificationToken));
	utilitiesModule.factory(numberServiceName, upgradeAdapter.downgradeNg2Provider(numberToken));
	utilitiesModule.factory(objectServiceName, upgradeAdapter.downgradeNg2Provider(objectToken));
	utilitiesModule.factory(observableServiceName, upgradeAdapter.downgradeNg2Provider(observableToken));
	utilitiesModule.factory(stringServiceName, upgradeAdapter.downgradeNg2Provider(stringToken));
	utilitiesModule.factory(synchronizedRequestsServiceName, upgradeAdapter.downgradeNg2Provider(synchronizedRequestsToken));
	utilitiesModule.factory(timeServiceName, upgradeAdapter.downgradeNg2Provider(TimeUtility));
	utilitiesModule.factory(timeoutServiceName, upgradeAdapter.downgradeNg2Provider(TimeoutService));
	utilitiesModule.factory(timezoneServiceName, upgradeAdapter.downgradeNg2Provider(timezoneToken));
	utilitiesModule.factory(transformServiceName, upgradeAdapter.downgradeNg2Provider(transformToken));
	utilitiesModule.factory(validationServiceName, upgradeAdapter.downgradeNg2Provider(validationToken));
}
