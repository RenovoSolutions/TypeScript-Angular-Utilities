import { helper } from './dataContractsHelper.service';

describe('data contracts helper', () => {
	it('should version the url', (): void => {
		expect(helper.versionEndpoint('/api/test', 2)).to.equal('/api/v2/test');
	});

	it('should replace the previous version if one is already specified', (): void => {
		expect(helper.versionEndpoint('api/v2/test', 3)).to.equal('api/v3/test');
	});
});
