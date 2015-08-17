// uses typings/angularjs
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

/// <reference path='../../services/object/object.service.ts' />

module rl.utilities.filters.truncate {
	'use strict';

	import __object = rl.utilities.services.object;

	export var moduleName: string = 'rl21.utilities.filters.truncate';
	export var serviceName: string = 'truncate';
	export var filterName: string = serviceName + 'Filter';

	export interface ITruncateFilter {
		(input?: string, truncateTo?: number, includeEllipses?: boolean): string;
		(input?: number, truncateTo?: number, includeEllipses?: boolean): string;
	}

	truncate.$inject = [__object.serviceName];
	function truncate(objectUtility: __object.IObjectUtility): ITruncateFilter {
		'use strict';
		return (input?: any, truncateTo?: number, includeEllipses?: boolean): string => {
			includeEllipses = includeEllipses == null ? false : includeEllipses;

			var out: string = objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
			if (out.length) {
				if (truncateTo != null && out.length > truncateTo) {
					out = out.substring(0, truncateTo);
					if (includeEllipses) {
						out += '...';
					}
				}
			}
			return out;
		};
	}

	angular.module(moduleName, [__object.moduleName])
		.filter(serviceName, truncate);
}
