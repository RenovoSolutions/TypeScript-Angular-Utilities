## Converters
Converters specify how to transform specific data types for sending to and from the server. This is useful for cases where we want to use a data representation on the client that isn't directly supported on the server, or perhaps we want to instantiate a class to add prototype functions to the data.

Predefined converters:
* [aliasConverter](#aliasconverter)
* [dateConverter](#dateconverter)
* [enumConverter](#enumconverter)

### Interface
A converter should specify a handler for converting data both to and from the server. If one of these options is left null, the application will hard fail when that type of request is made. This may be permissable for resources where we expect to make only get requests. (Note that an update request both to and from transformations, since the updated object is returned from the server)

#### `fromServer(raw: TRawDataType, parent?: any): TDataType`
`fromServer` is called when the data returns from the server to convert an object or property to the format desired by the client. If the converter is part of a transform mapping, the parent data context is provided to the converter.

#### `toServer(data: TDataType): TRawDataType`
`toServer` is called before sending a create/update request to the server to convert the data back to the format used by the server. If the converter is part of a transform mapping, the parent data context is provided to the converter.

### Usage
When supplying a `transform` for a data contract, the consumer can do it in one of two ways. He can specify a converter for the object as a whole. Or he can specify a transform `mapping`.

#### `Converter`
To transform the object using a converter, the consumer simply needs to supply a converter matching the above interface.

Example:
```
export interface IUser {
	username: string;
	lastLogin: Date;
	referredBy: IUser;
}

export let transform: IConverter = {
	fromServer(raw: any): IUser {
		return {
			username: raw.username,
			lastLogin: new Date(raw.lastLogin),
			referredBy: {
				username: raw.referredBy.username,
				lastLogin: new Date(raw.referredBy.lastLogin),
			},
		};
	}

	toServer(data: IUser): any {
		return {
			username: data.username,
			lastLogin: data.lastLogin.toISOString(),
			referredBy: {
				username: data.referredBy.username,
				lastLogin: data.referredBy.lastLogin.toISOString(),
			},
		};
	}
};
```

#### `Transform mapping`
The transform mapping provides the consumer with a way to declaratively specify a `primitive` transform for specific properties of the resource data model. In addition, if the resource contains a nested data model, the consumer can specify a distinct child 'mapping' for each child object. Any property that is unspecified in the transform mapping will be unmodified.

Example:
```
import { services } from 'typescript-angular-utilities';
import __converters = services.dataContracts.converters;

export interface IUser {
	username: string;
	lastLogin: Date;
	referredBy: IUser;
}

export let transform: any = {
	lastLogin: __converters.dateConverter,
	referredBy: {
		lastLogin: __converters.dateConverter,
	},
};
```
This achieves the same result as above with less boilerplate code.

### AliasConverter
The alias converter is a primitive converter for mapping a value from one field to a field of a different name. Alias converter can `compose` another converter if the property value also needs to be transformed. AliasConverter is a class that must be newed up with the alias and an optional composed converter.

Example:
```
import { services } from 'typescript-angular-utilities';
import __converters = services.dataContracts.converters;

export let transform: any = {
	value: new __converters.AliasConverter('valueFromServer'),
	date: new __converters.AliasConverter('dateFromServer', __converters.dateConverter),
};
```
Behavior:
```
let testConverter = {
	fromServer(value: number): number { return value + 5; },
	toServer(value: number): number { return value - 5; },
};
let transform: any = {
	value: new __converters.AliasConverter('valueFromServer'),
	number: new __converters.AliasConverter('numberFromServer', testConverter),
};
let serverData: any = {
	valueFromServer: 5,
	numberFromServer: 5,
};
let transformedData: any = converterService.applyTransform(serverData, transform, false);
expect(transformedData.value).to.equal(5);
expect(transformedData.number).to.equal(10);
serverData = converterService.applyTransform(transformedData, transform, true);
expect(serverData.valueFromServer).to.equal(5);
expect(serverData.numberFromServer).to.equal(5);
```

### dateConverter
The date converter is a primitive converter for translating dates to and from the server. This converter expects the string in ISO format from the server and translates it to a javascript Date object.

Behavior:
```
expect(dateConverter.fromServer('2015-11-24T20:12:00')).to.deep.equal(new Date(2015, 10, 24, 20, 12, 0));
expect(dateConverter.toServer(new Date(2015, 10, 24, 20, 12, 0))).to.equal('2015-11-24T20:12:00');
```

### EnumConverter
The enum converter is a primitive converter for mapping integer values from the server to [`itemList`](../../../types/itemList.md) enum types. Unlike the date converter, EnumConverter is a class that must be newed up with the item list that should be used. The converter will then take ints and return the enum object with the corresponding id or `null` if none is found.

Example:
```
import { services } from 'typescript-angular-utilities';
import __converters = services.dataContracts.converters;

import { myEnum } from './enum';

export let transform: any = {
	value: new __converters.EnumConverter(myEnum),
};
```
Behavior:
```
// Where testEnum is an enum including type1 and type2 with ids 0 and 1, respectively
expect(new EnumConverter(testEnum).fromServer(0)).to.equal(testEnum.type1);
expect(new EnumConverter(testEnum).fromServer(1)).to.equal(testEnum.type2);
expect(new EnumConverter(testEnum).fromServer(2)).to.not.exist;

// toServer behavior is the same regardless of the underlying enum type
expect(new EnumConverter(testEnum).toServer(testEnum.type1)).to.equal(0);
expect(new EnumConverter(testEnum).toServer(testEnum.type2)).to.equal(1);
expect(new EnumConverter(testEnum).toServer(null)).to.not.exist;
```
