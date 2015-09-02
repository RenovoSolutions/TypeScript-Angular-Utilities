// uses angularjs

/// <reference path='array/array.service.ts' />
/// <reference path='autosave/autosave.service.ts' />
/// <reference path='autosaveAction/autosaveAction.service.ts' />
/// <reference path='boolean/boolean.service.ts' />
/// <reference path='contentProvider/contentProvider.service.ts' />
/// <reference path='date/date.module.ts' />
/// <reference path='fileSize/fileSize.module.ts' />
/// <reference path='genericSearchFilter/genericSearchFilter.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='moment/moment.module.ts' />
/// <reference path='notification/notification.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
/// <reference path='string/string.service.ts' />
/// <reference path='time/time.service.ts' />
/// <reference path='validation/validation.service.ts' />

module rl.utilities.services {
	export var moduleName: string = 'rl.utilities.services';

	angular.module(moduleName, [
		array.moduleName,
		autosave.moduleName,
		autosaveAction.moduleName,
		boolean.moduleName,
		contentProvider.moduleName,
		date.moduleName,
		fileSize.moduleName,
		genericSearchFilter.moduleName,
		jquery.moduleName,
		momentWrapper.moduleName,
		notification.moduleName,
		number.moduleName,
		object.moduleName,
		observable.moduleName,
		parentChildBehavior.moduleName,
		promise.moduleName,
		string.moduleName,
		time.moduleName,
		validation.moduleName,
	]);
}
