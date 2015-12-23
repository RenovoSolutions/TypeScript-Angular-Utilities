## date
Contains a collection of helper functions, primarily focused around dates and less on time.

#### `getFullString(month: number): string`
Take the zero based month number (December = 11) and convert it to the string name of the month.

#### `getDays(month: number, year?: number): number`
Get the number of days in the given month. Optionally specify the year and leap years will be taken into account. The month is zero based, so January = 0.
