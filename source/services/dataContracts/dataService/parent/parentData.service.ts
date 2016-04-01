import * as ng from 'angular';
import * as _ from 'lodash';

import { IArrayUtility } from '../../../array/array.service';

import { IDataService, DataService, IBaseDomainObject } from '../data.service';
import { IDataServiceView } from '../view/dataServiceView';
import { ISingletonDataService } from '../../singletonDataService/singletonData.service';
import { IParentResourceParams } from '../../resourceBuilder/resourceBuilder.service';

export interface IParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends IDataService<TDataType, TSearchParams>{
	childContracts(id?: number): TResourceDictionaryType;
}

// deprecated - use IParentDataService
export interface IBaseParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType> extends IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> { }

export class ParentDataService<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
	extends DataService<TDataType, TSearchParams> implements IParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {

	resourceDictionaryBuilder: { (): TResourceDictionaryType };

	constructor($http: ng.IHttpService
			, $q: ng.IQService
			, array: IArrayUtility
			, options: IParentResourceParams<TDataType, TResourceDictionaryType>) {
		super($http, $q, array, options);
		this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
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
