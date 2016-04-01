import { dateConverter, defaultFormats } from './dateConverter';

import * as moment from 'moment';

describe('dateConverter', (): void => {
	it('should get the date from an ISO string', (): void => {
		let expectedDate: Moment = moment('2015-11-24T20:12:00-05:00', defaultFormats.isoFormat);
		expect(dateConverter.fromServer('2015-11-24T20:12:00-05:00')).to.deep.equal(expectedDate);
	});

	it('should convert the date to an ISO string', (): void => {
		let date: Moment = moment('2015-11-24T20:12:00-05:00', defaultFormats.isoFormat);
		expect(dateConverter.toServer(date)).to.equal('2015-11-24T20:12:00-05:00');
	});

	it('should handle nulls', (): void => {
		expect(dateConverter.toServer(null)).to.be.null;
	});
});
