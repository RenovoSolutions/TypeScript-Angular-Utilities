import { IConverter } from '../../baseDataServiceBehavior';
import { IItemList, IItem } from '../../../../types/itemList';
export { IConverter };
export declare class EnumConverter<TItemType extends IItem> implements IConverter<TItemType> {
    private enumType;
    constructor(enumType: IItemList<TItemType>);
    fromServer(raw: number): TItemType;
    toServer(data: TItemType): number;
}
