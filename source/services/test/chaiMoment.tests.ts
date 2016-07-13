import * as moment from 'moment';
import 'moment-timezone';

import './index';

describe('chai moment', () => {
	it('should return true if moments are equal', (): void => {
		expect(moment('2015-01-01')).to.be.sameMoment(moment('2015-01-01'));
		expect(moment('2015-01-01')).to.equalMoment(moment('2015-01-01'));
		expect(moment('2015-01-01')).to.not.be.sameMoment(moment('2016-01-01'));
		expect(moment('2015-01-01')).to.not.equalMoment(moment('2016-01-01'));
	});

	it('should return true if the first moment is after the second', (): void => {
		expect(moment('2015-01-01')).to.be.afterMoment(moment('2014-01-01'));
		expect(moment('2015-01-01')).to.not.be.afterMoment(moment('2016-01-01'));
	});

	it('should return true if the first moment is before the second', (): void => {
		expect(moment('2015-01-01')).to.be.beforeMoment(moment('2016-01-01'));
		expect(moment('2015-01-01')).to.not.be.beforeMoment(moment('2014-01-01'));
	});

	it('should accept strings and dates', (): void => {
		expect('2015-01-01').to.equalMoment('2015-01-01');
		expect(new Date(2015, 1, 1)).to.equalMoment(new Date(2015, 1, 1));
	});

	it('should handle timezones', (): void => {
		let est_moment: moment.Moment = moment('2016-01-02T12:00:00.000-05:00').tz('US/Eastern');
		let pst_moment: moment.Moment = moment('2016-01-02T09:00:00.000-08:00').tz('US/Pacific');
		expect(est_moment).to.equalMoment(pst_moment);
	});
});
