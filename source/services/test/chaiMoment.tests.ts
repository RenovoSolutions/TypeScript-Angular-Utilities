import * as moment from 'moment';
import 'moment-timezone';

import './test.module';

describe('chai moment', () => {
	it('should return true if moments are equal', (): void => {
		expect(moment('1/1/2015')).to.be.sameMoment(moment('1/1/2015'));
		expect(moment('1/1/2015')).to.equalMoment(moment('1/1/2015'));
		expect(moment('1/1/2015')).to.not.be.sameMoment(moment('1/1/2016'));
		expect(moment('1/1/2015')).to.not.equalMoment(moment('1/1/2016'));
	});

	it('should return true if the first moment is after the second', (): void => {
		expect(moment('1/1/2015')).to.be.afterMoment(moment('1/1/2014'));
		expect(moment('1/1/2015')).to.not.be.afterMoment(moment('1/1/2016'));
	});

	it('should return true if the first moment is before the second', (): void => {
		expect(moment('1/1/2015')).to.be.beforeMoment(moment('1/1/2016'));
		expect(moment('1/1/2015')).to.not.be.beforeMoment(moment('1/1/2014'));
	});

	it('should accept strings and dates', (): void => {
		expect('1/1/2015').to.equalMoment('1/1/2015');
		expect(new Date(2015, 1, 1)).to.equalMoment(new Date(2015, 1, 1));
	});

	it('should handle timezones', (): void => {
		let est_moment = moment('2016-01-02T12:00:00.000-05:00').tz('US/Eastern');
		let pst_moment = moment('2016-01-02T09:00:00.000-08:00').tz('US/Pacific');
		expect(est_moment).to.equalMoment(pst_moment);
	});
});
