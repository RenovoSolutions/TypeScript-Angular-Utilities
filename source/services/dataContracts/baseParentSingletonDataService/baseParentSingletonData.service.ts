import * as ng from 'angular';

import { ITransform } from '../baseDataServiceBehavior';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends IBaseSingletonDataService<TDataType>{
	childContracts(): TResourceDictionaryType;
}

export class BaseParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends BaseSingletonDataService<TDataType> implements IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
	constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType
		, private resourceDictionaryBuilder: { (): TResourceDictionaryType }
		, transform?: ITransform<TDataType>
		, useMock?: boolean
		, logRequests?: boolean
		, private parentId?: number) {
		super($http, $q, endpoint, mockData, transform, useMock, logRequests);
	}

	childContracts(): TResourceDictionaryType {
		return this.resourceDictionaryBuilder(this.endpoint);
	}
}
