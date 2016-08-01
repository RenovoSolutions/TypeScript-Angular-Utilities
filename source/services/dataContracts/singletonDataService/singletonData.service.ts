import { Injectable, Provider, provide } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { IHttpUtility, HttpUtility } from '../../http/http.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior } from '../baseDataServiceBehavior';
import { ISingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export interface ISingletonDataService<TDataType> {
	get(): Observable<TDataType>;
	update(domainObject: TDataType): Observable<TDataType>;
	version(versionNumber: number): SingletonDataService<TDataType>;

	mockResource(mockData: TDataType): void;

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

	get(): Observable<TDataType> {
		return this.behavior.getItem({
			endpoint: this.url,
			getMockData: (): TDataType => { return this.mockData; },
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	update(domainObject: TDataType): Observable<TDataType> {
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

	mockResource(mockData: TDataType): void {
		this.mockData = mockData;
		this.useMock = true;
	}
}

export interface ISingletonDataServiceFactory {
	getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}

@Injectable()
export class SingletonDataServiceFactory {
	private http: IHttpUtility;

	constructor(http: HttpUtility) {
		this.http = http;
	}

	getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType> {
		return new SingletonDataService(this.http, options);
	}
}

export function SingletonDataServiceProvider(options: ISingletonResourceParams<any>): Provider {
	return provide(SingletonDataService, {
		deps: [HttpUtility],
		useFactory: (http: IHttpUtility) => new SingletonDataService(http, options),
	});
};
