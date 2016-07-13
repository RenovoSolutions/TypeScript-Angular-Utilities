import { Injectable } from '@angular/core';
import { WindowWrapper } from '../window/window.provider';
import { ILogger, Logger } from '../logger/logger.service';

export interface INotificationService {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	success(message: string): void;
}

@Injectable()
export class NotificationService implements INotificationService {
	private window: Window;
	private logger: ILogger;

	constructor(window: WindowWrapper
			, logger: Logger) {
		this.window = <any>window;
		this.logger = logger;
	}

	info(message: string): void {
		this.notify(message);
	}

	warning(message: string): void {
		this.notify(message);
	}

	error(message: string): void {
		this.notify(message);
	}

	success(message: string): void {
		this.notify(message);
	}

	private notify(message: string): void {
		this.window.alert(message);
		this.logger.log(message);
	}
}
