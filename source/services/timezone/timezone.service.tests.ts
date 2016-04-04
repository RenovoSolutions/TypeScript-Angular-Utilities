import { timezoneService } from './timezone.service';
import { defaultFormats } from '../date/date.module';

import * as moment from 'moment';
import 'moment-timezone';

import { timezones } from './timezone.enum';

describe('timezone', (): void => {
	it('should return the timezone', (): void => {
		let date: moment.Moment = moment('2001-4-1T12:00:00-07:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		expect(timezoneService.getTimezone(date)).to.equal('-07:00');
	});

	it('should handle daylight savings time', (): void => {
		let dateWithoutDaylightSavings: moment.Moment = moment('2016-2-1T12:00:00-07:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		let dateWithDaylightSavings: moment.Moment = moment('2016-4-1T12:00:00-07:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		expect(timezoneService.getTimezone(dateWithoutDaylightSavings)).to.equal('-08:00');
		expect(timezoneService.getTimezone(dateWithDaylightSavings)).to.equal('-07:00');
	});

	it('should return the appropriate timezone enum', (): void => {
		let ast_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.AST.momentName);
		let est_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.EST.momentName);
		let cst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.CST.momentName);
		let mst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.MST.momentName);
		let pst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.PST.momentName);
		let akst_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.AKST.momentName);
		let hast_timezone: moment.Moment = moment('2016-1-2T12:00:00-04:00', defaultFormats.isoFormat).tz(timezones.HAST.momentName);

		expect(timezoneService.getTimezone(ast_timezone)).to.equal('-04:00');
		expect(timezoneService.getTimezone(est_timezone)).to.equal('-05:00');
		expect(timezoneService.getTimezone(cst_timezone)).to.equal('-06:00');
		expect(timezoneService.getTimezone(mst_timezone)).to.equal('-07:00');
		expect(timezoneService.getTimezone(pst_timezone)).to.equal('-08:00');
		expect(timezoneService.getTimezone(akst_timezone)).to.equal('-09:00');
		expect(timezoneService.getTimezone(hast_timezone)).to.equal('-10:00');
	});


	it('should return moment formatted time zone name from an iso string based on the offset', (): void => {
		let pacificOffset: string = '2016-2-1T12:00:00-07:00';

		expect(timezoneService.getMomentTimezone(pacificOffset)).to.equal(timezones.MST.momentName);
	});

	it('should set the current timezone from an offset', (): void => {
		timezoneService.setCurrentTimezone('-07:00');
		expect(timezoneService.currentTimezone.display).to.equal('MST');
	});
});