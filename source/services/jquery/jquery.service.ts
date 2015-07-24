// uses typings/angularjs
// uses typings/jquery

module rl.utilities.services.jquery {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.jquery';
	export var serviceName: string = 'jqueryUtility';

	export interface IJQueryUtility {
		replaceContent(contentArea: JQuery, newContents: JQuery): void;
	}

	class JQueryUtility implements IJQueryUtility {
		replaceContent(contentArea: JQuery, newContent: JQuery): void {
			contentArea.empty();
			contentArea.append(newContent);
		}
	}

	angular.module(moduleName, [])
		.service(serviceName, JQueryUtility);
}
