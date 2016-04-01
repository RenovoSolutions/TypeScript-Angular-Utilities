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
});
