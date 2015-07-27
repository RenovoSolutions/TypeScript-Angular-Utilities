// uses typings/angularjs

/// <reference path='../number/number.service.ts' />
/// <reference path='fileSize.service.ts' />
/// <reference path='fileSizeFilter.ts' />

module rl.utilities.services.fileSize {
	'use strict';

	export var moduleName: string = 'rl21.utilities.services.fileSize';

	angular.module(moduleName, [number.moduleName])
		.factory(factoryName, fileSizeFactory)
		.filter(simpleFilterName, fileSizeFilter);
}
