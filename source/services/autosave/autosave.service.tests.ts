/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='autosave.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.autosave {
	'use strict';

	import __test = rl.utilities.services.test;

	interface IAutosaveActionMock {
		trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
	}

	interface IMockFormController {
		$pristine: boolean;
		$setPristine: Sinon.SinonSpy;
	}

	describe('autosave', () => {
		var autosave: IAutosaveService;
		var autosaveFactory: IAutosaveServiceFactory;
		var saveSpy: Sinon.SinonSpy;
		var triggerSpy: Sinon.SinonSpy;
		var setPristineSpy: Sinon.SinonSpy;
		var baseContentForm: IMockFormController;
		var $rootScope: ng.IRootScopeService;

		beforeEach(() => {
			angular.mock.module(moduleName);

			triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
			var autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

			__test.angularFixture.mock({
				autosaveAction: autosaveActionService,
			});

			setPristineSpy = sinon.spy();

			baseContentForm = {
				$pristine: false,
				$setPristine: setPristineSpy,
			};

			var services: any = __test.angularFixture.inject(factoryName, '$q', '$rootScope');
			autosaveFactory = services[factoryName];
			var $q: ng.IQService = services.$q;
			$rootScope = services.$rootScope;

			saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });
		});

		it('should call save on the parent and set the form to pristine', (): void => {
			autosave = autosaveFactory.getInstance(saveSpy, <any>baseContentForm);

			var close: boolean = autosave.autosave();

			expect(close).to.be.true;

			sinon.assert.calledOnce(saveSpy);

			$rootScope.$digest();

			sinon.assert.calledOnce(setPristineSpy);
		});

		it('should not save if the form is pristine', (): void => {
			autosave = autosaveFactory.getInstance(saveSpy, <any>baseContentForm);

			baseContentForm.$pristine = true;

			var close: boolean = autosave.autosave();

			expect(close).to.be.true;

			sinon.assert.notCalled(saveSpy);
		});

		it('should validate using the validator if one exists', (): void => {
			var validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return true; });

			autosave = autosaveFactory.getInstance(saveSpy, <any>baseContentForm, validateSpy);

			var close: boolean = autosave.autosave();

			expect(close).to.be.true;

			sinon.assert.calledOnce(validateSpy);
			sinon.assert.calledOnce(saveSpy);
		});

		it('should return false without saving if validation fails', (): void => {
			var validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return false; });

			autosave = autosaveFactory.getInstance(saveSpy, <any>baseContentForm, validateSpy);

			var close: boolean = autosave.autosave();

			expect(close).to.be.false;

			sinon.assert.calledOnce(validateSpy);
			sinon.assert.notCalled(saveSpy);
		});

		it('should always save if no form is specified', (): void => {
			autosave = autosaveFactory.getInstance(saveSpy);

			var close: boolean = autosave.autosave();

			expect(close).to.be.true;

			sinon.assert.calledOnce(saveSpy);
		});
	});
}
