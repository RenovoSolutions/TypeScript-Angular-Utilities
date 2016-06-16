import { isFunction } from 'lodash';

export interface ITimeout extends Promise<void> {
	cancel(): void;
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
		const timeout: ITimeout = <any>new Promise<void>((resolve, reject) => {
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
		timeout.cancel = () => {
			pending = false;
			rejectFunc();
		};
		return timeout;
	}
}