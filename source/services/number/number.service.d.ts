import { Provider, OpaqueToken } from 'angular2/core';
export interface INumberUtility {
    preciseRound(num: number, decimals: number): number;
    integerDivide(dividend: number, divisor: number): number;
    roundToStep(num: number, step: number): number;
}
export declare class NumberUtility implements INumberUtility {
    preciseRound(num: number, decimals: number): number;
    integerDivide(dividend: number, divisor: number): number;
    roundToStep(num: number, step: number): number;
}
export declare const numberUtility: INumberUtility;
export declare const numberUtilityToken: OpaqueToken;
export declare const NUMBER_PROVIDER: Provider;
