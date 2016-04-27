import { Injectable, Inject, OpaqueToken, Provider, provide } from 'angular2/core';
import * as _ from 'lodash';

import { IHttpUtility, httpToken } from '../../http/http.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior } from '../baseDataServiceBehavior';
import { ISingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export interface ISingletonDataService<TDataType> {
	get(): Promise<TDataType>;
	update(domainObject: TDataType): Promise<TDataType>;
	version(versionNumber: number): SingletonDataService<TDataType>;

	useMock: boolean;
	logRequests: boolean;
}

export class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
	private behavior: IBaseDataServiceBehavior<TDataType>;
	private mockData: TDataType;
	endpoint: string;
	url: string;
	useMock: boolean;
	logRequests: boolean;


	constructor(http: IHttpUtility, options: ISingletonResourceParams<TDataType>) {
		this.behavior = new BaseDataServiceBehavior(http, options.transform);
		this.mockData = options.mockData;
		this.endpoint = options.endpoint;
		this.url = this.endpoint;
		this.useMock = options.useMock;
		this.logRequests = options.logRequests;
	}

	get(): Promise<TDataType> {
		return this.behavior.getItem({
			endpoint: this.url,
			getMockData: (): TDataType => { return this.mockData; },
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	update(domainObject: TDataType): Promise<TDataType> {
		return this.behavior.update({
			domainObject: domainObject,
			endpoint: this.url,
			updateMockData: (data: TDataType): void => {
				this.mockData = <TDataType>_.assign(this.mockData, domainObject);
			},
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	version(versionNumber: number): SingletonDataService<TDataType> {
		let dataService: SingletonDataService<TDataType> = _.clone(this);
		dataService.url = helper.versionEndpoint(dataService.url, versionNumber);
		return dataService;
	}
}

export interface ISingletonDataServiceFactory {
	getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}

@Injectable()
export class SingletonDataServiceFactory {
	private http: IHttpUtility;

	constructor( @Inject(httpToken) http: IHttpUtility) {
		this.http = http;
	}

	getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType> {
		return new SingletonDataService(this.http, options);
	}
}

export const singletonDataServiceToken: OpaqueToken = new OpaqueToken('A service for making http requests against a singleton REST endpoint');

export const SINGLETON_DATA_SERVICE_PROVIDER: Provider = new Provider(singletonDataServiceToken, {
	useClass: SingletonDataServiceFactory,
});

export const SingletonDataServiceProvider: { (options: ISingletonResourceParams<any>): Provider } = (options: ISingletonResourceParams<any>): Provider => {
	return provide(singletonDataServiceToken, {
		deps: [httpToken],
		useFactory: (http: IHttpUtility) => new SingletonDataService(http, options),
	});
};
