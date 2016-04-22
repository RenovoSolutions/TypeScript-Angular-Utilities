import * as ng from 'angular';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

export interface IMockPromiseService {
	promise<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedPromise<TData>;
	rejectedPromise<TData>(...params: any[]): IMockedPromise<TData>;
	flushAll(service: any): void;
}

export interface IMockedPromise<TData> extends Sinon.SinonSpy {
	(...args: any[]): Promise<TData>;
	reject(...params: any[]): void;
	rejected: boolean;
	flush(): void;
	share(share?: boolean): void;
}

interface IMockedPromiseInternal<TData> extends IMockedPromise<TData> {
	rejectParams: any[];
}

class MockPromiseService implements IMockPromiseService {
	promise<TData>(result?: TData | { (...args: any[]): TData }, share?: boolean): IMockedPromise<TData> {
		if (ng.isUndefined(share)) {
			share = false;
		}

		if (ng.isFunction(result)) {
			return this.makeDynamicMockPromise(<{ (...args: any[]): TData }>result, share);
		} else {
			return this.makeMockPromise(<TData>result, share);
		}
	}

	rejectedPromise<TData>(...params: any[]): IMockedPromise<TData> {
		let mocked: IMockedPromiseInternal<TData> = this.makeMockPromise(null, false);
		mocked.rejected = true;
		mocked.rejectParams = params;
		return mocked;
	}

	flushAll(service: any): void {
		_.each(service, (promise: IMockedPromise<any>): void => {
			if (promise && _.isFunction(promise.flush)) {
				promise.flush();
			}
		});
	}

	private makeMockPromise<TData>(result: TData, share: boolean): IMockedPromiseInternal<TData> {
		return this.makeDynamicMockPromise(() => result, share);
	}

	private makeDynamicMockPromise<TData>(result: { (...args: any[]): TData }, share: boolean): IMockedPromiseInternal<TData> {
		let request: any;
		let promise: Promise<TData>;

		// Return a function that will build a pending promise when called
		let promiseBuilder: any = ((...args: any[]): Promise<TData> => {
			if (request && request.share) {
				return promise;
			}

			promise = new Promise<TData>(function (resolve, reject) {
				request = {
					resolve,
					reject,
					params: args,
					share: share,
				};
			});

			return promise;
		});

		let spiedBuilder: any = sinon.spy(promiseBuilder);
		let mocked: IMockedPromiseInternal<TData> = <IMockedPromiseInternal<TData>> spiedBuilder;

		// Mark promise to be rejected
		mocked.reject = (...params: any[]) => {
			mocked.rejected = true;
			mocked.rejectParams = params;
		};

		// Mark promise to be shared in builder
		mocked.share = (share?: boolean) => {
			if (ng.isUndefined(share)) {
				share = true;
			}

			request.share = share;
		};

		// If current request, resolve and clear
		mocked.flush = () => {
			if (request) {
				if (mocked.rejected) {
					request.reject(...mocked.rejectParams);
				} else {
					request.resolve(result(...request.params));
				}

				request = null;
			}
		};

		return mocked;
	}
}

export const mock: IMockPromiseService = new MockPromiseService();