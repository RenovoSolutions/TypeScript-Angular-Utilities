// uses typings/jquery

'use strict';

export var name: string = 'jqueryUtility';

export interface IJQueryUtility {
	replaceContent(contentArea: JQuery, newContents: JQuery): void;
}

export class JQueryUtility implements IJQueryUtility {
	replaceContent(contentArea: JQuery, newContent: JQuery): void {
		contentArea.empty();
		contentArea.append(newContent);
	}
}
