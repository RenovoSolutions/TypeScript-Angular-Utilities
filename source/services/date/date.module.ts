'use strict';

import * as angular from 'angular';

import { moduleName as momentModuleName } from '../moment/moment.module';
import { moduleName as timeModuleName } from '../time/time.service';

import { DateUtility, serviceName } from './date.service';
import { dateTimeFormatServiceName, defaultFormats } from './dateTimeFormatStrings';

export * from './date.service';
export * from './dateTimeFormatStrings';

export var moduleName: string = 'rl.utilities.services.date';

angular.module(moduleName, [momentModuleName, timeModuleName])
	.service(serviceName, DateUtility)
	.value(dateTimeFormatServiceName, defaultFormats);
