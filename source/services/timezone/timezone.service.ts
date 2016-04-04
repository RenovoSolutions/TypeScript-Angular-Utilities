'use strict';

import * as angular from 'angular';
import * as moment from 'moment';
import * as _ from 'lodash';

import { timezones, ITimezone } from './timezone.enum';
import { defaultFormats } from '../date/date.module';

export * from './timezone.enum';

export interface ITimezoneService {
	getTimezone(isoString: string): ITimezone;
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

	getTimezone(isoString: string): ITimezone {
		if (isoString == null) {
			return null;
		}

		let offsetText: string = '-' + _.last(isoString.split('-'));
		return timezones.get(offsetText);
	}

	getMomentTimezone(isoString: string): string {
		let timezone: ITimezone = this.getTimezone(isoString);
		return timezone != null
			? timezone.momentName
			: null;
	}
}

export let timezoneService: ITimezoneService = new TimezoneService();
