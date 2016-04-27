import { IHttpUtility } from '../../../http/http.service';
import { ISingletonDataService, SingletonDataService } from '../../singletonDataService/singletonData.service';
import { IDataService } from '../../dataService/data.service';
import { IDataServiceView } from '../../dataService/view/dataServiceView';
import { IParentSingletonResourceParams } from '../../resourceBuilder/resourceBuilder.service';

export interface IParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends ISingletonDataService<TDataType>{
	childContracts(): TResourceDictionaryType;
}

export interface IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType> extends IParentSingletonResourceParams<TDataType, TResourceDictionaryType> {
	parentId?: number;
}

export class ParentSingletonDataService<TDataType, TResourceDictionaryType>
	extends SingletonDataService<TDataType> implements IParentSingletonDataService<TDataType, TResourceDictionaryType> {

	private resourceDictionaryBuilder: { (): TResourceDictionaryType };
	private parentId: number;

	constructor(http: IHttpUtility, options: IParentSingletonFromViewResourceParams<TDataType, TResourceDictionaryType>) {
		super(http, options);
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

			contract.url = this.url + contract.endpoint;

			return contract;
		});
	}
}
