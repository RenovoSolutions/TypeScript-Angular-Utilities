// uses typings/angularjs

/// <reference path='notification.service.ts' />

module rl.utilities.services.notification {
	'use strict';

	export class BaseNotifier implements INotifier {
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
}
