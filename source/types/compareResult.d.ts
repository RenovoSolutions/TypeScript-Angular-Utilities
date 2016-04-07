export declare enum CompareResult {
    greater = 1,
    equal = 0,
    less = -1,
    invalid,
}
export declare function getCompareResult(num: number): CompareResult;
