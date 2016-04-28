## isEmpty
Tests the provided value to see if it is null or empty using the [object](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/README.md#object) utility to call isNullOrEmpty on the value. Returns true if the item is empty. If you specify `isEmpty:false`, returns true for non-empty values.

```
<span ng-if="myArray | isEmpty:false">
   My array has values!
</span>
<span ng-if="myArray | isEmpty">
   My array is empty!
</span>
```
