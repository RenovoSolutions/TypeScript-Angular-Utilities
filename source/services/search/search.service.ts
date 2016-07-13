import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';

import { IObjectUtility, ObjectUtility, objectUtility } from '../object/object.service';
import { IStringUtility, StringUtility, stringUtility } from '../string/string.service';

export interface ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean;
	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}

@Injectable()
export class SearchUtility implements ISearchUtility {
	private objectUtility: IObjectUtility;
	private stringUtility: IStringUtility;

	constructor(objectUtility: ObjectUtility
				, stringUtility: StringUtility) {
		this.objectUtility = objectUtility;
		this.stringUtility = stringUtility;
	}

	search(object: any, search: string, caseSensitive?: boolean): boolean {
		if (this.objectUtility.isNullOrEmpty(search)) {
			return true;
		}

		if (_.isObject(object)) {
			let values: any = _.values(object);
			return _.some(values, (value: any): boolean => { return this.search(value, search, caseSensitive); });
		} else {
			let dataString: string = this.objectUtility.toString(object);

			if (!caseSensitive) {
				search = search.toLowerCase();
				dataString = dataString.toLowerCase();
			}

			return this.stringUtility.contains(dataString, search);
		}
	}

	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean {
		if (search == null) {
			return true;
		}

		return _.every(search.split(' '), (subsearch: string): boolean => {
			return this.search(object, subsearch, caseSensitive);
		});
	}
}

export const searchUtility: SearchUtility = new SearchUtility(objectUtility, stringUtility);
