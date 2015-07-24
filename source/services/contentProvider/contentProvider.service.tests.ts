/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='contentProvider.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.contentProvider {
	'use strict';

	import __test = rl.utilities.services.test;

	describe('contentProvider', () => {
		var contentProvider: IContentProviderService;
		var transcludeSpy: Sinon.SinonSpy;
		var filterSpy: Sinon.SinonSpy;
		var jqueryClone: any;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			var contentProviderFactory: IContentProviderServiceFactory
				= services[serviceName];
			contentProvider = contentProviderFactory.getInstance();

			jqueryClone = {};
			filterSpy = sinon.spy((object: any): any => { return object; });
			jqueryClone.filter = filterSpy;

			transcludeSpy = sinon.spy((func: Function) => func(jqueryClone));
		});

		it('should get the content that was set by setContent', (): void => {
			contentProvider.setContent(jqueryClone);
			expect(contentProvider.getContent()).to.equal(jqueryClone);
		});

		it('should set the content to the content provided by the transclude function', (): void => {
			contentProvider.setTranscludeContent(transcludeSpy);

			sinon.assert.calledOnce(transcludeSpy);

			expect(contentProvider.getContent()).to.equal(jqueryClone);
		});

		it('should filter the jquery object with the specified selector', (): void => {
			contentProvider.setContent(jqueryClone);

			contentProvider.getContent('selector');

			sinon.assert.calledOnce(filterSpy);
			sinon.assert.calledWith(filterSpy, 'selector');
		});

		it('should call the action with the new content when the content changes', (): void => {
			var actionSpy: Sinon.SinonSpy = sinon.spy();

			contentProvider.register(actionSpy);

			contentProvider.setContent(jqueryClone);

			sinon.assert.calledOnce(actionSpy);
			sinon.assert.calledWith(actionSpy, jqueryClone);
		});

		it('should call the action immediately if there is already content', (): void => {
			var actionSpy: Sinon.SinonSpy = sinon.spy();

			contentProvider.setContent(jqueryClone);

			contentProvider.register(actionSpy);

			sinon.assert.calledOnce(actionSpy);
			sinon.assert.calledWith(actionSpy, jqueryClone);
		});
	});
}
