import { Provider, OpaqueToken } from 'angular2/core';
export interface INotificationService {
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
}
export declare class NotificationService implements INotificationService {
    private window;
    constructor(window: Window);
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
    private notify(message);
}
export declare const notificationServiceToken: OpaqueToken;
export declare const NOTIFICATION_SERVICE_PROVIDER: Provider;
