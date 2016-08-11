
import {EmailValidationService} from './emailValidation.service';

describe.only('EmailValidationService', () => {
	let emailValidationService = new EmailValidationService();

	const validCharacterTestCases: string[] = ['_', '+', '.', '+'];
	const invalidCharacterTestCases: string[] = ['!', '^', '%', '*', ' ', '~', '&', '$', '#', '?', '`', '=', '/', '\\', ',', ':', ';', '"', '\'', '{', '}', '[', ']', '(', ')', '|', '>', '<'];
	const invalidStartCharacterTestCase: string[] = ['@', '.'];

	it('should return true when email is valid', () => {
		const fakeEmailToAdd = 'fake@email.com';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.true;
	});

	it('should return false when email has double at signs', () => {
		const fakeEmailToAdd = 'fake@@email.com';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.false;
	});


	invalidCharacterTestCases.forEach((invalidCharacter): void => {
		it(`should return false when an emailaddress contains ${invalidCharacter}`, () => {
			const fakeEmailToAdd = `fake${invalidCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

			expect(isValid).to.be.false;
		});
	});

	validCharacterTestCases.forEach((invalidCharacter): void => {
		it(`should return true when an emailaddress contains ${invalidCharacter}`, () => {
			const fakeEmailToAdd = `fake${invalidCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

			expect(isValid).to.be.true;
		});
	});

	invalidStartCharacterTestCase.forEach((invalidCharacter): void => {
		it(`should return false when an emailaddress starts with ${invalidCharacter}`, () => {
			const fakeEmailToAdd = `${invalidCharacter}invalid@email.org`;

			let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

			expect(isValid).to.be.false;
		});
	});

	it('should return false when an emailaddress ends with .', () => {
		const fakeEmailToAdd = 'invalid@emailorg.';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.false;
	});

	it('should return false when an emailaddress ends with', () => {
		const fakeEmailToAdd = 'invalidemail.org@';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.false;
	});

	it('should not contain a double dot', () => {
		const fakeEmailToAdd = 'invalid@email..org@';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.false;
	});

	it('should allow more than one dot contiguously', () => {
		const fakeEmailToAdd = 'fake@cs.email.org';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.true;
	});

	it('should not allow a dot immediately after an at sign', () => {
		const fakeEmailToAdd = 'fake@.email.org';

		let isValid = emailValidationService.isValidEmailAddress(fakeEmailToAdd);

		expect(isValid).to.be.false;
	});
});

