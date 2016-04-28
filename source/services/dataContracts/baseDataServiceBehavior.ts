import * as _ from 'lodash';

import { IHttpUtility } from '../http/http.service';
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
	getList(options: IGetListOptions<TDataType>): Promise<TDataType[]>;
	search<TResultType>(options: IGetListOptions<TDataType>): Promise<TResultType>;
	getItem(options: IGetItemOptions<TDataType>): Promise<TDataType>;
	create(options: ICreateOptions<TDataType>): Promise<TDataType>;
	update(options: IUpdateOptions<TDataType>): Promise<TDataType>;
	delete(options: IDeleteOptions<TDataType>): Promise<void>;
}

export class BaseDataServiceBehavior<TDataType> implements IBaseDataServiceBehavior<TDataType> {
	private http: IHttpUtility;
	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(http: IHttpUtility, transform: IConverter<TDataType> | { [index: string]: IConverter<any> }) {
		this.http = http;
		this.transform = transform;
	}

	getList(options: IGetListOptions<TDataType>): Promise<TDataType[]> {
		let promise: Promise<TDataType[]>;
		if (options.useMock) {
			promise = Promise.resolve(options.getMockData());
		} else {
			promise = this.http.get(options.endpoint, options.params)
				.toPromise();
		}
		return promise.then((data: TDataType[]): TDataType[] => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('getList', options.params, data, options.endpoint, options.useMock);
			}
			return data;
		});
	}

	search<TResultType extends ISearchResult<TDataType>>(options: IGetListOptions<TDataType>): Promise<TResultType> {
		let promise: Promise<TResultType>;
		if (options.useMock) {
			promise = Promise.resolve({
				dataSet: options.getMockData(),
			});
		} else {
			promise = this.http.post(options.endpoint, options.params)
				.toPromise();
		}
		return promise.then((result: TResultType): TResultType => {
			result.dataSet = converterService.applyTransform(result.dataSet, this.transform, false);
			if (options.logRequests) {
				this.log('search', options.params, result, options.endpoint, options.useMock);
			}
			return result;
		})
	}

	getItem(options: IGetItemOptions<TDataType>): Promise<TDataType> {
		let promise: Promise<TDataType>;
		if (options.useMock) {
			promise = Promise.resolve(options.getMockData());
		} else {
			promise = this.http.get(options.endpoint)
				.toPromise();
		}
		return promise.then((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('get', null, data, options.endpoint, options.useMock);
			}
			return data;
		});
	}

	create(options: ICreateOptions<TDataType>): Promise<TDataType> {
		let promise: Promise<TDataType>;
		options.domainObject = converterService.applyTransform(options.domainObject, this.transform, true);
		if (options.useMock) {
			options.addMockData(options.domainObject);
			promise = Promise.resolve(options.domainObject);
		} else {
			promise = this.http.post(options.endpoint, options.domainObject)
				.toPromise();
		}
		return promise.then((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('create', options.domainObject, data, options.endpoint, options.useMock);
			}
			return data;
		});
	}

	update(options: IUpdateOptions<TDataType>): Promise<TDataType> {
		let promise: Promise<TDataType>;
		options.domainObject = converterService.applyTransform(options.domainObject, this.transform, true);
		if (options.useMock) {
			options.updateMockData(options.domainObject)
			promise = Promise.resolve(options.domainObject);
		} else {
			promise = this.http.put(options.endpoint, options.domainObject)
				.toPromise();
		}
		return promise.then((data: TDataType): TDataType => {
			data = converterService.applyTransform(data, this.transform, false);
			if (options.logRequests) {
				this.log('update', options.domainObject, data, options.endpoint, options.useMock);
			}
			return data;
		});
	}

	delete(options: IDeleteOptions<TDataType>): Promise<void> {
		let promise: Promise<void>;
		if (options.useMock) {
			options.removeMockData(options.domainObject);
			promise = Promise.resolve();
		} else {
			promise = this.http.delete(options.endpoint)
				.toPromise();
		}
		return promise.then((): void => {
			if (options.logRequests) {
				this.log('delete', options.domainObject, null, options.endpoint, options.useMock);
			}
		});
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
