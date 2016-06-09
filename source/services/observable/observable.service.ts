import { Injectable, OpaqueToken, Provider, ExceptionHandler } from '@angular/core';
import * as _ from 'lodash';

// deprecated - use rxjs instead

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

@Injectable()
export class ObservableService implements IObservableService {
	private exceptionHandler: ExceptionHandler;
	private watchers: IWatcher<any>[] = [];
	private nextKey: number = 0;
	allowableEvents: string[];

	constructor(exceptionHandler: ExceptionHandler) {
		this.exceptionHandler = exceptionHandler;
	}

	register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction {
		if (!_.isFunction(action)) {
			this.exceptionHandler.call(new Error('Watcher must be a function'));
			return null;
		}

		if (this.allowableEvents != null && !_.find(this.allowableEvents, (e: string): boolean => { return e === event; })) {
			this.exceptionHandler.call(new Error('This event is not allowed. Events: ' + this.allowableEvents.join(', ')));
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

export const observableToken: OpaqueToken = new OpaqueToken('Deprecated - a service for observables');

export const OBSERVABLE_PROVIDER: Provider = new Provider(observableToken, {
	useClass: ObservableService,
});
