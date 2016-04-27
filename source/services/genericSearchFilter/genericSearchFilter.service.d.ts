import { Provider, OpaqueToken } from 'angular2/core';
import { IObjectUtility } from '../object/object.service';
import { IStringUtilityService } from '../string/string.service';
import { ISerializableFilter, SerializableFilter } from '../../filters/filter';
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
export declare class GenericSearchFilterFactory implements IGenericSearchFilterFactory {
    private objectUtility;
    private stringUtility;
    constructor(objectUtility: IObjectUtility, stringUtility: IStringUtilityService);
    getInstance(tokenized?: boolean): IGenericSearchFilter;
}
export declare const genericSearchFilterToken: OpaqueToken;
export declare const GENERIC_SEARCH_FILTER_PROVIDER: Provider;
