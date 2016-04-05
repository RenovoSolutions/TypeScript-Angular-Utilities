export interface ITimezone {
    offset: string;
    display: string;
    momentName: string;
    offsetMinutes?: number;
}
export interface ITimezones {
    AST: ITimezone;
    EST: ITimezone;
    CST: ITimezone;
    MST: ITimezone;
    PST: ITimezone;
    AKST: ITimezone;
    HAST: ITimezone;
    get(offset: string): ITimezone;
    all(): ITimezone[];
}
export declare let timezones: ITimezones;
