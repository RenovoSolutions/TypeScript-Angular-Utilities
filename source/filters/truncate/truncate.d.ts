import { PipeTransform } from '@angular/core';
import { IObjectUtility } from '../../services/object/object.service';
export declare class TruncatePipe implements PipeTransform {
    private objectUtility;
    constructor(objectUtility: IObjectUtility);
    transform(input?: string | number, truncateTo?: number, includeEllipses?: boolean): string;
}
