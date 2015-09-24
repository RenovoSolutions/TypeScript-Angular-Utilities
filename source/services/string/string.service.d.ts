export declare var moduleName: string;
export declare var serviceName: string;
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
