'use strict';

import * as angular from 'angular';
import * as moment from 'moment';
import * as _ from 'lodash';

import { timezones } from './timezone.enum';

export interface ITimezoneService {
	getTimezone(date: moment.Moment): string;
	getMomentTimezone(isoString: string): string;
}

export class TimezoneService {
	getTimezone(date: moment.Moment): string {
		return date.format('Z');
	}

	getMomentTimezone(isoString: string): string {
		let offsetText: string = '-' + _.last(isoString.split('-'));
		let momentOffset: string = timezones.get(offsetText).momentName;
		return momentOffset;
	}
}

export let timezoneService: ITimezoneService = new TimezoneService();
