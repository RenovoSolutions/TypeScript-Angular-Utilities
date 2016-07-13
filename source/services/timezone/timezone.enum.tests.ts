import { defaultFormats } from '../date/index';

import * as moment from 'moment';
import 'moment-timezone';

import { timezones } from './timezone.enum';

describe('timezone enum', (): void => {
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
});