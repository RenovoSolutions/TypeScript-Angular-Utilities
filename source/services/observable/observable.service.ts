// uses typings/angularjs
// uses typings/lodash

module rl.utilities.observable {
	'use strict';

	export var moduleName: string = 'rl.utilities.observable';
	export var serviceName: string = 'observableFactory';

	export interface IWatcher {
		action(...params: any[]): void;
		event?: string;
	}

	export interface IRegisterFunction {
		(action: {(...params: any[]): void}, event?: string): IUnregisterFunction
	}

	export interface IUnregisterFunction {
		(): void;
	}

	export interface IObservableService {
		register: IRegisterFunction;
		fire(event?: string, ...params: any[]): void;
	}

	class ObservableService implements IObservableService {
		private watchers: IWatcher[] = [];
		private nextKey: number = 0;

		register(action: {(...params: any[]): void}, event?: string): IUnregisterFunction {
			if (!_.isFunction(action)) {
				console.log('Error: watcher must be a function');
				return null;
			}

			var currentKey: number = this.nextKey;
			this.nextKey++;
			this.watchers[currentKey] = {
				action: action,
				event: event,
			};

			return (): void => {
				this.unregister(currentKey);
			};
		}

		fire(event?: string, ...params: any[]): void {
			_.each(this.watchers, (watcher: IWatcher) => {
				if (watcher != null && watcher.event === event) {
					watcher.action.apply(this, params);
				}
			});
		}

		private unregister(key: number): void {
			this.watchers[key] = null;
		}
	}

	export interface IObservableServiceFactory {
		getInstance(): IObservableService;
	}

	function observableServiceFactory(): IObservableServiceFactory {
		'use strict';

		return {
			getInstance(): IObservableService {
				return new ObservableService();
			}
		};
	}

	angular.module(moduleName, [])
		.factory(serviceName, observableServiceFactory);
}
