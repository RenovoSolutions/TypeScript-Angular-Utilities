module rl.utilities.services.time {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.time';
	export var serviceName: string = 'timeUtility';

	export interface ITimeUtility {
		millisecondsToSeconds(milliseconds: number): number;
		millisecondsToMinutes(milliseconds: number): number;
		millisecondsToHours(milliseconds: number): number;
		millisecondsToDays(milliseconds: number): number;
	}

	export class TimeUtility {
		millisecondsToSeconds(milliseconds: number): number {
			return Math.floor(milliseconds / 1000);
		}

		millisecondsToMinutes(milliseconds: number): number {
			return Math.floor(this.millisecondsToSeconds(milliseconds) / 60);
		}

		millisecondsToHours(milliseconds: number): number {
			return Math.floor(this.millisecondsToMinutes(milliseconds) / 60);
		}

		millisecondsToDays(milliseconds: number): number {
			return Math.floor(this.millisecondsToHours(milliseconds) / 24);
		}
	}

	angular.module(moduleName, [])
		.service(serviceName, TimeUtility);
}
