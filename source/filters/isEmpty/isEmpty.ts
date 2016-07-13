import { Pipe, PipeTransform } from '@angular/core';

import { IObjectUtility, ObjectUtility } from '../../services/object/object.service';

@Pipe({	name: 'isEmpty' })
export class IsEmptyPipe implements PipeTransform {
	private objectUtility: IObjectUtility;

	constructor(objectUtility: ObjectUtility) {
		this.objectUtility = objectUtility;
	}
	transform(input: any, trueWhenEmpty?: boolean): boolean {
		var isEmpty: boolean = this.objectUtility.isNullOrEmpty(input);

		if (trueWhenEmpty === false) {
			return !isEmpty;
		}
		return isEmpty;
	}
}
