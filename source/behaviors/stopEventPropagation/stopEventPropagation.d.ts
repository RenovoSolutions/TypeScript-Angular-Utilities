import { ElementRef, AfterContentInit } from '@angular/core';
export declare class StopEventPropagation implements AfterContentInit {
    private element;
    private event;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
}
