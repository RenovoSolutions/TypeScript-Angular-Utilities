import * as ng from 'angular';

import { IConverter } from '../baseDataServiceBehavior';
import { ISingletonDataService, SingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IDataService, DataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IDataServiceView } from '../baseDataService/baseDataServiceView';

export interface IParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends ISingletonDataService<TDataType>{
	childContracts(): TResourceDictionaryType;
}

// deprecated - use IParentSingletonDataService
export interface IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> extends IParentSingletonDataService<TDataType, TResourceDictionaryType> { }

export class ParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {
	constructor($http: ng.IHttpService, $q: ng.IQService, endpoint: string, mockData: TDataType
		, private resourceDictionaryBuilder: { (): TResourceDictionaryType }
		, transform?: IConverter<TDataType> | { [index: string]: IConverter<any> }
		, useMock?: boolean
		, logRequests?: boolean
		, private parentId?: number) {
		super($http, $q, endpoint, mockData, transform, useMock, logRequests);
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
