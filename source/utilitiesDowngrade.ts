import { downgradeInjectable } from '@angular/upgrade/static';
import { HttpUtility } from 'rl-http';

import * as angular from 'angular';

import { ArrayUtility } from './services/array/array.service';
import { BooleanUtility } from './services/boolean/boolean.service';
import { ResourceBuilder } from './services/dataContracts/resourceBuilder/resourceBuilder.service';
import { DateUtility } from './services/date/date.service';
import { ErrorHandlerService } from './services/errorHandler/errorHandler.service';
import { GenericSearchFilterFactory } from './services/genericSearchFilter/genericSearchFilter.service';
import { GuidService } from './services/guid/guid.service';
import { DigestService } from './services/digest/digest.service';
import { NotificationService } from './services/notification/notification.service';
import { NumberUtility } from './services/number/number.service';
import { ObjectUtility } from './services/object/object.service';
import { observableToken, IObservableService } from './services/observable/observable.service';
import { StringUtility } from './services/string/string.service';
import { SynchronizedRequestsFactory } from './services/synchronizedRequests/synchronizedRequests.service';
import { TimeUtility } from './services/time/time.service';
import { TimeoutService } from './services/timeout/timeout.service';
import { TimezoneService } from './services/timezone/timezone.service';
import { TransformService } from './services/transform/transform.service';
import { ValidationService } from './services/validation/validation.service';
import { EmailValidationService } from './services/validation/emailValidation.service';

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

angular.module(moduleName, [])
	   .factory(arrayServiceName, downgradeInjectable(ArrayUtility))
	   .factory(booleanServiceName, downgradeInjectable(BooleanUtility))
	   .factory(resourceBuilderServiceName, downgradeInjectable(ResourceBuilder))
	   .factory(dateServiceName, downgradeInjectable(DateUtility))
	   .factory(errorHandlerServiceName, downgradeInjectable(ErrorHandlerService))
	   .factory(digestServiceName, downgradeInjectable(DigestService))
	   .factory(genericSearchFilterServiceName, downgradeInjectable(GenericSearchFilterFactory))
	   .factory(guidServiceName, downgradeInjectable(GuidService))
	   .factory(httpServiceName, downgradeInjectable(HttpUtility))
	   .factory(notificationServiceName, downgradeInjectable(NotificationService))
	   .factory(numberServiceName, downgradeInjectable(NumberUtility))
	   .factory(objectServiceName, downgradeInjectable(ObjectUtility))
	   .factory(observableServiceName, downgradeInjectable(observableToken))
	   .factory(stringServiceName, downgradeInjectable(StringUtility))
	   .factory(synchronizedRequestsServiceName, downgradeInjectable(SynchronizedRequestsFactory))
	   .factory(timeServiceName, downgradeInjectable(TimeUtility))
	   .factory(timeoutServiceName, downgradeInjectable(TimeoutService))
	   .factory(timezoneServiceName, downgradeInjectable(TimezoneService))
	   .factory(transformServiceName, downgradeInjectable(TransformService))
	   .factory(validationServiceName, downgradeInjectable(ValidationService))
	   .factory(emailValidationServiceName, downgradeInjectable(EmailValidationService));

export interface IObservableFactory {
	getInstance(): IObservableService;
}
