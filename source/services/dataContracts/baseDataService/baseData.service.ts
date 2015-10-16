import * as ng from 'angular';

export interface IBaseDomainObject {
    id: number;
}

export interface IBaseDataService<TDataType extends IBaseDomainObject, TSearchParams> {
	getList(params?: TSearchParams): ng.IPromise<TDataType[]>;
    getDetail(id: number): ng.IPromise<TDataType>;
    post(domainObject: TDataType): ng.IPromise<TDataType>;
    put(domainObject: TDataType): ng.IPromise<void>;
    delete(id: number): ng.IPromise<void>;
}