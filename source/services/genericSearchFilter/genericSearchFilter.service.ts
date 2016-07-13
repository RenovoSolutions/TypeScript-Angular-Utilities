import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { IObjectUtility, ObjectUtility } from '../object/object.service';

import { IStringUtility, StringUtility } from '../string/string.service';
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
			, private string: IStringUtility
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

@Injectable()
export class GenericSearchFilterFactory implements IGenericSearchFilterFactory {
	private objectUtility: IObjectUtility;
	private stringUtility: IStringUtility;

	constructor(objectUtility: ObjectUtility
			, stringUtility: StringUtility) {
		this.objectUtility = objectUtility;
		this.stringUtility = stringUtility;
	}

	getInstance(tokenized?: boolean): IGenericSearchFilter {
		return new GenericSearchFilter(this.objectUtility, this.stringUtility, tokenized);
	}
}
