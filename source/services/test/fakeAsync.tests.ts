import { Subject } from 'rxjs';
import { fakeAsync, tick, flushMicrotasks, queueRequest } from './fakeAsync';

describe('fakeAsync', () => {
	it('should schedule an rxjs action', fakeAsync(() => {
		const testStream = new Subject<void>();
		const testSpy = sinon.spy();
		testStream.delay(1000).subscribe(() => testSpy());
		testStream.next(null);

		sinon.assert.notCalled(testSpy);

		tick(1000);
		flushMicrotasks();

		sinon.assert.calledOnce(testSpy);
	}));

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
