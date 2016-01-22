'use strict';

import * as moment from 'moment';

import { IConverter } from '../../baseDataServiceBehavior';
import { IItemList, IItem } from '../../../../types/itemList';

export { IConverter };

export class EnumConverter implements IConverter<IItemList> {
	constructor(private enumType: IItemList) {}

	fromServer(raw: number): IItem {
		return this.enumType.get(raw);
	},
	toServer(data: IItem): number {
		return data != null
			? data.value
			: null;
	},
};
