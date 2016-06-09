import { Inject, Pipe, PipeTransform } from '@angular/core';

import { INumberUtility, numberToken } from '../number/number.service';

import { FileSize } from './fileSize.service';

// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

@Pipe({ name: 'fileSize'})
class FileSizePipe implements PipeTransform {
	private numberUtility: INumberUtility;

	constructor(@Inject(numberToken) numberUtility: INumberUtility) {
		this.numberUtility = numberUtility;
	}

	transform(bytes: number): string {
		var fileSize: FileSize = new FileSize(this.numberUtility, bytes);
		return fileSize.display();
	}
}
