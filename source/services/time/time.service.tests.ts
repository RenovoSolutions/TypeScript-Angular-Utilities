import { ITimeUtility, TimeUtility } from './time.service';
import { CompareResult } from '../../types/compareResult';

describe('timeUtility', () => {
	let timeUtility: ITimeUtility;

	beforeEach(() => {
		timeUtility = new TimeUtility();
	});

	it('should compare times and return a compare result to indicate which is greater', (): void => {
		expect(timeUtility.compareTimes('12:00PM', '1:00PM')).to.equal(CompareResult.less);
		expect(timeUtility.compareTimes('12:00PM', '12:00PM')).to.equal(CompareResult.equal);
		expect(timeUtility.compareTimes('2:00PM', '1:00PM')).to.equal(CompareResult.greater);
	});
});
