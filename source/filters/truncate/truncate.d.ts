import { PipeTransform } from 'angular2/core';
import { IObjectUtility } from '../../services/object/object.service';
export declare class TruncatePipe implements PipeTransform {
    private objectUtility;
    constructor(objectUtility: IObjectUtility);
    transform(input?: string | number, truncateTo?: number, includeEllipses?: boolean): string;
}
