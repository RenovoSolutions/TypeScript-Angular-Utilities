/// <reference path="../../typings/jquery/jquery.d.ts" />

'use strict';

export interface IJQueryUtility {
	replaceContent(contentArea: JQuery, newContents: JQuery): void;
}

export class JQueryUtility implements IJQueryUtility {
	replaceContent(contentArea: JQuery, newContent: JQuery): void {
		contentArea.empty();
		contentArea.append(newContent);
	}
}
