import * as Rx from 'rx';
export interface IFilterWithCounts extends IFilter {
    updateOptionCounts<TItemType>(data: TItemType[]): void;
}
export interface ISerializableFilter<TFilterData> extends IFilter {
    type: string;
    serialize(): TFilterData;
    subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscriber;
}
export interface IValueChangeCallback<TFilterData> {
    (newValue: TFilterData): void;
}
export interface IFilter {
    filter<TItemType>(item: TItemType): boolean;
}
export declare abstract class SerializableFilter<TFilterData> implements ISerializableFilter<TFilterData> {
    type: string;
    protected subject: Rx.Subject<TFilterData>;
    private _value;
    constructor();
    abstract filter(item: any): boolean;
    serialize(): TFilterData;
    subscribe(onValueChange: IValueChangeCallback<TFilterData>): Rx.Subscriber;
    onChange(force?: boolean): void;
}
