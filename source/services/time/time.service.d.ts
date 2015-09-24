export declare var moduleName: string;
export declare var serviceName: string;
export interface ITimeUtility {
    millisecondsToSeconds(milliseconds: number): number;
    millisecondsToMinutes(milliseconds: number): number;
    millisecondsToHours(milliseconds: number): number;
    millisecondsToDays(milliseconds: number): number;
}
export declare class TimeUtility {
    millisecondsToSeconds(milliseconds: number): number;
    millisecondsToMinutes(milliseconds: number): number;
    millisecondsToHours(milliseconds: number): number;
    millisecondsToDays(milliseconds: number): number;
}
