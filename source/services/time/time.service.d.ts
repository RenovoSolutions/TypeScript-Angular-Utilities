import { OpaqueToken, Provider } from 'angular2/core';
import { CompareResult } from '../../types/compareResult';
export interface ITimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
}
export declare class TimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
}
export declare let timeUtility: ITimeUtility;
export declare const timeToken: OpaqueToken;
export declare const TIME_PROVIDER: Provider;
