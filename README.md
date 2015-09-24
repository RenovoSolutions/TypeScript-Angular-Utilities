# TypeScript-Angular-Utilities
Contains various TypeScript Angular services and features.

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

### Local development
To make local development against utilities easier:
Run: `npm link`

In a project that consumes / uses utilities, run: `npm link typescript-angular-utilities`

This creates a linked output folder against the latest changes to the utilities project and eliminates the need for a full deploy to try the changes to utilities.
