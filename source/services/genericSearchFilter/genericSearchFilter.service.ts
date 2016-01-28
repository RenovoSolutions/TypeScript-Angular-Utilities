'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

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

import { IFilter } from '../../filters/filter';

export var moduleName: string = 'rl.utilities.services.genericSearchFilter';
export var factoryName: string = 'genericSearchFilterFactory';
export var filterName: string = 'search';

export interface IGenericSearchFilter extends IFilter {
	type: string;
	searchText: string;
	minSearchLength: number;
	caseSensitive: boolean;
	filter<TItemType>(item: TItemType): boolean;
}

export class GenericSearchFilter implements IGenericSearchFilter {
	type: string = filterName;
	searchText: string;
	minSearchLength: number = 1;
	caseSensitive: boolean = false;

	constructor(protected object: IObjectUtility, private string: IStringUtilityService) {}

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
