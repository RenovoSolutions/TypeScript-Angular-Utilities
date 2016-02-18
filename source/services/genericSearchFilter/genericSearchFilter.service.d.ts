import * as Rx from 'rx';
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
    subscribe(onValueChange: IValueChangeCallback): Rx.Subscriber;
}
export interface IValueChangeCallback {
    (newValue: string): void;
}
export declare class GenericSearchFilter implements IGenericSearchFilter {
    protected object: IObjectUtility;
    private string;
    type: string;
    minSearchLength: number;
    caseSensitive: boolean;
    private _searchText;
    private _value;
    private subject;
    constructor(object: IObjectUtility, string: IStringUtilityService);
    searchText: string;
    serialize(): string;
    subscribe(onValueChange: IValueChangeCallback): Rx.Subscriber;
    filter<TItemType>(item: TItemType): boolean;
    private searchObject<TItemType>(item, search, caseSensitive);
    private checkForValueChange();
}
export interface IGenericSearchFilterFactory {
    getInstance(): IGenericSearchFilter;
}
