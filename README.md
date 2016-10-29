# ReactJS/AngularJS HTML5 validation

Registration form for new users with validation and sing up notification.
Passwords should met following conditions:
 - must include one increasing straight of at least three letters, like 'abc', 'bcd' and so on, up to 'xyz';
 - may not contain the letters 'i', 'o' and 'l';
 - must contain at least two non-overlapping pairs of letters, like 'aa', 'bb' or 'zz';
 - cannot be longer than 32 characters;
 - can only contain lower case alphabetic characters.

Author: Roman Malieiev <aromaleev@gmail.com>

Project consists of two builds:
 - production optimised
 - development with source change watchers

Tech stack:
 - AngularJS
 - ReactJS/JSX
 - HTML5 validation
 - Webpack builder with plugins
 - Babel for ES6 support with ESLint
 - Sass integration
 - Jasmine unit tests
 - Protractor/Jasmine E2E tests

## Installation

1. Install Node.js/npm
2. Navigate to the current folder
3. Run:

	 `npm install`

## Running

Build for production:

	npm run build

Run in development mode:

	npm run server
	npm run dev-angular
	npm run dev-react

Angular version would be available at [http://localhost:8080/angular](http://localhost:8080/angular);
React version would be available at [http://localhost:8080/react](http://localhost:8080/react);

Tests:

	npm run build
	npm run server
	npm run test-e2e-prepare
	npm test

**NOTE**: Make sure Chrome/Chromium binary is in PATH

## Possible improvements

 - SEO: ReactJS server rendering, AngularJS snapshots with Phantom.js

