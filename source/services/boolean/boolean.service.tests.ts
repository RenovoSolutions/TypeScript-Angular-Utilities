/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IBooleanUtility, moduleName, serviceName } from './boolean.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

describe('booleanUtility', () => {
	var booleanUtility: IBooleanUtility;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(serviceName);
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
