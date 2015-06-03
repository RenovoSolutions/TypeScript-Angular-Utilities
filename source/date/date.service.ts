'use strict';

export var name: string = 'dateUtility';

export interface IMonth {
	name: string;
	days(year?: number): number;
}

export interface IDateUtility {
	getFullString(month: number): string;
	getDays(month: number, year?: number): number;
}

export class DateUtility {
	constructor() {
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

	private isLeapYear(year?: number): boolean {
		return new Date(year, 1, 29).getMonth() === 1;
	}

	getFullString(month: number): string {
		return this.month[month].name;
	}

	getDays(month: number, year?: number): number {
		return this.month[month].days(year);
	}
}
