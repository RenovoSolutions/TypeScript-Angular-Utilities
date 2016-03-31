'use strict';

import * as angular from 'angular';

import { moduleName as resourceBuilderModuleName } from './resourceBuilder/resourceBuilder.service';
import { moduleName as baseDataServiceModuleName } from './dataService/data.service';
import { moduleName as baseSingletonDataServiceModuleName } from './singletonDataService/singletonData.service';

import * as converters from './converters/converters';
import * as mocks from './contractLibrary/dataServiceMocks';

export var moduleName: string = 'rl.utilities.services.dataContracts';

export * from './contractLibrary/contractLibrary';
export { IDataService, IDataServiceFactory, IBaseDomainObject, DataService, factoryName as baseDataServiceFactoryName } from './dataService/data.service';
export { IDataServiceView, IParentDataServiceView } from './dataService/dataServiceView';
export * from './parentDataService/parentData.service';
export { ISingletonDataService, ISingletonDataServiceFactory, SingletonDataService, factoryName as baseSingletonDataServiceFactoryName } from './singletonDataService/singletonData.service';
export * from './parentSingletonDataService/parentSingletonData.service';
export { IBaseResourceBuilder, serviceName as builderServiceName } from './resourceBuilder/resourceBuilder.service';
export { converters, mocks };

angular.module(moduleName, [
	baseDataServiceModuleName,
	baseSingletonDataServiceModuleName,
	resourceBuilderModuleName,
]);
