'use strict';

import * as moment from 'moment';

import { IConverter } from '../converters';
import { dateUtility, defaultFormats } from '../../../date/date.module';

export { defaultFormats };

export let dateConverter: IConverter<Date> = {
	fromServer(raw: string): Date {
		return dateUtility.getDateFromISOString(raw);
	},
	toServer(data: Moment): string {
		return data != null
			? moment(data).format(defaultFormats.isoFormat)
			: null;
	},
};
