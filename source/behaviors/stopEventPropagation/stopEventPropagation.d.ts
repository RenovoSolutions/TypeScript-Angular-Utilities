import { ElementRef, AfterContentInit } from 'angular2/core';
export declare class StopEventPropagation implements AfterContentInit {
    private element;
    private event;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
}
