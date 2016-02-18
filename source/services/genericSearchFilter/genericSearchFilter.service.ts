'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import * as Rx from 'rx';

import {
	moduleName as objectModuleName,
	serviceName as objectServiceName,
	IObjectUtility,
} from '../object/object.service';

import {
	moduleName as stringModuleName,
	serviceName as stringServiceName,
	IStringUtilityService,
} from '../string/string.service';

import { ISerializableFilter, IValueChangeCallback } from '../../filters/filter';

export var moduleName: string = 'rl.utilities.services.genericSearchFilter';
export var factoryName: string = 'genericSearchFilterFactory';
export var filterName: string = 'search';

export interface IGenericSearchFilter extends ISerializableFilter {
	type: string;
	searchText: string;
	minSearchLength: number;
	caseSensitive: boolean;
	filter<TItemType>(item: TItemType): boolean;
	serialize(): string;
	subscribe(onValueChange: IValueChangeCallback<string>): Rx.Subscriber;
}

export class GenericSearchFilter implements IGenericSearchFilter {
	type: string = filterName;
	minSearchLength: number = 1;
	caseSensitive: boolean = false;
	private _searchText: string;
	private _value: string;
	private subject: Rx.Subject;

	constructor(protected object: IObjectUtility, private string: IStringUtilityService) {
		this.subject = new Rx.Subject();
	}

	get searchText(): string {
		return this._searchText;
	}

	set searchText(value: string) {
		this._searchText = value;
		this.checkForValueChange();
	}

	serialize(): string {
		return this.searchText != null && this.searchText.length >= this.minSearchLength
			? this.searchText
			: null;
	}

	subscribe(onValueChange: IValueChangeCallback<string>): Rx.Subscriber {
		return this.subject.subscribe(onValueChange);
	}

	filter<TItemType>(item: TItemType): boolean {
		if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
			return true;
		}

		return this.searchObject(item, this.searchText, this.caseSensitive);
	}

	private searchObject<TItemType>(item: TItemType, search: string, caseSensitive: boolean): boolean {
		if (_.isObject(item)) {
			var values: any = _.values(item);
			return _.some(values, (value: any): boolean => { return this.searchObject(value, search, caseSensitive); });
		} else {
			var dataString: string = this.object.toString(item);

			if (!caseSensitive) {
				search = search.toLowerCase();
				dataString = dataString.toLowerCase();
			}

			return this.string.contains(dataString, search);
		}
	}

	private checkForValueChange(): void {
		let newValue: string = this.serialize();
		if (this._value != newValue) {
			this.subject.onNext(newValue);
		}

		this._value = newValue;
	}
}

export interface IGenericSearchFilterFactory {
	getInstance(): IGenericSearchFilter;
}

genericSearchFilterFactory.$inject = [objectServiceName, stringServiceName];
function genericSearchFilterFactory(object: IObjectUtility,
	stringUtility: IStringUtilityService): IGenericSearchFilterFactory {

	'use strict';

	return {
		getInstance(): IGenericSearchFilter {
			return new GenericSearchFilter(object, stringUtility);
		}
	};
}

angular.module(moduleName, [objectModuleName, stringModuleName])
	.factory(factoryName, genericSearchFilterFactory);
