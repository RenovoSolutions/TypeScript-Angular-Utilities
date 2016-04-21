import { mock, IMockedPromise } from './mockPromise';

interface ITestType {
	value: number;
}

describe('mockPromise', () => {
	it('should create a promise that resolves when flushed', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise({ value: 10 });
		mockedPromise()
			.then((result: ITestType) => {
				expect(result.value).to.equal(10);
				done();
			});

		mockedPromise.flush();
	});

	it('should create a promise that resolves with dynamic content when flushed', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise((value1: number, value2: number) => {
			return { value: value1 + value2 };
		});

		mockedPromise(5, 3)
			.then((result: ITestType) => {
				expect(result.value).to.equal(8);
				done();
			});

		mockedPromise.flush();
	});

	it('should create a promise that is rejected', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.rejectedPromise<ITestType>(new Error('an error'));

		mockedPromise()
			.then(() => {
				assert.fail(null, null, 'Promise should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('an error');
				done();
			});

		mockedPromise.flush();
	});

	it('should create a promise and set it to be rejected', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		mockedPromise.reject(new Error('error message'));

		mockedPromise()
			.then(() => {
				assert.fail(null, null, 'Promise should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('error message');
				done();
			});

		mockedPromise.flush();
	});

	it('should be able to reuse mocked promises', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		mockedPromise.reject(new Error('error message'));

		mockedPromise()
			.then(() => null, (error: Error) => {
				mockedPromise.rejected = false;

				mockedPromise()
					.then((result: ITestType) => {
						expect(result.value).to.equal(3);
						done();
					});

				mockedPromise.flush();
			});

		mockedPromise.flush();
	});

	it('should reuse a pending promise', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		expect(mockedPromise()).to.equal(mockedPromise());
	});
});
