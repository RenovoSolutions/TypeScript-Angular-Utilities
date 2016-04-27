import { IStringUtilityService, StringUtilityService } from './string.service';


describe('stringUtility', () => {
	let stringUtility: IStringUtilityService;

	beforeEach(() => {
		stringUtility = new StringUtilityService();
	});

	describe('toNumber', (): void => {
		it('should convert a string to a number', (): void => {
			expect(stringUtility.toNumber('5')).to.equal(5);
			expect(stringUtility.toNumber('3')).to.equal(3);
			expect(stringUtility.toNumber('1.25')).to.equal(1.25);
		});
	});

	describe('contains', (): void => {
		it('should return true if the substring is contained within the string', (): void => {
			expect(stringUtility.contains('my string', 'my')).to.be.true;
			expect(stringUtility.contains('123', '1')).to.be.true;
			expect(stringUtility.contains('', null)).to.be.true;
			expect(stringUtility.contains('my string', '')).to.be.true;
		});

		it('should return false if the substring is not contained within the string', (): void => {
			expect(stringUtility.contains('my string', 'my val')).to.be.false;
			expect(stringUtility.contains('123', '4')).to.be.false;
			expect(stringUtility.contains('my string', 'my string 1')).to.be.false;
		});
	});

	describe('replaceAll', (): void => {
		it('should replace all occurances of some given text with another inside a string', (): void => {
			expect(stringUtility.replaceAll('hello world', 'foo', 'bar')).to.equal('hello world');
			expect(stringUtility.replaceAll('fooHellofooWorldfoo', 'foo', 'bar')).to.equal('barHellobarWorldbar');
		});
	});

	describe('substitute', (): void => {
		it('should substitute strings with their positional placeholder value in other strings', (): void => {
			expect(stringUtility.substitute('hello world', 'foo')).to.equal('hello world');
			expect(stringUtility.substitute('hello {0} world {1}', 'foo', 'bar')).to.equal('hello foo world bar');
		});
	});
});
