/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import observableModule = require('./observable.module');
import observableService = require('./observable.service');
import angularFixture = require('../test/angularFixture');

describe('observable', () => {
	var observable: observableService.IObservableService;

	beforeEach(() => {
		angular.mock.module(observableModule.name);

		var services: any = angularFixture.angularFixture.inject('observableFactory');
		var observableFactory: observableService.IObservableServiceFactory = services.observableFactory;
		observable = observableFactory.getInstance();
	});

	it('should register a watcher and call the action when fire is called', (): void => {
		var func: Sinon.SinonSpy = sinon.spy();

		observable.register(func);
		observable.fire();

		sinon.assert.calledOnce(func);
	});

	it('should unregister only the indicated watcher', (): void => {
		var registeredFunc1: Sinon.SinonSpy = sinon.spy();
		var unregisteredFunc: Sinon.SinonSpy = sinon.spy();
		var registeredFunc2: Sinon.SinonSpy = sinon.spy();

		observable.register(registeredFunc1);
		var cancel: () => void = observable.register(unregisteredFunc);
		observable.register(registeredFunc2);

		cancel();

		observable.fire();

		sinon.assert.calledOnce(registeredFunc1);
		sinon.assert.notCalled(unregisteredFunc);
		sinon.assert.calledOnce(registeredFunc2);
	});

	it('should only call watcher registered with the specified event if fire is called with an event', (): void => {
		var funcWithEvent: Sinon.SinonSpy = sinon.spy();
		var funcWithoutEvent: Sinon.SinonSpy = sinon.spy();

		observable.register(funcWithEvent, 'myEvent');
		observable.register(funcWithoutEvent);
		observable.fire('myEvent');

		sinon.assert.notCalled(funcWithoutEvent);
		sinon.assert.calledOnce(funcWithEvent);
	});

	it('should not call watchers registered with a different event', (): void => {
		var func: Sinon.SinonSpy = sinon.spy();

		observable.register(func, 'myEvent');
		observable.fire('otherEvent');

		sinon.assert.notCalled(func);
	});

	it('should call the registered watchers with the additional params passed into the fire function', (): void => {
		var func: Sinon.SinonSpy = sinon.spy();

		observable.register(func, 'myEvent');
		observable.fire('myEvent', 1, 2, 3, 4, 5);

		sinon.assert.calledOnce(func);

		var args: number[] = func.firstCall.args;
		expect(args[0]).to.equal(1);
		expect(args[1]).to.equal(2);
		expect(args[2]).to.equal(3);
		expect(args[3]).to.equal(4);
		expect(args[4]).to.equal(5);
	});

	it('should return with an error if no function is provided', (): void => {
		var originalLog: (message?: string) => void = console.log;
		var logSpy: Sinon.SinonSpy = sinon.spy();
		console.log = logSpy;

		var cancel: () => void = observable.register(null);

		sinon.assert.calledOnce(logSpy);
		sinon.assert.calledWith(logSpy, 'Error: watcher must be a function');

		expect(cancel).to.be.null;

		console.log = originalLog;
	});
});
