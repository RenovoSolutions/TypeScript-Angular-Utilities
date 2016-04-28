import { IHttpUtility } from '../http/http.service';
import { IConverter } from './converters/converters';
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
export declare class BaseDataServiceBehavior<TDataType> implements IBaseDataServiceBehavior<TDataType> {
    private http;
    private transform;
    constructor(http: IHttpUtility, transform: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    });
    getList(options: IGetListOptions<TDataType>): Promise<TDataType[]>;
    search<TResultType extends ISearchResult<TDataType>>(options: IGetListOptions<TDataType>): Promise<TResultType>;
    getItem(options: IGetItemOptions<TDataType>): Promise<TDataType>;
    create(options: ICreateOptions<TDataType>): Promise<TDataType>;
    update(options: IUpdateOptions<TDataType>): Promise<TDataType>;
    delete(options: IDeleteOptions<TDataType>): Promise<void>;
    private log(requestName, params, data, endpoint, useMock);
}
