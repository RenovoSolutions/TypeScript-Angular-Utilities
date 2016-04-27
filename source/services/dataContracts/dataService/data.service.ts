import { Injectable, Inject, OpaqueToken, Provider, provide } from 'angular2/core';
import * as _ from 'lodash';

import { IArrayUtility, arrayToken } from '../../array/array.service';
import { IHttpUtility, httpToken } from '../../http/http.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IGetListOptions } from '../baseDataServiceBehavior';
import { IBaseResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export interface IBaseDomainObject {
	id?: number;
}

export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): Promise<TDataType[]>;
	getDetail(id: number): Promise<TDataType>;
	create(domainObject: TDataType): Promise<TDataType>;
	update(domainObject: TDataType): Promise<TDataType>;
	delete(domainObject: TDataType): Promise<void>;
	version(versionNumber: number): DataService<TDataType, TSearchParams>;

	useMock: boolean;
	logRequests: boolean;
}

export interface ISearchDataService<TDataType extends IBaseDomainObject, TSearchParams, TResultType> {
	getList(params?: TSearchParams): Promise<TResultType>;
}

@Injectable()
export class DataService<TDataType extends IBaseDomainObject, TSearchParams> implements IDataService<TDataType, TSearchParams> {
	private behavior: IBaseDataServiceBehavior<TDataType>;
	private useDeepSearch: boolean;
	protected mockData: TDataType[];
	protected array: IArrayUtility;
	endpoint: string;
	url: string;
	useMock: boolean;
	logRequests: boolean;

	constructor(@Inject(httpToken) http: IHttpUtility
				, @Inject(arrayToken) array: IArrayUtility
				, options: IBaseResourceParams<TDataType>) {
		this.array = array;
		this.behavior = new BaseDataServiceBehavior(http, options.transform);
		this.useDeepSearch = options.useDeepSearch;
		this.mockData = options.mockData;
		this.endpoint = options.endpoint;
		this.url = this.endpoint;
		this.useMock = options.useMock;
		this.logRequests = options.logRequests;
	}

	private getItemEndpoint(id: number): string {
		return this.url + '/' + id.toString();
	}

	getList(params: TSearchParams): Promise<TDataType[]> {
		let requestParams: IGetListOptions<TDataType> = {
			params: params,
			endpoint: this.url,
			getMockData: (): TDataType[] => this.mockData,
			useMock: this.useMock,
			logRequests: this.logRequests,
		};

		if (this.useDeepSearch) {
			return this.behavior.search(requestParams);
		} else {
			return this.behavior.getList(requestParams);
		}
	}

	getDetail(id: number): Promise<TDataType> {
		return this.behavior.getItem({
			endpoint: this.getItemEndpoint(id),
			getMockData: (): TDataType => {
				return _.find(this.mockData, (item: TDataType): boolean => {
					return item.id === id;
				});
			},
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	create(domainObject: TDataType): Promise<TDataType> {
		return this.behavior.create({
			domainObject: domainObject,
			endpoint: this.url,
			addMockData: (data: TDataType): void => {
				let nextId: number = _.maxBy(this.mockData, 'id').id + 1;
				domainObject.id = nextId;
				this.mockData.push(domainObject);
			},
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	update(domainObject: TDataType): Promise<TDataType> {
		return this.behavior.update({
			domainObject: domainObject,
			endpoint: this.getItemEndpoint(domainObject.id),
			updateMockData: (data: TDataType): void => {
				let oldObject: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
					return item.id === data.id;
				});
				oldObject = <TDataType>_.assign(oldObject, data);
			},
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	delete(domainObject: TDataType): Promise<void> {
		return this.behavior.delete({
			domainObject: domainObject,
			endpoint: this.getItemEndpoint(domainObject.id),
			removeMockData: (data: TDataType): void => {
				this.array.remove(this.mockData, domainObject);
			},
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
	}

	version(versionNumber: number): DataService<TDataType, TSearchParams> {
		let dataService: DataService<TDataType, TSearchParams> = _.clone(this);
		dataService.url = helper.versionEndpoint(dataService.url, versionNumber);
		return dataService;
	}
}

export interface IDataServiceFactory {
	getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams>;
}

@Injectable()
export class DataServiceFactory {
	private http: IHttpUtility;
	private array: IArrayUtility;

	constructor( @Inject(httpToken) http: IHttpUtility, @Inject(arrayToken) array: IArrayUtility) {
		this.http = http;
		this.array = array;
	}

	getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams> {
		return new DataService(this.http, this.array, options);
	}
}

export const dataServiceToken: OpaqueToken = new OpaqueToken('A service for making http requests against a REST endpoint');

export const DATA_SERVICE_PROVIDER: Provider = new Provider(dataServiceToken, {
	useClass: DataServiceFactory,
});

export function DataServiceProvider(options: IBaseResourceParams<any>): Provider {
	return provide(dataServiceToken, {
		deps: [httpToken, arrayToken],
		useFactory: (http: IHttpUtility, array: IArrayUtility) => new DataService(http, array, options),
	});
}
