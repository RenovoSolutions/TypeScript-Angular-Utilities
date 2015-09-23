import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.behaviors.stopEventPropogation';
export var directiveName: string = 'rlStopEventPropagation';

export interface IStopEventPropagationAttrs extends angular.IAttributes {
	rlStopEventPropagation: string;
}

function stopEventPropagation(): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		link(scope: angular.IScope
			, element: angular.IAugmentedJQuery
			, attrs: IStopEventPropagationAttrs): void {
			element.on(attrs.rlStopEventPropagation, (event: any): void => {
				event.preventDefault();
				event.stopPropagation();
			});
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, stopEventPropagation);
