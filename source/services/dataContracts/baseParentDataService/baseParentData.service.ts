import * as ng from 'angular';
import * as _ from 'lodash';

import { IArrayUtility } from '../../array/array.service';

import { IConverter } from '../baseDataServiceBehavior';
import { IDataService, DataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IDataServiceView } from '../baseDataService/baseDataServiceView';
import { ISingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';

export interface IParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IDataService<TDataType, TSearchParams>{
	childContracts(id?: number): TResourceDictionaryType;
}

// deprecated - use IParentDataService
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> { }

export class ParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends DataService<TDataType, TSearchParams> implements IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
	constructor($http: ng.IHttpService, $q: ng.IQService, array: IArrayUtility, endpoint: string, mockData: TDataType[]
		, public resourceDictionaryBuilder: { (): TResourceDictionaryType }
		, transform?: IConverter<TDataType> | { [index: string]: IConverter<any> }
		, useMock?: boolean
        , logRequests?: boolean) {
		super($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	}

	childContracts(id?: number): TResourceDictionaryType {
		if (_.isUndefined(id)) {
			let dictionary: TResourceDictionaryType = this.resourceDictionaryBuilder();
			_.each(dictionary, (dataService: any): void => {
				dataService.endpoint = this.endpoint + dataService.endpoint;
			});
			return dictionary;
		} else {
			let dictionary: {[index: string]: any} = this.resourceDictionaryBuilder();
			return <any>_.mapValues(dictionary, (dataService: IDataServiceView<TDataType, TSearchParams>): ISingletonDataService<TDataType> | IDataService<TDataType, TSearchParams> => {
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
