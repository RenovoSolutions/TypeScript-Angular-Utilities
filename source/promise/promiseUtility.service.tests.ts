/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import promiseModule = require('./promise.module');
import __promise = require('./promise.service');
import angularFixture = require('../test/angularFixture');

describe('promiseUtility', () => {
	var promiseUtility: __promise.IPromiseUtility;

	beforeEach(() => {
		angular.mock.module(promiseModule.name);

		var services: any = angularFixture.angularFixture.inject(__promise.name);
		promiseUtility = services[__promise.name];
	});

	describe('isPromise', (): void => {
		it('should return true if the object is a promise', (): void => {
			var promise: Object = {
				then: sinon.spy(),
				catch: sinon.spy(),
			};

			expect(promiseUtility.isPromise(promise)).to.be.true;
		});

		it('should return false if the object is not a promise', (): void => {
			var str: string = 'promise';
			var obj: Object = {};

			expect(promiseUtility.isPromise(str)).to.be.false;
			expect(promiseUtility.isPromise(obj)).to.be.false;
		});
	});
});
