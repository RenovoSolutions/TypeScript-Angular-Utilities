import { each, isUndefined, isFunction, some, first } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { flushMicrotasks, queueRequest } from './fakeAsync';
import { IMockedPromise, mockPromise } from './mockPromise';

export { IMockedPromise } from './mockPromise';

export interface IMockAsyncService {
	request<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedObservable<TData>;
	rejectedRequest<TData>(...params: any[]): IMockedObservable<TData>;
	promise<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedPromise<TData>;
	rejectedPromise<TData>(...params: any[]): IMockedPromise<TData>;
	flushAll(service: any): void;
}

export interface IMockedObservable<TData> extends Sinon.SinonSpy {
	(...args: any[]): Observable<TData>;
	reject(error: any): void;
	rejected: boolean;
	flush(): void;
	share(share?: boolean): void;
}

interface IMockedObservableInternal<TData> extends IMockedObservable<TData> {
	rejectParam: any;
}

class MockAsyncService implements IMockAsyncService {
	promise<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedPromise<TData> {
		return mockPromise.promise(result);
	}

	rejectedPromise<TData>(...params: any[]): IMockedPromise<TData> {
		return mockPromise.rejectedPromise(params);
	}

	request<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedObservable<TData> {
		if (isUndefined(share)) {
			share = false;
		}

		if (isFunction(result)) {
			return this.makeDynamicMockRequest(<{ (...args: any[]): TData }>result, share);
		} else {
			return this.makeMockRequest(<TData>result, share);
		}
	}

	rejectedRequest<TData>(error: any): IMockedObservable<TData> {
		let mocked: IMockedObservableInternal<TData> = this.makeMockRequest(null, false);
		mocked.rejected = true;
		mocked.rejectParam = error;
		return mocked;
	}

	flushAll(service: any): void {
		each(service, (request: IMockedObservable<any>): void => {
			if (request && isFunction(request.flush)) {
				request.flush();
			}
		})
	}

	private makeMockRequest<TData>(result: TData, share: boolean): IMockedObservableInternal<TData> {
		return this.makeDynamicMockRequest(() => result, share);
	}

	private makeDynamicMockRequest<TData>(result: { (...args: any[]): TData }, shareParam: boolean): IMockedObservableInternal<TData> {
		let share: boolean = shareParam;
		interface IRequestType {
			resolve: Function;
			reject: Function;
			params: any[];
			stream: Subject<TData>;
			observable: Observable<TData>;
			rejected: boolean;
			rejectParam: any;
			pending: boolean;
		};

		let requests: IRequestType[] = [];
		let mocked: IMockedObservableInternal<TData>;

		// Return a function that will build a pending promise when called
		const requestBuilder: any = ((...args: any[]): Observable<TData> => {
			if (share && some(requests) && first(requests).pending) {
				return first(requests).observable;
			}

			const newRequest: IRequestType = {
				resolve: null,
				reject: null,
				params: args,
				stream: null,
				observable: null,
				rejected: mocked.rejected,
				rejectParam: mocked.rejectParam,
				pending: true,
			};

			newRequest.stream = new Subject<TData>();
			newRequest.observable = newRequest.stream.asObservable();

			requests.push(newRequest);

			// queueRequest(newRequest);

			return newRequest.observable;
		});

		const spiedBuilder: any = sinon.spy(requestBuilder);
		mocked = <IMockedObservableInternal<TData>> spiedBuilder;

		// Mark promise to be rejected
		mocked.reject = (error: any) => {
			mocked.rejected = true;
			mocked.rejectParam = error;
		};

		// Mark promise to be shared in builder
		mocked.share = (shareParam?: boolean) => {
			if (isUndefined(shareParam)) {
				share = true;
			}

			share = shareParam;
		};

		// If current request, resolve and clear
		mocked.flush = (): void => {
			each(requests, (request: IRequestType): void => {
				if (!request.pending) {
					return;
				}

				request.pending = false;
				if (request.rejected) {
					request.stream.error(request.rejectParam);
				} else {
					request.stream.next(result(...request.params));
					request.stream.complete();
				}
			});
			requests = [];
			// flushMicrotasks();
		};

		return mocked;
	}
}

export const mock: IMockAsyncService = new MockAsyncService();
