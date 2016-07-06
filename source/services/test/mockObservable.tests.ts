import { Observable } from 'rxjs';

import { mock, IMockedObservable } from './mockAsync';
import { fakeAsync } from './fakeAsync';

interface ITestType {
	value: number;
}

interface ITestDataService {
	request1: IMockedObservable<ITestType>;
	request2: IMockedObservable<ITestType>;
}

describe('mockObservable', () => {
	it('should create a request that resolves when flushed', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request({ value: 10 });
		mockedObservable()
			.subscribe((result: ITestType) => {
				expect(result.value).to.equal(10);
			});

		mockedObservable.flush();
	}));

	it('should create a request that resolves with dynamic content when flushed', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request((value1: number, value2: number) => {
			return { value: value1 + value2 };
		});

		mockedObservable(5, 3)
			.subscribe((result: ITestType) => {
				expect(result.value).to.equal(8);
			});

		mockedObservable.flush();
	}));

	it('should create a request that is rejected', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.rejectedRequest<ITestType>(new Error('an error'));

		mockedObservable()
			.subscribe(() => {
				assert.fail(null, null, 'Request should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('an error');
			});

		mockedObservable.flush();
	}));

	it('should create a request and set it to be rejected', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request<ITestType>({ value: 3 });
		mockedObservable.reject(new Error('error message'));

		mockedObservable()
			.subscribe(() => {
				assert.fail(null, null, 'Observable should be rejected, not resolved');
			}, (error: Error) => {
				expect(error.message).to.equal('error message');
			});

		mockedObservable.flush();
	}));

	it('should be able to reuse mocked requests', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request<ITestType>({ value: 3 }, true);

		mockedObservable()
			.subscribe((result1: ITestType) => {
				expect(result1.value).to.equal(3);

				mockedObservable()
					.subscribe((result2: ITestType) => {
						expect(result2.value).to.equal(3);
					});

				mockedObservable.flush();
			});

		mockedObservable.flush();
	}));

	it('should allow unique parameters with successive calls', fakeAsync(() => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request((value1: number, value2: number) => {
			return { value: value1 + value2 };
		}, true);

		mockedObservable(5, 3)
			.subscribe((result: ITestType) => {
				expect(result.value).to.equal(8);

				mockedObservable(8, 2)
					.subscribe((result: ITestType) => {
						expect(result.value).to.equal(10);
					});

				mockedObservable.flush();
			});

		mockedObservable.flush();
	}));

	it('should reuse a pending request when sharing', (): void => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request({ value: 3 }, true);
		expect(mockedObservable()).to.equal(mockedObservable());
	});

	it('should not reuse a pending request by default or not sharing', (): void => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request({ value: 3 });
		expect(mockedObservable()).to.not.equal(mockedObservable());

		mockedObservable = mock.request({ value: 3 }, false);
		expect(mockedObservable()).to.not.equal(mockedObservable());
	});

	it('should flush all requests on an unshared mock request', fakeAsync((): void => {
		let mockedObservable: IMockedObservable<number> = mock.request(result => result);
		Observable.forkJoin<number[]>([
			mockedObservable(5),
			mockedObservable(10),
		]).subscribe(([result1, result2]: number[]): void => {
			expect(result1).to.equal(5);
			expect(result2).to.equal(10);
		});

		mockedObservable.flush();
	}));

	it('should spy on the request function', (): void => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request({ value: 3 });
		mockedObservable(6);
		sinon.assert.calledOnce(mockedObservable);
		sinon.assert.calledWith(mockedObservable, 6);
	});

	it('should flush all request on an object', fakeAsync((): void => {
		let service: ITestDataService = {
			request1: mock.request({ value: 3 }),
			request2: mock.request({ value: 4 }),
		};
		Observable.forkJoin<ITestType[]>([
			service.request1(),
			service.request2(),
		]).subscribe(([result1, result2]: ITestType[]): void => {
			expect(result1.value).to.equal(3);
			expect(result2.value).to.equal(4);
		});
		mock.flushAll(service);
	}));

	it('should work with Observable.from and Observable.forkJoin', fakeAsync((): void => {
		const mockedObservables: IMockedObservable<number>[] = [
			mock.request(5),
			mock.request(10),
		];

		const whens: Observable<number>[] = mockedObservables.map((mocked: IMockedObservable<number>) => Observable.from(mocked()));

		Observable.forkJoin<number[]>(whens).subscribe(([result1, result2]: number[]): void => {
			expect(result1).to.equal(5);
			expect(result2).to.equal(10);
		});

		mock.flushAll(mockedObservables);
	}));

	it('should work with toPromise', fakeAsync((): void => {
		let mockedObservable: IMockedObservable<ITestType> = mock.request({ value: 10 });
		mockedObservable()
			.toPromise()
			.then((result: ITestType) => {
				expect(result.value).to.equal(10);
			});

		mockedObservable.flush();
	}));
});
