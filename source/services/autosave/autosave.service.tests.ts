/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IAutosaveService, IAutosaveServiceFactory, moduleName, factoryName } from './autosave.service';

import { angularFixture } from '../test/angularFixture';

import * as ng from 'angular';
import 'angular-mocks';

interface IAutosaveActionMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

interface IMockFormController {
	$pristine: boolean;
	$dirty: boolean;
	$setPristine: Sinon.SinonSpy;
}

describe('autosave', () => {
	let autosave: IAutosaveService;
	let autosaveFactory: IAutosaveServiceFactory;
	let saveSpy: Sinon.SinonSpy;
	let triggerSpy: Sinon.SinonSpy;
	let setPristineSpy: Sinon.SinonSpy;
	let baseContentForm: IMockFormController;
	let $rootScope: ng.IRootScopeService;
	let $timeout: ng.ITimeoutService;

	beforeEach(() => {
		ng.mock.module(moduleName);

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		let autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

		angularFixture.mock({
			autosaveAction: autosaveActionService,
		});

		setPristineSpy = sinon.spy();

		baseContentForm = {
			$pristine: false,
			$dirty: true,
			$setPristine: setPristineSpy,
		};

		let services: any = angularFixture.inject(factoryName, '$q', '$rootScope', '$timeout');
		autosaveFactory = services[factoryName];
		let $q: ng.IQService = services.$q;
		$rootScope = services.$rootScope;
		$timeout = services.$timeout;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });
	});

	it('should call save on the parent and set the form to pristine', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);

		$rootScope.$digest();

		sinon.assert.calledOnce(setPristineSpy);
	});

	it('should not save if the form is pristine', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any > baseContentForm,
		});

		baseContentForm.$pristine = true;

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.notCalled(saveSpy);
	});

	it('should validate using the validator if one exists', (): void => {
		let validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return true; });

		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			validate: validateSpy,
			contentForm: <any>baseContentForm,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.calledOnce(saveSpy);
	});

	it('should return false without saving if validation fails', (): void => {
		let validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return false; });

		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			validate: validateSpy,
			contentForm: <any>baseContentForm,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.false;

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.notCalled(saveSpy);
	});

	it('should always save if no form is specified', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);
	});

	it('should autosave when the form becomes dirty after the debounce duration', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
			debounceDuration: 1000,
		});

		expect(baseContentForm.$dirty).to.be.true;

		$rootScope.$digest();

		$timeout.flush(1000);

		sinon.assert.calledOnce(saveSpy);
	});

	it('should reset the debounce timer on form changes', (): void => {
		let triggerChange: { (): void };
		let changeListener: any = (callback: { (): void }): Sinon.SinonSpy => {
			triggerChange = callback;
			return sinon.spy();
		};

		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: changeListener,
		});

		expect(baseContentForm.$dirty).to.be.true;

		$rootScope.$digest();

		$timeout.flush(500);

		triggerChange();

		$timeout.flush(500);

		sinon.assert.notCalled(saveSpy);

		$timeout.flush(500);

		sinon.assert.calledOnce(saveSpy);
	});
});
