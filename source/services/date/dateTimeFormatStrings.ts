
module rl.utilities.services.date {
	export var dateTimeFormatServiceName: string = 'dateTimeFormatStrings';

	export interface IDateFormatStrings {
		dateTimeFormat: string;
		dateFormat: string;
		timeFormat: string;
	}

	export var defaultFormats: IDateFormatStrings = {
		dateTimeFormat: 'M/D/YYYY h:mm A',
		dateFormat: 'M/D/YYYY',
		timeFormat: 'h:mmA',
	};
}
