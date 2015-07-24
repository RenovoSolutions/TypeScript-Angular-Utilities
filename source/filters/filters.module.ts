// uses angularjs

/// <reference path='isEmpty/isEmpty.ts' />
/// <reference path='truncate/truncate.ts' />

module rl.utilities.filters {
	export var moduleName: string = 'rl.utilities.filters';

	angular.module(moduleName, [
		isEmpty.moduleName,
		truncate.moduleName,
	]);
}
