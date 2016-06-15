import * as _ from 'lodash';
import { Inject, Optional, OpaqueToken, Provider, Injectable } from '@angular/core';

import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { errorHandlerToken, IErrorHandlerService } from '../errorHandler/errorHandler.service';

export const interceptorToken: OpaqueToken = new OpaqueToken('Custom interceptor for http requests');

export interface IHttpInterceptor {
	handleSuccess?: { (Response): any };
	handleError?: { (Response): Observable<any> };
}

export interface IHttpUtility {
	buildQueryString(params: any): URLSearchParams;

	get<TDataType>(endpoint: string, params?: any): Observable<TDataType>;
	post<TDataType>(endpoint: string, data: any): Observable<TDataType>;
	put<TDataType>(endpoint: string, data: any): Observable<TDataType>;
	delete(endpoint: string, params?: any): Observable<void>;
}

@Injectable()
export class HttpUtility implements IHttpUtility {
	private http: Http;
	private interceptor: IHttpInterceptor;

	constructor( @Inject(Http) http: Http
			, @Optional() @Inject(interceptorToken) interceptor: IHttpInterceptor) {
		this.http = http;
		this.interceptor = this.setDefaults(interceptor);
	}

	buildQueryString(params: any): URLSearchParams {
		const searchParams: URLSearchParams = new URLSearchParams();
		_.each(params, (param: any, key: string): void => {
			searchParams.set(key, param || '');
		});
		return searchParams;
	}

	get<TDataType>(endpoint: string, params?: any): Observable<TDataType> {
		return this.http.get(endpoint, { search: this.buildQueryString(params) })
			.catch(this.handleError.bind(this))
			.map(this.handleSuccess.bind(this))
			.map((response: Response): TDataType => response.json());
	}

	post<TDataType>(endpoint: string, data: any): Observable<TDataType> {
		const headers: Headers = new Headers({
			'Content-Type': 'application/json',
		});
		const options: RequestOptions = new RequestOptions({ headers });

		return this.http.post(endpoint, JSON.stringify(data), options)
			.catch(this.handleError.bind(this))
			.map(this.handleSuccess.bind(this))
			.map((response: Response) => response.json());
	}

	put<TDataType>(endpoint: string, data: any): Observable<TDataType> {
		const headers: Headers = new Headers({
			'Content-Type': 'application/json',
		});
		const options: RequestOptions = new RequestOptions({ headers });

		return this.http.put(endpoint, JSON.stringify(data), options)
			.catch(this.handleError.bind(this))
			.map(this.handleSuccess.bind(this))
			.map((response: Response) => response.json());
	}

	delete(endpoint: string, params?: any): Observable<void> {
		return this.http.delete(endpoint, { search: this.buildQueryString(params) })
			.catch(this.handleError.bind(this))
			.map(this.handleSuccess.bind(this))
			.map(() => null);
	}

	private handleError(response: Response): Observable<any> {
		if (this.interceptor) {
			return this.interceptor.handleError(response);
		}
		return Observable.throw(response);
	}

	private handleSuccess(response: Response): any {
		if (this.interceptor) {
			return this.interceptor.handleSuccess(response);
		}
		return response;
	}

	private setDefaults(interceptor: IHttpInterceptor): IHttpInterceptor {
		if (!interceptor) {
			return null;
		}

		interceptor.handleError = interceptor.handleError || (response => Observable.throw(response));
		interceptor.handleSuccess = interceptor.handleSuccess || (response => response);
		return interceptor;
	}
}

export const httpToken: OpaqueToken = new OpaqueToken('Wrapper for http client');

export const HTTP_PROVIDER: Provider = new Provider(httpToken, {
	useClass: HttpUtility,
});
