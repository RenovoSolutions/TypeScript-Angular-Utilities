import { Inject, Pipe, PipeTransform } from '@angular/core';

import {
	IObjectUtility,
	objectToken
} from '../../services/object/object.service';

@Pipe({
	name: 'isEmpty',
	pure: false,
})
export class IsEmptyPipe implements PipeTransform {
	private objectUtility: IObjectUtility;

	constructor( @Inject(objectToken) objectUtility: IObjectUtility) {
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
