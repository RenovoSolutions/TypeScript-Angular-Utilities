import { Injectable, Inject, OpaqueToken, Provider } from 'angular2/core';
import * as _ from 'lodash';

import { IObjectUtility, objectToken, objectUtility } from '../object/object.service';
import { IStringUtility, stringToken, stringUtility } from '../string/string.service';

export interface ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean;
	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}

class SearchUtility implements ISearchUtility {
	private objectUtility: IObjectUtility;
	private stringUtility: IStringUtility;

	constructor( @Inject(objectToken) objectUtility: IObjectUtility
				, @Inject(stringToken) stringUtility: IStringUtility) {
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

export let searchUtility: ISearchUtility = new SearchUtility(objectUtility, stringUtility);

export const searchToken: OpaqueToken = new OpaqueToken('A service for performing text search against an object');

export const SEARCH_PROVIDER: Provider = new Provider(searchToken, {
	useClass: SearchUtility,
});
