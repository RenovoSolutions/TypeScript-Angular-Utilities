import { Injectable, FactoryProvider } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { IHttpUtility, HttpUtility } from 'rl-http';

import { IArrayUtility, ArrayUtility } from '../../array/array.service';
import { IBaseDataServiceBehavior, BaseDataServiceBehavior, IGetListOptions } from '../baseDataServiceBehavior';
import { IBaseResourceParams } from '../resourceBuilder/resourceBuilder.service';
import { helper } from '../dataContractsHelper/dataContractsHelper.service';

export interface IBaseDomainObject {
	id?: number;
}

export interface IDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): Observable<TDataType[]>;
	getDetail(id: number): Observable<TDataType>;
	create(domainObject: TDataType): Observable<TDataType>;
	update(domainObject: TDataType): Observable<TDataType>;
	delete(domainObject: TDataType): Observable<void>;
	version(versionNumber: number): DataService<TDataType, TSearchParams>;

	useMock: boolean;
	logRequests: boolean;
}

export interface ISearchDataService<TDataType extends IBaseDomainObject, TSearchParams, TResultType> {
	getList(params?: TSearchParams): Observable<TResultType>;
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

	constructor(http: HttpUtility
				, array: ArrayUtility
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

	getList(params: TSearchParams): Observable<TDataType[]> {
		let requestParams: IGetListOptions<TDataType> = {
			params: params,
			endpoint: this.url,
			getMockData: (): TDataType[] => this.mockData,
			useMock: this.useMock,
			logRequests: this.logRequests,
		};

		if (this.useDeepSearch) {
			return this.behavior.search<TDataType[]>(requestParams);
		} else {
			return this.behavior.getList(requestParams);
		}
	}

	getDetail(id: number): Observable<TDataType> {
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

	create(domainObject: TDataType): Observable<TDataType> {
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

	update(domainObject: TDataType): Observable<TDataType> {
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

	delete(domainObject: TDataType): Observable<void> {
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

	constructor(http: HttpUtility, array: ArrayUtility) {
		this.http = http;
		this.array = array;
	}

	getInstance<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IDataService<TDataType, TSearchParams> {
		return new DataService(<HttpUtility>this.http, this.array, options);
	}
}

export function DataServiceProvider(options: IBaseResourceParams<any>): FactoryProvider {
	return {
		provide: DataService,
		deps: [HttpUtility, ArrayUtility],
		useFactory: (http: HttpUtility, array: ArrayUtility) => new DataService(http, array, options),
	};
}
