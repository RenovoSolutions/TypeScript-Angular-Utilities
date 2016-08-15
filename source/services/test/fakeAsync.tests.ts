import { fakeAsync, tick, flushMicrotasks, queueRequest } from './fakeAsync';

describe('fakeAsync', () => {
	it('should throw an error if there are pending requests', () => {
		expect(fakeAsync(() => {
			queueRequest({ pending: true });
		})).to.throw('There are still pending requests. Please be sure to flush all of your requests');
	});

	it('should run successfully if all requests in the queue are resolved', () => {
		fakeAsync(() => {
			queueRequest({ pending: false });
		})();
	});
});
