/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { dateConverter } from './dateConverter';

describe('dateConverter', (): void => {
	it('should get the date from an ISO string', (): void => {
		var expectedDate = new Date(2015, 10, 24, 20, 12, 0);
		expect(dateConverter.fromServer('2015-11-24T20:12:00')).to.deep.equal(expectedDate);
	});

	it('should convert the date to an ISO string', (): void => {
		var date = new Date(2015, 10, 24, 20, 12, 0);
		expect(dateConverter.toServer(date)).to.equal('2015-11-24T20:12:00');
	});
});
