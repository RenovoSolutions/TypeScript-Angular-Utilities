import { TimeoutService, ITimeout } from './timeout.service';

import { fakeAsync, tick, flushMicrotasks } from '../test/fakeAsync';

describe('TimeoutService', (): void => {
	let timeoutService: TimeoutService;

	beforeEach(() => {
		timeoutService = new TimeoutService();
	});

	it('should resolve the promise and call the callback when the timeout finishes', fakeAsync((): void => {
		const promiseSpy: Sinon.SinonSpy = sinon.spy();
		const callback: Sinon.SinonSpy = sinon.spy();

		timeoutService.setTimeout(callback, 2000).then(promiseSpy);

		tick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(promiseSpy);
		sinon.assert.calledOnce(callback);
	}));

	it('should reject the promise without calling the callback if the timeout is canceled', fakeAsync((): void => {
		const rejectSpy: Sinon.SinonSpy = sinon.spy();
		const callback: Sinon.SinonSpy = sinon.spy();

		const timeout: ITimeout = timeoutService.setTimeout(callback, 2000);

		timeout.then(assert.fail)
				.catch(rejectSpy);

		timeout.cancel();
		tick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(rejectSpy);
		sinon.assert.notCalled(callback);
	}));
});