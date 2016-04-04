'use strict';

import * as angular from 'angular';
import * as moment from 'moment';
import * as _ from 'lodash';

import { timezones, ITimezone } from './timezone.enum';

export interface ITimezoneService {
	getTimezone(date: moment.Moment): string;
	getMomentTimezone(isoString: string): string;
	setCurrentTimezone(offset: string): void;
	currentTimezone: ITimezone;
}

export class TimezoneService {
	private _currentTimezone: ITimezone;

	get currentTimezone(): ITimezone {
		return this._currentTimezone;
	}

	setCurrentTimezone(offset: string): void {
		let timezone: ITimezone = timezones.get(offset);
		this._currentTimezone = timezone;
	}

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
