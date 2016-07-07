import { mock, IMockedPromise } from '../test/mockAsync';
import { SynchronizedRequestsService } from './synchronizedRequests.service';
import { fakeAsync } from '../test/fakeAsync';

describe('synchronizedRequests', () => {
	let synchronizedRequests: SynchronizedRequestsService;

	it('should accept the results from only the most recent request', fakeAsync((): void => {
		const firstRequestData: number[] = [1, 2];
		const secondRequestData: number[] = [3, 4];
		const firstRequest: IMockedPromise<number[]> = mock.promise(firstRequestData);
		const secondRequest: IMockedPromise<number[]> = mock.promise(secondRequestData);

		const callback: Sinon.SinonSpy = sinon.spy();
		let get: Sinon.SinonSpy = sinon.spy((): Promise<number[]> => { return firstRequest(); });

		synchronizedRequests = new SynchronizedRequestsService(get, callback);

		synchronizedRequests.getData();

		sinon.assert.calledOnce(get);

		get = sinon.spy((): Promise<number[]> => { return secondRequest(); });

		synchronizedRequests.dataProvider = get;
		synchronizedRequests.getData();

		sinon.assert.calledOnce(get);

		firstRequest.flush();

		sinon.assert.notCalled(callback);

		secondRequest.flush();

		sinon.assert.calledOnce(callback);
		sinon.assert.calledWith(callback, secondRequestData);
	}));
});
