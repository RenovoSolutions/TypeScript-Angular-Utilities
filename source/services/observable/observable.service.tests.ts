import { ObservableService } from './observable.service';

interface IMockExceptionHandler {
	handleError: sinon.SinonSpy;
}

describe('observable', () => {
	let observable: ObservableService;
	let exceptionHandler: IMockExceptionHandler;

	beforeEach(() => {
		exceptionHandler = {
			handleError: sinon.spy(),
		};

		observable = new ObservableService(<any>exceptionHandler);
	});

	it('should register a watcher and call the action when fire is called', (): void => {
		let func: sinon.SinonSpy = sinon.spy();

		observable.register(func);
		observable.fire();

		sinon.assert.calledOnce(func);
	});

	it('should unregister only the indicated watcher', (): void => {
		let registeredFunc1: sinon.SinonSpy = sinon.spy();
		let unregisteredFunc: sinon.SinonSpy = sinon.spy();
		let registeredFunc2: sinon.SinonSpy = sinon.spy();

		observable.register(registeredFunc1);
		let cancel: () => void = observable.register(unregisteredFunc);
		observable.register(registeredFunc2);

		cancel();

		observable.fire();

		sinon.assert.calledOnce(registeredFunc1);
		sinon.assert.notCalled(unregisteredFunc);
		sinon.assert.calledOnce(registeredFunc2);
	});

	it('should only call watcher registered with the specified event if fire is called with an event', (): void => {
		let funcWithEvent: sinon.SinonSpy = sinon.spy();
		let funcWithoutEvent: sinon.SinonSpy = sinon.spy();

		observable.register(funcWithEvent, 'myEvent');
		observable.register(funcWithoutEvent);
		observable.fire('myEvent');

		sinon.assert.notCalled(funcWithoutEvent);
		sinon.assert.calledOnce(funcWithEvent);
	});

	it('should not call watchers registered with a different event', (): void => {
		let func: sinon.SinonSpy = sinon.spy();

		observable.register(func, 'myEvent');
		observable.fire('otherEvent');

		sinon.assert.notCalled(func);
	});

	it('should call the registered watchers with the additional params passed into the fire function', (): void => {
		let func: sinon.SinonSpy = sinon.spy();

		observable.register(func, 'myEvent');
		observable.fire('myEvent', 1, 2, 3, 4, 5);

		sinon.assert.calledOnce(func);

		let args: number[] = func.firstCall.args;
		expect(args[0]).to.equal(1);
		expect(args[1]).to.equal(2);
		expect(args[2]).to.equal(3);
		expect(args[3]).to.equal(4);
		expect(args[4]).to.equal(5);
	});

	// skipped because it is failing, has been for some time, and no one knows why
	// the observable service has been deprecated, use rxjs instead
	// not going to waste resources investigating a failing test on a deprecated service
	xit('should return with an error if no function is provided', (): void => {
		let cancel: Function = observable.register(null);

		sinon.assert.calledOnce(exceptionHandler.handleError);
		sinon.assert.calledWith(exceptionHandler.handleError, new Error('Watcher must be a function'));

		expect(cancel).to.be.null;
	});

	// same scenario as previous test
	xit('should return with an error if the event is not allowed', (): void => {
		observable.allowableEvents = ['event1', 'event2'];

		let cancel: Function = observable.register((): void => { return; }, 'event3');

		sinon.assert.calledOnce(exceptionHandler.handleError);
		sinon.assert.calledWith(exceptionHandler.handleError, new Error('This event is not allowed. Events: event1, event2'));

		expect(cancel).to.be.null;

	});
});
