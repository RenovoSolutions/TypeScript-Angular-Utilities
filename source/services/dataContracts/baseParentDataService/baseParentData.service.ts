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
	private _childContracts: TResourceDictionaryType;

	constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[]
		, private resourceDictionaryBuilder: { (): TResourceDictionaryType }
		, transform?: ITransformFunction<TDataType>
		, useMock?: boolean
        , logRequests?: boolean) {
		super($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
		this._childContracts = this.resourceDictionaryBuilder();
	}

	childContracts(id?: number): TResourceDictionaryType {
		if (_.isUndefined(id)) {
			return <any>_.mapValues(this._childContracts, (dataService: any): IBaseDataService<TDataType, TSearchParams> => {
				let contract: any = dataService.clone();
				contract.endpoint = this.endpoint + contract.endpoint;
				return contract;
			});
		} else {
			let dictionary: {[index: string]: any} = this._childContracts;
			return <any>_.mapValues(dictionary, (dataService: IBaseDataServiceView<TDataType, TSearchParams>): IBaseSingletonDataService<TDataType> | IBaseDataService<TDataType, TSearchParams> => {
				let contract: any = dataService;

				if (_.isFunction(contract.AsSingleton)) {
					contract = contract.AsSingleton(id);
				} else {
					contract = contract.clone();
				}
				contract.endpoint = this.endpoint + '/' + id + contract.endpoint;
				return contract;
			});
		}
	}
}
