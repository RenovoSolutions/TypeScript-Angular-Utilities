import * as moment from 'moment';

import { IConverter } from '../converters';
import { dateUtility, defaultFormats } from '../../../date/index';

export { defaultFormats };

export const dateConverter: IConverter<moment.Moment> = {
	fromServer(raw: string): moment.Moment {
		return dateUtility.getDateFromISOString(raw);
	},
	toServer(data: moment.Moment): string {
		return data != null
			? moment(data).format(defaultFormats.isoFormat)
			: null;
	},
};
