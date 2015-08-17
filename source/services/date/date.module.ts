/// <reference path='date.service.ts' />
/// <reference path='dateTimeFormatStrings.ts' />

module rl.utilities.services.date {
	export var moduleName: string = 'rl.utilities.services.date';

	angular.module(moduleName, [])
		.service(dateServiceName, DateUtility)
		.value(dateTimeFormatServiceName, defaultFormats);
}
