import { timezoneService } from './timezone.service';
import { defaultFormats } from '../date/date.module';

import * as moment from 'moment';
import 'moment-timezone';

import { timezones, ITimezone } from './timezone.enum';

describe('timezone service', (): void => {
	it('should get the timezone', (): void => {
		let date: string = '2016-2-1T12:00:00-07:00';
		let timezone: ITimezone = timezoneService.getTimezone(date);
		expect(timezone).to.equal(timezones.MST);
	});

	it('should return moment formatted time zone name from an iso string based on the offset', (): void => {
		let pacificOffset: string = '2016-2-1T12:00:00-07:00';

		expect(timezoneService.getMomentTimezone(pacificOffset)).to.equal(timezones.MST.momentName);
	});

	it('should set the current timezone from an offset', (): void => {
		timezoneService.setCurrentTimezone('-07:00');
		expect(timezoneService.currentTimezone.display).to.equal('MST');
	});

	it('should build a moment with the correct time and timezone', (): void => {
		let dateTimeString: string = '2/1/2016 12:00 PM';
		let convertedDateTimeString: moment.Moment = timezoneService.buildMomentWithTimezone(dateTimeString, timezones.MST);
		expect(convertedDateTimeString.tz()).to.equal(timezones.MST.momentName);
		expect(convertedDateTimeString.format(defaultFormats.isoFormat)).to.equal("2016-02-01T12:00:00-07:00");

		let dateTimeStringWithOffset: string = '2016-02-01T12:00:00.000-07:00';
		let convertedDateTimeStringWithOffset: moment.Moment = timezoneService.buildMomentWithTimezone(dateTimeStringWithOffset, timezones.MST);
		expect(convertedDateTimeStringWithOffset.tz()).to.equal(timezones.MST.momentName);
		expect(convertedDateTimeStringWithOffset.format(defaultFormats.isoFormat)).to.equal("2016-02-01T12:00:00-07:00");

		let momentTime: moment.Moment = moment('2016-02-01T18:05:50.000-06:00').tz(timezones.CST.momentName);
		let convertedMomentTime2: moment.Moment = timezoneService.buildMomentWithTimezone(momentTime, timezones.MST);
		expect(convertedMomentTime2.tz()).to.equal(timezones.MST.momentName);
		expect(convertedMomentTime2.format(defaultFormats.isoFormat)).to.equal("2016-02-01T18:05:50-07:00");

		// can't convert a moment where the original offset doesn't match the client because the original offset information was lost before it gets to us
		let momentTime2: moment.Moment = moment('2016-02-01T12:00:00.000-06:00').tz(timezones.EST.momentName);
		let convertedMomentTime: moment.Moment = timezoneService.buildMomentWithTimezone(momentTime2, timezones.MST);
		expect(convertedMomentTime.tz()).to.equal(timezones.MST.momentName);
		expect(convertedMomentTime.format(defaultFormats.isoFormat)).to.not.equal("2016-02-01T12:00:00-07:00");
	});
});