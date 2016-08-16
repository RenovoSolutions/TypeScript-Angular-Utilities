import { mock, IMockedPromise } from './mockAsync';
import { rlFakeAsync } from './fakeAsync';

interface ITestType {
	value: number;
}

interface ITestDataService {
	promise1: IMockedPromise<ITestType>;
	promise2: IMockedPromise<ITestType>;
}

describe('mockPromise', () => {
	it('should create a promise that resolves when flushed', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise({ value: 10 });
		mockedPromise()
			.then((result: ITestType) => {
				expect(result.value).to.equal(10);
			});

		mockedPromise.flush();
	}));

	it('should create a promise that resolves with dynamic content when flushed', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise((value1: number, value2: number) => {
			return { value: value1 + value2 };
		});

		mockedPromise(5, 3)
			.then((result: ITestType) => {
				expect(result.value).to.equal(8);
			});

		mockedPromise.flush();
	}));

	it('should create a promise that is rejected', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.rejectedPromise<ITestType>(new Error('an error'));

		mockedPromise()
			.then(() => {
				assert.fail(null, null, 'Promise should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('an error');
			});

		mockedPromise.flush();
	}));

	it('should create a promise and set it to be rejected', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 });
		mockedPromise.reject(new Error('error message'));

		mockedPromise()
			.then(() => {
				assert.fail(null, null, 'Promise should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('error message');
			});

		mockedPromise.flush();
	}));

	it('should be able to reuse mocked promises', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise<ITestType>({ value: 3 }, true);
		mockedPromise.reject(new Error('error message'));

		mockedPromise()
			.then(() => null, (error: Error) => {
				mockedPromise.rejected = false;

				mockedPromise()
					.then((result: ITestType) => {
						expect(result.value).to.equal(3);
					});

				mockedPromise.flush();
			});

		mockedPromise.flush();
	}));

	it('should allow unique parameters with successive calls', rlFakeAsync(() => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise((value1: number, value2: number) => {
			return { value: value1 + value2 };
		}, true);

		mockedPromise(5, 3)
			.then((result: ITestType) => {
				expect(result.value).to.equal(8);

				mockedPromise(8, 2)
					.then((result: ITestType) => {
						expect(result.value).to.equal(10);
					});

				mockedPromise.flush();
			});

		mockedPromise.flush();
	}));

	it('should reuse a pending promise when sharing', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise({ value: 3 }, true);
		expect(mockedPromise()).to.equal(mockedPromise());
	});

	it('should not reuse a pending promise by default or not sharing', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise({ value: 3 });
		expect(mockedPromise()).to.not.equal(mockedPromise());

		mockedPromise = mock.promise({ value: 3 }, false);
		expect(mockedPromise()).to.not.equal(mockedPromise());
	});

	it('should flush all requests on an unshared promise', rlFakeAsync((): void => {
		let mockedPromise: IMockedPromise<number> = mock.promise(result => result);
		Promise.all<number>([
			mockedPromise(5),
			mockedPromise(10),
		]).then(([result1, result2]: number[]): void => {
			expect(result1).to.equal(5);
			expect(result2).to.equal(10);
		});

		mockedPromise.flush();
	}));

	it('should spy on the promise function', (): void => {
		let mockedPromise: IMockedPromise<ITestType> = mock.promise({ value: 3 });
		mockedPromise(6);
		sinon.assert.calledOnce(mockedPromise);
		sinon.assert.calledWith(mockedPromise, 6);
	});

	it('should flush all promises on an object', rlFakeAsync((): void => {
		let service: ITestDataService = {
			promise1: mock.promise({ value: 3 }),
			promise2: mock.promise({ value: 4 }),
		};
		Promise.all<ITestType>([
			service.promise1(),
			service.promise2(),
		]).then(([result1, result2]: ITestType[]): void => {
			expect(result1.value).to.equal(3);
			expect(result2.value).to.equal(4);
		});
		mock.flushAll(service);
	}));

	it('should work with Promise.resolve and Promise.all', rlFakeAsync((): void => {
		const mockedPromises: IMockedPromise<number>[] = [
			mock.promise(5),
			mock.promise(10),
		];

		const whens: Promise<number>[] = mockedPromises.map((mocked: IMockedPromise<number>) => Promise.resolve(mocked()));

		Promise.all<number>(whens).then(([result1, result2]: number[]): void => {
			expect(result1).to.equal(5);
			expect(result2).to.equal(10);
		});

		mock.flushAll(mockedPromises);
	}));
});
