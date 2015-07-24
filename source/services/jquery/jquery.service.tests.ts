/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

/// <reference path='jquery.service.ts' />
/// <reference path='../test/angularFixture.ts' />

describe('jqueryUtility', () => {
	var jqueryUtility: rl.utilities.jquery.IJQueryUtility;
	var emptySpy: Sinon.SinonSpy;
	var appendSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(rl.utilities.jquery.moduleName);

		var services: any = rl.utilities.test.angularFixture.inject(rl.utilities.jquery.serviceName);
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
