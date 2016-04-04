import { moduleName } from './date.module';
import { IDateUtility, IDateValue, serviceName } from './date.service';
import { defaultFormats } from './dateTimeFormatStrings';
import { timezones } from '../timezone/timezone.enum';
import { timezoneService } from '../timezone/timezone.service';

import { CompareResult } from '../../types/compareResult';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';
import * as moment from 'moment';
import 'moment-timezone';


describe('dateUtility', () => {
	let dateUtility: IDateUtility;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = angularFixture.inject(serviceName);
		dateUtility = services[serviceName];
	});

	describe('getFullString', (): void => {
		it('should get the month name', (): void => {
			expect(dateUtility.getFullString(0)).to.equal('January');
			expect(dateUtility.getFullString(1)).to.equal('February');
			expect(dateUtility.getFullString(2)).to.equal('March');
			expect(dateUtility.getFullString(3)).to.equal('April');
			expect(dateUtility.getFullString(4)).to.equal('May');
			expect(dateUtility.getFullString(5)).to.equal('June');
			expect(dateUtility.getFullString(6)).to.equal('July');
			expect(dateUtility.getFullString(7)).to.equal('August');
			expect(dateUtility.getFullString(8)).to.equal('September');
			expect(dateUtility.getFullString(9)).to.equal('October');
			expect(dateUtility.getFullString(10)).to.equal('November');
			expect(dateUtility.getFullString(11)).to.equal('December');
		});
	});

	describe('getDate', (): void => {
		it('should handle dates in string, date, or moment format, defaulting to ISO string format', (): void => {
			let date: Date = new Date(2014, 1, 1);

			let dateString: string = '2014-1-1T00:00:00-07:00';
			let momentInstance: moment.Moment = moment(dateString, defaultFormats.isoFormat)

			expect(dateUtility.getDate(date).format(defaultFormats.isoFormat)).to.equal(moment(date).format(defaultFormats.isoFormat));

			expect(dateUtility.getDate(dateString).format(defaultFormats.isoFormat)).to.equal(momentInstance.format(defaultFormats.isoFormat));
			expect(dateUtility.getDate(momentInstance).format(defaultFormats.isoFormat)).to.equal(momentInstance.format(defaultFormats.isoFormat));
		});

		it('should handle dates in a user-defined format', (): void => {
			let dateString: string = '1/1/2014';
			let date: Date = new Date(dateString);
			let momentInstance: moment.Moment = moment(dateString, defaultFormats.dateFormat)
			expect(dateUtility.getDate(date, defaultFormats.dateFormat).format(defaultFormats.isoFormat)).to.equal(momentInstance.format(defaultFormats.isoFormat));
			expect(dateUtility.getDate(dateString, defaultFormats.dateFormat).format(defaultFormats.isoFormat)).to.equal(momentInstance.format(defaultFormats.isoFormat));
			expect(dateUtility.getDate(momentInstance, defaultFormats.dateFormat).format(defaultFormats.isoFormat)).to.equal(momentInstance.format(defaultFormats.isoFormat));
		});
	});

	describe('getDateFromServer', (): void => {
		it('should get dates from string in server format, "YYYY-MM-DDTHH:MM:SSZ"', (): void => {
			let expectedDate: moment.Moment = moment('2015-11-24T20:12:00-07:00', defaultFormats.isoFormat).tz(timezones.MST.momentName);
			let dateString: string = '2015-11-24T20:12:00-07:00';
			let date: moment.Moment = dateUtility.getDateFromISOString(dateString);
			expect(date.tz()).to.equal(expectedDate.tz());
			expect(date.format(defaultFormats.isoFormat)).to.equal(expectedDate.format(defaultFormats.isoFormat));
		});
	});

	describe('isDate', (): void => {
		it('should be true if item is a date or a string, date, or moment format', (): void => {
			expect(dateUtility.isDate('1/1/2014')).to.be.true;
			expect(dateUtility.isDate(new Date('1/1/2014'))).to.be.true;
			expect(dateUtility.isDate(moment('1/1/2014'))).to.be.true;
		});

		it('should return false if object is not a date', (): void => {
			expect(dateUtility.isDate(null)).to.be.false;
			expect(dateUtility.isDate(<any>{})).to.be.false;
			expect(dateUtility.isDate('123456')).to.be.false;
		});
		it('should return false if object is a Valid date object with an invalid value.', (): void => {
			expect(dateUtility.isDate(new Date("Null"))).to.be.false;
		});
	});

	describe('getNow', (): void => {
		it('should set the timezone on the new date if a timezone is configured', (): void => {
			timezoneService.setCurrentTimezone(timezones.MST.offset);
			expect(dateUtility.getNow().tz()).to.equal(timezones.MST.momentName);
		});
	});

	describe('subtractDates', (): void => {
		it('should get 0 years, months , and days when subtracting ths same date from itself', (): void => {
			let startDate: string = '9/10/2014';
			let endDate: string = '9/10/2014';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(0);
			expect(result.days).to.equal(0);
		});

		it('should get 3/3/3 when subtracting 6/6/2006 from 9/9/2009', (): void => {
			let startDate: string = '6/6/2006';
			let endDate: string = '9/9/2009';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(3);
			expect(result.months).to.equal(3);
			expect(result.days).to.equal(3);
		});

		it('should get 11/30/21 when subtracting 1/1/1999 from 12/31/2020', (): void => {
			let startDate: string = '1/1/1999';
			let endDate: string = '12/31/2020';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(21);
			expect(result.months).to.equal(11);
			expect(result.days).to.equal(30);
		});

		it('should take leap year into account and return 28 days when subtracting 2/3/2016 from 3/2/2016', (): void => {
			// 2016 is a leap year
			let startDate: string = '2/3/2016';
			let endDate: string = '3/2/2016';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(0);
			expect(result.days).to.equal(28);
		});

		it('should properly handle when day and month of start date are higher than day and month of end date', (): void => {
			let startDate: string = '12/31/2000';
			let endDate: string = '1/1/2001';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(0);
			expect(result.days).to.equal(1);
		});

		it('should recognize when days are just under a year apart', (): void => {
			let startDate: string = '9/12/2000';
			let endDate: string = '9/10/2001';

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate, defaultFormats.dateFormat);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(11);
			expect(result.days).to.equal(28);
		});

		it('should also accept dates', (): void => {
			let startDate: Date = new Date(2016, 4, 1);
			let endDate: Date = new Date(2016, 4, 1);

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(0);
			expect(result.days).to.equal(0);
		});

		it('should also accept moments', (): void => {
			let startDate: moment.Moment = moment('2016-4-1T00:00:00-05:00', defaultFormats.isoFormat);
			let endDate: moment.Moment = moment('2016-4-1T00:00:00-05:00', defaultFormats.isoFormat);

			let result: IDateValue = dateUtility.subtractDates(startDate, endDate);

			expect(result.years).to.equal(0);
			expect(result.months).to.equal(0);
			expect(result.days).to.equal(0);
		});
	});

	describe('subtractDatesInDays', (): void => {
		it('should get 0 days when subtracting the same date from itself', (): void => {
			let startDate: string = '9/10/2014';
			let endDate: string = '9/10/2014';

			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(0);
		});

		it('should get 92 when subtracting 6/9/2009 from 9/9/2009', (): void => {
			let startDate: string = '6/9/2009';
			let endDate: string = '9/9/2009';

			// 30 + (2 x 31) = 92
			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(92);
		});

		it('should take leap yer into account and return 28 days when subtracting 2/3/2016 from 3/2/2016', (): void => {
			// 2016 is a leap year
			let startDate: string = '2/3/2016';
			let endDate: string = '3/2/2016';

			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(28);
		});

		it('should properly handle when day and month of start date are higher than day and month of end date', (): void => {
			let startDate: string = '12/31/2000';
			let endDate: string = '1/1/2001';

			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(1);
		});

		it('should handle dates that are just under a year apart', (): void => {
			let startDate: string = '9/12/2000';
			let endDate: string = '9/10/2001';

			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(363);
		});

		it('should return a negative value if the first date is after the second', (): void => {
			let startDate: string = '9/10/2015';
			let endDate: string = '9/10/2014';

			expect(dateUtility.subtractDateInDays(startDate, endDate, defaultFormats.dateFormat)).to.equal(-365);
		});

		it('should also accept dates', (): void => {
			let startDate: Date = new Date(2016, 4, 1);
			let endDate: Date = new Date(2016, 4, 1);

			expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(0);
		});

		it('should also accept moments', (): void => {
			let startDate: moment.Moment = moment('2016-4-1T00:00:00-05:00', defaultFormats.isoFormat);
			let endDate: moment.Moment = moment('2016-4-1T00:00:00-05:00', defaultFormats.isoFormat);

			expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(0);
		});
	});

	describe('compareDates', (): void => {
		it('should return less if the first date is before the second', (): void => {
			let date: string = '9/10/2000';
			let laterDate: string = '9/10/2001';

			expect(dateUtility.compareDates(date, laterDate, defaultFormats.dateFormat)).to.equal(CompareResult.less);
		});

		it('should return equal if the dates are the same', (): void => {
			let date: string = '9/10/2000';
			let equalDate: string = '9/10/2000';

			expect(dateUtility.compareDates(date, equalDate, defaultFormats.dateFormat)).to.equal(CompareResult.equal);
		});

		it('should return greater if the first date if after the second', (): void => {
			let date: string = '9/10/2000';
			let earlierDate: string = '9/10/1999';

			expect(dateUtility.compareDates(date, earlierDate, defaultFormats.dateFormat)).to.equal(CompareResult.greater);
		});

		it('should handle date-times where the date is the same', (): void => {
			let date: string = '9/10/2000 10:00 AM';
			let earlierDate: string = '9/10/2000 8:00 AM';

			expect(dateUtility.compareDates(date, earlierDate, defaultFormats.dateTimeFormat)).to.equal(CompareResult.greater);
		});

		it('should handle dates where the hour is the same', (): void => {
			let date: string = '9/10/2000 10:30 AM';
			let earlierDate: string = '9/10/2000 10:15 AM';

			expect(dateUtility.compareDates(date, earlierDate, defaultFormats.dateTimeFormat)).to.equal(CompareResult.greater);
		});

		it('should also accept dates', (): void => {
			let date: Date = new Date(2016, 4, 1);
			let earlierDate: Date = new Date(2016, 3, 1);

			expect(dateUtility.compareDates(date, earlierDate)).to.equal(CompareResult.greater);
		});

		it('should also accept moments', (): void => {
			let date: moment.Moment = moment('2016-4-1T00:00:00-05:00', defaultFormats.isoFormat);
			let earlierDate: moment.Moment = moment('2016-3-1T00:00:00-05:00', defaultFormats.isoFormat);

			expect(dateUtility.compareDates(date, earlierDate)).to.equal(CompareResult.greater);
		});
	});

	describe('dateInRange', (): void => {
		it('should return false if the date is before the beginning of the range', (): void => {
			expect(dateUtility.dateInRange('2014-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.false;
			expect(dateUtility.dateInRange('2014-12-31T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.false;
		});

		it('should return false if the date is after the end of the range', (): void => {
			expect(dateUtility.dateInRange('2019-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.false;
			expect(dateUtility.dateInRange('2018-1-2T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.false;
		});

		it('should return true if the date is within the range', (): void => {
			expect(dateUtility.dateInRange('2015-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.true;
			expect(dateUtility.dateInRange('2016-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.true;
			expect(dateUtility.dateInRange('2017-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.true;
			expect(dateUtility.dateInRange('2018-1-1T00:00:00-07:00', '2015-1-1T00:00:00-07:00', '2018-1-1T00:00:00-07:00')).to.be.true;
		});
		it('should return true if the date is within the range for dates', (): void => {
			expect(dateUtility.dateInRange(new Date(2016, 4, 1), new Date(2016, 3, 1), new Date(2016, 5, 1))).to.be.true;
		});
		it('should return true if the date is within the range for moments', (): void => {
			expect(dateUtility.dateInRange(moment('4/1/2016'), moment('3/1/2016'), moment('5/1/2016'))).to.be.true;
		});
	});

	describe('sameDate', (): void=> {
		it('should return false if the dates are different', (): void => {
			let date1 = new Date(1995, 11, 17, 12, 0, 0);
			let date2 = new Date(1995, 11, 18, 3, 24, 0);
			expect(dateUtility.sameDate(date1, date2)).to.be.false;
			expect(dateUtility.sameDate('2015-1-1T00:00:00-07:00', '2016-1-1T00:00:00-07:00')).to.be.false;
			expect(dateUtility.sameDate(moment('4/1/2016'), moment('5/1/2016'))).to.be.false;
		});

		it('should return true if the dates are the same date', (): void => {
			let date1 = new Date(1995, 11, 17, 12, 0, 0);
			let date2 = new Date(1995, 11, 17, 3, 24, 0);
			expect(dateUtility.sameDate(date1, date2)).to.be.true;
			expect(dateUtility.sameDate('2015-1-1T11:11:11-07:00', '2015-1-1T15:15:15-07:00')).to.be.true;
			expect(dateUtility.sameDate(moment('4/1/2016'), moment('4/1/2016'))).to.be.true;
		});
	});

	describe('sameDateTime', (): void=> {
		it('should return false if the same dates have different times', (): void => {
			let date1 = new Date(1995, 11, 17, 0, 24, 0);
			let date2 = new Date(1995, 11, 17, 3, 24, 0);
			expect(dateUtility.sameDateTime(date1, date2)).to.be.false;
			expect(dateUtility.sameDateTime('2015-1-1T12:00:00-07:00', '2015-1-1T12:00:01-07:00')).to.be.false;
			expect(dateUtility.sameDateTime(moment('2016-03-01T12:10:00.000-05:00'), moment('2016-03-01T12:10:01.000-05:00'))).to.be.false;
		});

		it('should return true if the dates are the same date and time down to hour and minute', (): void => {
			let date1 = new Date(1995, 11, 17, 3, 24, 0);
			let date2 = new Date(1995, 11, 17, 3, 24, 0);
			expect(dateUtility.sameDateTime(date1, date2)).to.be.true;
			expect(dateUtility.sameDateTime('2015-1-1T12:00:00-07:00', '2015-1-1T12:00:00-07:00')).to.be.true;
			expect(dateUtility.sameDateTime(moment('2016-03-01T12:10:00.000-05:00'), moment('2016-03-01T12:10:00.000-05:00'))).to.be.true;
		});
	});
});
