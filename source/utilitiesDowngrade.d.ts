import { PipeTransform } from 'angular2/core';
import { UpgradeAdapter } from 'angular2/upgrade';
import { IObservableService } from './services/observable/observable.service';
export declare const isEmptyFilterName: string;
export declare const truncateFilterName: string;
export declare const arrayServiceName: string;
export declare const booleanServiceName: string;
export declare const resourceBuilderServiceName: string;
export declare const dateServiceName: string;
export declare const errorHandlerServiceName: string;
export declare const genericSearchFilterServiceName: string;
export declare const guidServiceName: string;
export declare const httpServiceName: string;
export declare const notificationServiceName: string;
export declare const numberServiceName: string;
export declare const objectServiceName: string;
export declare const observableServiceName: string;
export declare const stringServiceName: string;
export declare const synchronizedRequestsServiceName: string;
export declare const timeServiceName: string;
export declare const timezoneServiceName: string;
export declare const validationServiceName: string;
export declare const moduleName: string;
export interface IObservableFactory {
    getInstance(): IObservableService;
}
export declare function PipeDowngrader(pipe: PipeTransform): (value: any, ...args: any[]) => any;
export declare function downgradeUtilitiesToAngular1(upgradeAdapter: UpgradeAdapter): void;
