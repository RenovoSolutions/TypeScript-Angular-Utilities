import { ITimeUtility, TimeUtility } from './time.service';
import { CompareResult } from '../../types/compareResult';
import { stringUtility } from '../string/string.service';

describe('timeUtility', () => {
	let timeUtility: ITimeUtility;

	beforeEach(() => {
		timeUtility = new TimeUtility(stringUtility);
	});

	it('should compare times and return a compare result to indicate which is greater', (): void => {
		expect(timeUtility.compareTimes('12:00PM', '1:00PM')).to.equal(CompareResult.less);
		expect(timeUtility.compareTimes('12:00PM', '12:00PM')).to.equal(CompareResult.equal);
		expect(timeUtility.compareTimes('2:00PM', '1:00PM')).to.equal(CompareResult.greater);
	});

	it('should return null if the time is null', (): void => {
		expect(timeUtility.parseTime(null)).to.be.null;
		expect(timeUtility.formatTime(null)).to.be.null;
	});

	it('should parse the time string into a time object', (): void => {
		expect(timeUtility.parseTime('8:00AM')).to.deep.equal({ hour: 8, minute: 0, period: 'AM' });
		expect(timeUtility.parseTime('12:00PM')).to.deep.equal({ hour: 12, minute: 0, period: 'PM' });
		expect(timeUtility.parseTime('10:15AM')).to.deep.equal({ hour: 10, minute: 15, period: 'AM' });
		expect(timeUtility.parseTime('1:41PM')).to.deep.equal({ hour: 1, minute: 41, period: 'PM' });
	});

	it('should format the time object into a time string', (): void => {
		expect(timeUtility.formatTime({ hour: 8, minute: 0, period: 'AM' })).to.equal('8:00AM');
		expect(timeUtility.formatTime({ hour: 12, minute: 0, period: 'PM' })).to.equal('12:00PM');
		expect(timeUtility.formatTime({ hour: 10, minute: 15, period: 'AM' })).to.equal('10:15AM');
		expect(timeUtility.formatTime({ hour: 1, minute: 41, period: 'PM' })).to.equal('1:41PM');
	});
});
