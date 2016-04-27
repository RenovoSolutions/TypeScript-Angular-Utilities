import { OpaqueToken, Provider } from 'angular2/core';
export interface IStringUtilityService {
    toNumber(string: string): number;
    contains(str: string, substring?: string): boolean;
    substitute(formatString: string, ...params: string[]): string;
    replaceAll(str: string, patternToFind: string, replacementString: string): string;
}
export declare class StringUtilityService implements IStringUtilityService {
    toNumber(string: string): number;
    contains(str: string, substring?: string): boolean;
    substitute(formatString: string, ...params: string[]): string;
    replaceAll(str: string, patternToFind: string, replacementString: string): string;
}
export declare let stringUtility: IStringUtilityService;
export declare const stringToken: OpaqueToken;
export declare const STRING_PROVIDER: Provider;
