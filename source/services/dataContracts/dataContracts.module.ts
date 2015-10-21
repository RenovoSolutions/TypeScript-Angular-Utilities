'use strict';

import * as angular from 'angular';

import { moduleName as resourceBuilderModuleName } from './baseResourceBuilder/baseResourceBuilder.service';
import { moduleName as baseDataServiceModuleName } from './baseDataService/baseData.service';
import { moduleName as baseSingletonDataServiceModuleName } from './baseSingletonDataService/baseSingletonData.service';

export var moduleName: string = 'rl.utilities.services.dataContracts';

export { IBaseDataService, IBaseDataServiceFactory, IBaseDomainObject, BaseDataService, factoryName as baseDataServiceFactoryName } from './baseDataService/baseData.service';
export * from './baseParentDataService/baseParentData.service';
export { IBaseSingletonDataService, IBaseSingletonDataServiceFactory, BaseSingletonDataService, factoryName as baseSingletonDataServiceFactoryName } from './baseSingletonDataService/baseSingletonData.service';
export * from './baseParentSingletonDataService/baseParentSingletonData.service';
export { IBaseResourceBuilder, serviceName as builderServiceName } from './baseResourceBuilder/baseResourceBuilder.service';

angular.module(moduleName, [
	baseDataServiceModuleName,
	baseSingletonDataServiceModuleName,
	resourceBuilderModuleName,
]);
