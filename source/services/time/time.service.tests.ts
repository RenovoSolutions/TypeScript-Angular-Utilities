import { ITimeUtility, TimeUtility } from './time.service';
import { CompareResult } from '../../types/compareResult';
import { stringUtility } from '../string/string.service';
import { objectUtility } from '../object/object.service';

describe('timeUtility', () => {
	let timeUtility: ITimeUtility;

	beforeEach(() => {
		timeUtility = new TimeUtility(stringUtility, objectUtility);
	});

	it('should compare times and return a compare result to indicate which is greater', (): void => {
		expect(timeUtility.compareTimes('12:00PM', '1:00PM')).to.equal(CompareResult.less);
		expect(timeUtility.compareTimes('12:00PM', '12:00PM')).to.equal(CompareResult.equal);
		expect(timeUtility.compareTimes('2:00PM', '1:00PM')).to.equal(CompareResult.greater);
	});

	it('should return null if the time is null or empty', (): void => {
		expect(timeUtility.parseTime(null)).to.be.null;
		expect(timeUtility.parseTime('')).to.be.null;
		expect(timeUtility.formatTime(null)).to.be.null;
	});

	it('should parse the time string into a time object', (): void => {
		expect(timeUtility.parseTime('8:00AM')).to.deep.equal({ hour: 8, minute: 0, period: 'AM' });
		expect(timeUtility.parseTime('12:00PM')).to.deep.equal({ hour: 12, minute: 0, period: 'PM' });
		expect(timeUtility.parseTime('12:00AM')).to.deep.equal({ hour: 12, minute: 0, period: 'AM' });
		expect(timeUtility.parseTime('10:15AM')).to.deep.equal({ hour: 10, minute: 15, period: 'AM' });
		expect(timeUtility.parseTime('1:41PM')).to.deep.equal({ hour: 1, minute: 41, period: 'PM' });
	});

	it('should format the time object into a time string', (): void => {
		expect(timeUtility.formatTime({ hour: 8, minute: 0, period: 'AM' })).to.equal('8:00AM');
		expect(timeUtility.formatTime({ hour: 12, minute: 0, period: 'PM' })).to.equal('12:00PM');
		expect(timeUtility.formatTime({ hour: 12, minute: 0, period: 'AM' })).to.equal('12:00AM');
		expect(timeUtility.formatTime({ hour: 10, minute: 15, period: 'AM' })).to.equal('10:15AM');
		expect(timeUtility.formatTime({ hour: 1, minute: 41, period: 'PM' })).to.equal('1:41PM');
	});

	it('should hide the period if includePeriod is false', (): void => {
		expect(timeUtility.formatTime({ hour: 8, minute: 0, period: 'AM' }, false)).to.equal('8:00');
		expect(timeUtility.formatTime({ hour: 12, minute: 0, period: 'PM' }, false)).to.equal('12:00');
	});

	it('should handle null hours or minutes', (): void => {
		expect(timeUtility.formatTime({ hour: 9, minute: null, period: 'AM' })).to.equal('9:00AM');
		expect(timeUtility.formatTime({ hour: null, minute: 30, period: 'AM' })).to.equal('12:30AM');
	});

	it('should return the opposite period, defaulting to AM', (): void => {
		expect(timeUtility.inversePeriod('AM')).to.equal('PM');
		expect(timeUtility.inversePeriod('PM')).to.equal('AM');
		expect(timeUtility.inversePeriod(null)).to.equal('AM');
	});
});
