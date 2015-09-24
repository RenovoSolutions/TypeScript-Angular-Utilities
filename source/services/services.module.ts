'use strict';

import * as angular from 'angular';

import * as array from './array/array.service';
import * as autosave from './autosave/autosave.service';
import * as autosaveAction from './autosaveAction/autosaveAction.service';
import * as boolean from './boolean/boolean.service';
import * as date from './date/date.module';

import * as moment from './moment/moment.module';
import * as objectService from './object/object.service';
import * as observable from './observable/observable.service';
import * as time from './time/time.service';

// /// <reference path='array/array.service.ts' />
// /// <reference path='autosave/autosave.service.ts' />
// /// <reference path='autosaveAction/autosaveAction.service.ts' />
// /// <reference path='boolean/boolean.service.ts' />
// /// <reference path='contentProvider/contentProvider.service.ts' />
// /// <reference path='date/date.module.ts' />
// /// <reference path='fileSize/fileSize.module.ts' />
// /// <reference path='genericSearchFilter/genericSearchFilter.service.ts' />
// /// <reference path='jquery/jquery.service.ts' />
// /// <reference path='moment/moment.module.ts' />
// /// <reference path='notification/notification.service.ts' />
// /// <reference path='number/number.service.ts' />
// /// <reference path='object/object.service.ts' />
// /// <reference path='observable/observable.service.ts' />
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

	moment,
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

	moment.moduleName,
	objectService.moduleName,
	observable.moduleName,
	time.moduleName,

	// fileSize.moduleName,
	// genericSearchFilter.moduleName,
	// jquery.moduleName,
	// momentWrapper.moduleName,
	// notification.moduleName,
	// number.moduleName,
	// object.moduleName,
	// observable.moduleName,
	// parentChildBehavior.moduleName,
	// promise.moduleName,
	// string.moduleName,
	// time.moduleName,
	// validation.moduleName,
]);
