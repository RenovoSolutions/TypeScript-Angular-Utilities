import * as _ from 'lodash';

export interface IItem {
    value: number;
    name: string;
    display: string;
}

export interface IItemList<TItemType extends IItem> {
	get(value: number | string): TItemType;
	all(): TItemType[];
}

export class ItemList<TItemType extends IItem> {
	private items: TItemType[];

	setItems(items: TItemType[]): void {
		this.items = items;
	}

	get(value: number | string): TItemType {
		var predicate: { (item: TItemType): boolean };

		if (typeof value === 'string') {
			predicate = (item: TItemType): boolean => {
				return (item.name === value);
			};
		} else {
			predicate = (item: TItemType): boolean => {
				return (item.value === value);
			};
		}

		return _.find(this.items, predicate);
	}

	all(): TItemType[] {
		return this.items;
	}
}
