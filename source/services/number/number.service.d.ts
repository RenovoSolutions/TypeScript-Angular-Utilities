export declare var moduleName: string;
export declare var serviceName: string;
export interface INumberUtility {
    preciseRound(num: number, decimals: number): number;
    integerDivide(dividend: number, divisor: number): number;
    roundToStep(num: number, step: number): number;
}
