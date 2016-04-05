## date
Contains a collection of helper functions, primarily focused around dates and less on time.

Strings are parsed using momentjs. For more details on how parsing works and how to formulate format strings, go here: http://momentjs.com/docs/#/parsing/string-format/

Format strings are usually optional. If they are not specified, they default to `'YYYY-MM-DDTHH:mm:ssZ'`

#### `getFullString(month: number): string`
Take the zero based month number (December = 11) and convert it to the string name of the month.

#### `subtractDates(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): IDateValue`
Calculates the difference between two dates. Returns the difference in years, months, and days. If the inputs are strings, will use the format string to parse them.

```
export interface IDateValue {
	years: number;
	months: number;
	days: number;
}
```

```
let difference = dateUtility.subtractDates('01-01-2000', '02-03-2002');
// difference.years === 2
// difference.months === 1
// difference.days === 2
```

#### `subtractDateInDays(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number`
Calculates the number of days between two dates. If the inputs are strings, will parse them and then calculate the difference.

```
let difference = dateUtility.subtractDateInDays('01-01-2001', '01-05-2003');
// difference === 734
```

#### `subtractDateInMilliseconds(start: string | Date | moment.Moment, end: string | Date | moment.Moment, dateFormat?: string): number`
Calculates the difference between two dates in milliseconds. If the inputs are strings, will parse them and then calculate the difference.

#### `compareDates(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, dateFormat?: string): CompareResult`
Compares two dates and indicates if the first date is less than, equal to, or greater than the second date. If the inputs are strings they will be parsed before comparing.

CompareResult: https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/README.md#compareresult

#### `dateInRange(date: string | Date | moment.Moment, rangeStart: string | Date | moment.Moment, rangeEnd: string | Date): boolean`
Tests to see if a date is in between two other dates. Any strings are parsed before comparing.

#### `getDateFromISOString(date: string): moment.Moment`
Converts an [ISO format date string](https://www.w3.org/TR/NOTE-datetime) into a moment object.

#### `isDate(date: string | Date | moment.Moment, dateFormat?: string): boolean`
Tests the input to see if it is a valid date. For Date inputs, asserts that `Date.prototype.getTime()` does not return NaN. For string inputs, verifies that the string parses into a valid date.

#### `getNow(): moment.Moment`
Returns a date representing "now." Can be useful for getting now as this allows tests to mock "now" instead of relying on `new Date()` directly.

#### `formatDate(date: string | Date | moment.Moment, dateFormat?: string): string`
Pretty print a Date using the given format string.

#### `sameDate(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean`
Returns true if the two dates specify the same DAY without regard to hours, minutes, seconds, or milliseconds. Attempts to parse strings inputs into dates.

#### `sameDateTime(date1: string | Date | moment.Moment, date2: string | Date | moment.Moment, date1Format?: string, date2Format?: string): boolean`
Returns true if the two dates specify the same DAY/HOUR/MINUTE without regard to seconds or milliseconds. Attempts to parse strings inputs into dates.
