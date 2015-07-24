/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='breakpoints.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.breakpoints {
	'use strict';

	import __test = rl.utilities.services.test;

	interface IVisibleBreakpointsMock {
		isVisible(breakpoint: string): boolean;
	}

	interface IWindowServiceMock {
		resize(callback: {(event: JQueryEventObject): any}): void;
	}

	describe('breakpoints', () => {
		var breakpoints: IBreakpointService;

		var visibleBreakpoint: string;
		var triggerResize: { (): void };

		beforeEach((): void => {
			angular.mock.module(moduleName);
		});

		it('should have visible breakpoint marked as current', (): void => {
			visibleBreakpoint = md;

			buildService();

			expect(breakpoints.currentBreakpoint).to.equal(md);
			expect(breakpoints.isBreakpoint(md)).to.be.true;
			expect(breakpoints.isBreakpoint(lg)).to.be.false;
			expect(breakpoints.isBreakpoint(sm)).to.be.false;
			expect(breakpoints.isBreakpoint(xs)).to.be.false;
		});

		it('should signal registered listeners when the breakpoint changes', (): void => {
			var breakpointChangeSpy: Sinon.SinonSpy = sinon.spy();

			visibleBreakpoint = sm;

			buildService();

			breakpoints.register(breakpointChangeSpy);

			visibleBreakpoint = md;
			triggerResize();

			expect(breakpoints.currentBreakpoint).to.equal(md);
			expect(breakpoints.isBreakpoint(md)).to.be.true;
			expect(breakpoints.isBreakpoint(lg)).to.be.false;
			expect(breakpoints.isBreakpoint(sm)).to.be.false;
			expect(breakpoints.isBreakpoint(xs)).to.be.false;

			sinon.assert.calledOnce(breakpointChangeSpy);
		});

		function buildService(): void {
			var mockVisibleBreakpointService: IVisibleBreakpointsMock = {
				isVisible: (breakpoint: string): boolean => {
					return breakpoint === visibleBreakpoint;
				},
			};

			var mockWindowControl: IWindowServiceMock = {
				resize: (callback: { (): void }): void => {
					triggerResize = callback;
				},
			};

			__test.angularFixture.mock({
				visibleBreakpoint: mockVisibleBreakpointService,
				windowControl: mockWindowControl,
			});

			var services: any = __test.angularFixture.inject(serviceName);
			breakpoints = services[serviceName];
		}
	});
}
