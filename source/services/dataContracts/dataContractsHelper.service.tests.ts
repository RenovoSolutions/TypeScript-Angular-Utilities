/// <reference path='../../../typings/main/ambient/chai/chai.d.ts' />
/// <reference path='../../../typings/main/ambient/sinon/sinon.d.ts' />
/// <reference path='../../../typings/main/ambient/mocha/mocha.d.ts' />
/// <reference path='../../../typings/custom/chai/chaiAssertions.d.ts' />

'use strict';

import { helper } from './dataContractsHelper.service';

describe('data contracts helper', () => {
	it('should version the url', (): void => {
		expect(helper.versionEndpoint('/api/test', 2)).to.equal('/api/v2/test');
	});
});
