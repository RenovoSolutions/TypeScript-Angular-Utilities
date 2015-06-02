// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
'use strict';

export var name: string = 'truncate';

import __objectUtility = require('../object/object.service');

export interface ITruncateFilter {
	(input?: string, truncateTo?: number, includeEllipses?: boolean): string;
	(input?: number, truncateTo?: number, includeEllipses?: boolean): string;
}

export function truncate(objectUtility: __objectUtility.IObjectUtility): ITruncateFilter {
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
