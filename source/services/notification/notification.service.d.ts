import { Provider, OpaqueToken } from 'angular2/core';
import { ILogger } from '../logger/logger.service';
export interface INotificationService {
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
}
export declare class NotificationService implements INotificationService {
    private window;
    private logger;
    constructor(window: Window, logger: ILogger);
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
    private notify(message);
}
export declare const notificationServiceToken: OpaqueToken;
export declare const NOTIFICATION_PROVIDER: Provider;
