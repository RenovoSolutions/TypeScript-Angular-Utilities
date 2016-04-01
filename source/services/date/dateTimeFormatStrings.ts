'use strict';

export var dateTimeFormatServiceName: string = 'dateTimeFormatStrings';

export interface IDateFormatStrings {
	isoFormat: string;
	dateTimeFormat: string;
	dateFormat: string;
	timeFormat: string;
}

export var defaultFormats: IDateFormatStrings = {
	isoFormat: 'YYYY-MM-DDTHH:mm:sszzz',
	dateTimeFormat: 'M/D/YYYY h:mm A',
	dateFormat: 'M/D/YYYY',
	timeFormat: 'h:mmA',
};
