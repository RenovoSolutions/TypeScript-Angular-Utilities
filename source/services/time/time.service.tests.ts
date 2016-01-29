import { ITimeUtility, moduleName, serviceName } from './time.service';
import { CompareResult } from '../../types/compareResult';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

describe('timeUtility', () => {
	var timeUtility: ITimeUtility;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(serviceName);
		timeUtility = services[serviceName];
	});

	it('should compare times and return a compare result to indicate which is greater', (): void => {
		expect(timeUtility.compareTimes('12:00PM', '1:00PM')).to.equal(CompareResult.less);
		expect(timeUtility.compareTimes('12:00PM', '12:00PM')).to.equal(CompareResult.equal);
		expect(timeUtility.compareTimes('2:00PM', '1:00PM')).to.equal(CompareResult.greater);
	});

	it('should return expected number of seconds for milliseconds', (): void => {
		expect(timeUtility.millisecondsToSeconds(4000)).to.equal(4);
		expect(timeUtility.millisecondsToSeconds(4600)).to.equal(4);
	});

	it('should return expected number of minutes for milliseconds', (): void => {
		var seconds1: number = 120;
		var seconds2: number = 59;

		seconds1 *= 1000;
		seconds2 *= 1000;

		expect(timeUtility.millisecondsToMinutes(seconds1)).to.equal(2);
		expect(timeUtility.millisecondsToMinutes(seconds2)).to.equal(0);
	});

	it('should return expected number of hours for milliseconds', (): void => {
		var minutes1: number = 59;
		var minutes2: number = 60;

		minutes1 *= 60 * 1000;
		minutes2 *= 60 * 1000;

		expect(timeUtility.millisecondsToHours(minutes1)).to.equal(0);
		expect(timeUtility.millisecondsToHours(minutes2)).to.equal(1);
	});

	it('should return expected number of days for milliseconds', (): void => {
		var hours1: number = 23;
		var hours2: number = 24;

		hours1 *= 60 * 60 * 1000;
		hours2 *= 60 * 60 * 1000;

		expect(timeUtility.millisecondsToDays(hours1)).to.equal(0);
		expect(timeUtility.millisecondsToDays(hours2)).to.equal(1);
	});
});
