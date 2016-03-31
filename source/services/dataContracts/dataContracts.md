## Data contracts
The data contracts library provides a framework for providing contracts with REST resources on the server. The consumer uses configuration options to specify the expected format for the contract and then uses the resourceBuilder to build the contract into a fully functional data service.

### [Resource builder](./baseResourceBuilder/resourceBuilder.md)
The resource builder is used to build data services from contract definitions.

### [Contract library](./baseResourceBuilder/contractLibrary.md)
A base class to provide tools for mocking functions on the data contract library.

### [Data contract](./baseDataService.md)
The base configuration options for specifying a data contract.

### [Data service](./baseDataService/dataService.md)
The basic data service type

### [Singleton data service](./baseSingleDataService/singletonDataService.md)
A data service for getting and updating a single entity.

### [Data service view](./baseDataService/dataServiceView.md)
A data service type representing a `view` of a parent resource. Functions as a normal data service unless a specific parent is selected, at which point the `view` is treated as a singleton.

### [Parent data service]()
A data service that my also have child data services defined under it.

### [Parent singleton data service]()
A parent data service for getting and updating a single entity.

### [Parent data service view]()
A parent data service that is a `view` of another parent.