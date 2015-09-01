/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='promise.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.promise {
	'use strict';

	import __test = rl.utilities.services.test;

	describe('promiseUtility', () => {
		var promiseUtility: IPromiseUtility;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			promiseUtility = services[serviceName];
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
}
