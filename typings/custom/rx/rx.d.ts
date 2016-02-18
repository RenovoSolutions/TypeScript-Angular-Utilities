
// declare var rx: rx.IUUID;

declare module "rx" {
	export { Rx };
}

declare module Rx {
	class Subject {
		onNext(params: any): void;
		subscribe(...params: any[]): void;
	}
}
