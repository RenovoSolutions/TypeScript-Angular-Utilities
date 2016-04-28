## truncate
Converts the input value to a string using `.toString()` and then limits the length of the string to the truncate length. Can optionally add an ellipses to the end (...).

```
// with:
scope.myString = 'some long string that needs to be truncated';

<span>{{myString | truncate:10:true}}</span>

// displays:
// 'some long ...'
```
