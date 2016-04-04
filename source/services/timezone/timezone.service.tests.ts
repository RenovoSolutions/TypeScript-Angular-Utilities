import { timezone } from './timezone.service';
import { defaultFormats } from '../date/date.module';

import * as moment from 'moment';
import 'moment-timezone';

describe('timezone', (): void => {
	it('should return the timezone', (): void => {
		let date: moment.Moment = moment('2016-4-1T12:00:00-07:00', defaultFormats.isoFormat).tz('America/Los_Angeles');
		expect(timezone.getTimezone(date)).to.equal('-07:00');
	});

	it('should handle daylight savings time', (): void => {
		let dateWithoutDaylightSavings: moment.Moment = moment('2016-2-1T12:00:00-07:00', defaultFormats.isoFormat).tz('America/Los_Angeles');
		let dateWithDaylightSavings: moment.Moment = moment('2016-4-1T12:00:00-07:00', defaultFormats.isoFormat).tz('America/Los_Angeles');
		expect(timezone.getTimezone(dateWithoutDaylightSavings)).to.equal('-08:00');
		expect(timezone.getTimezone(dateWithDaylightSavings)).to.equal('-07:00');
	});
});