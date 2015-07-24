// uses typings/angular

/// <reference path='breakpoints.ts' />
/// <reference path='visibleBreakpoints.service.ts' />
/// <reference path='../observable/observable.service.ts' />
/// <reference path='../window/window.service.ts' />

module rl.utilities.services.breakpoints {
	'use strict';

	import __window = rl.utilities.services.window;
	import __observable = rl.utilities.services.observable;

	export var moduleName: string = 'rl.utilities.services.breakpoints';
	export var serviceName: string = 'breakpoints';

	export interface IBreakpointService {
		currentBreakpoint: string;
		isBreakpoint(breakpoint: string): boolean;
		register(action: {(breakpoint: string): void}): __observable.IUnregisterFunction;
	}

	export class BreakpointService implements IBreakpointService {
		static $inject: string[] = [visibleBreakpointsServiceName, 'resizeDebounceMilliseconds', __window.serviceName, __observable.factoryName]
		constructor(private visibleBreakpoints: IVisibleBreakpointService
				, resizeDebounceMilliseconds: number
				, windowService: __window.IWindowService
				, observableFactory: __observable.IObservableServiceFactory) {
			this.currentBreakpoint = this.getBreakpoint();

			this.observable = observableFactory.getInstance();

			var efficientResize: {(): void} = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
				leading: true,
				trailing: true,
				maxWait: resizeDebounceMilliseconds,
			});
			windowService.resize(efficientResize);
		}

		private observable: __observable.IObservableService;
		currentBreakpoint: string;

		private getBreakpoint(): string {
			if (this.visibleBreakpoints.isVisible(lg)) {
				return lg;
			} else if (this.visibleBreakpoints.isVisible(md)) {
				return md;
			} else if (this.visibleBreakpoints.isVisible(sm)) {
				return sm;
			} else {
				return xs;
			}
		}

		isBreakpoint(breakpoint: string): boolean {
			return this.currentBreakpoint === breakpoint;
		}

		register(action: { (breakpoint: string): void }): __observable.IUnregisterFunction {
			return this.observable.register(action, 'window.breakpointChanged');
		}

		private updateBreakpoint: {(): void} = (): void => {
			var newBreakPoint: string = this.getBreakpoint();

			if (newBreakPoint !== this.currentBreakpoint) {
				this.currentBreakpoint = newBreakPoint;
				this.observable.fire('window.breakpointChanged', this.currentBreakpoint);
			}
		}
	}

	angular.module(moduleName, [__window.moduleName, __observable.moduleName])
		.constant('resizeDebounceMilliseconds', 500)
		.service(visibleBreakpointsServiceName, VisibleBreakpointService)
		.service(serviceName, BreakpointService);
}
