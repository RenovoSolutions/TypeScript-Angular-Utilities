import { Injectable, Provider, OpaqueToken, Inject } from 'angular2/core';
import { windowToken } from '../window/window.provider';
import { loggerToken, ILogger } from '../logger/logger.service';

export interface INotificationService {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	success(message: string): void;
}

@Injectable()
export class NotificationService implements INotificationService {
	private window: Window;
	private logger: ILogger;

	constructor( @Inject(windowToken) window: Window
			, @Inject(loggerToken) logger: ILogger) {
		this.window = window;
		this.logger = logger;
	}

	info(message: string): void {
		this.notify(message);
	}

	warning(message: string): void {
		this.notify(message);
	}

	error(message: string): void {
		this.notify(message);
	}

	success(message: string): void {
		this.notify(message);
	}

	private notify(message: string): void {
		this.window.alert(message);
		this.logger.log(message);
	}
}

export const notificationServiceToken: OpaqueToken = new OpaqueToken('Notification Service');

export const NOTIFICATION_SERVICE_PROVIDER: Provider = new Provider(notificationServiceToken, {
	useClass: NotificationService
});
