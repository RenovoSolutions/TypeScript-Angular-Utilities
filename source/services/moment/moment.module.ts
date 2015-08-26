

module rl.utilities.services.momentWrapper {
	export var moduleName: string = 'rl.utilities.services.momentWrapper';
	export var serviceName: string = 'momentWrapper';

	export function momentWrapper(): void {
		'use strict';
		// Using `any` instead of MomentStatic because
		//  createFromInputFallback doesn't appear to be
		//  defined in MomentStatic... :-(
		var moment: any = (<any> window).moment; // moment must already be loaded

		// Set default method for handling non-ISO date conversions.
		// See 4/28 comment in https://github.com/moment/moment/issues/1407
		// This also prevents the deprecation warning message to the console.
		moment.createFromInputFallback = (config: any): void => {
			config._d = new Date(config._i);
		};

		return moment;
	}

	angular.module(moduleName, [])
	.factory(serviceName, momentWrapper);

}
