import { IFileSizeFactory } from './fileSize.service';
export declare var simpleFilterName: string;
export declare var filterName: string;
export interface IFileSizeFilter {
    (bytes?: number): string;
}
export declare function fileSizeFilter(fileSizeFactory: IFileSizeFactory): IFileSizeFilter;
