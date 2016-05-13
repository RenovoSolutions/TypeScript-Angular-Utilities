import { OpaqueToken, Provider } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
