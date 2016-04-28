import { Provider } from 'angular2/core';

import { RESOURCE_BUILDER_PROVIDER } from './resourceBuilder/resourceBuilder.service';
import { DATA_SERVICE_PROVIDER } from './dataService/data.service';
import { SINGLETON_DATA_SERVICE_PROVIDER } from './singletonDataService/singletonData.service';

import * as converters from './converters/converters';
import * as mocks from './contractLibrary/dataServiceMocks';

export * from './contractLibrary/contractLibrary';
export * from './dataService/data.service';
export * from './dataService/view/dataServiceView';
export * from './dataService/parent/parentData.service';
export * from './singletonDataService/singletonData.service';
export * from './singletonDataService/parent/parentSingletonData.service';
export * from './resourceBuilder/resourceBuilder.service';
export { converters, mocks };

export const DATA_CONTRACT_PROVIDERS: Provider[] = [
	RESOURCE_BUILDER_PROVIDER,
	DATA_SERVICE_PROVIDER,
	SINGLETON_DATA_SERVICE_PROVIDER,
];
