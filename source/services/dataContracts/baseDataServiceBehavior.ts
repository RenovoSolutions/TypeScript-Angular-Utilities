import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { IHttpUtility } from 'rl-http';

import { IConverter, converterService } from './converters/converters';

export interface IRequestOptions {
	endpoint: string;
	useMock: boolean;
	logRequests: boolean;
}

export interface IGetListOptions<TDataType> extends IRequestOptions {
	params: any;
	getMockData(): TDataType[];
}

export interface IGetItemOptions<TDataType> extends IRequestOptions {
	getMockData(): TDataType;
}

export interface ICreateOptions<TDataType> extends IRequestOptions {
	domainObject: TDataType;
	addMockData(data: TDataType): void;
}

export interface IUpdateOptions<TDataType> extends IRequestOptions {
	domainObject: TDataType;
	updateMockData(data: TDataType): void;
}

export interface IDeleteOptions<TDataType> extends IRequestOptions {
	domainObject: TDataType;
	removeMockData(data: TDataType): void;
}

export interface ISearchResult<TDataType> {
	dataSet: TDataType[];
}

export interface IBaseDataServiceBehavior<TDataType> {
	getList(options: IGetListOptions<TDataType>): Observable<TDataType[]>;
	search<TResultType>(options: IGetListOptions<TDataType>): Observable<TResultType>;
	getItem(options: IGetItemOptions<TDataType>): Observable<TDataType>;
	create(options: ICreateOptions<TDataType>): Observable<TDataType>;
	update(options: IUpdateOptions<TDataType>): Observable<TDataType>;
	delete(options: IDeleteOptions<TDataType>): Observable<void>;
}

export class BaseDataServiceBehavior<TDataType> implements IBaseDataServiceBehavior<TDataType> {
	private http: IHttpUtility;
	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(http: IHttpUtility, transform: IConverter<TDataType> | { [index: string]: IConverter<any> }) {
		this.http = http;
		this.transform = transform;
	}

	getList(options: IGetListOptions<TDataType>): Observable<TDataType[]> {
		let request: Observable<TDataType[]>;
		if (options.useMock) {
			request = Observable.of(options.getMockData());
		} else {
			request = this.http.get<TDataType[]>(options.endpoint, options.params);
		}
		return request.map((data: TDataType[]): TDataType[] => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('getList', options.params, data, options.endpoint, options.useMock);
			}
			return data;
		}).cache();
	}

	search<TResultType extends ISearchResult<TDataType>>(options: IGetListOptions<TDataType>): Observable<TResultType> {
		let request: Observable<TResultType>;
		if (options.useMock) {
			request = Observable.of<TResultType>(<any>{
				dataSet: options.getMockData(),
			});
		} else {
			request = this.http.post<TResultType>(options.endpoint, options.params);
		}
		return request.map((result: TResultType): TResultType => {
			result.dataSet = converterService.applyTransform(result.dataSet, this.transform, false);
			if (options.logRequests) {
				this.log('search', options.params, result, options.endpoint, options.useMock);
			}
			return result;
		}).cache();
	}

	getItem(options: IGetItemOptions<TDataType>): Observable<TDataType> {
		let promise: Observable<TDataType>;
		if (options.useMock) {
			promise = Observable.of(options.getMockData());
		} else {
			promise = this.http.get<TDataType>(options.endpoint);
		}
		return promise.map((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('get', null, data, options.endpoint, options.useMock);
			}
			return data;
		}).cache();
	}

	create(options: ICreateOptions<TDataType>): Observable<TDataType> {
		let promise: Observable<TDataType>;
		options.domainObject = converterService.applyTransform(options.domainObject, this.transform, true);
		if (options.useMock) {
			options.addMockData(options.domainObject);
			promise = Observable.of(options.domainObject);
		} else {
			promise = this.http.post<TDataType>(options.endpoint, options.domainObject);
		}
		return promise.map((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('create', options.domainObject, data, options.endpoint, options.useMock);
			}
			return data;
		}).cache();
	}

	update(options: IUpdateOptions<TDataType>): Observable<TDataType> {
		let promise: Observable<TDataType>;
		options.domainObject = converterService.applyTransform(options.domainObject, this.transform, true);
		if (options.useMock) {
			options.updateMockData(options.domainObject)
			promise = Observable.of(options.domainObject);
		} else {
			promise = this.http.put<TDataType>(options.endpoint, options.domainObject);
		}
		return promise.map((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('update', options.domainObject, data, options.endpoint, options.useMock);
			}
			return data;
		}).cache();
	}

	delete(options: IDeleteOptions<TDataType>): Observable<void> {
		let promise: Observable<void>;
		if (options.useMock) {
			options.removeMockData(options.domainObject);
			promise = Observable.empty<void>();
		} else {
			promise = this.http.delete(options.endpoint);
		}
		return promise.map((): void => {
			if (options.logRequests) {
				this.log('delete', options.domainObject, null, options.endpoint, options.useMock);
			}
		}).cache();
	}

	private log(requestName: string, params: any, data: any, endpoint: string, useMock: boolean): void {
		let mockString = useMock ? 'Mocked ' : '';
		let endpointString = endpoint == null ? 'unspecified' : endpoint;
		console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');

		if (params != null) {
			console.log('params:');
			console.log(params);
		}

		if (data != null) {
			console.log('data:');
			console.log(data);
		}
	}
}
