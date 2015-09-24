'use strict';

import * as angular from 'angular';

import { INotifier } from './notificationTypes';
import { BaseNotifier } from './baseNotifier';

export * from './notificationTypes';

export var moduleName: string = 'rl.utilities.services.notification';
export var serviceName: string = 'notification';

export interface INotificationService {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	success(message: string): void;
}

export class NotificationService implements INotificationService {
	constructor(private notifier: INotifier) {}

	info(message: string): void {
		this.notifier.info(message);
	}

	warning(message: string): void {
		this.notifier.warning(message);
	}

	error(message: string): void {
		this.notifier.error(message);
	}

	success(message: string): void {
		this.notifier.success(message);
	}
}

export interface INotificationServiceProvider extends angular.IServiceProvider {
	setNotifier(notifier: INotifier): void;
	$get(): INotificationService;
}

export function notificationServiceProvider(): INotificationServiceProvider {
	'use strict';

	return {
		notifier: new BaseNotifier(),
		setNotifier: (notifier: INotifier): void => {
			this.notifier = notifier;
		},
		$get: (): INotificationService => {
			return new NotificationService(this.notifier);
		},
	};
}

angular.module(moduleName, [])
	.provider(serviceName, notificationServiceProvider);
