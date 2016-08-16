import { Scheduler } from 'rxjs';

let requestQueue = [];
let timeElapsed: number = 0;

import { fakeAsync as ngFakeAsync, flushMicrotasks, tick as ngTick } from '@angular/core/testing';
export { flushMicrotasks };

/**
 * Wraps angular fakeAsync with the ability to track pending requests
 *
 * When a request is initiated using mockAsync, the request is pushed to the requestQueue
 * If there are any pending requests at the end of the function, an exception will be thrown.
 *
 * Also overrides 'now' on the default rxjs scheduler to return a value based on how much time has elapsed via 'tick'
 *
 * @param fn
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 */
export function rlFakeAsync(fn: Function): { (done?: MochaDone): void } {
	return ngFakeAsync(function (...args) {
		const originalNow = Scheduler.async.now;
		timeElapsed = 0;
		Scheduler.async.now = () => timeElapsed;
		requestQueue = [];
		let res = fn(...args);
		flushMicrotasks();
		if (requestQueue.some(request => request.pending)) {
			throw new Error('There are still pending requests. Please be sure to flush all of your requests');
		}
		Scheduler.async.now = originalNow;
		return res;
	});
}


export function rlQueueRequest(request): void {
	requestQueue.push(request);
}

export function rlTick(milliseconds: number) {
	timeElapsed += milliseconds;
	ngTick(milliseconds);
}

// deprecated - use rlFakeAsync and rlTick instead
export {
	rlFakeAsync as fakeAsync,
	rlTick as tick,
	rlQueueRequest as queueRequest,
};
