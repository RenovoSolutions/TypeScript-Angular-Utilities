export var dateTimeFormatServiceName: string = 'dateTimeFormatStrings';

export interface IDateFormatStrings {
	isoFormat: string;
	dateTimeFormat: string;
	dateFormat: string;
	timeFormat: string;
}

export var defaultFormats: IDateFormatStrings = {
	isoFormat: 'YYYY-MM-DDTHH:mm:ssZ',
	dateTimeFormat: 'MM/DD/YYYY h:mm A',
	dateFormat: 'MM/DD/YYYY',
	timeFormat: 'h:mmA',
};
