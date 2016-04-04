import { dateConverter, defaultFormats } from './dateConverter';
import { timezones } from '../../../timezone/timezone.enum';

import * as moment from 'moment';
import 'moment-timezone';

describe('dateConverter', (): void => {
	it('should get the date from an ISO string', (): void => {
		let expectedDate: moment.Moment = moment('2015-11-24T20:12:00-06:00', defaultFormats.isoFormat).tz(timezones.CST.momentName);
		expect(dateConverter.fromServer('2015-11-24T20:12:00-06:00')).to.deep.equal(expectedDate);
	});

	it('should convert the date to an ISO string', (): void => {
		let date: moment.Moment = moment('2015-11-24T20:12:00-06:00', defaultFormats.isoFormat).tz(timezones.CST.momentName);
		expect(dateConverter.toServer(date)).to.equal('2015-11-24T20:12:00-06:00');
	});

	it('should handle nulls', (): void => {
		expect(dateConverter.toServer(null)).to.be.null;
	});
});
