import { helper } from './dataContractsHelper.service';

describe('data contracts helper', () => {
	it('should version the url', (): void => {
		expect(helper.versionEndpoint('/api/test', 2)).to.equal('/api/v2/test');
	});
});
