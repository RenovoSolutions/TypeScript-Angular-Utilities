import { PipeTransform } from '@angular/core';
import { IObjectUtility } from '../../services/object/object.service';
export declare class IsEmptyPipe implements PipeTransform {
    private objectUtility;
    constructor(objectUtility: IObjectUtility);
    transform(input: any, trueWhenEmpty?: boolean): boolean;
}
