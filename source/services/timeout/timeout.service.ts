import { isFunction } from 'lodash';

export interface ITimeout extends Promise<void> {
	cancel(): void;
	then<TValue>(onSucces: TValue, onError?: any): ITimeout;
	catch<TReason>(reason: TReason): ITimeout;
}

export class TimeoutService {
	setTimeout(callbackOrDuration: number): ITimeout;
	setTimeout(callbackOrDuration: Function, duration?: number): ITimeout;
	setTimeout(callbackOrDuration: Function | number, duration?: number): ITimeout {
		let useCallback = isFunction(callbackOrDuration);
		let callback: Function = useCallback ? <any>callbackOrDuration : () => null;
		duration = useCallback ? duration : <any>callbackOrDuration;

		let pending: boolean;
		let rejectFunc: Function;
		const promise: Promise<void> = new Promise<void>((resolve, reject) => {
			pending = true;
			rejectFunc = reject;

			setTimeout(() => {
				if (pending) {
					pending = false;
					resolve();
					callback();
				}
			}, duration);
		});
		return this.wrapPromiseAsTimeout(promise, () => {
			pending = false;
			rejectFunc();
		});
	}

	private wrapPromiseAsTimeout(promise: Promise<void>, cancel: { (): void }): ITimeout {
		const promiseThen = promise.then.bind(promise);
		const promiseCatch = promise.catch.bind(promise);
		const timeout: ITimeout = <any>promise;
		timeout.cancel = cancel;
		timeout.then = (onSuccess, onError) => {
			const newPromise: Promise<void> = promiseThen(onSuccess, onError);
			return this.wrapPromiseAsTimeout(newPromise, cancel);
		}
		return timeout;
	}
}