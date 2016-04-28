import { OpaqueToken, Provider } from 'angular2/core';

export interface ILogger {
	log(message: any): void;
}

export class Logger {
	private console: Console;

	constructor() {
		this.console = console;
	}

	log(message: any): void {
		this.console.log(message);
	}
}

export const loggerToken: OpaqueToken = new OpaqueToken('An injectable logger for logging messages to the console');

export const LOGGER_PROVIDER: Provider = new Provider(loggerToken, {
	useClass: Logger,
});
