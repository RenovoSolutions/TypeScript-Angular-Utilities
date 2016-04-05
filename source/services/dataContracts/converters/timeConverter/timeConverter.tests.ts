import { timeConverter, defaultFormats } from './timeConverter';
import { timezones, timezoneService } from '../../../timezone/timezone.service';

import * as moment from 'moment';
import 'moment-timezone';

describe('timeConverter', (): void => {
	it('should get the time from a time string and set the user timezone', (): void => {
		timezoneService.setCurrentTimezone(timezones.CST.offset);
		let timeMoment: moment.Moment = timeConverter.fromServer('8:00PM');
		expect(timeMoment.tz()).to.equal(timezones.CST.momentName);
		expect(timeMoment.format(defaultFormats.timeFormat)).to.equal('8:00PM');
	});

	it('should convert the moment back to a time string', (): void => {
		let timeMoment: moment.Moment = moment('2016-01-02T20:00:00-07:00', defaultFormats.isoFormat).tz(timezones.MST.momentName);
		console.log(timeMoment.format(defaultFormats.isoFormat));
		expect(timeConverter.toServer(timeMoment)).to.equal('8:00PM');
	});

	it('should handle nulls', (): void => {
		expect(timeConverter.toServer(null)).to.be.null;
	});
});
