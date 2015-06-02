/// <reference path='angularjs/angular.d.ts' />

declare module angular {

	interface IAngularStatic {
		mock: IMockStatic;
	}

	interface IMockStatic {
		inject(params: any[]): any;
		module(moduleFunc: ($provider: ng.auto.IProvideService) => void): void;
		module(moduleName: string): void;
	}
	
	interface IHttpBackendService {
		expect(method: string
			, url: string | RegExp | { (): string }
			, data?: string | RegExp | { (): string } | Object
			, header?: Object | { (): Object }): IHttpExpectation;
		expectGET(url: string | RegExp | { (): string }
			, data?: string | RegExp | { (): string } | Object
			, header?: Object | { (): Object }): IHttpExpectation;
		expectPUT(url: string | RegExp | { (): string }
			, data?: string | RegExp | { (): string } | Object
			, header?: Object | { (): Object }): IHttpExpectation;
		expectPOST(url: string | RegExp | { (): string }
			, data?: string | RegExp | { (): string } | Object
			, header?: Object | { (): Object }): IHttpExpectation;
		expectDELETE(url: string | RegExp | { (): string }
			, data?: string | RegExp | { (): string } | Object
			, header?: Object | { (): Object }): IHttpExpectation;
			
		flush(count?: number);
		
		verifyNoOutstandingExpectation();
		verifyNoOutstandingRequest();
		
		resetExpectations();
	}
	
	interface IHttpExpectation {
		respond(data: any, headers?: Object, statusText?: string): IHttpExpectation;
		respond(status: number, data: any, headers?: Object, statusText?: string): IHttpExpectation;
	}

	interface ITimeoutService {
		flush(): void;
		flush(delay: number): void;
		verifyNoPendingTasks(): void;
	}
}
