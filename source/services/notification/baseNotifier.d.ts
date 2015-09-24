import { INotifier } from './notificationTypes';
export declare class BaseNotifier implements INotifier {
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    success(message: string): void;
    private notify(message);
}
