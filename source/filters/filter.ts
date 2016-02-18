'use strict';

import * as Rx from 'rx';

export interface IFilterWithCounts extends IFilter {
	updateOptionCounts<TItemType>(data: TItemType[]): void;
}

export interface ISerializableFilter extends IFilter {
	serialize<TFilterData>(): TFilterData;
	subscribe<TFilterData>(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscriber;
}

export interface IValueChangeCallback<TFilterData> {
	(newValue: TFilterData): void;
}

export interface IFilter {
	type: string;
	filter<TItemType>(item: TItemType): boolean;
}
