import { Injectable } from '@angular/core';

export interface IEmailValidationService {

	/**
	 * Accepts a string to validate if the format is that of a valid email address
	 */
	isValidEmailAddress(emailAddress: string): boolean;
}

@Injectable()
export class EmailValidationService implements IEmailValidationService {

	isValidEmailAddress(emailAddress: string): boolean {
		const validEmailPattern: RegExp = /^([^.\@])([\w.\+\.\-]+)@([\w\-]+)(\.([\w\-]+))*((\.(\w){2,3})+)/i;

		return validEmailPattern.test(emailAddress);
	}
}