import * as ng from 'angular';

import { IArrayUtility } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseDataServiceView } from '../baseDataService/baseDataServiceView';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IBaseDataService<TDataType, TSearchParams>{
	childContracts(id?: number): TResourceDictionaryType;
}

export class BaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends BaseDataService<TDataType, TSearchParams> implements IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
	constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[]
		, private resourceDictionaryBuilder: { (baseEndpoint: string): TResourceDictionaryType }
		, transform?: ITransformFunction<TDataType>
		, useMock?: boolean
        , logRequests?: boolean) {
		super($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	}

	childContracts(id?: number): TResourceDictionaryType {
		if (_.isUndefined(id)) {
			return this.resourceDictionaryBuilder(this.endpoint);
		} else {
			let dictionary: {[index: string]: any} = this.resourceDictionaryBuilder(this.endpoint + '/' + id);
			return <any>_.mapValues(dictionary, (dataService: IBaseDataServiceView<TDataType, TSearchParams>): IBaseSingletonDataService<TDataType> | IBaseDataService<TDataType, TSearchParams> => {
				if (_.isFunction(dataService.AsSingleton)) {
					return dataService.AsSingleton(id);
				}
				return dataService;
			});
		}
	}
}
