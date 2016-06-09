import { OpaqueToken, Provider } from '@angular/core';
import * as _ from 'lodash';

export interface IArrayUtility {
	findIndexOf<TDataType>(array: TDataType[], predicate: { (item: TDataType): boolean }): number;
	remove<TDataType>(array: TDataType[], item: { (obj: TDataType): boolean }): TDataType;
	remove<TDataType>(array: TDataType[], item: TDataType): TDataType;
	replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void;
	sum<TDataType>(array: TDataType[], transform: { (item: TDataType): number }): number;
	sum(array: number[]): number;
	last<TDataType>(array: TDataType[]): TDataType;
	toDictionary<TDataType>(array: TDataType[], keySelector: { (item: TDataType): string }): { [index: string]: TDataType };
	has<TDataType>(array: TDataType[], index: number): boolean;
	arrayify<TDataType>(maybeArray: TDataType[] | TDataType): TDataType[];
}

export class ArrayUtility implements IArrayUtility {
	findIndexOf<TDataType>(array: TDataType[], predicate: { (item: TDataType): boolean }): number {
		var targetIndex: number;

		_.each(array, (item: TDataType, index: number): boolean => {
			if (predicate(item)) {
				targetIndex = index;
				return false;
			}
		});

		return targetIndex != null ? targetIndex : -1;
	}

	remove<TDataType>(array: TDataType[], item: TDataType | { (obj: TDataType): boolean }): TDataType {
		var index: number;

		if (_.isFunction(item)) {
			index = this.findIndexOf(array, <{(obj: TDataType): boolean}>item);
		} else {
			index = _.indexOf(array, <TDataType>item);
		}

		if (index >= 0) {
			return array.splice(index, 1)[0];
		} else {
			return null;
		}
	}

	replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void {
		var index: number = _.indexOf(array, oldItem);

		if (index >= 0) {
			array.splice(index, 1, newItem);
		}
	}

	sum<TDataType>(array: TDataType[], transform?: { (item: TDataType): number }): number {
		var list: number[];

		if (transform != null) {
			list = _.map(array, (item: TDataType): number => { return transform(item); });
		} else {
			list = <any[]>array;
		}

		return _.reduce(list, (sum: number, num: number): number => { return sum + num; }, 0);
	}

	toDictionary<TDataType>(array: TDataType[], keySelector: { (item: TDataType): string })
		: { [index: string]: TDataType } {
		array = _.reject(array, (item: TDataType): boolean => {
			return keySelector(item) == null;
		});
		// needs to be seeded with an object or it will be viewed as an array with no items
		return _.reduce(array, (dictionary: { [index: string]: TDataType }, item: TDataType): { [index: string]: TDataType } => {
			dictionary[keySelector(item)] = item;
			return dictionary;
		}, <any>{});
	}

	last<TDataType>(array: TDataType[]): TDataType {
		if (array != null && array.length > 0) {
			return array[array.length - 1];
		}
	}

	has<TDataType>(array: TDataType[], index: number): boolean {
		if (array == null || index < 0 || index >= array.length) {
			return false;
		}

		return array[index] != null;
	}

	arrayify<TDataType>(maybeArray: TDataType[] | TDataType): TDataType[] {
		if (_.isArray(maybeArray)) {
			return maybeArray;
		} else if (maybeArray) {
			return [maybeArray];
		} else {
			return [];
		}
	}
}

export let arrayUtility: IArrayUtility = new ArrayUtility();

export const arrayToken: OpaqueToken = new OpaqueToken('A service for manipulating arrays');

export const ARRAY_PROVIDER: Provider = new Provider(arrayToken, {
	useClass: ArrayUtility,
});
