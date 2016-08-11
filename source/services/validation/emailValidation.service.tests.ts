
import {EmailValidationService} from './emailValidation.service';

describe.only('EmailValidationService', () => {
	let emailValidationService = new EmailValidationService();

	const validCharacterTestCases: string[] = ['_', '+', '.', '+'];
	const invalidCharacterTestCases: string[] = ['!', '^', '%', '*', ' ', '~', '&', '$', '#', '?', '`', '=', '/', '\\', ',', ':', ';', '"', '\'', '{', '}', '[', ']', '(', ')', '|', '>', '<'];
	const invalidStartCharacterTestCase: string[] = ['@', '.'];

	it('should return true when email is valid', () => {
		const fakeEmailToTest = 'fake@email.com';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.true;
	});

	it('should return false when email has double at signs', () => {
		const fakeEmailToTest = 'fake@@email.com';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.false;
	});


	invalidCharacterTestCases.forEach((invalidCharacter): void => {
		it(`should return false when an emailaddress contains ${invalidCharacter}`, () => {
			const fakeEmailToTest = `fake${invalidCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

			expect(isValid).to.be.false;
		});
	});

	validCharacterTestCases.forEach((validCharacter): void => {
		it(`should return true when an emailaddress contains ${validCharacter}`, () => {
			const fakeEmailToTest = `fake${validCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

			expect(isValid).to.be.true;
		});
	});

	invalidStartCharacterTestCase.forEach((invalidCharacter): void => {
		it(`should return false when an emailaddress starts with ${invalidCharacter}`, () => {
			const fakeEmailToTest = `${invalidCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

			expect(isValid).to.be.false;
		});
	});

	it('should return false when an emailaddress ends with .', () => {
		const fakeEmailToTest = 'invalid@emailorg.';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.false;
	});

	it('should return false when an emailaddress ends with', () => {
		const fakeEmailToTest = 'invalidemail.org@';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.false;
	});

	it('should not contain a double dot', () => {
		const fakeEmailToTest = 'invalid@email..org@';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.false;
	});

	it('should allow more than one dot contiguously', () => {
		const fakeEmailToTest = 'fake@cs.email.org';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.true;
	});

	it('should not allow a dot immediately after an at sign', () => {
		const fakeEmailToTest = 'fake@.email.org';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToTest);

		expect(isValid).to.be.false;
	});
});

