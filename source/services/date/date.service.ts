'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-timezone';

import {
	moduleName as momentModuleName,
	serviceName as momentServiceName,
} from '../moment/moment.module';

import { timezoneService } from '../timezone/timezone.service';

import { defaultFormats } from './dateTimeFormatStrings';

import { CompareResult, getCompareResult } from '../../types/compareResult';

export let serviceName: string = 'dateUtility';

export interface IMonth {
	name: string;
	days(year?: number): number;
}

export interface IDateValue {
	years: number;
	months: number;
	days: number;
}

export interface IDateUtility {
	getFullString(month: number): string;
	subtractDates(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): IDateValue;
	subtractDateInDays(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number;
	subtractDateInMilliseconds(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number;
	subtractDatesMoment(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): moment.Duration;
	compareDates(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, dateFormat?: string): CompareResult;
	dateInRange(date: string | Date | moment.Moment, rangeStart: string | Date | moment.Moment, rangeEnd: string | Date | moment.Moment): boolean;
	getDateFromISOString(date: string): moment.Moment;
	isDate(date: string | Date | moment.Moment, dateFormat?: string): boolean;
	getNow(): moment.Moment;
	formatDate(date: string | Date | moment.Moment, dateFormat?: string): string;
	sameDate(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean;
	sameDateTime(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean;
}

export class DateUtility {
	static $inject: string[] = [momentServiceName];
	constructor(private moment: moment.MomentStatic) {}

	private baseFormat: string = defaultFormats.isoFormat;

	getFullString(month: number): string {
		return moment().month(month).format('MMMM');
	}

	subtractDates(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): IDateValue {
		let duration = this.subtractDatesMoment(start, end, dateFormat);

		if (duration == null) {
			return null;
		}

		let result: IDateValue = <any>{};
		result.days = Math.floor(duration.days());
		result.months = Math.floor(duration.months());
		result.years = Math.floor(duration.years());

		return result;
	}

	subtractDateInDays(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number {
		let duration = this.subtractDatesMoment(start, end, dateFormat);
		return duration != null
			? duration.asDays()
			: null;
	}

	subtractDateInMilliseconds(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number {
		let duration = this.subtractDatesMoment(start, end, dateFormat);
		return duration != null
			? duration.asMilliseconds()
			: null;
	}

	subtractDatesMoment(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): moment.Duration {
		if (start == null || end == null) {
			return null;
		}

		let startDate: moment.Moment = this.parseDate(start, dateFormat);
		let endDate: moment.Moment = this.parseDate(end, dateFormat);

		return moment.duration(endDate.diff(startDate));
	}

	compareDates(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, dateFormat?: string): CompareResult {
		// subtractDateInDays subtracts the fist from the second, assuming start and end dates
		let difference: number = this.subtractDateInMilliseconds(date2, date1, dateFormat);
		return getCompareResult(difference);
	}

	dateInRange(date: string | Date | moment.Moment, rangeStart: string | Date | moment.Moment, rangeEnd: string | Date | moment.Moment): boolean {
		if (date == null || rangeStart == null || rangeEnd == null) {
			return null;
		}

		if (this.compareDates(date, rangeStart) === CompareResult.less
			|| this.compareDates(date, rangeEnd) === CompareResult.greater) {
			return false;
		} else {
			return true;
		}
	}

	getDateFromISOString(isoDateTime: string): moment.Moment {
		let momentOffset: string = timezoneService.getMomentTimezone(isoDateTime);

		let momentDate: moment.Moment = this.moment(isoDateTime, defaultFormats.isoFormat);

		return momentOffset != null
			? momentDate.tz(momentOffset)
			: momentDate.tz(timezoneService.currentTimezone.momentName);
	}

	isDate(date: string | Date | moment.Moment, dateFormat?: string): boolean {
		if (_.isDate(date))
		{
			//lodash will return true if it is a valid date object, but has in invalid value.
			//check the time value of the date object to verify that it's a Valid Date.
			return !isNaN(date.getTime());
		}
		return this.moment(<string>date, this.getFormat(dateFormat)).isValid();
	}

	getNow(): moment.Moment {
		if (timezoneService.currentTimezone != null)
		{
			return moment().tz(timezoneService.currentTimezone.momentName);
		}
		return moment();
	}

	formatDate(date: string | Date | moment.Moment, dateFormat?: string): string {
		return this.moment(this.parseDate(date, dateFormat)).format(this.getFormat(dateFormat));
	}

	sameDate(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string, granularity?: string): boolean {
		if (date1 == null || date2 == null) {
			return null;
		}

		date2Format = date2Format || date1Format;
		granularity = granularity || 'day';

		if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
			let moment1: moment.Moment = this.parseDate(date1, date1Format);
			let moment2: moment.Moment = this.parseDate(date2, date2Format);

			return moment1.isSame(moment2, granularity);
		} else {
			return false;
		}
	}

	sameDateTime(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean {
		return this.sameDate(date1, date2, date1Format, date2Format, 'milliseconds');
	}

	private parseDate(date: string | Date | moment.Moment, dateFormat?: string): moment.Moment {
		if (_.isDate(date)) {
			return this.moment(date);
		}

		return this.moment(<string>date, this.getFormat(dateFormat));
	}

	private getFormat(customFormat: string): string {
		return customFormat != null ? customFormat : this.baseFormat;
	}
}

export let dateUtility: IDateUtility = new DateUtility(moment);
