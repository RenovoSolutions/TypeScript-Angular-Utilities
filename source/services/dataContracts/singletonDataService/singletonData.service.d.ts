import { OpaqueToken, Provider } from '@angular/core';
import { IHttpUtility } from '../../http/http.service';
import { ISingletonResourceParams } from '../resourceBuilder/resourceBuilder.service';
export interface ISingletonDataService<TDataType> {
    get(): Promise<TDataType>;
    update(domainObject: TDataType): Promise<TDataType>;
    version(versionNumber: number): SingletonDataService<TDataType>;
    useMock: boolean;
    logRequests: boolean;
}
export declare class SingletonDataService<TDataType> implements ISingletonDataService<TDataType> {
    private behavior;
    private mockData;
    endpoint: string;
    url: string;
    useMock: boolean;
    logRequests: boolean;
    constructor(http: IHttpUtility, options: ISingletonResourceParams<TDataType>);
    get(): Promise<TDataType>;
    update(domainObject: TDataType): Promise<TDataType>;
    version(versionNumber: number): SingletonDataService<TDataType>;
}
export interface ISingletonDataServiceFactory {
    getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}
export declare class SingletonDataServiceFactory {
    private http;
    constructor(http: IHttpUtility);
    getInstance<TDataType>(options: ISingletonResourceParams<TDataType>): ISingletonDataService<TDataType>;
}
export declare const singletonDataServiceToken: OpaqueToken;
export declare const SINGLETON_DATA_SERVICE_PROVIDER: Provider;
export declare function SingletonDataServiceProvider(options: ISingletonResourceParams<any>): Provider;
