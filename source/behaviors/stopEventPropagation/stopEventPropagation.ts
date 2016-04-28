import { Input, Directive, ElementRef, AfterContentInit } from 'angular2/core';

@Directive({
	selector: '[rl-stop-event-propagation]'
})
export class StopEventPropagation implements AfterContentInit {
	private element: ElementRef;

	@Input('rl-stop-event-propagation')
	private event: string;

	constructor(element: ElementRef) {
		this.element = element;
	}

	ngAfterContentInit(): void {
		this.element.nativeElement.on(this.event, (event: any): void => {
			event.preventDefault();
			event.stopPropagation();
		});
	}
}
