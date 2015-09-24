import { IObjectUtility } from '../object/object.service';
import { IStringUtilityService } from '../string/string.service';
import { IFilter } from '../../filters/filter';
export declare var moduleName: string;
export declare var factoryName: string;
export declare var filterName: string;
export interface IGenericSearchFilter extends IFilter {
    type: string;
    searchText: string;
    caseSensitive: boolean;
    filter<TItemType>(item: TItemType): boolean;
}
export declare class GenericSearchFilter implements IGenericSearchFilter {
    private object;
    private string;
    type: string;
    searchText: string;
    caseSensitive: boolean;
    constructor(object: IObjectUtility, string: IStringUtilityService);
    filter<TItemType>(item: TItemType): boolean;
    private searchObject<TItemType>(item, search, caseSensitive);
}
export interface IGenericSearchFilterFactory {
    getInstance(): IGenericSearchFilter;
}
