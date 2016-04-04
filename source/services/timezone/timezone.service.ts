'use strict';

import * as angular from 'angular';
import * as moment from 'moment';

export interface ITimezoneService {
	getTimezone(date: moment.Moment): string;
	getMomentTimezone(isoString: string): string;
}

export class TimezoneService {
	getTimezone(date: moment.Moment): string {
		return date.format('Z');
	}

	getMomentTimezone(isoString: string): string {
		return null;
	}
}

export let timezone: ITimezoneService = new TimezoneService();
