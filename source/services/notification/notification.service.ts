import { Injectable, Provider, OpaqueToken } from 'angular2/core';

export interface INotificationService {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	success(message: string): void;
}

@Injectable()
export class NotificationService implements INotificationService {

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
		window.alert(message);
		console.log(message);
	}
}

export const notificationServiceToken: OpaqueToken = new OpaqueToken('Notification Service');

export const NOTIFICATION_SERVICE_PROVIDER: Provider = new Provider(notificationServiceToken, {
	useClass: NotificationService
});
