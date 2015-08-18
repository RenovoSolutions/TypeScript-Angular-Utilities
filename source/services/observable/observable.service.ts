// uses typings/angularjs
// uses typings/lodash

module rl.utilities.services.observable {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.observable';
	export var factoryName: string = 'observableFactory';

	export interface IWatcher<TReturnType> {
		action: IAction<TReturnType>;
		event?: string;
	}

	export interface IAction<TReturnType> {
		(...params: any[]): TReturnType;
	}

	export interface IUnregisterFunction {
		(): void;
	}

	export interface IObservableService {
		register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
		register(action: IAction<void>, event?: string): IUnregisterFunction;
		fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
		fire(event?: string, ...params: any[]): void;
	}

	export class ObservableService implements IObservableService {
		private watchers: IWatcher<any>[] = [];
		private nextKey: number = 0;

		register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction {
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

		fire<TReturnType>(event?: string, ...params: any[]): TReturnType[] {
			return _(this.watchers).filter((watcher: IWatcher<TReturnType>): boolean => {
				return watcher != null && watcher.event === event;
			})
			.map((watcher: IWatcher<TReturnType>): TReturnType => {
				return watcher.action.apply(this, params);
			}).value();
		}

		private unregister(key: number): void {
			this.watchers[key] = null;
		}
	}

	export interface IObservableServiceFactory {
		getInstance(): IObservableService;
	}

	export function observableServiceFactory(): IObservableServiceFactory {
		'use strict';

		return {
			getInstance(): IObservableService {
				return new ObservableService();
			}
		};
	}


	angular.module(moduleName, [])
		.factory(factoryName, observableServiceFactory);
}
