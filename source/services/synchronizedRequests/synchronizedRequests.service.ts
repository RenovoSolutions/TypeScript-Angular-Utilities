import { OpaqueToken, Provider, provide } from 'angular2/core';

export interface ISynchronizedRequestsService {
	dataProvider: IRequestGetter;
	handleRequest: IRequestCallback;

	getData(...params: any[]): void;
}

export class SynchronizedRequestsService {
	private requestId: number = 0;
	dataProvider: IRequestGetter;
	handleRequest: IRequestCallback;

	constructor(dataProvider: IRequestGetter
			, handleRequest: IRequestCallback) {
		this.dataProvider = dataProvider;
		this.handleRequest = handleRequest;
	}

	getData(...params: any[]): void {
		// increment the id first - should match current request id
		this.requestId++;
		let currentRequestId: number = this.requestId;
		Promise.resolve(this.dataProvider(...params)).then((...data: any[]): void => {
			if (currentRequestId == this.requestId) {
				this.handleRequest(...data);
			}
		});
	}
}

export interface IRequestGetter {
	(...params: any[]): angular.IPromise<any>;
}

export interface IRequestCallback {
	(...data: any[]): void;
}

export interface ISynchronizedRequestsFactory {
	getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService;
}

export class SynchronizedRequestsFactory {
	getInstance(dataProvider: IRequestGetter, handleRequest: IRequestCallback): ISynchronizedRequestsService {
		return new SynchronizedRequestsService(dataProvider, handleRequest);
	}
}

export const synchronizedRequestsToken: OpaqueToken = new OpaqueToken('A service for handling multiple requests and returning only the latest');

export function SynchronizedRequestsProvider(dataProvider: IRequestGetter, handleRequest: IRequestCallback): Provider {
	return provide(synchronizedRequestsToken, {
		useFactory: () => new SynchronizedRequestsService(dataProvider, handleRequest),
	});
}

export const SYNCHRONIZED_REQUESTS_PROVIDER: Provider = new Provider(synchronizedRequestsToken, {
	useClass: SynchronizedRequestsFactory,
});
