'use strict';

// uses sinon but can't import because sinon uses dynamic requires
// sinon types will be resolved from tsd.d.ts

import * as _ from 'lodash';
import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.test.mock';
export var serviceName: string = 'mockUtility';

export interface IMock {
	service(service?: any): any;
	promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void;
	promiseWithCallback<TDataType>(service: any, methodName: string, callback: {(...params: any[]): TDataType}, successful?: boolean): void;
	flush<TDataType>(service: any): void;
}

interface IMockRequest<TDataType> {
	promise: angular.IDeferred<TDataType>;
	data: TDataType;
	successful: boolean;
}

class Mock {
	static $inject: string[] = ['$q', '$rootScope'];
	constructor(private $q: angular.IQService, private $rootScope: angular.IRootScopeService) { }

	service(service?: any): any {
		if (_.isUndefined(service)) {
			service = {};
		}

		service._mock_requestList_ = [];

		return service;
	}

	promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void {
		// Default successful to true
		if (_.isUndefined(successful)) {
			successful = true;
		}

		service[methodName] = sinon.spy((): any => {
			var deferred: angular.IDeferred<TDataType> = this.$q.defer();

			service._mock_requestList_.push({
				promise: deferred,
				data: data,
				successful: successful,
			});

			return deferred.promise;
		});
	}

	promiseWithCallback<TDataType>(service: any, methodName: string, callback: {(...params: any[]): TDataType}, successful?: boolean): void {
		// Default successful to true
		if (_.isUndefined(successful)) {
			successful = true;
		}

		service[methodName] = sinon.spy((...params: any[]): any => {
			var deferred: angular.IDeferred<TDataType> = this.$q.defer<TDataType>();

			service._mock_requestList_.push({
				promise: deferred,
				data: callback.apply(this, params),
				successful: successful,
			});

			return deferred.promise;
		});
	}

	flush<TDataType>(service: any, scope?: angular.IScope): void {
		// Save local reference to the request list and then clear
		var currentPendingRequests: IMockRequest<TDataType>[] = service._mock_requestList_;
		service._mock_requestList_ = [];

		// Process the saved list.
		// This way if any additional requests are generated while processing the current / local list
		//  these requests will be queued until the next call to flush().
		_.each(currentPendingRequests, (request: IMockRequest<TDataType>): void => {
			if (request.successful) {
				request.promise.resolve(request.data);
			} else {
				request.promise.reject(request.data);
			}

			if (_.isUndefined(scope) === false) {
				scope.$digest();
			}
		});

		this.$rootScope.$apply();
	}
}

angular.module(moduleName, [])
	.service(serviceName, Mock);
