## array
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
