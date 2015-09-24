export declare var moduleName: string;
export declare var serviceName: string;
export declare var filterName: string;
export interface ITruncateFilter {
    (input?: string, truncateTo?: number, includeEllipses?: boolean): string;
    (input?: number, truncateTo?: number, includeEllipses?: boolean): string;
}
