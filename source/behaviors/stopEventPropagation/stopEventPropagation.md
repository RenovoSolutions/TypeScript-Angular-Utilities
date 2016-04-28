## stopEventPropogation
Absorbs the passed in DOM event so that it will not propogate outside of the current element. Generally useful for restricting click events within an element so that the click events on parent elements are not triggered.
```
<div class="my-parent-div" click="doSomething()">
  <button class="child-button" click="doSomethingDifferent()" rl-stop-event-propogation="click">Click me</button>
</div>
```
