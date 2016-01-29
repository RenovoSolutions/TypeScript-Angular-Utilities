import { CompareResult } from '../../types/compareResult';
export declare var moduleName: string;
export declare var serviceName: string;
export interface ITimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
    millisecondsToSeconds(milliseconds: number): number;
    millisecondsToMinutes(milliseconds: number): number;
    millisecondsToHours(milliseconds: number): number;
    millisecondsToDays(milliseconds: number): number;
}
export declare class TimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
    millisecondsToSeconds(milliseconds: number): number;
    millisecondsToMinutes(milliseconds: number): number;
    millisecondsToHours(milliseconds: number): number;
    millisecondsToDays(milliseconds: number): number;
}
export declare let timeUtility: ITimeUtility;
