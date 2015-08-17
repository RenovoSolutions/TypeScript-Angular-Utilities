/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='jquery.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.jquery {
	'use strict';

	import __test = rl.utilities.services.test;

	describe('jqueryUtility', () => {
		var jqueryUtility: IJQueryUtility;
		var emptySpy: Sinon.SinonSpy;
		var appendSpy: Sinon.SinonSpy;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			jqueryUtility = services.jqueryUtility;

			emptySpy = sinon.spy();
			appendSpy = sinon.spy();
		});

		it('should empty the existing content and append the new content', (): void => {
			var existingElement: any = {
				empty: emptySpy,
				append: appendSpy,
			};

			var newContent: any = {};

			jqueryUtility.replaceContent(existingElement, newContent);

			sinon.assert.calledOnce(emptySpy);
			sinon.assert.calledOnce(appendSpy);
			sinon.assert.calledWith(appendSpy, newContent);
		});
	});
}
