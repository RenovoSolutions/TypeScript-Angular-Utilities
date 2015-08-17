
/// <reference path='../number/number.service.ts' />

module rl.utilities.services.fileSize {
	export var factoryName: string = 'fileSizeFactory';

	export interface IFileSize {
		display(): string;
	}

	class FileSizeService implements IFileSize {
		BYTES_PER_GB: number = 1073741824;
		BYTES_PER_MB: number = 1048576;
		BYTES_PER_KB: number = 1024;

		bytes: number;

		GB: number;
		isGB: boolean;

		MB: number;
		isMB: boolean;

		KB: number;
		isKB: boolean;

		constructor(numberUtility: number.INumberUtility, bytes: number) {
			this.bytes = bytes;

			if (bytes >= this.BYTES_PER_GB) {
				this.isGB = true;
				this.GB = bytes / this.BYTES_PER_GB;
				this.GB = numberUtility.preciseRound(this.GB, 1);
			} else {
				this.isGB = false;

				if (bytes >= this.BYTES_PER_MB) {
					this.isMB = true;
					this.MB = bytes / this.BYTES_PER_MB;
					this.MB = numberUtility.preciseRound(this.MB, 1);
				} else {
					this.isMB = false;

					if (bytes >= this.BYTES_PER_KB) {
						this.isKB = true;
						this.KB = bytes / this.BYTES_PER_KB;
						this.KB = numberUtility.preciseRound(this.KB, 1);
					} else {
						this.isKB = false;
					}
				}
			}

			this.bytes = Math.round(this.bytes);
		}

		display(): string {
			if (this.isGB) {
				return this.GB + ' GB';
			} else if (this.isMB) {
				return this.MB + ' MB';
			} else if (this.isKB) {
				return this.KB + ' KB';
			} else {
				return this.bytes + ' bytes';
			}
		}
	}

	export interface IFileSizeFactory {
		getInstance(bytes: number): IFileSize;
	}

	fileSizeFactory.$inject = [number.serviceName];
	export function fileSizeFactory(numberUtility: number.INumberUtility): IFileSizeFactory {
		'use strict';
		return {
			getInstance(bytes: number): IFileSize {
				return new FileSizeService(numberUtility, bytes);
			},
		};
	}
}
