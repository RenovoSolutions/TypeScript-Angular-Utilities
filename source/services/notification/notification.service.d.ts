import * as angular from 'angular';
import { INotifier } from './notificationTypes';
export * from './notificationTypes';
export declare var moduleName: string;
export declare var serviceName: string;
export interface INotificationService {
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
}
export declare class NotificationService implements INotificationService {
    private notifier;
    constructor(notifier: INotifier);
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
}
export interface INotificationServiceProvider extends angular.IServiceProvider {
    setNotifier(notifier: INotifier): void;
    $get(): INotificationService;
}
export declare function notificationServiceProvider(): INotificationServiceProvider;
