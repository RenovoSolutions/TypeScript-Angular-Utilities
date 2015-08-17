// uses angularjs

/// <reference path='stopEventPropagation/stopEventPropagation.ts' />

module rl.utilities.behaviors {
	export var moduleName: string = 'rl.utilities.behaviors';

	angular.module(moduleName, [
		stopEventPropogation.moduleName,
	]);
}
