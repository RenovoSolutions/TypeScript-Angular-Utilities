import { mock, IMockedPromise } from '../test/mockPromise';
import { SynchronizedRequestsService } from './synchronizedRequests.service';
import async from '../test/async';

describe('synchronizedRequests', () => {
	let synchronizedRequests: SynchronizedRequestsService;

	it('should accept the results from only the most recent request', async((): void => {
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

		firstRequest.flush().then(() => {
			sinon.assert.notCalled(callback);

			return secondRequest.flush();
		}).then(() => {
			sinon.assert.calledOnce(callback);
			sinon.assert.calledWith(callback, secondRequestData);
		});
	}));
});
