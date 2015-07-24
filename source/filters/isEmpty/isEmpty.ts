// uses typings/angular

/// <reference path='../../services/object/object.service.ts' />

module rl.utilities.filters.isEmpty {
	'use strict';

	import __object = rl.utilities.services.object;

	export var moduleName: string = 'rl.utilities.filters.isEmpty';
	export var serviceName: string = 'isEmpty';
	export var filterName: string = serviceName + 'Filter';

	export interface IIsEmptyFilter {
		(input: any, trueWhenEmpty?: boolean): boolean;
	}

	isEmpty.$inject = [__object.serviceName];
	function isEmpty(object: __object.IObjectUtility): IIsEmptyFilter {
		'use strict';
		return (input: any, trueWhenEmpty?: boolean): boolean => {
			var isEmpty: boolean = object.isNullOrEmpty(input);

			if (trueWhenEmpty === false) {
				return !isEmpty;
			}
			return isEmpty;
		};
	}

	angular.module(moduleName, [__object.moduleName])
		.filter(serviceName, isEmpty);
}
