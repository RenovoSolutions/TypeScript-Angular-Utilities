/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='boolean.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.boolean {
	'use strict';

	import __test = rl.utilities.services.test;

	describe('booleanUtility', () => {
		var booleanUtility: IBooleanUtility;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			booleanUtility = services[serviceName];
		});

		describe('toBool', (): void => {
			it('should convert null and undefined to false', (): void => {
				expect(booleanUtility.toBool(null)).to.be.false;
				expect(booleanUtility.toBool(undefined)).to.be.false;
			});

			it('should leave bool values unchanged', (): void => {
				expect(booleanUtility.toBool(false)).to.be.false;
				expect(booleanUtility.toBool(true)).to.be.true;
			});
		});
	});
}
