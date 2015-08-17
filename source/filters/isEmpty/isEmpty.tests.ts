/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='isEmpty.ts' />
/// <reference path='../../services/test/angularFixture.ts' />

module rl.utilities.filters.isEmpty {
	'use strict';

	import __test = rl.utilities.services.test;

	describe('isEmpty', () => {
		var isEmpty: IIsEmptyFilter;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(filterName);
			isEmpty = services[filterName];
		});

		it('should return true if the array is null or empty', (): void => {
			expect(isEmpty(null)).to.be.true;
			expect(isEmpty([])).to.be.true;
		});

		it('should return false if the array has items', (): void => {
			expect(isEmpty([1, 2, 3])).to.be.false;
			expect(isEmpty(['1', '2', '3'])).to.be.false;
		});

		it('should invert the result if trueIfEmpty is specified as false', (): void => {
			expect(isEmpty(null, false)).to.be.false;
			expect(isEmpty([1, 2, 3], false)).to.be.true;
		});
	});
}
