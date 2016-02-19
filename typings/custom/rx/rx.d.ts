
declare module "rx" {
	export = Rx;
}

declare module Rx {
	class Subject<T> {
		onNext(value: T): void;
		subscribe(onNext: { (value: T): void }, onError?: { (error: any): void }, onCompleted?: {(): void}): Subscriber;
	}

	interface Subscriber {
		dispose(): void;
	}
}
