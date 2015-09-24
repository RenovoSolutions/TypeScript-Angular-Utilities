'use strict';

import * as angular from 'angular';

import * as array from './array/array.service';
import * as autosave from './autosave/autosave.service';
import * as autosaveAction from './autosaveAction/autosaveAction.service';
import * as boolean from './boolean/boolean.service';
import * as date from './date/date.module';
import * as fileSize from './fileSize/fileSize.module';
import * as genericSearchFilter from './genericSearchFilter/genericSearchFilter.service';
import * as moment from './moment/moment.module';
import * as notification from './notification/notification.service';
import * as numberService from './number/number.service';
import * as objectService from './object/object.service';
import * as observable from './observable/observable.service';

import * as time from './time/time.service';

// /// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
// /// <reference path='promise/promise.service.ts' />
// /// <reference path='string/string.service.ts' />
// /// <reference path='time/time.service.ts' />
// /// <reference path='validation/validation.service.ts' />

export {
	array,
	autosave,
	autosaveAction,
	boolean,
	date,
	fileSize,
	genericSearchFilter,
	moment,
	notification,
	numberService as number,
	objectService as object,
	observable,
	
	time,
};

export var name: string = 'rl.utilities.services';

angular.module(name, [
	array.moduleName,
	autosave.moduleName,
	autosaveAction.moduleName,
	boolean.moduleName,
	date.moduleName,
	fileSize.moduleName,
	genericSearchFilter.moduleName,
	moment.moduleName,
	notification.moduleName,
	numberService.moduleName,
	objectService.moduleName,
	observable.moduleName,

	time.moduleName,

	// parentChildBehavior.moduleName,
	// promise.moduleName,
	// string.moduleName,
	// time.moduleName,
	// validation.moduleName,
]);
