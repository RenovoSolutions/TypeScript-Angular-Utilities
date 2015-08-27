// uses typings/angularjs

module rl.utilities.services.notification {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.notification';
	export var serviceName: string = 'notification';

	export interface INotifier {
		info(message: string): void;
		warning(message: string): void;
		error(message: string): void;
		success(message: string): void;
	}

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

	export interface INotificationServiceProvider extends ng.IServiceProvider {
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
}
