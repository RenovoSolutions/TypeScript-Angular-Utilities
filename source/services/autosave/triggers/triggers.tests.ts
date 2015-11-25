/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { Trigger, ITrigger } from './triggers';

import { angularFixture } from '../../test/angularFixture';

import * as ng from 'angular';
import 'angular-mocks';

describe('autosave triggers', () => {
	let trigger: ITrigger;

	beforeEach(() => {
		// aliases test and trigger
		trigger = new Trigger('test trigger');
	});

	it('should be true if any alias of the trigger is specified', (): void => {
		expect(trigger.hasMatch('test a simple autosave')).to.be.true;
	});

	it('should be false if no match is found', (): void => {
		expect(trigger.hasMatch('some random strings all together')).to.be.false;
	});
});
