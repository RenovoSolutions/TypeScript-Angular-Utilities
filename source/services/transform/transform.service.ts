'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.utilities.services.transform';
export var serviceName: string = 'transformService';

export interface ITransformService {

}

export class TransformService implements ITransformService {

}

export let transform: ITransformService = new TransformService();

angular.module(moduleName, [])
	.service(serviceName, TransformService);
