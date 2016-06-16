export interface ITimeout extends Promise<void> {
	cancel(): void;
}

export class TimeoutService {
	setTimeout(callback: Function, duration?: number): ITimeout {
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