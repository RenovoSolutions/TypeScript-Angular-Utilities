export interface ISearchUtility {
    search(object: any, search: string, caseSensitive?: boolean): boolean;
    tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}
export declare let searchUtility: ISearchUtility;
