import * as ng from 'angular';

import { IConverter } from '../baseDataServiceBehavior';
import { ISingletonDataService, SingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IDataService, DataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IDataServiceView } from '../baseDataService/baseDataServiceView';
import { IParentSingletonResourceParams } from '../baseResourceBuilder/baseResourceBuilder.service';

export interface IParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends ISingletonDataService<TDataType>{
	childContracts(): TResourceDictionaryType;
}

export interface IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType> extends IParentSingletonResourceParams<TDataType, TResourceDictionaryType> {
	parentId?: number;
}

// deprecated - use IParentSingletonDataService
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IParentSingletonDataService<TDataType, TResourceDictionaryType> { }

export class ParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {

	private resourceDictionaryBuilder: { (): TResourceDictionaryType };
	private parentId: number;

	constructor($http: ng.IHttpService, $q: ng.IQService, options: IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType>) {
		super($http, $q, options);
		this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
		this.parentId = options.parentId;
	}

	childContracts(): TResourceDictionaryType {
		let dictionary: {[index: string]: any} = this.resourceDictionaryBuilder();
		return <any>_.mapValues(dictionary, (dataService: IDataServiceView<TDataType, any>): ISingletonDataService<TDataType> | IDataService<TDataType, any> => {
			let contract: any;
			if (_.isFunction(dataService.AsSingleton)) {
				contract = dataService.AsSingleton(this.parentId);
			} else {
				contract = dataService;
			}

			contract.endpoint = this.endpoint + contract.endpoint;

			return contract;
		});
	}
}
