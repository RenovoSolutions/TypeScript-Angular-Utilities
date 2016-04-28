import { OpaqueToken, Provider } from 'angular2/core';
import { ITimezone } from './timezone.enum';
export * from './timezone.enum';
export interface ITimezoneService {
    getTimezone(isoString: string): ITimezone;
    getMomentTimezone(isoString: string): string;
    setCurrentTimezone(offset: string): void;
    currentTimezone: ITimezone;
    buildMomentWithTimezone(dateValue: string | moment.Moment, timezone: ITimezone, format?: string): moment.Moment;
}
export declare class TimezoneService implements ITimezoneService {
    private _currentTimezone;
    currentTimezone: ITimezone;
    setCurrentTimezone(offset: string): void;
    getTimezone(isoString: string): ITimezone;
    getMomentTimezone(isoString: string): string;
    buildMomentWithTimezone(dateValue: string | moment.Moment, timezone: ITimezone, format?: string): moment.Moment;
}
export declare let timezoneService: ITimezoneService;
export declare const timezoneToken: OpaqueToken;
export declare const TIMEZONE_PROVIDER: Provider;
