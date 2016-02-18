'use strict';

import * as Rx from 'rx';

import { objectUtility } from '../services/object/object.service';

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

export class SerializableFilter<TFilterValue> implements ISerializableFilter {
	type: string;
	protected subject: Rx.Subject;
	private _value: TFilterValue;

	constructor() {
		this.subject = new Rx.Subject();
	}

	// override
	filter(item: any): boolean {
		return true;
	}

	serialize(): TFilterValue {
		return <any>this;
	}

	subscribe(onValueChange: IValueChangeCallback<TFilterValue>): Rx.Subscriber {
		return this.subject.subscribe(onValueChange);
	}

	protected onChange(force: boolean = true): void {
		let newValue: TFilterValue = this.serialize();
		if (force || !objectUtility.areEqual(newValue, this._value)) {
			this._value = newValue;
			this.subject.onNext(this._value);
		}
	}
}