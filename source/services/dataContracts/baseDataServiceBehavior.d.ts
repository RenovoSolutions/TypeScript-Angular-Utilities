import * as angular from 'angular';
export interface IConverter<TDataType> {
    fromServer(raw: any): TDataType;
    toServer(data: TDataType): any;
}
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
    getList(options: IGetListOptions<TDataType>): angular.IPromise<TDataType[]>;
    search<TResultType>(options: IGetListOptions<TDataType>): angular.IPromise<TResultType>;
    getItem(options: IGetItemOptions<TDataType>): angular.IPromise<TDataType>;
    create(options: ICreateOptions<TDataType>): angular.IPromise<TDataType>;
    update(options: IUpdateOptions<TDataType>): angular.IPromise<TDataType>;
    delete(options: IDeleteOptions<TDataType>): angular.IPromise<void>;
}
export declare class BaseDataServiceBehavior<TDataType> implements IBaseDataServiceBehavior<TDataType> {
    private $http;
    private $q;
    private transform;
    constructor($http: angular.IHttpService, $q: angular.IQService, transform: IConverter<TDataType> | {
        [index: string]: IConverter<any>;
    });
    getList(options: IGetListOptions<TDataType>): angular.IPromise<TDataType[]>;
    search<TResultType extends ISearchResult<TDataType>>(options: IGetListOptions<TDataType>): angular.IPromise<TResultType>;
    getItem(options: IGetItemOptions<TDataType>): angular.IPromise<TDataType>;
    create(options: ICreateOptions<TDataType>): angular.IPromise<TDataType>;
    update(options: IUpdateOptions<TDataType>): angular.IPromise<TDataType>;
    delete(options: IDeleteOptions<TDataType>): angular.IPromise<void>;
    private log(requestName, params, data, endpoint, useMock);
    applyTransform(data: any, transform: IConverter<any> | {
        [index: string]: IConverter<any>;
    }, toServer: boolean): any;
    private isConverter(object);
}
