import * as ng from 'angular';

import { ITransform } from '../baseDataServiceBehavior';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseDataService, BaseDataService, IBaseDomainObject } from '../baseDataService/baseData.service';
import { IBaseDataServiceView } from '../baseDataService/baseDataServiceView';

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
		let dictionary: {[index: string]: any} = this.resourceDictionaryBuilder();
		return <any>_.mapValues(dictionary, (dataService: IBaseDataServiceView<TDataType, any>): IBaseSingletonDataService<TDataType> | IBaseDataService<TDataType, any> => {
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
