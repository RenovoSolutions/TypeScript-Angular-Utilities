'use strict';

import * as moment from 'moment';

import { IConverter } from '../../baseDataServiceBehavior';
import { IItemList, IItem } from '../../../../types/itemList';

export { IConverter };

export class EnumConverter<TItemType extends IItem> implements IConverter<TItemType> {
	constructor(private enumType: IItemList<TItemType>) {}

	fromServer(raw: number): TItemType {
		return this.enumType.get(raw);
	}
	toServer(data: TItemType): number {
		return data != null
			? data.value
			: null;
	}
};
