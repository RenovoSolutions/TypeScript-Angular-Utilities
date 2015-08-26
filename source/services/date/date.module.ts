/// <reference path='date.service.ts' />
/// <reference path='dateTimeFormatStrings.ts' />
/// <reference path='../time/time.service.ts' />
/// <reference path='../moment/moment.module.ts' />

module rl.utilities.services.date {
	export var moduleName: string = 'rl.utilities.services.date';
	export var serviceName: string = 'dateUtility';

	angular.module(moduleName, [momentWrapper.moduleName, time.moduleName])
		.service(serviceName, DateUtility)
		.value(dateTimeFormatServiceName, defaultFormats);
}
