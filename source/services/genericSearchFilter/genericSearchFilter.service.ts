/// <reference path='../object/object.service.ts' />
/// <reference path='../string/string.service.ts' />
/// <reference path='../../filters/filter.ts' />

module rl.utilities.services.genericSearchFilter {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.genericSearchFilter';
	export var factoryName: string = 'genericSearchFilterFactory';
	export var filterName: string = 'search';

	export interface IGenericSearchFilter extends filter.IFilter {
		type: string;
		searchText: string;
		caseSensitive: boolean;
		filter<TItemType>(item: TItemType): boolean;
	}

	export class GenericSearchFilter implements IGenericSearchFilter {
		type: string = filterName;
		searchText: string;
		caseSensitive: boolean = false;

		constructor(private object: object.IObjectUtility, private string: string.IStringUtilityService) {}

		filter<TItemType>(item: TItemType): boolean {
			if (this.object.isNullOrEmpty(this.searchText)) {
				return true;
			}

			return this.searchObject(item, this.searchText, this.caseSensitive);
		}

		private searchObject<TItemType>(item: TItemType, search: string, caseSensitive: boolean): boolean {
			if (_.isObject(item)) {
				var values: any = _.values(item);
				return _.any(values, (value: any): boolean => { return this.searchObject(value, search, caseSensitive); });
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

	genericSearchFilterFactory.$inject = [object.serviceName, string.serviceName];
	function genericSearchFilterFactory(object: object.IObjectUtility,
		stringUtility: string.IStringUtilityService): IGenericSearchFilterFactory {

		'use strict';

		return {
			getInstance(): IGenericSearchFilter {
				return new GenericSearchFilter(object, stringUtility);
			}
		};
	}

	angular.module(moduleName, [object.moduleName, string.moduleName])
		.factory(factoryName, genericSearchFilterFactory);
}
