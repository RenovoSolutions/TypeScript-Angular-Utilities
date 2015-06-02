/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import jqueryHelperModule = require('./jquery.module');
import jqueryHelperService = require('./jquery.service');
import angularFixture = require('../test/angularFixture');

describe('jqueryUtility', () => {
	var jqueryUtility: jqueryHelperService.IJQueryUtility;
	var emptySpy: Sinon.SinonSpy;
	var appendSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(jqueryHelperModule.name);

		var services: any = angularFixture.angularFixture.inject('jqueryUtility');
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
