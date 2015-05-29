/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import numberUtilityModule = require('./number.module');
import __numberUtility = require('./number.service');
import angularFixture = require('../test/angularFixture');

describe('numberUtility', () => {
	var numberUtility: __numberUtility.INumberUtility;

	beforeEach(() => {
		angular.mock.module(numberUtilityModule.name);

		var services: any = angularFixture.angularFixture.inject(__numberUtility.name);
		numberUtility = services[__numberUtility.name];
	});

	describe('preciseRound', (): void => {
		it('should round 6 to 6', (): void => {
			var roundedNum: number = numberUtility.preciseRound(6, 2);
			expect(roundedNum).to.equal(6);
		});

		it('should round 1.275 to 1.28', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.275, 2);
			expect(roundedNum).to.equal(1.28);
		});

		it('should round 1.274 to 1.27', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.274, 2);
			expect(roundedNum).to.equal(1.27);
		});

		it('should round 1.55555555555555555555 to 1.5555555555555555556', (): void => {
			// 20 5's. This is the max precision precise_round is valid for
			var roundedNum: number = numberUtility.preciseRound(1.55555555555555555555, 19);
			expect(roundedNum).to.equal(1.5555555555555555556);
		});

		it('should round 1.999999999999999999999 to 2', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.999999999999999999999, 20); // 21 9's
			expect(roundedNum).to.equal(2);
		});

		it('should not round 1.111111111111111111111', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.111111111111111111111, 20); // 21 1's
			expect(roundedNum).to.equal(1.11111111111111111111);	// trimmed 1 from the end
		});
	});
});
