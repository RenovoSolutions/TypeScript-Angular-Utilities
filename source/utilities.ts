// uses angularjs

/// <reference path='behaviors/behaviors.module.ts' />
/// <reference path='filters/filters.module.ts' />
/// <reference path='services/services.module.ts' />

module rl.utilities {
	export var moduleName: string = 'rl.utilities';

	angular.module(moduleName, [
		behaviors.moduleName,
		filters.moduleName,
		services.moduleName,
	]);
}
