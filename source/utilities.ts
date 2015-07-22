// uses angularjs

/// <reference path='array/array.service.ts' />
/// <reference path='contentProvider/contentProvider.service.ts' />
/// <reference path='date/date.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
/// <reference path='truncate/truncate.ts' />

module rl.utilities {
	export var moduleName: string = 'rl.utilities';

	angular.module(name, [
		array.moduleName,
		contentProvider.moduleName,
		date.moduleName,
		jquery.moduleName,
		number.moduleName,
		object.moduleName,
		observable.moduleName,
		parentChildBehavior.moduleName,
		promise.moduleName,
		truncate.moduleName,
	]);
}
