import { IArrayUtility } from '../../../array/array.service';
import { IHttpUtility } from '../../../http/http.service';

import { IConverter } from '../../converters/converters';
import { IDataService, DataService, IBaseDomainObject } from '../data.service';
import { IParentDataService, ParentDataService } from '../parent/parentData.service';
import { ISingletonDataService, SingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentSingletonDataService, ParentSingletonDataService } from '../../singletonDataService/parent/parentSingletonData.service';
import { IBaseResourceParams, IParentResourceParams } from '../../resourceBuilder/resourceBuilder.service';

import * as _ from 'lodash';

export interface IDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IDataService<TDataType, TSearchParams> {
	AsSingleton(parentId: number): ISingletonDataService<TDataType>;
}

export interface IParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
	AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType>;
}

export class DataServiceView<TDataType extends IBaseDomainObject, TSearchParams>
	extends DataService<TDataType, TSearchParams>
	implements IDataServiceView<TDataType, TSearchParams> {

	private http: IHttpUtility;
	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(http: IHttpUtility
			, array: IArrayUtility
			, options: IBaseResourceParams<TDataType>) {
		super(http, array, options);
		this.http = http;
		this.transform = options.transform;
	}

	AsSingleton(parentId: number): ISingletonDataService<TDataType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		let singleton: SingletonDataService<TDataType> = new SingletonDataService<TDataType>(this.http, {
			endpoint: this.endpoint,
			mockData: mockData,
			transform: this.transform,
			useMock: this.useMock,
			logRequests: this.logRequests,
		});
		singleton.url = this.url;
		return singleton;
	}
}

export class ParentDataServiceView<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends ParentDataService<TDataType, TSearchParams, TResourceDictionaryType>
	implements IParentDataServiceView<TDataType, TSearchParams, TResourceDictionaryType> {

	private http: IHttpUtility;
	private transform: IConverter<TDataType> | { [index: string]: IConverter<any> };

	constructor(http: IHttpUtility
		, array: IArrayUtility
		, options: IParentResourceParams<TDataType, TResourceDictionaryType>) {
		super(http, array, options);
		this.http = http;
	}

	AsSingleton(parentId: number): IParentSingletonDataService<TDataType, TResourceDictionaryType> {
		let mockData: TDataType = _.find(this.mockData, (item: TDataType): boolean => {
			return item.id === parentId;
		});
		let singleton: ParentSingletonDataService<TDataType, TResourceDictionaryType> = new ParentSingletonDataService<TDataType, TResourceDictionaryType>(this.http, {
			endpoint: this.endpoint,
			mockData: mockData,
			resourceDictionaryBuilder: this.resourceDictionaryBuilder,
			transform: this.transform,
			useMock: this.useMock,
			logRequests: this.logRequests,
			parentId: parentId,
		});
		singleton.url = this.url;
		return singleton;
	}
}
