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
