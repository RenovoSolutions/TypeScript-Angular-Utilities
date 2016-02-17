import { IObjectUtility } from '../object/object.service';
import { IStringUtilityService } from '../string/string.service';
import { ISerializableFilter } from '../../filters/filter';
export declare var moduleName: string;
export declare var factoryName: string;
export declare var filterName: string;
export interface IGenericSearchFilter extends ISerializableFilter {
    type: string;
    searchText: string;
    minSearchLength: number;
    caseSensitive: boolean;
    filter<TItemType>(item: TItemType): boolean;
    serialize(): string;
}
export declare class GenericSearchFilter implements IGenericSearchFilter {
    protected object: IObjectUtility;
    private string;
    type: string;
    searchText: string;
    minSearchLength: number;
    caseSensitive: boolean;
    constructor(object: IObjectUtility, string: IStringUtilityService);
    serialize(): string;
    filter<TItemType>(item: TItemType): boolean;
    private searchObject<TItemType>(item, search, caseSensitive);
}
export interface IGenericSearchFilterFactory {
    getInstance(): IGenericSearchFilter;
}
