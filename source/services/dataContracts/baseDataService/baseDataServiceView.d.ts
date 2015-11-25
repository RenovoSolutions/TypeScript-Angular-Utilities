import { IBaseDataService, IBaseDomainObject } from './baseData.service';
import { IBaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
export interface IBaseDataServiceView<TDataType extends IBaseDomainObject, TSearchParams> extends IBaseDataService<TDataType, TSearchParams> {
    AsSingleton(parentId: number): IBaseSingletonDataService<TDataType>;
}
