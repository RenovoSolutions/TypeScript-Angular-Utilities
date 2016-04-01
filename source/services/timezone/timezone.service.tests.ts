import { timezone } from './timezone.service';
import { defaultFormats } from '../date/date.module';

import * as moment from 'moment';

describe('timezone', (): void => {
	it('should return the timezone', (): void => {
		let date: moment.Moment = moment('2016-4-1T12:00:00-08:00', defaultFormats.isoFormat);
		expect(timezone.getTimezone(date)).to.equal('-08:00x');
	});
});