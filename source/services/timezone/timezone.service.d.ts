import { ITimezone } from './timezone.enum';
export * from './timezone.enum';
export interface ITimezoneService {
    getTimezone(isoString: string): ITimezone;
    getMomentTimezone(isoString: string): string;
    setCurrentTimezone(offset: string): void;
    currentTimezone: ITimezone;
    buildMomentWithTimezone(dateValue: string | moment.Moment, timezone: ITimezone): moment.Moment;
}
export declare class TimezoneService {
    private _currentTimezone;
    currentTimezone: ITimezone;
    setCurrentTimezone(offset: string): void;
    getTimezone(isoString: string): ITimezone;
    getMomentTimezone(isoString: string): string;
    buildMomentWithTimezone(dateValue: string | moment.Moment, timezone: ITimezone): moment.Moment;
}
export declare let timezoneService: ITimezoneService;
