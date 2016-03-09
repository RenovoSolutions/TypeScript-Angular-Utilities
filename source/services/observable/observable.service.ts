'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

export let moduleName: string = 'rl.utilities.services.observable';
export let factoryName: string = 'observableFactory';

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
	allowableEvents?: string[];
	register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
	register(action: IAction<void>, event?: string): IUnregisterFunction;
	fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
	fire(event?: string, ...params: any[]): void;
}

export class ObservableService implements IObservableService {
	private watchers: IWatcher<any>[] = [];
	private nextKey: number = 0;
	allowableEvents: string[];

	register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction {
		if (!_.isFunction(action)) {
			console.error('Error: watcher must be a function');
			return null;
		}

		if (this.allowableEvents != null && !_.find(this.allowableEvents, (e: string): boolean => { return e === event; })) {
			console.error('Error: This event is not allowed.');
			console.error('Events: ' + this.allowableEvents.join(', '));
			return null;
		}

		let currentKey: number = this.nextKey;
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


ng.module(moduleName, [])
	.factory(factoryName, observableServiceFactory);
