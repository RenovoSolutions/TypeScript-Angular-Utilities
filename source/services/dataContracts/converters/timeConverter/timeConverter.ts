'use strict';

import * as moment from 'moment';

import { IConverter } from '../converters';
import { defaultFormats } from '../../../date/date.module';
import { timezoneService } from '../../../timezone/timezone.service';

export { defaultFormats };

export let timeConverter: IConverter<moment.Moment> = {
	fromServer(raw: string): moment.Moment {
		return raw != null
			? timezoneService.buildMomentWithTimezone(raw, timezoneService.currentTimezone, defaultFormats.timeFormat)
			: null;
	},
	toServer(data: moment.Moment): string {
		return data != null
			? moment(data).format(defaultFormats.timeFormat)
			: null;
	},
};
