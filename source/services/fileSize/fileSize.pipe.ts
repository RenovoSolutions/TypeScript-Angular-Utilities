import { Pipe, PipeTransform } from '@angular/core';

import { INumberUtility, NumberUtility } from '../number/number.service';

import { FileSize } from './fileSize.service';

// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

@Pipe({ name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
	private numberUtility: INumberUtility;

	constructor(numberUtility: NumberUtility) {
		this.numberUtility = numberUtility;
	}

	transform(bytes: number): string {
		var fileSize: FileSize = new FileSize(this.numberUtility, bytes);
		return fileSize.display();
	}
}
