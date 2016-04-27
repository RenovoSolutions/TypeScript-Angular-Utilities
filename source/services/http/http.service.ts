import { OpaqueToken, Provider, Injectable } from 'angular2/core';

import { Http, URLSearchParams, Response, RequestOptions, Headers } from 'angular2/http';
import { Observable } from 'rxjs';

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

	constructor(http: Http) {
		this.http = http;
	}

	buildQueryString(params: any): URLSearchParams {
		const searchParams: URLSearchParams = new URLSearchParams();
		_.each(params, (param: any, key: string): void => {
			searchParams.set(key, param);
		});
		return searchParams;
	}

	get<TDataType>(endpoint: string, params?: any): Observable<TDataType> {
		return this.http.get(endpoint, { search: this.buildQueryString(params) })
			.map((response: Response): TDataType => response.json());
	}

	post<TDataType>(endpoint: string, data: any): Observable<TDataType> {
		const headers: Headers = new Headers({
			'Content-Type': 'application/json',
		});
		const options: RequestOptions = new RequestOptions({ headers });

		return this.http.post(endpoint, JSON.stringify(data), options)
			.map((response: Response) => response.json());
	}

	put<TDataType>(endpoint: string, data: any): Observable<TDataType> {
		const headers: Headers = new Headers({
			'Content-Type': 'application/json',
		});
		const options: RequestOptions = new RequestOptions({ headers });

		return this.http.put(endpoint, JSON.stringify(data), options)
			.map((response: Response) => response.json());
	}

	delete(endpoint: string, params?: any): Observable<void> {
		return this.http.delete(endpoint, { search: this.buildQueryString(params) })
			.map(() => null);
	}
}

export const httpToken: OpaqueToken = new OpaqueToken('Wrapper for http client');

export const HTTP_PROVIDER: Provider = new Provider(httpToken, {
	useClass: HttpUtility,
});
