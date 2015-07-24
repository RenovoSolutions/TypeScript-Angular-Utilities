// uses typings/angular
// uses typings/jquery

module rl.utilities.services.window {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.window';
	export var serviceName: string = 'windowControl';

	export interface IWindowService {
		resize(callback: { (event: JQueryEventObject): any }): void;
	}

	class WindowService {
		private windowControl: JQuery = $(window);

		resize(callback: { (event: JQueryEventObject): any }): void {
			this.windowControl.resize(callback);
		}
	}

	angular.module(moduleName, [])
		.service(serviceName, WindowService);
}
