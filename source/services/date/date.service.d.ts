import 'moment-timezone';
import { CompareResult } from '../../types/compareResult';
export declare let serviceName: string;
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
export declare class DateUtility {
    private moment;
    static $inject: string[];
    constructor(moment: moment.MomentStatic);
    private baseFormat;
    getFullString(month: number): string;
    subtractDates(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): IDateValue;
    subtractDateInDays(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number;
    subtractDateInMilliseconds(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number;
    subtractDatesMoment(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): moment.Duration;
    compareDates(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, dateFormat?: string): CompareResult;
    dateInRange(date: string | Date | moment.Moment, rangeStart: string | Date | moment.Moment, rangeEnd: string | Date | moment.Moment): boolean;
    getDateFromISOString(isoDateTime: string): moment.Moment;
    isDate(date: string | Date | moment.Moment, dateFormat?: string): boolean;
    getNow(): moment.Moment;
    formatDate(date: string | Date | moment.Moment, dateFormat?: string): string;
    sameDate(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string, formatAs?: string): boolean;
    sameDateTime(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean;
    private parseDate(date, dateFormat?);
    private getFormat(customFormat);
}
export declare let dateUtility: IDateUtility;
