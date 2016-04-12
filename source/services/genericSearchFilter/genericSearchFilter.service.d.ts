import { IObjectUtility } from '../object/object.service';
import { IStringUtilityService } from '../string/string.service';
import { ISerializableFilter, SerializableFilter } from '../../filters/filter';
export declare var moduleName: string;
export declare var factoryName: string;
export declare var filterName: string;
export interface IGenericSearchFilter extends ISerializableFilter<string> {
    type: string;
    searchText: string;
    minSearchLength: number;
    caseSensitive: boolean;
    filter<TItemType>(item: TItemType): boolean;
}
export declare class GenericSearchFilter extends SerializableFilter<string> implements IGenericSearchFilter {
    protected object: IObjectUtility;
    private string;
    private tokenized;
    type: string;
    minSearchLength: number;
    caseSensitive: boolean;
    private _searchText;
    constructor(object: IObjectUtility, string: IStringUtilityService, tokenized: boolean);
    searchText: string;
    serialize(): string;
    filter<TItemType>(item: TItemType): boolean;
}
export interface IGenericSearchFilterFactory {
    getInstance(tokenized?: boolean): IGenericSearchFilter;
}
