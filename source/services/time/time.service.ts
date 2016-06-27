import { OpaqueToken, Provider, Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { takeRight, dropRight, padStart } from 'lodash';

import { CompareResult } from '../../types/compareResult';
import { defaultFormats } from '../date/date.module';
import { IStringUtility, stringToken, stringUtility } from '../string/string.service';
import { IObjectUtility, objectToken, objectUtility } from '../object/object.service';

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

const defaultHour: number = 12;
const defaultMinute: number = 0;

export interface ITimeUtility {
	compareTimes(time1: string, time2: string): CompareResult;
	parseTime(value: string): ITime;
	formatTime(time: ITime, includePeriod?: boolean): string;
	inversePeriod(period: string): string
}

@Injectable()
export class TimeUtility {
	stringUtility: IStringUtility;
	objectUtility: IObjectUtility;

	constructor( @Inject(stringToken) stringUtility: IStringUtility
			, @Inject(objectToken) objectUtility: IObjectUtility) {
		this.stringUtility = stringUtility;
		this.objectUtility = objectUtility;
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
		if (this.objectUtility.isNullOrEmpty(value)) {
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

	formatTime(time: ITime, includePeriod: boolean = true): string {
		if (time == null) {
			return null;
		}
		const postfix = includePeriod ? time.period : '';
		return (time.hour || defaultHour)
			+ ':'
			+ padStart((time.minute || defaultMinute).toString(), 2, '0')
			+ postfix;
	}

	inversePeriod(period: string): string {
		return period === timePeriods.AM
			? timePeriods.PM
			: timePeriods.AM;
	}
}

export let timeUtility: ITimeUtility = new TimeUtility(stringUtility, objectUtility);

export const timeToken: OpaqueToken = new OpaqueToken('A utility for working with time');

export const TIME_PROVIDERS: Provider[] = [
	new Provider(timeToken, {
		useClass: TimeUtility,
	}),
	new Provider(TimeUtility, {
		useClass: TimeUtility,
	}),
];
