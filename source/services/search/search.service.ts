'use strict';

import * as _ from 'lodash';

import { objectUtility } from '../object/object.service';
import { stringUtility } from '../string/string.service';

export interface ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean;
	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}

class SearchUtility implements ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean {
		if (objectUtility.isNullOrEmpty(search)) {
			return true;
		}

		if (_.isObject(object)) {
			let values: any = _.values(object);
			return _.some(values, (value: any): boolean => { return this.search(value, search, caseSensitive); });
		} else {
			let dataString: string = objectUtility.toString(object);

			if (!caseSensitive) {
				search = search.toLowerCase();
				dataString = dataString.toLowerCase();
			}

			return stringUtility.contains(dataString, search);
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

export let searchUtility: ISearchUtility = new SearchUtility();
