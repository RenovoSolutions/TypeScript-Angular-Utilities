export interface IItem {
    value: number;
    name: string;
    display: string;
}
export interface IItemList<TItemType extends IItem> {
    get(value: number | string): TItemType;
    all(): TItemType[];
}
export declare class ItemList<TItemType extends IItem> {
    private items;
    setItems(items: TItemType[]): void;
    get(value: number | string): TItemType;
    all(): TItemType[];
}
