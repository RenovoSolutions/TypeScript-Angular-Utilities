// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

import { Pipe, PipeTransform } from '@angular/core';

import { IObjectUtility, ObjectUtility } from '../../services/object/object.service';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
	private objectUtility: IObjectUtility;

	constructor(objectUtility: ObjectUtility) {
		this.objectUtility = objectUtility;
	}

	transform(input?: string | number, truncateTo?: number, includeEllipses?: boolean): string {
		includeEllipses = includeEllipses == null ? false : includeEllipses;

		var out: string = this.objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
		if (out.length) {
			if (truncateTo != null && out.length > truncateTo) {
				out = out.substring(0, truncateTo);
				if (includeEllipses) {
					out += '...';
				}
			}
		}
		return out;
	}
}
