/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { ITruncateFilter, moduleName, filterName } from './truncate';

import { angularFixture } from '../../services/test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';


describe('truncate', () => {
	var truncate: ITruncateFilter;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(filterName);
		truncate = services[filterName];
	});

	it('should return an empty string when no string is passed', (): void => {
		expect(truncate()).to.equal('');
	});

	it('should return an empty string when an empty string is passed', (): void => {
		expect(truncate('')).to.equal('');
	});

	it('should return a string when a number is passed', (): void => {
		expect(truncate(34.5)).to.equal('34.5');
	});

	it('should not truncate a string when no parameters are passed', (): void => {
		expect(truncate('Test string')).to.equal('Test string');
	});

	it('should return an empty string when truncateTo is 0', (): void => {
		expect(truncate('Test string', 0)).to.equal('');
	});

	it('should truncate but not ellipsimogrify a string when only truncateTo is passed', (): void => {
		expect(truncate('Test string', 6)).to.equal('Test s');
	});

	it('should not truncate a string when truncateTo is greater than the string length', (): void => {
		expect(truncate('Test string', 25)).to.equal('Test string');
	});

	it('should truncate but not ellipsimogrify a string when both truncateTo and includeEllipses are passed', (): void => {
		expect(truncate('Test string', 6, false)).to.equal('Test s');
	});

	it('should truncate and ellipsimogrify a string when both truncateTo and includeEllipses are passed', (): void => {
		expect(truncate('Test string', 6, true)).to.equal('Test s...');
	});
});
