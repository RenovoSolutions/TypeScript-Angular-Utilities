import { OpaqueToken, Provider } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs';
export interface IHttpUtility {
    buildQueryString(params: any): URLSearchParams;
    get<TDataType>(endpoint: string, params?: any): Observable<TDataType>;
    post<TDataType>(endpoint: string, data: any): Observable<TDataType>;
    put<TDataType>(endpoint: string, data: any): Observable<TDataType>;
    delete(endpoint: string, params?: any): Observable<void>;
}
export declare class HttpUtility implements IHttpUtility {
    private http;
    constructor(http: Http);
    buildQueryString(params: any): URLSearchParams;
    get<TDataType>(endpoint: string, params?: any): Observable<TDataType>;
    post<TDataType>(endpoint: string, data: any): Observable<TDataType>;
    put<TDataType>(endpoint: string, data: any): Observable<TDataType>;
    delete(endpoint: string, params?: any): Observable<void>;
}
export declare const httpToken: OpaqueToken;
export declare const HTTP_PROVIDER: Provider;
