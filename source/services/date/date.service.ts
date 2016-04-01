'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import * as moment from 'moment';

import {
	moduleName as timeModuleName,
	serviceName as timeServiceName,
	ITimeUtility,
	timeUtility,
} from '../time/time.service';

import {
	moduleName as momentModuleName,
	serviceName as momentServiceName,
} from '../moment/moment.module';

import { defaultFormats } from './dateTimeFormatStrings';

import { CompareResult, getCompareResult } from '../../types/compareResult';

export var serviceName: string = 'dateUtility';

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
	getDays(month: number, year?: number): number;
	subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue;
	subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number;
	subtractDateInMilliseconds(start: string | Date, end: string | Date, dateFormat?: string): number;
	compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): CompareResult;
	dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean;
	getDate(date: string | Date, dateFormat?: string): Date;
	getDateFromISOString(date: string): Date;
	isDate(date: string | Date, dateFormat?: string): boolean;
	getNow(): Date;
	formatDate(date: string | Date, dateFormat?: string): string;
	sameDate(date1: string | Date, date2: string | Date, date1Format?: string, date2Format?: string): boolean;
	sameDateTime(date1: string | Date, date2: string | Date, date1Format?: string, date2Format?: string): boolean;
}

export class DateUtility {
	static $inject: string[] = [momentServiceName, timeServiceName];
	constructor(private moment: moment.MomentStatic, private time: ITimeUtility) {
		this.month = [
			{ name: 'January', days: (): number => { return 31; } },
			{ name: 'February', days: (year: number): number => { return this.isLeapYear(year) ? 29 : 28; } },
			{ name: 'March', days: (): number => { return 31; } },
			{ name: 'April', days: (): number => { return 30; } },
			{ name: 'May', days: (): number => { return 31; } },
			{ name: 'June', days: (): number => { return 30; } },
			{ name: 'July', days: (): number => { return 31; } },
			{ name: 'August', days: (): number => { return 31; } },
			{ name: 'September', days: (): number => { return 30; } },
			{ name: 'October', days: (): number => { return 31; } },
			{ name: 'November', days: (): number => { return 30; } },
			{ name: 'December', days: (): number => { return 31; } },
		];
	}

	month: IMonth[];
	private baseFormat: string = 'MM-DD-YYYY';

	private isLeapYear(year?: number): boolean {
		return new Date(year, 1, 29).getMonth() === 1;
	}

	getFullString(month: number): string {
		return this.month[month].name;
	}

	getDays(month: number, year?: number): number {
		return this.month[month].days(year);
	}

	subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue {
		if (start == null || end == null) {
			return null;
		}

		var startDate: Date = this.getDate(start, dateFormat);
		var endDate: Date = this.getDate(end, dateFormat);

		var result: IDateValue = <any>{};
		result.days = endDate.getDate() - startDate.getDate();
		result.years = endDate.getFullYear() - startDate.getFullYear();
		result.months = endDate.getMonth() - startDate.getMonth();

		if (result.days < 0) {
			result.months -= 1;
			result.days += this.getDays(startDate.getMonth(), startDate.getFullYear());
		}

		if (result.months < 0) {
			result.years -= 1;
			result.months += 12;
		}

		return result;
	}

	subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number {
		var milliseconds: number = this.subtractDateInMilliseconds(start, end, dateFormat);
		return this.time.millisecondsToDays(milliseconds);
	}

	subtractDateInMilliseconds(start: string | Date, end: string | Date, dateFormat?: string): number {
		if (start == null || end == null) {
			return null;
		}

		var startDate: Date = this.getDate(start, dateFormat);
		var endDate: Date = this.getDate(end, dateFormat);

		return endDate.getTime() - startDate.getTime();
	}

	compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): CompareResult {
		// subtractDateInDays subtracts the fist from the second, assuming start and end dates
		var difference: number = this.subtractDateInMilliseconds(date2, date1, dateFormat);
		return getCompareResult(difference);
	}

	dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean {
		if (this.compareDates(date, rangeStart) === CompareResult.less) {
			return false;
		} else if (this.compareDates(date, rangeEnd) === CompareResult.greater) {
			return false;
		} else {
			return true;
		}
	}

	getDate(date: string | Date, dateFormat?: string): Moment {
		if (_.isDate(date)) {
			return <Date>date;
		} else {
			return this.moment(<string>date, this.getFormat(dateFormat));
		}
	}

	getDateFromISOString(date: string): Moment {
		return this.moment(date, defaultFormats.isoFormat);
	}

	isDate(date: string | Date, dateFormat?: string): boolean {
		if (_.isDate(date))
		{
			//lodash will return true if it is a valid date object, but has in invalid value.
			//check the time value of the date object to verify that it's a Valid Date.
			return !isNaN(date.getTime());
		}
		return this.moment(<string>date, this.getFormat(dateFormat)).isValid();
	}

	getNow(): Date {
		return new Date();
	}

	formatDate(date: string | Date, dateFormat?: string): string {
		return this.moment(this.getDate(date, dateFormat)).format(this.getFormat(dateFormat));
	}

	private getFormat(customFormat: string): string {
		return customFormat != null ? customFormat : this.baseFormat;
	}

	sameDate(date1: string | Date, date2: string | Date, date1Format?: string, date2Format?: string) {
		if (date1Format != undefined && date2Format === undefined) {
			date2Format = date1Format;
		}
		if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
			return moment(<any>date1,date1Format).format("MM/DD/YYYY") === moment(<any>date2,date2Format).format("MM/DD/YYYY");
		} else {
			return false;
		}
	}

	sameDateTime(date1: string | Date, date2: string | Date, date1Format?: string, date2Format?: string) {
		if (date1Format != undefined && date2Format === undefined) {
			date2Format = date1Format;
		}
		if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
			return moment(<any>date1,date1Format).format("MM/DD/YYYY +-HHmm") === moment(<any>date2,date2Format).format("MM/DD/YYYY +-HHmm");
		} else {
			return false;
		}
	}
}

export let dateUtility: IDateUtility = new DateUtility(moment, timeUtility);
