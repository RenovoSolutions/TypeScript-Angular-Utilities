import { FileSize } from './fileSize.module';
import { numberUtility } from '../number/number.service';

describe('fileSize', () => {
	it('should determine bytes', (): void => {
		expect(new FileSize(numberUtility, 1).display()).to.equal('1 bytes');
		expect(new FileSize(numberUtility, 1023).display()).to.equal('1023 bytes');
	});

	it('should determine kilo bytes', (): void => {
		expect(new FileSize(numberUtility, 1024).display()).to.equal('1 KB');
		expect(new FileSize(numberUtility, 1048575).display()).to.equal('1024 KB');
	});

	it('should determine mega bytes', (): void => {
		expect(new FileSize(numberUtility, 1048576).display()).to.equal('1 MB');
		expect(new FileSize(numberUtility, 1073741823).display()).to.equal('1024 MB');
	});

	it('should determine giga bytes', (): void => {
		expect(new FileSize(numberUtility, 1073741824).display()).to.equal('1 GB');
		expect(new FileSize(numberUtility, 1073741825).display()).to.equal('1 GB');
	});
});
