import { Provider, provide, ExceptionHandler, PipeTransform } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { IsEmptyPipe } from './filters/isEmpty/isEmpty';
import { TruncatePipe } from './filters/truncate/truncate';

import { ARRAY_PROVIDER } from './services/array/array.service';
import { BOOLEAN_PROVIDER } from './services/boolean/boolean.service';
import { RESOURCE_BUILDER_PROVIDER } from './services/dataContracts/resourceBuilder/resourceBuilder.service';
import { DATE_PROVIDER } from './services/date/date.service';
import { ERROR_HANDLER_PROVIDER, DEFAULT_ERROR_PROVIDERS, DEFAULT_LOGIN_URL_PROVIDERS } from './services/errorHandler/errorHandler.service';
import { GENERIC_SEARCH_FILTER_PROVIDER } from './services/genericSearchFilter/genericSearchFilter.service';
import { GUID_PROVIDER } from './services/guid/guid.service';
import { LOGGER_PROVIDER } from './services/logger/logger.service';
import { NOTIFICATION_PROVIDER } from './services/notification/notification.service';
import { NUMBER_PROVIDER } from './services/number/number.service';
import { OBJECT_PROVIDER, objectUtility } from './services/object/object.service';
import { observableToken, ObservableService, IObservableService } from './services/observable/observable.service';
import { REDIRECT_PROVIDER } from './services/redirect/redirect.service';
import { STRING_PROVIDER } from './services/string/string.service';
import { SYNCHRONIZED_REQUESTS_PROVIDER } from './services/synchronizedRequests/synchronizedRequests.service';
import { TIME_PROVIDER } from './services/time/time.service';
import { TIMEZONE_PROVIDER } from './services/timezone/timezone.service';
import { VALIDATION_PROVIDER } from './services/validation/validation.service';
import { WINDOW_PROVIDER } from './services/window/window.provider';

export const isEmptyFilterName: string = 'isEmpty';
export const truncateFilterName: string = 'truncate';

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
export const stringServiceName: string = 'rlStringService';
export const synchronizedRequestsServiceName: string = 'rlSynchronizedRequestsService';
export const timeServiceName: string = 'rlTimeService';
export const timezoneServiceName: string = 'rlTimezoneService';
export const validationServiceName: string = 'rlValidationService';

export const moduleName: string = 'rl.utilities';

const utilitiesModule = angular.module(moduleName, []);

export interface IObservableFactory {
	getInstance(): IObservableService;
}

export function PipeDowngrader(pipe: PipeTransform) {
	return (value: any, ...args: any[]): any => {
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
	upgradeAdapter.addProvider(observableFactoryProvider);
	upgradeAdapter.addProvider(REDIRECT_PROVIDER);
	upgradeAdapter.addProvider(STRING_PROVIDER);
	upgradeAdapter.addProvider(SYNCHRONIZED_REQUESTS_PROVIDER);
	upgradeAdapter.addProvider(TIME_PROVIDER);
	upgradeAdapter.addProvider(TIMEZONE_PROVIDER);
	upgradeAdapter.addProvider(VALIDATION_PROVIDER);
	upgradeAdapter.addProvider(WINDOW_PROVIDER);

	utilitiesModule.filter(isEmptyFilterName, PipeDowngrader(new IsEmptyPipe(objectUtility)));
	utilitiesModule.filter(truncateFilterName, PipeDowngrader(new TruncatePipe(objectUtility)));

	utilitiesModule.factory(arrayServiceName, upgradeAdapter.downgradeNg2Provider(ARRAY_PROVIDER));
	utilitiesModule.factory(booleanServiceName, upgradeAdapter.downgradeNg2Provider(BOOLEAN_PROVIDER));
	utilitiesModule.factory(resourceBuilderServiceName, upgradeAdapter.downgradeNg2Provider(RESOURCE_BUILDER_PROVIDER));
	utilitiesModule.factory(dateServiceName, upgradeAdapter.downgradeNg2Provider(DATE_PROVIDER));
	utilitiesModule.factory(errorHandlerServiceName, upgradeAdapter.downgradeNg2Provider(ERROR_HANDLER_PROVIDER));
	utilitiesModule.factory(genericSearchFilterServiceName, upgradeAdapter.downgradeNg2Provider(GENERIC_SEARCH_FILTER_PROVIDER));
	utilitiesModule.factory(guidServiceName, upgradeAdapter.downgradeNg2Provider(GUID_PROVIDER));
	utilitiesModule.factory(notificationServiceName, upgradeAdapter.downgradeNg2Provider(NOTIFICATION_PROVIDER));
	utilitiesModule.factory(numberServiceName, upgradeAdapter.downgradeNg2Provider(NUMBER_PROVIDER));
	utilitiesModule.factory(objectServiceName, upgradeAdapter.downgradeNg2Provider(OBJECT_PROVIDER));
	utilitiesModule.factory(observableServiceName, upgradeAdapter.downgradeNg2Provider(observableFactoryProvider));
	utilitiesModule.factory(stringServiceName, upgradeAdapter.downgradeNg2Provider(STRING_PROVIDER));
	utilitiesModule.factory(synchronizedRequestsServiceName, upgradeAdapter.downgradeNg2Provider(SYNCHRONIZED_REQUESTS_PROVIDER));
	utilitiesModule.factory(timeServiceName, upgradeAdapter.downgradeNg2Provider(TIME_PROVIDER));
	utilitiesModule.factory(timezoneServiceName, upgradeAdapter.downgradeNg2Provider(TIMEZONE_PROVIDER));
	utilitiesModule.factory(validationServiceName, upgradeAdapter.downgradeNg2Provider(VALIDATION_PROVIDER));
}
