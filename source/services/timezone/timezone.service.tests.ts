import { timezoneService } from './timezone.service';
import { defaultFormats } from '../date/date.module';

import * as moment from 'moment';
import 'moment-timezone';

import { timezones, ITimezone } from './timezone.enum';

describe('timezone', (): void => {
	it('should get the timezone', (): void => {
		let date: string = '2016-2-1T12:00:00-07:00';
		let timezone: ITimezone = timezoneService.getTimezone(date);
		expect(timezone).to.equal(timezones.MST);
	});

	it('should handle daylight savings time', (): void => {
		let dateWithoutDaylightSavings: moment.Moment = moment('2016-2-1T12:00:00-07:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		let dateWithDaylightSavings: moment.Moment = moment('2016-4-1T12:00:00-07:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		expect(dateWithoutDaylightSavings.format('Z')).to.equal('-08:00');
		expect(dateWithDaylightSavings.format('Z')).to.equal('-07:00');
	});

	it('should return the appropriate timezone enum', (): void => {
		let ast_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.AST.momentName);
		let est_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.EST.momentName);
		let cst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.CST.momentName);
		let mst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.MST.momentName);
		let pst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		let akst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.AKST.momentName);
		let hast_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.HAST.momentName);

		expect(ast_timezone.format('Z')).to.equal('-04:00');
		expect(est_timezone.format('Z')).to.equal('-05:00');
		expect(cst_timezone.format('Z')).to.equal('-06:00');
		expect(mst_timezone.format('Z')).to.equal('-07:00');
		expect(pst_timezone.format('Z')).to.equal('-08:00');
		expect(akst_timezone.format('Z')).to.equal('-09:00');
		expect(hast_timezone.format('Z')).to.equal('-10:00');
	});

	it('should get a timezone from a moment timezone', (): void => {
		expect(timezones.get(timezones.MST.momentName)).to.equal(timezones.MST)
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