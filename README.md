# TypeScript-Angular-Utilities
Contains a list of reusable TypeScript libraries, services, and general utilities. These are all defined as angular services and can be injected via the angular dependency injector.

## Behaviors
Angular directives that are applied as attributes to an element in order to modify the element's behavior.

* [stopEventPropogation](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/behaviors/stopEventPropagation/documentation.md)

## Filters
Contains Angular filters, which can be applied to bindings using the Angular pipe operator `<span>{{myMoney | currency}}</span>`

Contains a generic filter interface `IFilter`

* [isEmpty](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/filters/isEmpty/documentation.md)

* [truncate](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/filters/truncate/documentation.md)

## Services
### object
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

### array
Contains generic operations for arrays. Some of these are redundant with libraries like [lodash](https://lodash.com/) and [underscore](http://underscorejs.org/), but available here if needed.

#### `findIndexOf<TDataType>(array: TDataType[], predicate: { (item: TDataType): boolean }): number`
Pass in the array to search and a predicate to test against each item. Returns the index of the first item that the predicate returns true for, or -1 if the predicate never returns true.

#### `remove<TDataType>(array: TDataType[], item: TDataType | { (obj: TDataType): boolean }): TDataType`
The first parameter is the array to remove the item from, the second is either the item to remove or a predicate. If you give pass in a predicate the first item that returns true will be removed.

#### `replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void`
Takes the array passed in as the first parameter and replaces the second parameter with the third parameter in this array.

#### `sum<TDataType>(array: TDataType[], transform?: { (item: TDataType): number }): number`
Adds all of the items in the array and returns the sum. The second parameter can optionally transform each item before adding.
```
let myArray = [
  { id: 0, num: 1 },
  { id: 1, num: 5 },
  { id: 2, num: 4 },
  { id: 3, num: 8 },
];
let mySum = arrayService.sum(myArray, (item): number => item.num);
expect(mySum).to.equal(18);
```

#### `toDictionary<TDataType>(array: TDataType[], keySelector: { (item: TDataType): string }): { [index: string]: TDataType }`
Converts the array into a dictionary. The second parameter is a function that takes each item and returns a dictionary key.

#### `last<TDataType>(array: TDataType[]): TDataType`
Returns the last element in the array.

### Injecting a service
```
import { services } from 'typescript-angular-utilities';
import objectNamespace = services.object;

export class MyController {
  static $inject: string[] = [objectNamespace.serviceName];
  constructor(private objectService: objectNamespace.IObjectUtility): void {
  }

  ...

  private testForEmpty(): boolean {
    return this.objectService.isNullOrEmpty(this.someValue);
  }
}

angular.module('moduleName', [objectNamespace.moduleName])
  .controller('controllerName', MyController);
```

## Setup
Clone the repository into your working directory.

Node must be installed.

Install the karma client:
`npm install karma -g`

Install the typescript compiler:
`npm install typescript -g`

Navigate to the root of the repo in a cmd prompt and run:

* `npm run update`

## Building and Testing
Please always test new builds to ensure non-breaking commits and PRs

To build: `npm run build`

To test: `npm test`
To debug tests: `npm run test.debug`
To run tests against additional browsers: `npm run test.full`
