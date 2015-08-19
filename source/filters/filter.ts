module rl.utilities.filter {
	'use strict';

	export var moduleName: string = 'rl.utilities.filter';

	export interface IFilterWithCounts extends IFilter {
		updateOptionCounts<TItemType>(data: TItemType[]): void;
	}

	export interface IFilter {
		type: string;
		filter<TItemType>(item: TItemType): boolean;
	}
}
