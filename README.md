# TypeScript-Angular-Utilities
Contains a list of reusable TypeScript libraries, services, and general utilities. These are all defined as angular services and can be injected via the angular dependency injector.

## Behaviors
Angular directives that are applied as attributes to an element in order to modify the element's behavior.
### stopEventPropogation
Absorbs the passed in DOM event so that it will not propogate outside of the current element. Generally useful for restricting click events within an element so that the click events on parent elements are not triggered.
```
<div class="my-parent-div" click="doSomething()">
  <button class="child-button" click="doSomethingDifferent()" stop-event-propogation="click">Click me</button>
</div>
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
