import { Provider, provide, ExceptionHandler, PipeTransform } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { UTILITY_PROVIDERS } from './services/index';

import { ArrayUtility } from './services/array/array.service';
import { BooleanUtility } from './services/boolean/boolean.service';
import { ResourceBuilder } from './services/dataContracts/resourceBuilder/resourceBuilder.service';
import { DateUtility } from './services/date/date.service';
import { ErrorHandlerService, DefaultErrors, DefaultLoginUrlSettings } from './services/errorHandler/errorHandler.service';
import { GenericSearchFilterFactory } from './services/genericSearchFilter/genericSearchFilter.service';
import { GuidService } from './services/guid/guid.service';
import { HttpUtility } from './services/http/http.service';
import { DigestService } from './services/digest/digest.service';
import { Logger } from './services/logger/logger.service';
import { NotificationService } from './services/notification/notification.service';
import { NumberUtility } from './services/number/number.service';
import { ObjectUtility, objectUtility } from './services/object/object.service';
import { observableToken, ObservableService, IObservableService } from './services/observable/observable.service';
import { RedirectService } from './services/redirect/redirect.service';
import { StringUtility } from './services/string/string.service';
import { SearchUtility } from './services/search/search.service';
import { SynchronizedRequestsFactory } from './services/synchronizedRequests/synchronizedRequests.service';
import { TimeUtility } from './services/time/time.service';
import { TimeoutService } from './services/timeout/timeout.service';
import { TimezoneService } from './services/timezone/timezone.service';
import { TransformService } from './services/transform/transform.service';
import { ValidationService } from './services/validation/validation.service';
import { EmailValidationService } from './services/validation/emailValidation.service';
import { WINDOW_PROVIDER, WindowWrapper } from './services/window/window.provider';

export const arrayServiceName: string = 'rlArrayService';
export const booleanServiceName: string = 'rlBooleanService';
export const resourceBuilderServiceName: string = 'rlResourceBuilderService';
export const dateServiceName: string = 'rlDateService';
export const errorHandlerServiceName: string = 'rlErrorHandlerService';
export const digestServiceName: string = 'rlDigestService';
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
export const emailValidationServiceName: string = 'rlEmailValidationService';

export const moduleName: string = 'rl.utilities';

const utilitiesModule = angular.module(moduleName, []);

export interface IObservableFactory {
	getInstance(): IObservableService;
}

export function downgradeUtilitiesToAngular1(upgradeAdapter: UpgradeAdapter) {
	const observableFactoryProvider: Provider = new Provider(observableToken, {
		useValue: {
			deps: [ExceptionHandler],
			getInstance: (exceptionHandler: ExceptionHandler): IObservableService => new ObservableService(exceptionHandler),
		},
	})

	upgradeAdapter.addProvider(observableFactoryProvider);

	utilitiesModule.factory(arrayServiceName, upgradeAdapter.downgradeNg2Provider(ArrayUtility));
	utilitiesModule.factory(booleanServiceName, upgradeAdapter.downgradeNg2Provider(BooleanUtility));
	utilitiesModule.factory(resourceBuilderServiceName, upgradeAdapter.downgradeNg2Provider(ResourceBuilder));
	utilitiesModule.factory(dateServiceName, upgradeAdapter.downgradeNg2Provider(DateUtility));
	utilitiesModule.factory(errorHandlerServiceName, upgradeAdapter.downgradeNg2Provider(ErrorHandlerService));
	utilitiesModule.factory(digestServiceName, upgradeAdapter.downgradeNg2Provider(DigestService));
	utilitiesModule.factory(genericSearchFilterServiceName, upgradeAdapter.downgradeNg2Provider(GenericSearchFilterFactory));
	utilitiesModule.factory(guidServiceName, upgradeAdapter.downgradeNg2Provider(GuidService));
	utilitiesModule.factory(httpServiceName, upgradeAdapter.downgradeNg2Provider(HttpUtility));
	utilitiesModule.factory(notificationServiceName, upgradeAdapter.downgradeNg2Provider(NotificationService));
	utilitiesModule.factory(numberServiceName, upgradeAdapter.downgradeNg2Provider(NumberUtility));
	utilitiesModule.factory(objectServiceName, upgradeAdapter.downgradeNg2Provider(ObjectUtility));
	utilitiesModule.factory(observableServiceName, upgradeAdapter.downgradeNg2Provider(observableToken));
	utilitiesModule.factory(stringServiceName, upgradeAdapter.downgradeNg2Provider(StringUtility));
	utilitiesModule.factory(synchronizedRequestsServiceName, upgradeAdapter.downgradeNg2Provider(SynchronizedRequestsFactory));
	utilitiesModule.factory(timeServiceName, upgradeAdapter.downgradeNg2Provider(TimeUtility));
	utilitiesModule.factory(timeoutServiceName, upgradeAdapter.downgradeNg2Provider(TimeoutService));
	utilitiesModule.factory(timezoneServiceName, upgradeAdapter.downgradeNg2Provider(TimezoneService));
	utilitiesModule.factory(transformServiceName, upgradeAdapter.downgradeNg2Provider(TransformService));
	utilitiesModule.factory(validationServiceName, upgradeAdapter.downgradeNg2Provider(ValidationService));
	utilitiesModule.factory(emailValidationServiceName, upgradeAdapter.downgradeNg2Provider(EmailValidationService));
}
