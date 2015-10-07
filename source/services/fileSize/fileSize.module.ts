'use strict';

import * as angular from 'angular';

import { moduleName as numberModuleName } from '../number/number.service';
import { factoryName, fileSizeFactory } from './fileSize.service';
import { simpleFilterName, fileSizeFilter } from './fileSizeFilter';

export * from './fileSize.service';
export * from './fileSizeFilter';

export var moduleName: string = 'rl.utilities.services.fileSize';

angular.module(moduleName, [numberModuleName])
	.factory(factoryName, fileSizeFactory)
	.filter(simpleFilterName, fileSizeFilter);
