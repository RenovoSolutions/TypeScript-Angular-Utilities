import { OpaqueToken, Provider } from 'angular2/core';
export interface ISearchUtility {
    search(object: any, search: string, caseSensitive?: boolean): boolean;
    tokenizedSearch(object: any, search: string, caseSensitive?: boolean): boolean;
}
export declare let searchUtility: ISearchUtility;
export declare const searchToken: OpaqueToken;
export declare const SEARCH_PROVIDER: Provider;
