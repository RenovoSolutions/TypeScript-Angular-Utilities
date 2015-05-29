/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import __objectModule = require('./object.module');
import __object = require('./object.service');
import __angularFixture = require('../test/angularFixture');

describe('objectUtility', () => {
	var objectUtility: __object.IObjectUtility;

	beforeEach(() => {
		angular.mock.module(__objectModule.name);

		var services: any = __angularFixture.angularFixture.inject(__object.name);
		objectUtility = services[__object.name];
	});

	describe('isNullOrEmpty', (): void => {
		it('should return true when null', (): void => {
			expect(objectUtility.isNullOrEmpty(null)).to.be.true;
		});

		it('should return true when empty', (): void => {
			expect(objectUtility.isNullOrEmpty('')).to.be.true;
		});

		it('should return false when string has contents', (): void => {
			expect(objectUtility.isNullOrEmpty('random string')).to.be.false;
		});

		it('should return true for null or empty arrays', (): void => {
			expect(objectUtility.isNullOrEmpty(null)).to.be.true;
			expect(objectUtility.isNullOrEmpty([])).to.be.true;
			expect(objectUtility.isNullOrEmpty([1, 2, 3])).to.be.false;
		});

		it('should return true if number type is not a number', (): void => {
			expect(objectUtility.isNullOrEmpty(Number.NaN)).to.be.true;
			expect(objectUtility.isNullOrEmpty(5)).to.be.false;
		});
	});

	describe('isNullOrWhitespace', (): void => {
		it('should return true for empty whitespace strings', (): void => {
			expect(objectUtility.isNullOrWhitespace('   ')).to.be.true;
		});

		it('should handle null and empty objects like isNullOrEmpty', (): void => {
			expect(objectUtility.isNullOrWhitespace(null)).to.equal(objectUtility.isNullOrEmpty(null));
			expect(objectUtility.isNullOrWhitespace([])).to.equal(objectUtility.isNullOrEmpty([]));
			expect(objectUtility.isNullOrWhitespace({})).to.equal(objectUtility.isNullOrEmpty({}));
			expect(objectUtility.isNullOrWhitespace('')).to.equal(objectUtility.isNullOrEmpty(''));
			expect(objectUtility.isNullOrWhitespace('random string')).to.equal(objectUtility.isNullOrEmpty('random string'));
		});
	});
});
