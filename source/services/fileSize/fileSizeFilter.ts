// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

/// <reference path='fileSize.service.ts' />

module rl.utilities.services.fileSize {
	'use strict';

	export var simpleFilterName: string = 'fileSize';
	export var filterName: string = simpleFilterName + 'Filter';

	export interface IFileSizeFilter {
		(bytes?: number): string;
	}

	fileSizeFilter.$inject = [factoryName];
	export function fileSizeFilter(fileSizeFactory: IFileSizeFactory): IFileSizeFilter {
		'use strict';
		return (bytes?: number): string => {
			var fileSize: IFileSize = fileSizeFactory.getInstance(bytes);
			return fileSize.display();
		};
	}
}
