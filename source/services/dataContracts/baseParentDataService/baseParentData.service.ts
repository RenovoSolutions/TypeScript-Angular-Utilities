import * as ng from 'angular';
import * as _ from 'lodash';

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
		, public resourceDictionaryBuilder: { (baseEndpoint: string): TResourceDictionaryType }
		, transform?: ITransformFunction<TDataType>
		, useMock?: boolean
        , logRequests?: boolean) {
		super($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	}

	childContracts(id?: number): TResourceDictionaryType {
		if (_.isUndefined(id)) {
			let dictionary: TResourceDictionaryType = this.resourceDictionaryBuilder(this.endpoint);
			_.each(dictionary, (dataService: any): void => {
				dataService.endpoint = this.endpoint + dataService.endpoint;
			});
		} else {
			let dictionary: {[index: string]: any} = this.resourceDictionaryBuilder(this.endpoint + '/' + id);
			return <any>_.mapValues(dictionary, (dataService: IBaseDataServiceView<TDataType, TSearchParams>): IBaseSingletonDataService<TDataType> | IBaseDataService<TDataType, TSearchParams> => {
				let contract: any;
				if (_.isFunction(dataService.AsSingleton)) {
					contract = dataService.AsSingleton(id);
				} else {
					contract = dataService;
				}

				contract.endpoint = this.endpoint + '/' + id + contract.endpoint;

				return contract;
			});
		}
	}
}
