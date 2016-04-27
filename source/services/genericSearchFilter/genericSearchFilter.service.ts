import { Inject, Provider, OpaqueToken } from 'angular2/core';

import * as _ from 'lodash';
import * as Rx from 'rx';

import {
	IObjectUtility,
	objectToken,
} from '../object/object.service';

import {
	IStringUtilityService,
	stringToken,
} from '../string/string.service';
import { searchUtility } from '../search/search.service';

import { ISerializableFilter, SerializableFilter } from '../../filters/filter';

export var filterName: string = 'search';

export interface IGenericSearchFilter extends ISerializableFilter<string> {
	type: string;
	searchText: string;
	minSearchLength: number;
	caseSensitive: boolean;
	filter<TItemType>(item: TItemType): boolean;
}

export class GenericSearchFilter extends SerializableFilter<string> implements IGenericSearchFilter {
	type: string = filterName;
	minSearchLength: number = 1;
	caseSensitive: boolean = false;
	private _searchText: string;

	constructor(protected object: IObjectUtility
			, private string: IStringUtilityService
			, private tokenized: boolean) {
		super();
	}

	get searchText(): string {
		return this._searchText;
	}

	set searchText(value: string) {
		this._searchText = value;
		this.onChange(false);
	}

	serialize(): string {
		return this.searchText != null && this.searchText.length >= this.minSearchLength
			? this.searchText
			: null;
	}

	filter<TItemType>(item: TItemType): boolean {
		if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
			return true;
		}

		if (this.tokenized) {
			return searchUtility.tokenizedSearch(item, this.searchText, this.caseSensitive);
		}

		return searchUtility.search(item, this.searchText, this.caseSensitive);
	}
}

export interface IGenericSearchFilterFactory {
	getInstance(tokenized?: boolean): IGenericSearchFilter;
}

export function genericSearchFilterFactory(@Inject(objectToken) object: IObjectUtility,
	@Inject(stringToken) stringUtility: IStringUtilityService): IGenericSearchFilterFactory {

	return {
		getInstance(tokenized?: boolean): IGenericSearchFilter {
			return new GenericSearchFilter(object, stringUtility, tokenized);
		}
	};
}

export const genericSearchFilterToken: OpaqueToken = new OpaqueToken('A factory for getting generic search filters');

export const GENERIC_SEARCH_FILTER_PROVIDER: Provider = new Provider(genericSearchFilterToken, {
	useFactory: genericSearchFilterFactory
});
