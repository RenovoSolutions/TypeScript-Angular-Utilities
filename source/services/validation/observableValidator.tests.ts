import { Subject, Observable } from 'rxjs';

import { ObservableValidator } from './observableValidator';

describe('ObservableValidator', () => {
	let validator: ObservableValidator;

	beforeEach(() => {
		validator = new ObservableValidator();
	});

	describe('validate', () => {
		it('should return the error on the first validator', () => {
			const errorString = 'error123';
			const firstHandler = {
				validate: () => Observable.of(errorString),
			};
			const secondHandler = {
				validate: () => Observable.of('other'),
			};
			validator.registerValidationHandler(firstHandler);
			validator.registerValidationHandler(secondHandler);
			let result;

			validator.validate().subscribe(valid => result = valid);

			expect(result).to.equal(errorString);
		});

		it('should return null if no errors are found', () => {
			const firstHandler = {
				validate: () => Observable.of(null),
			};
			validator.registerValidationHandler(firstHandler);
			let result;

			validator.validate().subscribe(valid => result = valid);

			expect(result).to.not.exist;
		});

		it('should return null if no validators are registered', () => {
			let result;

			validator.validate().subscribe(valid => result = valid);

			expect(result).to.not.exist;
		});
	});

	describe('isActive', () => {
		it('should ignore a validator with isActive set as false', () => {
			const firstHandler = {
				validate: () => Observable.of('error'),
				isActive: false,
			};
			validator.registerValidationHandler(firstHandler);
			let result;

			validator.validate().subscribe(valid => result = valid);

			expect(result).to.not.exist;
		});

		it('should get the validation error when the validator becomes active', () => {
			const error = 'error';
			const firstHandler = {
				validate: () => Observable.of(error),
				isActive: () => firstHandler.activeStream,
				activeStream: new Subject<boolean>(),
			};
			validator.registerValidationHandler(firstHandler);
			let result;

			validator.validate().subscribe(valid => result = valid);

			firstHandler.activeStream.next(false);

			expect(result).to.not.exist;

			firstHandler.activeStream.next(true);

			expect(result).to.equal(error);
		});
	});
});
