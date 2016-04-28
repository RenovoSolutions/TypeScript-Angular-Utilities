'use strict';

import * as Rx from 'rxjs';

import { objectUtility } from '../services/object/object.service';

export interface IFilterWithCounts extends IFilter {
	updateOptionCounts<TItemType>(data: TItemType[]): void;
}

export interface ISerializableFilter<TFilterData> extends IFilter {
	type: string;
	serialize(): TFilterData;
	subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscription;
}

export interface IValueChangeCallback<TFilterData> {
	(newValue: TFilterData): void;
}

export interface IFilter {
	filter<TItemType>(item: TItemType): boolean;
}

export abstract class SerializableFilter<TFilterData> implements ISerializableFilter<TFilterData> {
	type: string;
	protected subject: Rx.Subject<TFilterData>;
	private _value: TFilterData;

	constructor() {
		this.subject = new Rx.Subject<TFilterData>();
	}

	abstract filter(item: any): boolean;

	serialize(): TFilterData {
		return <any>this;
	}

	subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscription {
		return this.subject.subscribe(onValueChange);
	}

	onChange(force: boolean = true): void {
		let newValue: TFilterData = this.serialize();
		if (force || !objectUtility.areEqual(newValue, this._value)) {
			this._value = newValue;
			this.subject.next(this._value);
		}
	}
}