import { mock, IMockedPromise } from './mockPromise';
import * as Promise from 'bluebird';

interface ITestType {
	value: number;
}

interface ITestDataService {
	promise1: IMockedPromise<ITestType>;
	promise2: IMockedPromise<ITestType>;
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
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 }, true);
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

	it('should allow unique parameters with successive calls', (done: MochaDone) => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise((value1: number, value2: number) => {
			return { value: value1 + value2 };
		}, true);

		mockedPromise(5, 3)
			.then((result: ITestType) => {
				expect(result.value).to.equal(8);

				mockedPromise(8, 2)
					.then((result: ITestType) => {
						expect(result.value).to.equal(10);

						done();
					});

				mockedPromise.flush();
			});

		mockedPromise.flush();
	});

	it('should reuse a pending promise when sharing', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 }, true);
		expect(mockedPromise()).to.equal(mockedPromise());
	});

	it('should not reuse a pending promise by default or not sharing', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		expect(mockedPromise()).to.not.equal(mockedPromise());

		mockedPromise = mock.promise<ITestType>({ value: 3 }, false);
		expect(mockedPromise()).to.not.equal(mockedPromise());
	});

	it('should spy on the promise function', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		mockedPromise(6);
		sinon.assert.calledOnce(mockedPromise);
		sinon.assert.calledWith(mockedPromise, 6);
	});

	it('should flush all promises on an object', (done: MochaDone): void => {
		let service: ITestDataService = {
			promise1: mock.promise({ value: 3 }),
			promise2: mock.promise({ value: 4 }),
		};
		Promise.all([
			service.promise1(),
			service.promise2(),
		]).then(([result1, result2]: ITestType[]): void => {
			expect(result1.value).to.equal(3);
			expect(result2.value).to.equal(4);
			done();
		});
		mock.flushAll(service);
	});
});
