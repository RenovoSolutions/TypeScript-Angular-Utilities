let Zone = (<any>window).Zone;

let _FakeAsyncTestZoneSpecType = Zone['FakeAsyncTestZoneSpec'];
let requestQueue = [];

/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * ## Example
 *
 * {@example testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 */
export function fakeAsync(fn: Function): { (done?: MochaDone): void } {
	if (Zone.current.get('FakeAsyncTestZoneSpec') != null) {
		throw new Error('fakeAsync() calls can not be nested');
	}

	let fakeAsyncTestZoneSpec = new _FakeAsyncTestZoneSpecType();
	let fakeAsyncZone = Zone.current.fork(fakeAsyncTestZoneSpec);

	return function (...args) {
		let res = fakeAsyncZone.run(() => {
			requestQueue = [];
			let res = fn(...args);
			flushMicrotasks();
			if (requestQueue.some(request => request.pending)) {
				throw new Error('There are still pending requests. Please be sure to flush all of your requests');
			}
			return res;
		});

		if (fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
			throw new Error(`${fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} ` +
				`periodic timer(s) still in the queue.`);
		}

		if (fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
			throw new Error(
				`${fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
		}
		return res;
	};
}

function _getFakeAsyncZoneSpec(): any {
	let zoneSpec = Zone.current.get('FakeAsyncTestZoneSpec');
	if (zoneSpec == null) {
		throw new Error('The code should be running in the fakeAsync zone to call this function');
	}
	return zoneSpec;
}

/**
 * Clear the queue of pending timers and microtasks.
 * Tests no longer need to call this explicitly.
 *
 * @deprecated
 */
export function clearPendingTimers(): void {
	// Do nothing.
}

/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * ## Example
 *
 * {@example testing/ts/fake_async.ts region='basic'}
 *
 */
export function tick(millis: number = 0): void {
	_getFakeAsyncZoneSpec().tick(millis);
}

/**
 * Discard all remaining periodic tasks.
 */
export function discardPeriodicTasks(): void {
	let zoneSpec = _getFakeAsyncZoneSpec();
	let pendingTimers = zoneSpec.pendingPeriodicTimers;
	zoneSpec.pendingPeriodicTimers.length = 0;
}

/**
 * Flush any pending microtasks.
 */
export function flushMicrotasks(): void {
	_getFakeAsyncZoneSpec().flushMicrotasks();
}

export function queueRequest(request): void {
	requestQueue.push(request);
}

export function inTestZone(): boolean {
	return !!Zone.current.get('FakeAsyncTestZoneSpec');
}
