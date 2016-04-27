import { INumberUtility } from '../number/number.service';
export declare class FileSize {
    BYTES_PER_GB: number;
    BYTES_PER_MB: number;
    BYTES_PER_KB: number;
    bytes: number;
    GB: number;
    isGB: boolean;
    MB: number;
    isMB: boolean;
    KB: number;
    isKB: boolean;
    constructor(numberUtility: INumberUtility, bytes: number);
    display(): string;
}
