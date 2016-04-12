'use strict';

import * as _ from 'lodash';

export interface ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean;
	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}

class SearchUtility implements ISearchUtility {
	search(object: any, search: string, caseSensitive?: boolean): boolean {
		return true;
	}

	tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean {
		return true;
	}
}

export let searchUtility: ISearchUtility = new SearchUtility();
