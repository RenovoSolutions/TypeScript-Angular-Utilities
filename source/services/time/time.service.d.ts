import { CompareResult } from '../../types/compareResult';
export declare var moduleName: string;
export declare var serviceName: string;
export interface ITimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
}
export declare class TimeUtility {
    compareTimes(time1: string, time2: string): CompareResult;
}
export declare let timeUtility: ITimeUtility;
