'use strict';

import * as Rx from 'rx';

import { objectUtility } from '../services/object/object.service';

export interface IFilterWithCounts extends IFilter {
	updateOptionCounts<TItemType>(data: TItemType[]): void;
}

export interface ISerializableFilter<TFilterData> extends IFilter {
	type: string;
	serialize(): TFilterData;
	subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscriber;
}

export interface IValueChangeCallback<TFilterData> {
	(newValue: TFilterData): void;
}

export interface IFilter {
	filter<TItemType>(item: TItemType): boolean;
}

export class SerializableFilter<TFilterData> implements ISerializableFilter<TFilterData> {
	type: string;
	protected subject: Rx.Subject;
	private _value: TFilterData;

	constructor() {
		this.subject = new Rx.Subject();
	}

	// override
	filter(item: any): boolean {
		return true;
	}

	serialize(): TFilterData {
		return <any>this;
	}

	subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscriber {
		return this.subject.subscribe(onValueChange);
	}

	onChange(force: boolean = true): void {
		let newValue: TFilterData = this.serialize();
		if (force || !objectUtility.areEqual(newValue, this._value)) {
			this._value = newValue;
			this.subject.onNext(this._value);
		}
	}
}