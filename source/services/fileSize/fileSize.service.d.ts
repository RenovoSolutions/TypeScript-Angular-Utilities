import { INumberUtility } from '../number/number.service';
export declare var factoryName: string;
export interface IFileSize {
    display(): string;
}
export interface IFileSizeFactory {
    getInstance(bytes: number): IFileSize;
}
export declare function fileSizeFactory(numberUtility: INumberUtility): IFileSizeFactory;
