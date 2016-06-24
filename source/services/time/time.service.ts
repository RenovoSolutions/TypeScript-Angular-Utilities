import { OpaqueToken, Provider, Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { takeRight, dropRight, padStart } from 'lodash';

import { CompareResult } from '../../types/compareResult';
import { defaultFormats } from '../date/date.module';
import { IStringUtility, stringToken, stringUtility } from '../string/string.service';

export interface ITime {
	hour: number;
	minute: number;
	period: string;
}

export interface ITimePeriods {
	AM: string;
	PM: string;
}

export const timePeriods: ITimePeriods = {
	AM: 'AM',
	PM: 'PM',
};

export interface ITimeUtility {
	compareTimes(time1: string, time2: string): CompareResult;
	parseTime(value: string): ITime;
	formatTime(time: ITime): string;
}

@Injectable()
export class TimeUtility {
	stringUtility: IStringUtility;

	constructor( @Inject(stringToken) stringUtility: IStringUtility) {
		this.stringUtility = stringUtility;
	}

	compareTimes(time1: string, time2: string): CompareResult {
		let format: string = defaultFormats.timeFormat;

		let start: moment.Moment = moment(time1, format);
		let end: moment.Moment = moment(time2, format);

		if (start.hours() === end.hours()
			&& start.minutes() === end.minutes()) {
			return CompareResult.equal;
		} else if (start.hours() >= end.hours()
				&& start.minutes() >= end.minutes()) {
			return CompareResult.greater;
		} else {
			return CompareResult.less;
		}
	}

	parseTime(value: string): ITime {
		if (value == null) {
			return null;
		}

		let time: ITime = <any>{};
		let [hourString, subsetWithoutHour]: string[] = value.split(':');
		time.hour = this.stringUtility.toNumber(hourString);
		time.minute = this.stringUtility.toNumber(dropRight(subsetWithoutHour, 2).join(''));
		time.period = takeRight(subsetWithoutHour, 2).join('') === timePeriods.PM
					? timePeriods.PM
					: timePeriods.AM;
		return time;
	}

	formatTime(time: ITime): string {
		return time != null
			? time.hour + ':' + padStart(time.minute.toString(), 2, '0') + time.period
			: null;
	}
}

export let timeUtility: ITimeUtility = new TimeUtility(stringUtility);

export const timeToken: OpaqueToken = new OpaqueToken('A utility for working with time');

export const TIME_PROVIDERS: Provider[] = [
	new Provider(timeToken, {
		useClass: TimeUtility,
	}),
	new Provider(TimeUtility, {
		useClass: TimeUtility,
	}),
];
