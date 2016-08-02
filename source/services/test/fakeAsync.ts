let requestQueue = [];

import { fakeAsync as ngFakeAsync, flushMicrotasks } from '@angular/core/testing';
export { flushMicrotasks, tick } from '@angular/core/testing';

/**
 * Wraps angular fakeAsync with the ability to track pending requests
 *
 * When a request is initiated using mockAsync, the request is pushed to the requestQueue
 * If there are any pending requests at the end of the function, an exception will be thrown.
 *
 * @param fn
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 */
export function fakeAsync(fn: Function): { (done?: MochaDone): void } {
	return ngFakeAsync(function (...args) {
		requestQueue = [];
		let res = fn(...args);
		flushMicrotasks();
		if (requestQueue.some(request => request.pending)) {
			throw new Error('There are still pending requests. Please be sure to flush all of your requests');
		}
		return res;
	});
}

export function queueRequest(request): void {
	requestQueue.push(request);
}