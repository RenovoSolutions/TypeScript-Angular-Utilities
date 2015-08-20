/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='time.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.time {

	import __test = rl.utilities.services.test;

	describe('timeUtility', () => {
		var timeUtility: ITimeUtility;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			timeUtility = services[serviceName];
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

}
