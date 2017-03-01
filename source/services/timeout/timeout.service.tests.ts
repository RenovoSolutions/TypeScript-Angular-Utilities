import { rlFakeAsync, rlTick, flushMicrotasks } from 'rl-async-testing';
import { TimeoutService, ITimeout } from './timeout.service';

describe('TimeoutService', (): void => {
	let timeoutService: TimeoutService;

	beforeEach(() => {
		timeoutService = new TimeoutService();
	});

	it('should resolve the promise and call the callback when the timeout finishes', rlFakeAsync((): void => {
		const promiseSpy: sinon.SinonSpy = sinon.spy();
		const callback: sinon.SinonSpy = sinon.spy();

		timeoutService.setTimeout(callback, 2000).then(promiseSpy);

		rlTick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(promiseSpy);
		sinon.assert.calledOnce(callback);
	}));

	it('should reject the promise without calling the callback if the timeout is canceled', rlFakeAsync((): void => {
		const rejectSpy: sinon.SinonSpy = sinon.spy();
		const callback: sinon.SinonSpy = sinon.spy();

		const timeout: ITimeout = timeoutService.setTimeout(callback, 2000)
												.then(assert.fail)
												.catch(rejectSpy);

		timeout.cancel();
		rlTick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(rejectSpy);
		sinon.assert.notCalled(callback);
	}));

	it('should allow for specifying just a duration for chaining as a promise', rlFakeAsync((): void => {
		const promiseSpy: sinon.SinonSpy = sinon.spy();

		timeoutService.setTimeout(2000).then(promiseSpy);

		flushMicrotasks();
		sinon.assert.notCalled(promiseSpy);

		rlTick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(promiseSpy);
	}));
});
