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
		if (_.isUndefined(share)) {
			share = false;
		}

		if (_.isFunction(result)) {
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

	private makeDynamicMockPromise<TData>(result: { (...args: any[]): TData }, shareParam: boolean): IMockedPromiseInternal<TData> {
		let share: boolean = shareParam;
		interface IRequestType {
			resolve: Function;
			reject: Function;
			params: any[];
			promise: Promise<TData>;
			rejected: boolean;
			rejectParams: any[];
		};

		let requests: IRequestType[] = [];
		let mocked: IMockedPromiseInternal<TData>;

		// Return a function that will build a pending promise when called
		let promiseBuilder: any = ((...args: any[]): Promise<TData> => {
			if (share && _.some(requests)) {
				return _.first(requests).promise;
			}

			let newRequest: IRequestType = {
				resolve: null,
				reject: null,
				params: args,
				promise: null,
				rejected: mocked.rejected,
				rejectParams: mocked.rejectParams,
			};

			newRequest.promise = new Promise<TData>(function (resolve, reject) {
				newRequest.resolve = resolve;
				newRequest.reject = reject;
			});

			requests.push(newRequest);

			return newRequest.promise;
		});

		let spiedBuilder: any = sinon.spy(promiseBuilder);
		mocked = <IMockedPromiseInternal<TData>> spiedBuilder;

		// Mark promise to be rejected
		mocked.reject = (...params: any[]) => {
			mocked.rejected = true;
			mocked.rejectParams = params;
		};

		// Mark promise to be shared in builder
		mocked.share = (shareParam?: boolean) => {
			if (_.isUndefined(shareParam)) {
				share = true;
			}

			share = shareParam;
		};

		// If current request, resolve and clear
		mocked.flush = () => {
			_.each(requests, (request: IRequestType): void => {
				if (request.rejected) {
					request.reject(...request.rejectParams);
				} else {
					request.resolve(result(...request.params));
				}
			});
			requests = [];
		};

		return mocked;
	}
}

export const mock: IMockPromiseService = new MockPromiseService();