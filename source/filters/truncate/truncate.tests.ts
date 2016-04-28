import { TruncatePipe } from './truncate';

import { objectUtility } from '../../services/object/object.service';

describe('truncate', () => {
	var truncate: TruncatePipe;

	beforeEach(() => {
		truncate = new TruncatePipe(objectUtility);
	});

	it('should return an empty string when no string is passed', (): void => {
		expect(truncate.transform()).to.equal('');
	});

	it('should return an empty string when an empty string is passed', (): void => {
		expect(truncate.transform('')).to.equal('');
	});

	it('should return a string when a number is passed', (): void => {
		expect(truncate.transform(34.5)).to.equal('34.5');
	});

	it('should not truncate a string when no parameters are passed', (): void => {
		expect(truncate.transform('Test string')).to.equal('Test string');
	});

	it('should return an empty string when truncateTo is 0', (): void => {
		expect(truncate.transform('Test string', 0)).to.equal('');
	});

	it('should truncate but not ellipsimogrify a string when only truncateTo is passed', (): void => {
		expect(truncate.transform('Test string', 6)).to.equal('Test s');
	});

	it('should not truncate a string when truncateTo is greater than the string length', (): void => {
		expect(truncate.transform('Test string', 25)).to.equal('Test string');
	});

	it('should truncate but not ellipsimogrify a string when both truncateTo and includeEllipses are passed', (): void => {
		expect(truncate.transform('Test string', 6, false)).to.equal('Test s');
	});

	it('should truncate and ellipsimogrify a string when both truncateTo andcludeEllipses are passed', (): void => {
		expect(truncate.transform('Test string', 6, true)).to.equal('Test s...');
	});
});
