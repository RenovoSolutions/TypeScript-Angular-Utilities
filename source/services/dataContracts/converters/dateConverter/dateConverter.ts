'use strict';

import * as moment from 'moment';

import { IConverter } from '../converters';
import { dateUtility, defaultFormats } from '../../../date/date.module';

export let dateConverter: IConverter<Date> = {
	fromServer(raw: string): Date {
		return dateUtility.getDateFromISOString(raw);
	},
	toServer(data: Date): string {
		return moment(data).format(defaultFormats.isoFormat);
	},
};
