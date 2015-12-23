## object
Contains generic operations for any objects.

#### `isNullOrEmpty(object: any): boolean`
Returns true if the object is null.
Returns true if the object is an empty array.
Returns true if the object is NaN.
Returns true if the object is an empty string.

####`isNullOrWhitespace(object: any): boolean`
If the object is a string, first trims it then passes the object into isNullOrEmpty().

####`areEqual(obj1: any, obj2: any): boolean`
Recursively compares all of the properties on the two objects and returns true if they are equal.

####`toString(object: any) string`
Converts any object to a string.

####`valueOrDefault(value: any, defaultValue: any): any`
If the value is not null, returns it, otherwise returns the default value.
