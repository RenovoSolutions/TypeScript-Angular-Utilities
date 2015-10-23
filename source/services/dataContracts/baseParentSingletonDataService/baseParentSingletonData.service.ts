import * as ng from 'angular';

import { ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends IBaseSingletonDataService<TDataType>{
	childContracts(): TResourceDictionaryType;
}

export class BaseParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends BaseSingletonDataService<TDataType> implements IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
	constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType
		, private resourceDictionaryBuilder: { (baseEndpoint: string): TResourceDictionaryType }
		, transform?: ITransformFunction<TDataType>
		, useMock?: boolean
		, logRequests?: boolean) {
		super($http, $q, endpoint, mockData, transform, useMock, logRequests);
	}

	childContracts(): TResourceDictionaryType {
		return this.resourceDictionaryBuilder(this.endpoint);
	}
}
