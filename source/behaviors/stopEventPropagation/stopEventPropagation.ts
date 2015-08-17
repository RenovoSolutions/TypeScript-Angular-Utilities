// uses typings/angular

module rl.utilities.behaviors.stopEventPropogation {
	'use strict';

	export var moduleName: string = 'rl.utilities.behaviors.stopEventPropogation';
	export var directiveName: string = 'rlStopEventPropagation';

	export interface IStopEventPropagationAttrs extends ng.IAttributes {
		rlStopEventPropagation: string;
	}

	function stopEventPropagation(): ng.IDirective {
		'use strict';
		return {
			restrict: 'A',
			link(scope: ng.IScope
				, element: ng.IAugmentedJQuery
				, attrs: IStopEventPropagationAttrs): void {
				element.on(attrs.rlStopEventPropagation, (event: JQueryEventObject): void => {
					event.preventDefault();
					event.stopPropagation();
				});
			}
		};
	}

	angular.module(moduleName, [])
		.directive(directiveName, stopEventPropagation);
}
